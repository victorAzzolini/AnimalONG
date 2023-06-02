import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import MainLayout from "@/components/layouts/MainLayout";

const colors = {
  forest: {
    400: "#1B2602",
    300: "#4F5902",
    200: "#5A7302",
    100: "#6E8C03",
  },
};

const sizes = {
  sizes: {
    container: {
      vsm: "320px",
    },
  },
};

export const theme = extendTheme({ colors, sizes });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SessionProvider>
    </ChakraProvider>
  );
}
