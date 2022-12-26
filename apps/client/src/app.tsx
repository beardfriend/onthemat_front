import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import Account from "@Features/auth/page/Account";
import theme from "@Shared/theme/theme";
import { useEffect, useState } from "react";

import { Route, Routes, useParams, useLocation } from "react-router-dom";

function App() {
  let location = useLocation();

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
        body: {
          backgroundColor: location.pathname.includes("account") ? "#1C241A" : "#ffffff",
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
            <Route path="/account/:mode" element={<Account />} />
          </Routes>
        </EmotionThemeProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
