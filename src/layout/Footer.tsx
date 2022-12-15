import * as React from 'react'
import { Box, BoxProps, Container } from '@chakra-ui/react'

const Footer = (props: BoxProps) => {
  return (
    <Box as="footer" role="contentinfo" bg="bg-accent" {...props}>
      <Container>
        {/* <Placeholder minH="20">Footer</Placeholder> */}
      </Container>
    </Box>
  )
}

export default Footer;