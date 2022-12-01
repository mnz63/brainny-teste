import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'


const customTheme = {
    colors: {
        purple: {
            900: '#330693',
            700: ' #8A53FF'
        },
        grey : '#20292E',
        white: '#fff'
    },
    fonts: {
        heading: 'Poppins',
        body: 'Poppins'
    }
};



const theme = extendTheme(customTheme);

export default theme;