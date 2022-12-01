import {
    Button,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    Link,
    Flex,
    Heading,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
 
export default function Form(){

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);

    async function handleSignIn(data : any){    
        await signIn(data)
    }


    return (
        <Flex direction="column" w="500px" ml="20vw" align="baseline">
             <Image src="logo.svg" alt="logo" h="74px" />

            <Heading fontSize={40} mt="30px" color="purple.900">
                Faça login
            </Heading>
            <form style={{width:'100%'}} onSubmit={handleSubmit(handleSignIn)}>
                <Stack w="100%" mt="23px">
                        <Text fontSize={20} color="grey">
                            Email
                        </Text>
                        <Input
                            {...register('email')}
                            variant="outline"
                            placeholder="exemplo@email.com"
                            size="lg"
                        />

                        <Text fontSize={20} color="grey" pt="20px">
                            Senha
                        </Text>
                        <InputGroup>
                            <Input
                                {...register('password')}
                                type={show ? "text" : "password"}
                                variant="outline"
                                placeholder="***********"
                                size="lg"
                            />

                            <InputRightElement width="4.5rem" h="100%">
                                <Button
                                    onClick={handleClick}
                                    bg="transparent"
                                    _hover={{ bg: "transparent" }}
                                >
                                    {show ? (
                                        <Image src="hidden.png" alt="hidden" />
                                    ) : (
                                        <Image src="show.svg" alt="show" />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                <Link
                    color="purple.900"
                    fontSize={17}
                    textDecoration="underline"
                    mt="10px"
                    cursor={'pointer'}
                >
                    Esqueci minha senha
                </Link>

                <Button
                    type="submit"
                    mt="30px"
                    bg="purple.900"
                    color="white"
                    fontWeight={400}
                    w="100%"
                    h="50px"
                    _hover={{ bg: "purple.700" }}
                >
                    Entrar
                </Button>
                </Stack>
            </form>
        </Flex>
    )
}