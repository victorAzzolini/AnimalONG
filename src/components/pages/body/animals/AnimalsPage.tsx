import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-scroll"
import { GiPlantsAndAnimals, GiSeaTurtle } from "react-icons/gi";

const AnimalsPage = () => {
  return (
    <>
      <Flex
        bgImage={`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/giantAnteater.jpg")`}
        bgRepeat={"no-repeat"}
        bgPos={{ base: "top center", xl: "center center" }}
        bgSize={"cover"}
        pos={"relative"}
        w={"100vw"}
        h={{ base: "50vh", lg: "65vh", "2xl": "70vh" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
          color={"white"}
        >
          Apadrinhamento
        </Heading>
      </Flex>
      <Container maxW={"8xl"}>
        <Stack
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 5, md: 10, xl: 10 }}
          px={{ base: 5, md: 20, lg: 30, xl: 10 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            lineHeight={"110%"}
            textAlign={"center"}
          >
            Apadrinhe um animal silvestre e faça a<br />
            <Text as={"span"} color={"green.400"}>
              diferença!
            </Text>
          </Heading>
          <Link activeClass="active" to="animals" spy={true} smooth={true} duration={1000} >
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              size={{ base: "lg" }}
              alignSelf={"center"}
              minW={"20%"}
              fontSize={{ base: "md", md: "lg", xl: "xl" }}
              px={{ base: 6, md: 8 }}
              _hover={{
                bg: "green.500",
              }}
            >
              Apadrinhar
            </Button>
          </Link>
        </Stack>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          alignItems={"center"}
          justifyContent={"center"}
          py={{ base: 5 }}
          px={{ base: 5, sm: 10, xl: 60 }}
          gap={{ base: 5, xl: 10 }}
        >
          <Card
            bg={"green.600"}
            w={{ base: "80vw", md: "50vw" }}
            color={"white"}
            textAlign={"center"}
          >
            <CardHeader as={Flex} justifyContent={"center"}>
              <GiSeaTurtle size={"55px"} />
            </CardHeader>
            <Divider alignSelf={"center"} w={60} />
            <CardBody
              color={"white"}
              fontSize={{ base: "md", md: "lg", xl: "xl" }}
              minH={{ md: "200px", xl: "220px" }}
            >
              Ao se tornar um padrinho ou madrinha, você fornece apoio
              financeiro para programas de conservação, resgate e pesquisa
              dessas espécies ameaçadas.
            </CardBody>
          </Card>
          <Card
            bg={"green.600"}
            w={{ base: "80vw", md: "50vw" }}
            color={"white"}
            textAlign={"center"}
          >
            <CardHeader as={Flex} justifyContent={"center"}>
              <GiPlantsAndAnimals size={"55px"} />
            </CardHeader>
            <Divider alignSelf={"center"} w={60} />
            <CardBody
              fontSize={{ base: "md", md: "lg", xl: "xl" }}
              minH={{ md: "200px", xl: "220px" }}
            >
              Ao apadrinhar você receberá atualizações regulares sobre o animal
              que está apadrinhando, terá a oportunidade de aprender mais sobre
              sua espécie e acompanhar seu progresso.
            </CardBody>
          </Card>
        </Flex>
      </Container>
    </>
  );
};

export default AnimalsPage;
