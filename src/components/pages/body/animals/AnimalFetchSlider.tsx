import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineCopy } from "react-icons/ai";
import { MdPix } from "react-icons/md";
import { Props } from "@/pages/animals";
import Link from "next/link";
import axios from "axios";

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

const cardVariantsTwo = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      duration: 2,
    },
  },
};

const settings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  dots: true,
  vertical: false,
  verticalSwiping: false,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        vertical: false,
        verticalSwiping: false,
      },
    },
    {
      breakpoint: 459,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        vertical: false,
        verticalSwiping: false,
      },
    },
  ],
};

const AnimalFetchSlider = ({ data }: Props) => {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const [animalId, setAnimalId] = React.useState<string | null>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast({
    position: "top",
  });

  async function handleSubmit(animalId: string) {
    const updateAnimalId = {
      id: animalId,
    };
    console.log(animalId);
    await axios
      .patch("api/adoptions", updateAnimalId)
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
    <Container maxW={"8xl"} id="animals">
      <Flex flexDir={"column"} alignItems={"center"}>
        <Heading
          as={motion.div}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          variants={cardVariants}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          lineHeight={"110%"}
          pt={{ base: 4 }}
        >
          Nossos Animais
        </Heading>

        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <Box
          as={motion.div}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          variants={cardVariantsTwo}
          position={"relative"}
          width={{ base: "90%", lg: "90%" }}
          overflow={"hidden"}
          pt={{ base: 5, md: 10 }}
          pb={{ base: 10, md: 20 }}
        >
          <IconButton
            aria-label="right-arrow"
            variant="ghost"
            position="absolute"
            color={"gray.400"}
            right={"-1%"}
            top={"50%"}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <IoIosArrowForward size="30px" />
          </IconButton>
          <IconButton
            aria-label="left-arrow"
            variant="ghost"
            position="absolute"
            color={"gray.400"}
            left={"-1%"}
            top={"50%"}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <IoIosArrowBack size="30px" />
          </IconButton>
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {data.map((animalInfo, index) => (
              <React.Fragment key={animalInfo.id}>
                <Box
                  key={index}
                  height={{ base: "95%", lg: "95%" }}
                  width={"90%"}
                  position={"relative"}
                  m={"0 auto"}
                >
                  <Link  href={`animals/${animalInfo.id}`}>
                    <Card
                      
                      id={animalInfo.id}
                      direction={{ base: "column", md: "row", xl: "column" }}
                      my={4}
                      _hover={{
                        transform: "scale(1.02)"
                      }}
                    >
                      <Image
                        src={`uploads/images/${animalInfo.images[0]}`}
                        borderRadius={{ base: "md" }}
                        boxSize={{ base: "220px", sm: "240px", md: "250px" }}
                        alignSelf={"center"}
                        m={{ base: 2 }}
                      />
                      <CardBody key={animalInfo.id}>
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
                          <Text
                            fontSize={{ base: "sm" }}
                            minH={{ xl: "210px" }}
                          >
                            {animalInfo.resumeDescription}
                          </Text>
                        </Stack>
                        <Divider my={3} />
                        <Button
                          key={animalInfo.id}
                          variant="solid"
                          colorScheme="green"
                          onClick={() => {
                            setAnimalId(animalInfo.id);
                            onOpen();
                          }}
                        >
                          Apadrinhar
                        </Button>
                      </CardBody>
                    </Card>
                  </Link>
                </Box>
              </React.Fragment>
            ))}
          </Slider>
        </Box>
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
              onClick={() => handleSubmit(animalId!)}
              variant={"solid"}
              colorScheme="green"
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AnimalFetchSlider;
