import emotion from "@emotion/react";
import { ColorMode } from "@chakra-ui/react";

declare module "@emotion/react" {
  export interface Theme {
    colorMode: ColorMode;
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
