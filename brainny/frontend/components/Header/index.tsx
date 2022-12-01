import { HStack, Text, Flex} from "@chakra-ui/react";

export default function Header() {
    return (
        <HStack
            h="26px"
            w="100%"
            fontSize={26}
            fontWeight={600}
            gap="165px"
            style={{marginLeft: '30px'}}
        >
            <Text>Colaborador</Text>
            <Text>Data</Text>
            <Text>Hora</Text>
        </HStack>
    );
}
