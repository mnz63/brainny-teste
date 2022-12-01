import { VStack, Image, Box, Button } from "@chakra-ui/react";
import  Router  from "next/router";
import { destroyCookie } from "nookies";

export default function DrawerExample(props: any) {

    function logout(){
      destroyCookie(undefined, 'brainny.token')
      Router.reload();
    }

    return (
        <VStack bg="white" minW="250px" h="100vh" position="relative">
            <Image src="logo.svg" alt="logo" h="31px" my="48px" />

            <Box
                display="flex"
                w="100%"
                h="103px"
                color="purple.900"
                borderLeft="4px"
                borderY="1px"
                borderColor="rgba(0, 0, 0, 0.08)"
                borderLeftColor="purple.900"
            >
                <Box display="flex" alignItems="center" gap="15px" ml="22px" cursor="pointer">
                    <Image src={props.srcImage} alt="dashboard" h="17px" />
                    {props.name}
                </Box>
            </Box>

            <Button 
            variant='link'
            gap="10px" 
            color="black"
            fontWeight={400}
            fontSize="16px"
            position="absolute"
            bottom="22px"
            onClick={logout}
            >
                    <Image src="logout.svg" alt="dashboard" h="17px" />
                    Sair
            </Button>
        </VStack>
    );
}
