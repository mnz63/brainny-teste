import { HStack, Box, Text, Heading, Flex } from "@chakra-ui/react";

export default function CollaboratorModel(props: any) {
    return (
        <Flex
            bg="white"
            w="98%"
            h="73px"
            borderRadius={5}
            border="1px solid rgba(32, 41, 46, 0.3)"
            p={15}
            alignItems="center"
        >

            <Box bg="purple.700" w="5px" h="45px" mr="40px" borderRadius={30}/>

            <Box h="40px" mr="95px" w="185px">
                <Heading fontSize={22}>{props.name}</Heading>
                <Text color="grey">00{props.id}</Text>
            </Box>

            <Box h="26px" fontSize={22} mr="155px">
                <Text color="grey">{props.date}/{props.year}</Text>
            </Box>

            <Box h="26px" fontSize={22}>
                <Text color="grey">{props.hour}h</Text>
            </Box>
        </Flex>
    );
}
