import React from "react";
import {
  Box,
  Container,
  Flex,
  Card,
  List,
  Heading,
  Text,
  ListItem,
  CardBody,
  Image,
  CardHeader,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const list = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5,
    },
  },
};

const itemList = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

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

const AnimalExtinctionInformation = () => {
  return (
    <section>
      <Container maxW={"8xl"}>
        <Flex
          flexDir={{ base: "column", xl: "row" }}
          justifyContent={"space-between"}
          alignItems={{ base: "center", xl: "flex-start" }}
          gap={{ base: 10, md: 6, xl: 2 }}
        >
          <Flex
            flexDir={"column"}
            justifyItems={"center"}
            w={{ base: "100%", xl: "40%" }}            
            gap={10}
            color={"black"}
          >
            <Card
              as={motion.div}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={cardVariants}
              bg={"#edecea"}
              p={2}
            >
              <CardHeader alignSelf={"center"} textAlign={"center"}>
                <Heading as={"h2"} fontSize={{ base: "lg", sm: "xl" }}>
                  Segundo o IBGE em 2022 no Brasil as espécies ameaçadas se
                  encontram em situação
                </Heading>
              </CardHeader>-
              <CardBody>
                <List
                  as={motion.ul}
                  variants={list}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  textAlign={"center"}
                  display={"flex"}
                  flexDir={{ base: "column", sm: "row", xl: "column" }}
                  justifyContent={"space-evenly"}
                  gap={{ base: 6, md: 0, xl: 10 }}
                  alignItems={"center"}
                >
                  <ListItem
                    fontWeight={"semibold"}
                    display={"flex"}
                    flexDir={"column"}
                    color={"red.600"}
                    as={motion.li}
                    variants={itemList}
                  >
                    <Text fontSize={{ base: "1.5rem", md: "2xl" }}>358</Text>
                    <Text fontSize={{ base: "1rem", md: "xl" }}>Crítica</Text>
                  </ListItem>
                  <ListItem
                    fontSize={{ base: "1.5rem", md: "2xl" }}
                    fontWeight={"semibold"}
                    display={"flex"}
                    flexDir={"column"}
                    color={"orange.500"}
                    as={motion.li}
                    variants={itemList}
                  >
                    <Text fontSize={{ base: "1.5rem", md: "2xl" }}>427</Text>
                    <Text fontSize={{ base: "1rem", md: "xl" }}> Perigosa</Text>
                  </ListItem>
                  <ListItem
                    fontSize={{ base: "1.5rem", md: "2xl" }}
                    fontWeight={"semibold"}
                    display={"flex"}
                    flexDir={"column"}
                    color={"yellow.500"}
                    as={motion.li}
                    variants={itemList}
                  >
                    <Text fontSize={{ base: "1.5rem", md: "2xl" }}>468</Text>
                    <Text fontSize={{ base: "1rem", md: "xl" }}>
                      Vulnerável
                    </Text>
                  </ListItem>
                </List>
              </CardBody>
            </Card>
            <Box
              as={motion.div}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={cardVariants}
              alignSelf={"end"}
            >
              <Image
                src="/Jaguar.jpg"
                borderRadius={"lg"}
                shadow={"md"}
              ></Image>
            </Box>
          </Flex>
          <Flex
            as={motion.div}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={cardVariants}
            justifyContent={"center"}
            mb={20}
            w={{ base: "100%", xl: "60%" }}
          >
            <Image
              src="/GraficosEcossistemas.jpg"
              borderRadius={"lg"}
              shadow={"md"}           
            ></Image>
          </Flex>
        </Flex>
      </Container>
    </section>
  );
};

export default AnimalExtinctionInformation;
