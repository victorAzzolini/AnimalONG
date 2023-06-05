import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { User } from "@prisma/client";
import Link from "next/link";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Text,
  Flex,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/router";


const UserMenu = () => {
  const { data: session } = useSession();
  const [adminSession, setAdminSession] = useState(false);
  const user = session?.user as User;
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email === "admin@teste.com") {
      setAdminSession(true);
      return
    }

    if (!session) {
      router.push('/')
    }
  }, []);

  function renderAdminSession() {
    return (
      <Link href={"/animal-register"}>
        <MenuItem
          color={"forest.400"}
          fontSize={{ xl: "xl", md: "lg", base: "sm" }}
        >
          Registro de Animal
        </MenuItem>
      </Link>
    );
  }

  return (
    <Menu>
      <MenuButton>
        {user ? (
          <Avatar
            size={{ md: "lg", base: "md" }}
            bg={"green.700"}
            src={`${user?.images[0]}`}
          />
        ) : (
          <Avatar size={{ md: "lg", base: "md" }} bg={"green.700"} />
        )}
      </MenuButton>
      <MenuList alignItems={"center"}>
        <Flex
          justifyContent={"space-around"}
          gap={{ base: 0, md: 4 }}
          p={{ base: 1, md: 3 }}
        >
          {user ? (
            <Avatar
              size={{ md: "lg", base: "md" }}
              bg={"green.700"}
              src={`${user?.images[0]}`}
            />
          ) : (
            <Avatar size={{ md: "lg", base: "md" }} bg={"green.700"} />
          )}
          <Stack>
            <Text
              color={"forest.400"}
              fontSize={{ xl: "xl", md: "lg", base: "sm" }}
            >
              {user && user.name}
            </Text>
            <Text
              color={"forest.400"}
              fontSize={{ xl: "lg", md: "md", base: "sm" }}
            >
              {user && user.email}
            </Text>
          </Stack>
        </Flex>

        <MenuDivider />
        <Link href={"/user-animals"}>
          <MenuItem
            color={"forest.400"}
            fontSize={{ xl: "xl", md: "lg", base: "sm" }}
          >
            Animais Apadrinhados
          </MenuItem>
        </Link>
        <MenuItem
          color={"forest.400"}
          fontSize={{ xl: "xl", md: "lg", base: "sm" }}
        >
          <Link href={"/user"}>Configurações de Usuário</Link>
        </MenuItem>
        <MenuDivider display={{ md: "none", base: "block" }} />
        <Link href={"/animals"}>
          <MenuItem
            color={"forest.400"}
            fontSize={{ xl: "xl", md: "lg", base: "sm" }}
            display={{ md: "none", base: "block" }}
          >
            Animals
          </MenuItem>
        </Link>
        {adminSession && renderAdminSession()}
        <MenuDivider />
        <MenuItem
          color={"forest.400"}
          fontSize={{ xl: "xl", md: "lg", base: "sm" }}
          onClick={async() => {
            await router.push('/')
            signOut()
          }}
        >
          Sing Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
