"use client";

import DMSans from "./DMSans";
import FKScreamer from "./FKScreamer";
import BrunoAce from "./BrunoAce";
import Satoshi from "./Satoshi";

const Fonts = () => (
	<style
		jsx
		global
	>{`
    :root {
      --fk-screamer: ${FKScreamer.style.fontFamily};
      --dm-sans: ${DMSans.style.fontFamily};
      --bruno: ${BrunoAce.style.fontFamily};
      --satoshi: ${Satoshi.style.fontFamily};
    }
  `}</style>
);

export default Fonts;
