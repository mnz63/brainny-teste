import { Flex, Spinner } from "@chakra-ui/react";

export default function SpinnerComponent (){
    return (
        <Flex w="100vw" h="100vh" justify="center">
                <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='purple.900' size='xl' alignSelf="center"/>
        </Flex>
    )
}