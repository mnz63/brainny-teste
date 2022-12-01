import { VStack } from "@chakra-ui/react";
import CollaboratorModel from "../CollaboratorModel";
import Header from "../Header";
import ModalElement from "../Modal";
import RegisterButton from "../RegisterButton";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, Text, Image, Heading } from "@chakra-ui/react"
import { useState } from "react";



export default function LogsContainer(props : any){
    const OverlayOne = () => (
        <ModalOverlay
          backdropFilter='blur(10px)'
        />
    )
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const [date, setDate] = useState('')
    const [hours, setHours] = useState('')


    const getDateAndHours = () => {
        const date = new Date();
        const dateNow = date.toLocaleDateString();
        const hours = date.toLocaleTimeString().slice(0, 5);

        setDate(dateNow);
        setHours(hours);
    }

    const admin = props.admin

    return(
        <VStack w="100%" h="100%" mt="40px">

        { 
            admin ? 
            <></> 
            : 
            <RegisterButton
            name="Registrar ponto" 
            margin="0px 0 30px 30px"
            alignSelf="start"
            click={() => {
                setOverlay(<OverlayOne />)
                onOpen()
                getDateAndHours()
              }}/>
        }

            
            <Header/>
            {props.children}
            <ModalElement
            isOpen={isOpen}
            onClose={onClose}
            overlay={overlay}
            date={date}
            hours={hours}
            submit={props.submit}/>
        </VStack>
    )
}