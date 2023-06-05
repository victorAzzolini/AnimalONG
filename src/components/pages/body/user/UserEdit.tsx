import React, { useState, useEffect, useMemo } from "react";
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
import { useRouter } from "next/router";

const UserEdit = (userEdit: User) => {
  const [user, setUser] = useState<User | any>({});
  const [previewImage, setPreviewImage] = useState<string | File[] | any>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { data: session, update } = useSession();

  useMemo(() => {
    setUser(userEdit)
  }, [session])

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
    setPreviewImage((e.target as HTMLInputElement).files![0] as File);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (previewImage && user.images.length > 0) {
      setUser(user.images.shift());
    }

    const formData = new FormData();
    formData.append("file", previewImage);
    formData.append("upload_preset", "ropx9bzn");
    formData.append("api_key", "299813126812596");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dajjv0sfx/image/upload",
        formData
      );
      console.log(response.data.secure_url);
      setUser(user.images.push(response.data.secure_url));
    } catch (error) {
      console.error(error);
    }

    console.log(user);

    try {
      await axios
        .patch("/api/edituser", user)
        .then((res) => {
          toast({
            title: "Usuário atualizado com sucesso",
            status: "success",
            isClosable: true,
          });
          update(user);
          setUser(user)
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: error.response.data.error,
            status: "error",
            isClosable: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex minH={"100vh"}>
      <Box
        backgroundImage={"url(/Monkey.jpg)"}
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
          <Avatar
            size={{ md: "2xl", base: "xl" }}
            bg={"green.700"}
            src={
              previewImage
                ? URL.createObjectURL(previewImage)
                : `${user.images[0]}`
            }
          />
        ) : (
          <Avatar
            size={{ md: "2xl", base: "xl" }}
            bg={"green.700"}
            src={previewImage ? URL.createObjectURL(previewImage) : ""}
          />
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
