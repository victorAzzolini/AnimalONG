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
} from "@chakra-ui/react";
import { Animal } from "@prisma/client";
import React from "react";

const SingleAnimal = (data: Animal) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
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
            Conheça mais sobre <br />{" "}
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
                <CardBody>
                  <Stack>
                    <Flex
                      justifyContent={"space-evenly"}
                      flexWrap={"wrap"}
                      gap={4}
                    >
                      {data.images.map((image) => (
                        <Image
                          src={`/uploads/images/${image}
                        `}
                          minW={"30vw"}
                          boxSize={"250px"}
                          borderRadius={"lg"}
                          shadow={"lg"}
                        />
                      ))}
                    </Flex>
                    <Text fontSize={{ base: "md" }} fontWeight={600}>
                      {data.intAge} anos
                    </Text>
                    <Text fontSize={{ base: "sm" }} minH={{ xl: "210px" }}>
                      {data.description}
                    </Text>
                  </Stack>
                  <Divider my={3} />
                  <Button variant="solid" colorScheme="red">
                    Cancelar
                  </Button>
                </CardBody>
              </Card>
            </Box>
          </>
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
              <Button colorScheme="green" mr={3}>
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

export default SingleAnimal;
