import * as React from 'react'
import { Flex } from '@chakra-ui/react'
import Navbar from './Navbar';
import Footer from './Footer';
import Main from './Main';

const Layout = () => {
  return (
    <Flex direction="column" flex="1">
      <Navbar />
      <Main />
      <Footer />
    </Flex>
  )
}

export default Layout;