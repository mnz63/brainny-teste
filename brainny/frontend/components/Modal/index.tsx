import { useMutation } from "@apollo/client";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, Text, Image, Heading } from "@chakra-ui/react";

import { CREATE_RECORD, GET_RECORDS, GET_RECORD_FROM_USER } from "../../queries/query";


export default function ModalElement(props: any){
    
    return (
        <Stack>
                <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
                {props.overlay}
                    <ModalContent p="60px 92px">
                        <ModalHeader
                        fontSize={20}
                        mb="30px"
                    >Registrar novo ponto</ModalHeader>

                        <ModalCloseButton/>

                        <ModalBody alignItems="center" display="flex" flexDirection="column">
                            <Image src="clock.svg" alt="clock" w="88px" mb="16px"/>

                            <Heading fontSize="30px" fontWeight={700} color="purple.900">{props.hours}</Heading>
                            <Text fontSize="16px" color="grey">{props.date}</Text>
                        </ModalBody>

                        <ModalFooter alignItems="center" display="flex" flexDirection="column">

                            <form onSubmit={props.submit}>
                                <Button
                                type="submit"
                                 size='lg'
                                 colorScheme="purple"
                                 bg="purple.900"
                                 fontWeight={400}
                                 fontSize={16}
                                 w="200px"
                                 onClick={props.onClose}>
                                    Bater ponto
                                </Button>
                                <Button
                                mt="10px"
                                w="200px"
                                h="48px"
                                variant='outline'
                                color="purple.900"
                                borderColor="purple.900"
                                onClick={props.onClose}>Cancelar</Button>
            
                            </form>
                            </ModalFooter>
                    </ModalContent>
                </Modal>
        </Stack>
    )
}