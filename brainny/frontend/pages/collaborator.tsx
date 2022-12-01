import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { getAPIClient } from "../services/axios";
import Drawer from "../components/Drawer";
import { Button, Flex } from "@chakra-ui/react";
import LogsContainer from "../components/LogsContainer";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_RECORD, GET_RECORDS, GET_RECORD_FROM_USER, GET_USER } from "../queries/query";
import SpinnerComponent from "../components/Spinner";
import CollaboratorModel from "../components/CollaboratorModel";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

export const getServerSideProps : GetServerSideProps = async (ctx) => {
    const apiClient = getAPIClient(ctx)

    const {['brainny.token']: token} = parseCookies(ctx);

    if(!token){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const userData = (await apiClient.get('/users')).data
    return {
        props: {
            userData
        }
    }       
    
}


export default function Collaborator({userData}:any){ 

    const [currentPage, setCurrentPage] = useState(0); 
    const [recordsPerPage] = useState(8);
    
    const userId = userData.id
    const id = Number(userData.id)

    const [createRecord, { data : dataMutation, loading : loadingMutation, error}] = useMutation(CREATE_RECORD)
    const { data, loading } = useQuery(GET_RECORD_FROM_USER, {
        variables : { userId, id }
    })

    if(loading){
        return (
            <SpinnerComponent/>
        )
    }

    const user = data?.getById
    const records : [] = data?.getRecordsFromUser
    const recentsRecords = [...records]
    recentsRecords.reverse()

    async function handleCreateRecord(e: any){
        e.preventDefault()

        await createRecord({
            variables : {
                userId,
            },
            refetchQueries: [GET_RECORD_FROM_USER, GET_RECORDS]
        })
        console.log(dataMutation)
    }

    //Pagination
    function handlePage(props: any){
        setCurrentPage(props)
    }

    const nPages = Math.ceil(recentsRecords.length / recordsPerPage);
    const startIndex = currentPage * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const currentRecords = recentsRecords.slice(startIndex, endIndex);


    return(
        <Flex bg="#E5E5E5">

            <Drawer name="Meus registros" srcImage="records.svg"/>

            <LogsContainer submit={handleCreateRecord}>
                <Flex flexDirection="column" w="100%" alignItems="center" h="75vh" gap={15} pos="relative">
                
                {
                    currentRecords.map((record : any)=>{
                        const dateUTC = new Date(Date.parse(record.createdAt))
                        const date = (dateUTC.toLocaleDateString()).substring(0,5);
                        const year = (dateUTC.toLocaleDateString()).substring(8,10)
                        const hour = (dateUTC.toLocaleTimeString()).slice(0,5)

                        return(
                            <CollaboratorModel
                                key={record.id} 
                                name={user.name}
                                id={user.id}
                                hour={hour}
                                date={date}
                                year={year}
                            />
                        )
                    })
                }
                <Flex justify="space-between" maxW="600px" alignSelf="start" ml="20px" bottom={0} pos="absolute" gap={1}>
                    <Button
                        onClick={() =>{
                            currentPage == 0 ? setCurrentPage(0) : setCurrentPage(currentPage - 1)  
                        }}
                        variant='outline'
                        color="grey"
                        size='sm'
                        borderColor="grey"
                        _hover={{ bg: 'transparent' }}
                    ><ChevronLeftIcon/></Button>

                    { Array.from(Array(nPages), (records, index)=>{
                    return (
                            <Button key={index}
                            onClick={() => handlePage(index)}
                            variant='outline'
                            color="grey"
                            borderColor="grey"
                            size='sm'
                            _hover={{ bg: 'transparent' }}
                            >{index + 1}</Button>
                        )
                    
                    })}

                    <Button
                        onClick={() =>{
                            currentPage >= nPages - 1 ? setCurrentPage(currentPage) : setCurrentPage(currentPage + 1)  
                        }}
                        variant='outline'
                        color="grey"
                        borderColor="grey"
                        size='sm'
                        _hover={{ bg: 'transparent' }}
                    ><ChevronRightIcon/></Button>
                </Flex>
                </Flex>
            </LogsContainer>
        </Flex>
    )
}   
