import { Button } from '@chakra-ui/react' 

export default function RegisterButton(props: any){
    return(
        <Button
            alignSelf={props.alignSelf}
            m={props.margin}
            size='lg'
            colorScheme="purple"
            bg="purple.900"
            fontWeight={400}
            fontSize={16}
            w="200px"
            onClick={props.click}
        >{props.name}</Button>
    )
}