import React, { useState } from "react";
import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  CardBody,
  Stack,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Animal } from "@prisma/client";
import Link from "next/link";
import { MdPix } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";

const SingleAnimal = (data: Animal) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast({
    position: "top",
  });

  async function handleSubmit(animalId: string) {
    const updateAnimalId = {
      id: animalId,
    };
    await axios
      .patch("/api/adoptions", updateAnimalId)
      .then((res) => {
        toast({
          title: "Animal registrado com sucesso",
          status: "success",
          isClosable: true,
        });
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.response.data.error,
          status: "error",
          isClosable: true,
        });
        onClose();
      });
  }
  return (
    <>
      <Flex
        bgImage={`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/Monkey.jpg")`}
        bgRepeat={"no-repeat"}
        bgPos={"center center"}
        bgSize={"cover"}
        pos={"relative"}
        mt={{ base: "15%", sm: "11%", md: "10%", lg: "5%" }}
        w={"100vw"}
        h={{ base: "40vh", lg: "65vh", "2xl": "70vh" }}
        alignItems={"center"}
        justifyContent={"center"}
      ></Flex>
      <Container maxW={"8xl"} id="animals">
        <Flex flexDir={"column"} alignItems={"center"}>
          <Heading
            alignSelf={"center"}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            lineHeight={"120%"}
            textAlign={"center"}
            py={{ base: 10 }}
          >
            Conheça mais sobre <br />
            <Text as={"span"} color={"green.400"}>
              {data.name}!
            </Text>
          </Heading>

          <>
            <Box
              key={data.id}
              height={{ base: "95%", lg: "95%" }}
              width={"90%"}
              position={"relative"}
              m={"0 auto"}
              _last={{ mb: "10" }}
            >
              <Card direction={{ base: "column", md: "row" }} my={4}>
                <CardBody display={"flex"} flexDir={"column"}>
                  <Stack>
                    <Flex
                      justifyContent={"space-evenly"}
                      flexWrap={"wrap"}
                      gap={6}
                    >
                      {data.images.map((image, index) => (
                        <Image
                          key={index}
                          src={`${image}`}
                          minW={{base: "80%",md:"30%"}}
                          maxW={"100px"}
                          boxSize={"250px"}
                          borderRadius={"lg"}
                          shadow={"lg"}
                        />
                      ))}
                    </Flex>
                    <Text fontSize={{ base: "xl" }} fontWeight={600} py={4} px={{ md: 5}}>
                      {data.intAge} anos
                    </Text>
                    <Text fontSize={{ base: "lg" }} px={{ md: 5}} minH={{ xl: "210px" }} pb={2}>
                      {data.description}
                    </Text>
                  </Stack>
                  <Divider my={3} />
                  <Button
                    alignSelf={"center"}
                    px={10}
                    variant="solid"
                    colorScheme="green"
                    onClick={onOpen}
                  >
                    Apadrinhar
                  </Button>
                </CardBody>
              </Card>
            </Box>
          </>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            as={Flex}
            alignItems={"center"}
            boxSize={{ base: "sm", md: "md", xl: "xl" }}
            minWidth={{ xl: "580px" }}
            maxH={{ xl: "430px" }}
          >
            <ModalHeader as={Flex} alignItems={"center"} gap={2}>
              <MdPix size={"25px"} />
              Digitalize o QR code
            </ModalHeader>
            <ModalCloseButton />
            <Divider w={"90%"} />
            <ModalBody
              as={Flex}
              gap={2}
              p={{ base: 2, xl: 5 }}
              alignItems={"center"}
              justifyItems={"center"}
              fontSize={{ base: "sm", md: "lg", xl: "xl" }}
            >
              <Image
                src={"/QRCode.png"}
                boxSize={{ base: "160px", md: "200px", xl: "230px" }}
              />
              <Stack>
                <Text>
                  Esse é um QR code não é um link de pagamento, ele levará para
                  meu portfólio
                </Text>
                <Link
                  href="https://portfolio-v1-jade-nine.vercel.app/"
                  target="_blank"
                >
                  <IconButton mr={2} aria-label={"copy-link"}>
                    <AiOutlineCopy />
                  </IconButton>
                  Link do QR Code
                </Link>
                <Text>Clique em confirmar para adicionar o animal</Text>
              </Stack>
            </ModalBody>
            <Divider w={"90%"} />
            <ModalFooter as={Flex} alignSelf={"flex-end"}>
              <Button
                onClick={() => handleSubmit(data.id)}
                variant={"solid"}
                colorScheme="green"
              >
                Confirmar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
};

export default SingleAnimal;
