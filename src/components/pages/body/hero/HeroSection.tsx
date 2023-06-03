import React from "react";

import { AspectRatio, Text, Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const animatedFlex = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.9,
    },
  },
};

const animatedBox = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const HeroSection = () => {
  return (
    <section>
      <Flex
        alignItems={"center"}
        justify={"start"}
        pos={"relative"}
        minH={{
          base: "20rem",
          sm: "25rem",
          md: "28rem",
          lg: "35rem",
          xl: "40em",
          "2xl": "55rem",
        }}
        top={{ base: 0, md: 20 }}
        mb={{ base: 0, sm: 5, md: 10, lg: 20 }}
        overflow={"hidden"}
      >
        <AspectRatio
          width={"100%"}
          pos={"absolute"}
          zIndex={10}
          top={0}
          left={0}
          ratio={16 / 9}
          mt={{ base: "20%", sm: 0 }}
        >
          <video playsInline autoPlay muted loop>
            <source src="/VIDEO.mp4" />
          </video>
        </AspectRatio>

        <Box
          as={motion.div}
          variants={animatedFlex}
          initial="hidden"
          animate="visible"
          pos={"relative"}
          zIndex={30}
          display={{ base: "none", md: "block" }}
          maxW={"30%"}
          bg={"blackAlpha.500"}
          left={5}
          color={"white"}
          borderRadius={"md"}
          fontWeight={"semi-bold"}
          padding={5}
        >
          <Box as={motion.div} variants={animatedBox}>
            <Text fontSize={{ base: "sm", md: "lg", xl: "2xl" }}>
              “No começo pensei que estivesse lutando para salvar seringueiras,
              depois pensei que estava lutando para salvar a Floresta Amazônica.
              Agora, percebo que estou lutando pela humanidade”
            </Text>
            <br />
            <Text
              fontSize={{ base: "sm", md: "lg", xl: "2xl" }}
              textAlign={"end"}
            >
              Chico Mendes
            </Text>
          </Box>
        </Box>
      </Flex>
    </section>
  );
};

export default HeroSection;
