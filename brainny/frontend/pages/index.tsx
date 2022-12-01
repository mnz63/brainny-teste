import Form from "../components/Form";
import { Container, Flex, Heading, Image} from '@chakra-ui/react'

export default function Home() {

  return (
    <Flex align="center" justify="space-evenly" h="100vh">
      <Flex 
        direction="column" 
        w="585px" 
        align="center">
            <Image src='form_image.svg' alt='form_image' w="585px"/>
            <Flex direction="column">
                <Heading
                fontSize={40} 
                color="purple.900">Bem vindo ao PontoGo</Heading>
                <Container
                w="380px" 
                fontSize={25}
                textAlign="center"
                color="purple.900">Aqui você fará toda gestão do seu sistema de pontos.</Container>
            </Flex>
        </Flex>
      <Form/>
    </Flex>
  )
}
