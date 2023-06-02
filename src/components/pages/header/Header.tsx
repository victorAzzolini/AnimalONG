import React from "react";

import { useSession } from "next-auth/react";

import LoginResgisteModal from "./LoginRegisterModal";
import UserMenu from "./UserMenu";

import { Flex, HStack, Link, Image } from "@chakra-ui/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header>
      <Flex
        minH={"60px"}
        bg={"forest.400"}
        justify={"space-between"}
        px={{ md: "2rem", base: 2 }}
        align={"center"}
        pos={"fixed"}
        top="0"
        left="0"
        w="100%"
        zIndex={1200}
      >
        <Flex gap={8}>
          <Link href={"/"}>
            <Image
              src="/LOGOTIPO.png"
              maxW={{ base: 200, md: 250 }}
              alt="Logo"
            />
          </Link>
        </Flex>
        <HStack
          spacing={{ base: 0, md: 3 }}
          fontSize="xl"
          fontWeight={600}
          color={"white"}
        >
          <Link
            fontSize={{ xl: "xl", md: "lg", base: "sm" }}
            display={{ base: "none", md: "block" }}
            href={"/animals"}
            px={5}
            py={2}
            rounded="md"
            _hover={{
              bg: "green.700",
            }}
          >
            Animals
          </Link>
          {!session ? <LoginResgisteModal /> : <UserMenu />}
        </HStack>
      </Flex>
    </header>
  );
};

export default Header;
