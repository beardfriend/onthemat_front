import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import Account from "@Features/auth/page/Account";
import Main from "@Features/main/page/Main";
import theme from "@Shared/theme/theme";

import { Route, Routes, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ChakraProvider theme={resetTheme}>
            <EmotionThemeProvider theme={theme}>
              <Routes>
                <Route path="/account/:mode" element={<Account />} />
                <Route path="/" element={<Main />} />
              </Routes>
            </EmotionThemeProvider>
          </ChakraProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
