"use client";

import DMSans from "./DMSans";
import FKScreamer from "./FKScreamer";

const Fonts = () => (
	<style
		jsx
		global
	>{`
    :root {
      --fk-screamer: ${FKScreamer.style.fontFamily};
      --dm-sans: ${DMSans.style.fontFamily};
    }
  `}</style>
);

export default Fonts;
