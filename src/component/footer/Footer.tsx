import { Center, Link, Text } from "@chakra-ui/react";

export default function Footer() {

    return(
    <>
    <Center>
        <Text color='primary.500' fontWeight='semibold'>feito com ♥ por <Link isExternal={true} href='https://twitch.tv/flaviojmendes' color='primary.400'>flaviojmendes</Link></Text>
    </Center>
    </>
    )
}