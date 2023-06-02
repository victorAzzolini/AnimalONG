import React from "react";

import { Center, Flex, Highlight } from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <Flex
        justify={"center"}
        bg={"forest.400"}
        bottom={"0"}
        left={0}
        w={"100%"}
        h={{base:12, md:20}}
        zIndex={1200}
      >
        <Center color={"white"} fontSize={{base: "sm", md: "lg"}}>
          Todos os direitos reservados &copy;
          <Link
            href="https://portfolio-v1-jade-nine.vercel.app/"
            target="_blank"
          >
            <Highlight query="Victor Azzolini" styles={{fontWeight: "bold", color: "white"}}>
              Victor Azzolini
            </Highlight>
          </Link>
        </Center>
      </Flex>
    </footer>
  );
};

export default Footer;
