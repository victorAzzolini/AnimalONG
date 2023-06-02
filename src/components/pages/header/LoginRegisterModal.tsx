import React from "react";
import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Divider,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface User {
  name: String;
  email: String;
  image?: String;
  password: String;
  confirmPassword: String;
}

const LoginResgisteModal = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<User | any>();
  const [loginOrSignUp, setLoginOrSignUp] = useState(true);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loginOrSignUp) {
      await signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          toast.success("Signed in successfully");
          onClose();
        }
        if (callback?.error) {
          toast.error(callback?.error);
        }
      });
    } else {
      await axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Registro realizado com sucesso!");
          onClose();
          signIn("credentials", data);
          setData({});
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setData({
      ...data,
      [(e.target as HTMLTextAreaElement).name]: (
        e.target as HTMLTextAreaElement
      ).value,
    });
  }

  return (
    <>
      <Button
        fontSize={{ xl: "xl", md: "lg", base: "sm" }}
        size="lg"
        colorScheme={"green"}
        onClick={onOpen}
        px={{ md: 5, base: 3 }}
        py={1}
        bg="green.600"
        _hover={{ bg: "green.700" }}
      >
        Log in
      </Button>
      {loginOrSignUp ? (
        <>
          <Modal
            size={{ md: "xl", base: "sm" }}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent p={5} alignSelf={"center"} alignItems={"center"}>
              <ModalHeader
                textAlign={"center"}
                fontSize={{ sm: "sm", md: "2xl" }}
              >
                Log in
              </ModalHeader>
              <Divider />
              <ModalCloseButton fontSize="lg" />
              <ModalBody w={{ base: "95%", sm: "90%" }}>
                <form onSubmit={handleSubmit}>
                  <Stack
                    spacing={{ base: 4, sm: 6, xl: 8 }}
                    p={{ base: 0, md: 5 }}
                    pt={{ base: 1 }}
                    alignItems={"center"}
                  >
                    <FormControl id="email">
                      <FormLabel
                        fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                        htmlFor="email"
                      >
                        Email address
                      </FormLabel>
                      <Input
                        h={{ md: 12, sm: 5 }}
                        type="email"
                        fontSize="lg"
                        name="email"
                        onChange={handleChange}
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
                          h={{ md: 12, sm: 5 }}
                          fontSize="lg"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onChange={handleChange}
                        />
                        <InputRightElement
                          display={{ base: "none", md: "flex" }}
                          h={12}
                        >
                          <Button
                            fontSize="xl"
                            mr={3}
                            variant={"ghost"}
                            color={{ vsm: "red.400" }}
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Button
                      colorScheme="green"
                      w={"100%"}
                      h={{ xl: 14, md: 12, base: 8 }}
                      fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Stack>
                </form>
              </ModalBody>
              <ModalFooter
                display={"flex"}
                w={"80%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text
                  onClick={() => {
                    setData({});
                    setLoginOrSignUp(!loginOrSignUp);
                  }}
                  _hover={{ cursor: "pointer", textDecor: "underline" }}
                  fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                >
                  Sing Up
                </Text>
                <Text
                  _hover={{ cursor: "pointer", textDecor: "underline" }}
                  fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                >
                  Forgot password?
                </Text>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Modal
          size={{ md: "xl", base: "sm" }}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent p={5} alignSelf={"center"} alignItems={"center"}>
            <>
              <ModalHeader
                textAlign={"center"}
                fontSize={{ base: "md", md: "xl", xl: "2xl" }}
              >
                Sign Up
              </ModalHeader>
              <Divider />
              <ModalCloseButton fontSize={{ lg: "lg" }} />
              <ModalBody w={{ base: "95%", sm: "90%" }}>
                <form onSubmit={handleSubmit}>
                  <Stack
                    spacing={{ base: 4, sm: 8 }}
                    p={{ base: 0, md: 5 }}
                    pt={{ base: 1 }}
                    alignItems={"center"}
                  >
                    <FormControl id="name" isRequired>
                      <FormLabel
                        fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                        htmlFor="name"
                      >
                        Name
                      </FormLabel>
                      <Input
                        h={{ md: 12, base: 6 }}
                        fontSize={{ lg: "lg" }}
                        type="text"
                        name="name"
                        onChange={handleChange}
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
                        h={{ md: 12, base: 6 }}
                        type="email"
                        fontSize={{ lg: "lg" }}
                        name="email"
                        onChange={handleChange}
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
                          h={{ md: 12, base: 6 }}
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
                        h={{ md: 12, base: 6 }}
                        fontSize={{ lg: "lg" }}
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Button
                      colorScheme="green"
                      w={"100%"}
                      h={{ xl: 14, md: 12, base: 8 }}
                      fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Stack>
                </form>
              </ModalBody>
              <ModalFooter
                display={"flex"}
                w={"80%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text
                  onClick={() => {
                    setData({});
                    setLoginOrSignUp(!loginOrSignUp);
                  }}
                  _hover={{ cursor: "pointer", textDecor: "underline" }}
                  fontSize={{ xl: "xl", md: "lg", base: "sm" }}
                >
                  Log in
                </Text>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default LoginResgisteModal;
