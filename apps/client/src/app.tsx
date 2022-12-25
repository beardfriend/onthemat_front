import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import Account from "@Features/auth/page/Account";
import Layout from "@Shared/layout/Layout";
import theme from "@Shared/theme/theme";

import { Route, Routes } from "react-router-dom";

function App() {
  let resetTheme = extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
    styles: {
      global: {
        html: {
          fontSize: "20px",
          font: "Spoqa Han Sans",
          boxSizing: "border-box",
        },
      },
    },
    sizes: {
      sm: "30em",
      md: "48em",
      lg: "62em",
      xl: "80em",
      "2xl": "96em",
    },
  });

  return (
    <>
      <ColorModeScript initialColorMode={resetTheme.config.initialColorMode} />
      <ChakraProvider theme={resetTheme}>
        <EmotionThemeProvider theme={theme}>
          <Routes>
            <Route path="/account/:mode" element={<Account />} />
          </Routes>
        </EmotionThemeProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
