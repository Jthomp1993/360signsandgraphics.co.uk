"use client";

import type { CardsCarousel as CardsCarouselType } from "@/payload-types";
import type { Object3D, Object3DEventMap } from "three";

import { useGSAP } from "@gsap/react";
import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box3, Color, DoubleSide, Group, Material, MathUtils } from "three";

import Wrapper from "@components/Wrapper";
import leadZero from "@util/leadZero";
import toBr from "@util/toBr";

import css from "./index.module.css";

const wheelModelPath = process.env.NEXT_PUBLIC_SITE_URL + "/models/wheel.glb";

// Fixed settings for wheel appearance
const settings = {
	purpleColor: "#7b37db",
	colorIntensity: 0.4,
	emissiveIntensity: 0.05,
};

// Interface for custom material with emissive property
interface CustomMaterial extends Material {
	emissive?: Color;
	color?: Color;
	userData: {
		originalColor?: Color;
		[key: string]: any;
	};
}

function WheelModel() {
	const wheelRef = useRef<Group>(null);
	const { scene } = useGLTF(wheelModelPath);
	const [scaleApplied, setScaleApplied] = useState(false);
	const mousePosition = useRef({ x: 0, y: 0 });
	const targetRotation = useRef({ x: 0, y: 0 });
	const [wheelScene, setWheelScene] = useState<Object3D<Object3DEventMap>>(
		scene.clone(),
	);

	// Track mouse position
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			// Calculate normalized mouse position (-1 to 1)
			mousePosition.current = {
				x: (e.clientX / window.innerWidth) * 2 - 1,
				y: -((e.clientY / window.innerHeight) * 2 - 1),
			};
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	// Apply materials and initial scale once
	useLayoutEffect(() => {
		if (scaleApplied || !wheelScene || !wheelRef.current) return;

		// Get the bounding box of the model to scale it properly
		const bbox = new Box3().setFromObject(wheelScene);
		const height = bbox.max.y - bbox.min.y;

		// Set the model scale to fit the container height
		const targetHeight = 3.8; // Desired height in world units
		const scale = targetHeight / height;
		wheelRef.current.scale.set(scale, scale, scale);
		setScaleApplied(true);

		// Create a light purple color
		const purpleColor = new Color(settings.purpleColor);

		// Tint the wood texture with purple while preserving texture
		wheelScene.traverse((child: any) => {
			if (child.isMesh) {
				if (Array.isArray(child.material)) {
					// Handle array of materials
					child.material = child.material.map((mat: Material) => {
						const newMat = mat.clone() as CustomMaterial;
						newMat.side = DoubleSide;

						// Store original color for adjustments
						if (newMat.color) {
							newMat.userData.originalColor = newMat.color.clone();

							// Preserve original texture but add purple tint
							newMat.color.lerp(purpleColor, settings.colorIntensity);
						}

						// Add a soft purple glow
						if (newMat.emissive) {
							newMat.emissive
								.set(purpleColor)
								.multiplyScalar(settings.emissiveIntensity);
						}

						return newMat;
					});
				} else if (child.material) {
					// Handle single material
					const newMat = child.material.clone() as CustomMaterial;
					newMat.side = DoubleSide;

					// Store original color for adjustments
					if (newMat.color) {
						newMat.userData.originalColor = newMat.color.clone();

						// Preserve original texture but add purple tint
						newMat.color.lerp(purpleColor, settings.colorIntensity);
					}

					// Add a soft purple glow
					if (newMat.emissive) {
						newMat.emissive
							.set(purpleColor)
							.multiplyScalar(settings.emissiveIntensity);
					}

					child.material = newMat;
				}
			}
		});
	}, [wheelScene, scaleApplied]);

	// Add a slow rotation animation and cursor following
	useFrame((_state, delta) => {
		if (!wheelRef.current) return;

		// Calculate target rotation based on mouse position
		targetRotation.current.x = mousePosition.current.y * -0.3;
		targetRotation.current.y = mousePosition.current.x * 0.5;

		// Apply smooth rotation - lerp current rotation toward target
		wheelRef.current.rotation.x = MathUtils.lerp(
			wheelRef.current.rotation.x,
			targetRotation.current.x,
			delta * 2,
		);

		wheelRef.current.rotation.y = MathUtils.lerp(
			wheelRef.current.rotation.y,
			targetRotation.current.y,
			delta * 2,
		);
	});

	// Add a slow rotation animation by scrolling
	useGSAP(() => {
		if (!wheelRef.current) return;

		gsap.to(wheelRef.current.rotation, {
			z: 2 * Math.PI,
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: `.${css.block}`,
				start: "top top",
				end: "bottom bottom",
				scrub: true,
			},
		});
	}, []);

	return (
		<group
			ref={wheelRef}
			rotation={[0, 0, 0]}
		>
			<primitive object={wheelScene} />
		</group>
	);
}

function WheelCanvas({ isActive }: { isActive: boolean }) {
	return (
		<div className={css.modelContainer}>
			<Canvas
				camera={{ position: [0, 0, 15], fov: 15 }}
				frameloop={isActive ? "always" : "demand"}
			>
				<Suspense fallback={null}>
					<ambientLight intensity={0.65} />
					<pointLight
						position={[5, 5, 5]}
						intensity={0.8}
						color={settings.purpleColor}
					/>
					<spotLight
						position={[10, 10, 10]}
						angle={0.15}
						penumbra={1}
						intensity={1.5}
						castShadow
					/>
					<WheelModel />
					<Environment preset="city" />
				</Suspense>
			</Canvas>
		</div>
	);
}

const CardsCarousel: React.FC<CardsCarouselType> = ({ title, items }) => {
	const blockRef = useRef<HTMLElement>(null);
	const [isInViewport, setIsInViewport] = useState(false);

	// Scroll cards
	useGSAP(
		() => {
			gsap.to(`.${css.carouselInner}`, {
				x: () => {
					const blockWidth = +gsap.getProperty(`.${css.carousel}`, "width");
					const itemsWidth = +gsap.getProperty(
						`.${css.carouselInner}`,
						"width",
					);

					return (itemsWidth - blockWidth) * -1;
				},
				ease: "none",
				scrollTrigger: {
					trigger: blockRef.current,
					start: "50% 50%",
					end: () => `+=${items.length * 200}`,
					pin: `.${css.wrapper}`,
					scrub: true,
				},
			});
		},
		{ scope: blockRef, revertOnUpdate: true, dependencies: [items] },
	);

	// Track when wheel is in viewport
	useEffect(() => {
		// Set up Intersection Observer for autopause when out of viewport
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsInViewport(true);
				} else {
					setIsInViewport(false);
				}
			});
		});

		if (blockRef.current) {
			observer.observe(blockRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<section
			ref={blockRef}
			className={css.block}
		>
			<Wrapper className={css.wrapper}>
				{title && <h2 className={css.title}>{toBr(title)}</h2>}
				{items && items.length > 0 && (
					<div className={css.carousel}>
						<div className={css.carouselInner}>
							{items.map((item, idx) => (
								<div
									key={idx}
									className={css.carouselItem}
								>
									<em>{leadZero(idx + 1)}</em>
									<h6>{toBr(item.title)}</h6>
								</div>
							))}
						</div>
					</div>
				)}
				<WheelCanvas isActive={isInViewport} />
			</Wrapper>
		</section>
	);
};

export default CardsCarousel;
