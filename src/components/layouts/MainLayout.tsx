import React from "react";
import Header from "../pages/header/Header";
import Footer from "../pages/footer/Footer";
import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Box as="main" minH={"100vh"}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
