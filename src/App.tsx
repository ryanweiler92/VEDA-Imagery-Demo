import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Layout from '../src/layout/Layout';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Layout />
  </ChakraProvider>
)
