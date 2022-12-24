import { theme as t } from "@chakra-ui/react";
import { Theme } from "@emotion/react";

const TableBreaksPoint: string = `${Number(t.breakpoints.sm.split("em")[0]) + 1}em`;

const theme: Theme = {
  colorMode: "light",
  breakpoints: {
    mobile: `@media (max-width:${t.breakpoints.sm})`,
    tablet: `@media (min-width:${TableBreaksPoint})`,
    desktop: `@media (min-width:${t.breakpoints.xl})`,
  },
};

export default theme;
