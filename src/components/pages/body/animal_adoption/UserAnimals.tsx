import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { Animal } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";
("react-icons/io");

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

const UserAnimals = () => {
  const [animals, setAnimals] = useState<Animal[] | any>();
  const [animalId, setAnimalId] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get("/api/getuseranimals")
      .then((res) => {
        setAnimals(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [animals]);

  async function deleteAnimal() {
    axios
      .delete(`/api/updateuseranimals?animalId=${animalId}`)
      .then((res) => {
        console.log(res);
        setAnimals(res.data.animalsIDs);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Flex
        bgImage={`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/Tuiuiu.jpg")`}
        bgRepeat={"no-repeat"}
        bgPos={"top center"}
        bgSize={"cover"}
        pos={"relative"}
        mt={{ base: "15%", sm: "11%", md: "10%", lg: "5%" }}
        w={"100vw"}
        h={{ base: "40vh", lg: "65vh", "2xl": "70vh" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
          color={"white"}
        >
          Animais Apadrinhados
        </Heading>
      </Flex>
      <Container maxW={"8xl"} id="animals">
        <Flex flexDir={"column"} alignItems={"center"}>
          <Heading
            as={motion.div}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={cardVariants}
            alignSelf={"center"}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            lineHeight={"120%"}
            textAlign={"center"}
            py={{ base: 10 }}
          >
            Seus Animais <br />{" "}
            <Text as={"span"} color={"green.400"}>
              Apadrinhados!
            </Text>
          </Heading>

          {animals?.length == 0 && (
            <Stack spacing={10} justifyContent={"center"} alignItems={"center"}>
              <Text fontWeight={600}>
                Você ainda não possui animais apadrinhados...
              </Text>
              <Link href={"/animals"}>
                <Button
                  colorScheme={"green"}
                  bg={"green.400"}
                  rounded={"full"}
                  size={{ base: "lg" }}
                  alignSelf={"center"}
                  minW={"20%"}
                  fontSize={{ base: "md", xl: "xl" }}
                  px={{ base: 6, md: 8 }}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  Conheça nossos Animais
                </Button>
              </Link>
            </Stack>
          )}

          {animals?.map((animalInfo: Animal) => (
            <>
              <Box
                key={animalInfo.id}
                height={{ base: "95%", lg: "95%" }}
                width={"90%"}
                position={"relative"}
                m={"0 auto"}
                _last={{ mb: "10" }}
              >
                <Card
                  key={animalInfo.id}
                  direction={{ base: "column", md: "row" }}
                  my={4}
                >
                  <Link href={`animals/${animalInfo.id}`}>
                    <Image
                      src={`${animalInfo.images[0]}`}
                      borderRadius={{ base: "md" }}
                      boxSize={{ base: "220px", sm: "240px", md: "250px" }}
                      alignSelf={"center"}
                      m={{ base: 2 }}
                    />
                  </Link>
                  <CardBody>
                    <Link href={`animals/${animalInfo.id}`}>
                      <Stack>
                        <Heading
                          fontSize={{
                            base: "xl",
                            md: "2xl",
                            lg: "3xl",
                            xl: "4xl",
                          }}
                        >
                          {animalInfo.name}
                        </Heading>
                        <Text fontSize={{ base: "md" }} fontWeight={600}>
                          {animalInfo.intAge} anos
                        </Text>
                        <Text fontSize={{ base: "sm" }} minH={{ xl: "210px" }}>
                          {animalInfo.resumeDescription}
                        </Text>
                      </Stack>
                    </Link>
                    <Divider my={3} />
                    <Button
                      variant="solid"
                      colorScheme="red"
                      onClick={() => {
                        setAnimalId(animalInfo.id);
                        onOpen();
                      }}
                    >
                      Cancelar
                    </Button>
                  </CardBody>
                </Card>
              </Box>
            </>
          ))}
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader></ModalHeader>
            <ModalBody
              fontWeight={500}
              fontSize={"xl"}
              textAlign={"center"}
              p={5}
            >
              Você tem certeza que deseja cancelar o apadrinhamento?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={deleteAnimal}>
                Sim
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Não
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
};

export default UserAnimals;
