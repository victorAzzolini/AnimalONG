import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-scroll";

const CallToAction = () => {
  return (
    <>
      <Container maxW={"5xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pt={{ base: 5, md: 20, xl: 10 }}
          pb={{ base: 10, md: 20, xl: 20 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "5xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Salve os Animais <br />
            <Text as={"span"} color={"green.400"}>
              Silvestres
            </Text>
          </Heading>
          <Text
            fontSize={{ base: "md", sm: "xl", md: "2xl" }}
            color={"gray.500"}
          >
            Não permita que o silêncio seja a única resposta. Seus recursos
            podem fazer a diferença na proteção das espécies em risco. Junte-se
            a nós e seja o elo de esperança para os animais silvestres.
          </Text>
          <Link activeClass="active" to="animals" spy={true} smooth={true} duration={1000}>
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
              Ajudar
            </Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
};

export default CallToAction;
