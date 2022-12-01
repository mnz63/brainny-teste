import { useQuery } from "@apollo/client"
import { Flex, VStack, Stack, Button } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import CollaboratorModel from "../components/CollaboratorModel"
import Drawer from "../components/Drawer"
import LogsContainer from "../components/LogsContainer"
import SpinnerComponent from "../components/Spinner"
import { GET_RECORDS, GET_USER } from "../queries/query"
import { getAPIClient } from "../services/axios"
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

    const user = await apiClient.get('/users')

    if(user.data.role != 'admin'){
        return {
            redirect: {
                destination: '/collaborator',
                permanent: false,
            }
        }
    }

    return {
        props: {
            user: user.data
        }
    }
}

export default function Admin(){

    const [currentPage, setCurrentPage] = useState(0); 
    const [recordsPerPage] = useState(8);
    

    const { data, loading, error } = useQuery(GET_RECORDS,{
        pollInterval:1000
    })

    useEffect(()=>{
        console.log('foi')
    },[data])

    if(loading){
        return (
            <SpinnerComponent/>
        )
    }
      
    const { getRecords } = data;
    const recentsRecords = [...getRecords];
    recentsRecords.reverse();
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
            <Drawer name="Dashboard" srcImage="dashboard.svg"/>
            <LogsContainer admin={true}>
            <Flex flexDirection="column" w="100%" alignItems="center" h="75vh" gap={15} pos="relative">
                {
                    currentRecords.map((record)=>{
                        const user = record.user
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
