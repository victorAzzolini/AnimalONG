import React, { useState } from "react";
import axios from "axios";

import {
  Flex,
  Box,
  Image,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Button,
  Stack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { User } from "@prisma/client";

interface Animal {
  name: String;
  age: Number;
  description: String;
  resumeDescription: String;
  images: [];
}

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
};

const AnimalRegister = (user: User) => {
  const [animal, setAnimal] = useState<Animal | any>({
    name: "",
    age: "",
    description: "",
    resumeDescription: "",
    images: [],
  });
  const [previewImage, setPreviewImage] = useState<string | File[] | any>();
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const toast = useToast({
    position: "top",
  });

  function handleChange(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setAnimal({
      ...animal,
      [(e.target as HTMLTextAreaElement).name]: (
        e.target as HTMLTextAreaElement
      ).value,
    });
  }

  function onFileChange(e: React.FormEvent<HTMLInputElement>) {
    setPreviewImage(
      Array.from((e.target as HTMLInputElement).files as FileList)
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("upload_preset", "ropx9bzn");
    formData.append("api_key", "299813126812596");

    let imagesUrls: string[] = [];

    try {
      for (const file of previewImage) {
        formData.append("file", file);
  
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dajjv0sfx/image/upload",
          formData
        );
  
        imagesUrls.push(res.data.secure_url);
      }

      console.log(imagesUrls);

      const animalData = {
        name: animal.name,
        age: animal.age,
        description: animal.description,
        resumeDescription: animal.resumeDescription,
        images: imagesUrls,
      };

      try {
        console.log(animalData)
        await axios
          .post("/api/animals/register", animalData)
          .then((res) => {
            toast({
              title: "Animal registrado com sucesso",
              status: "success",
              isClosable: true,
            });
            console.log(res.status);
            setAnimal({
              name: "",
              age: "",
              description: "",
              resumeDescription: "",
              images: [],
            });
            setPreviewImage([]);
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex minH={"100vh"} justifyContent={"center"}>
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
        flexDir={"column"}
        justifyContent={"center"}
        pt={100}
      >
        <Heading fontSize={{ xl: "4xl", md: "3xl", base: "2xl" }} py={2}>
          Registro de Animal
        </Heading>

        {previewImage?.length > 0 && (
          <Box position={"relative"} py={5}>
            <IconButton
              aria-label="left-arrow"
              variant="ghost"
              position="absolute"
              left={"10%"}
              top={"88%"}
              zIndex={3}
              onClick={() => slider?.slickPrev()}
              size={"sm"}
              display={{ lg: "none" }}
            >
              <BiLeftArrowAlt size="25px" />
            </IconButton>
            <IconButton
              aria-label="right-arrow"
              variant="ghost"
              position="absolute"
              right={"10%"}
              top={"88%"}
              zIndex={3}
              onClick={() => slider?.slickNext()}
              size={"sm"}
              display={{ lg: "none" }}
            >
              <BiRightArrowAlt size="25px" />
            </IconButton>
            <Box
              position={"relative"}
              height={{ base: "330px", lg: "380px" }}
              width={{ base: "300px", lg: "350px" }}
              overflow={"hidden"}
            >
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
              <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {previewImage?.map((image: File, index: number) => (
                  <Box
                    key={index}
                    height={{ base: "300px", lg: "350px" }}
                    position={"relative"}
                    pt={{ base: 2 }}
                  >
                    <Image
                      src={URL.createObjectURL(image)}
                      w={{ base: "300px", lg: "350px" }}
                      h={{ base: "300px", lg: "350px" }}
                      px={"1rem"}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <Stack
            spacing={{ base: 1 }}
            w={{ base: "80vw", md: "50vw" }}
            py={5}
            px={{ md: 20, "2xl": 60 }}
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
                py={2}
              >
                Adicionar imagens
              </FormLabel>
              <Input
                type="file"
                display={"none"}
                multiple
                onChange={onFileChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={{ xl: "lg", md: "md", base: "sm" }}>
                Nome:
              </FormLabel>
              <Input
                type="text"
                value={animal.name}
                name="name"
                onChange={handleChange}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={{ xl: "lg", md: "md", base: "sm" }}>
                Idade:
              </FormLabel>
              <Input
                type="number"
                value={animal.age}
                name="age"
                onChange={handleChange}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={{ xl: "lg", md: "md", base: "sm" }}>
                Descrição:
              </FormLabel>
              <Textarea
                h={{ base: "2vh", md: "10vh" }}
                name="description"
                onChange={handleChange}
                value={animal.description}
              ></Textarea>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={{ xl: "lg", md: "md", base: "sm" }}>
                Resumo da Descrição:
              </FormLabel>
              <Textarea
                h={{ base: "2vh", md: "10vh" }}
                name="resumeDescription"
                onChange={handleChange}
                value={animal.resumeDescription}
                maxLength={300}
              ></Textarea>
            </FormControl>
            <br />
            <Button
              w={"30%"}
              type="submit"
              colorScheme="green"
              fontSize={{ xl: "xl", md: "lg", base: "sm" }}
            >
              Enviar
            </Button>
          </Stack>
        </form>
      </Flex>
    </Flex>
  );
};

export default AnimalRegister;
