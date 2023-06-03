import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  Stack,
  useToast,
  InputGroup,
  InputRightElement,
  Avatar,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { User } from "@prisma/client";

const UserEdit = () => {
  const [user, setUser] = useState<User | any>({});
  const [previewImage, setPreviewImage] = useState<string | File[] | any>();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { data: session, update } = useSession();

  useEffect(() => {
    axios.get("api/getuser").then((res) => {
      setUser(res.data);
    });
  }, [session]);

  const toast = useToast({
    position: "top",
  });

  function handleChange(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setUser({
      ...user,
      [(e.target as HTMLTextAreaElement).name]: (
        e.target as HTMLTextAreaElement
      ).value,
    });
  }

  function onFileChange(e: React.FormEvent<HTMLInputElement>) {
    setUser({
      ...user,
      images: Array.from((e.target as HTMLInputElement).files as FileList),
    });
    setPreviewImage(
      Array.from((e.target as HTMLInputElement).files as FileList)
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();

    await Object.keys(user).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < user[key].length; i++) {
          formData.append("images", user[key][i]);
        }
      } else {
        formData.append(key, user[key]);
      }
    });

    try {
      await axios
        .patchForm("/api/edituser", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast({
            title: "Usuário atualizado com sucesso",
            status: "success",
            isClosable: true,
          });
          update(user);
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: error.response.data.error,
            status: "error",
            isClosable: true,
          });
        });
    } catch (error) {}
  }

  return (
    <Flex minH={"100vh"}>
      <Box
        backgroundImage={"url(/monkey.jpg)"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center center"}
        backgroundSize={"cover"}
        position={"relative"}
        display={{ base: "none", md: "flex" }}
        w={"50vw"}
        minH={"100vh"}
        top={0}
        left={0}
        bottom={0}
      ></Box>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        w={{ base: "100vw", md: "50vw" }}
        py={{ base: 20, md: 100 }}
      >
        <Heading fontSize={{ xl: "4xl", md: "3xl", base: "2xl" }} py={6}>
          Configuração de usuário
        </Heading>

        {user?.images?.length > 0 ? (
          previewImage ? (
            previewImage.map((image: File, index: number) => (
              <Avatar
                size={{ sm: "2xl", base: "xl" }}
                bg={"green.700"}
                src={URL.createObjectURL(image)}
              />
            ))
          ) : (
            <Avatar
              size={{ md: "2xl", base: "xl" }}
              bg={"green.700"}
              src={`uploads/images/${user.images[0]}`}
            />
          )
        ) : (
          <Avatar size={{ md: "2xl", base: "xl" }} bg={"green.700"} />
        )}

        {user && (
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={{ base: 4, sm: 2 }}
              pt={{ base: 1 }}
              alignItems={"center"}
            >
              <FormControl>
                <FormLabel
                  fontSize={{ xl: "lg", md: "md", base: "sm" }}
                  bg="green.500"
                  color={"white"}
                  _hover={{ cursor: "pointer", bg: "green.600" }}
                  textAlign={"center"}
                  borderRadius={"md"}
                  w={"100%"}
                  p={{ base: 1.5, md: 3 }}
                  mt={3}
                >
                  Adicionar imagem
                </FormLabel>
                <Input type="file" display={"none"} onChange={onFileChange} />
              </FormControl>
              <FormControl id="name">
                <FormLabel
                  fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                  htmlFor="name"
                >
                  Name
                </FormLabel>
                <Input
                  h={{ md: 12, base: 8 }}
                  fontSize={{ lg: "lg" }}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={user.name || ""}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel
                  fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                  htmlFor="email"
                >
                  Email address
                </FormLabel>
                <Input
                  h={{ xl: 14, md: 12, base: 8 }}
                  type="email"
                  fontSize={{ lg: "lg" }}
                  name="email"
                  onChange={handleChange}
                  value={user.email || ""}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel
                  fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                  htmlFor="password"
                >
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    h={{ xl: 14, md: 12, base: 8 }}
                    fontSize={{ lg: "lg" }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                  />
                  <InputRightElement
                    display={{ base: "none", md: "flex" }}
                    h={12}
                  >
                    <Button
                      fontSize={{ lg: "xl" }}
                      mr={2}
                      variant={"ghost"}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel
                  fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                  htmlFor="confirmPassword"
                >
                  Confirm password
                </FormLabel>
                <Input
                  h={{ xl: 14, md: 12, base: 8 }}
                  fontSize={{ lg: "lg" }}
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  mb={2}
                />
              </FormControl>
              <Button
                colorScheme="green"
                w={"100%"}
                h={{ xl: 14, md: 12, base: 8 }}
                fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                type="submit"
              >
                Enviar
              </Button>
            </Stack>
          </form>
        )}
      </Flex>
    </Flex>
  );
};

export default UserEdit;
