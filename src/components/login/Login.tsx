import {
  Box,
  Button,
  Checkbox,
  Container,
  Link,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState, } from 'react';
import { useForm } from 'react-hook-form';
import Logo from '../../layout/logo.png';
import { PasswordField } from './PasswordField';
import { authenticationService } from '../../services/AuthenticationService';
import { setUserToLocalStorage } from '../../localStorage/localStorage';

const Login = () => {
  type FormData = {
    email: string;
    password: string;
  };
  
  const initialFormData: FormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const { handleSubmit } = useForm();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleLogin = (data: any) => {
    setUserToLocalStorage(data)
    window.location.href = "/"; 
}

  const onSubmit = () => {
    // send the form data to the server
    authenticationService.login(formData)
    .then((data: any) => {
        handleLogin(data);
    })
    .catch((err: any) => {
        console.log(err);
    }); 
  };

 return (
    <Flex bg={useColorModeValue('gray.50', 'gray.800')} minH={'100vh'}>
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8" >
        <Stack spacing="6">
        <Flex justify="center">
          <Link href="/">
            <Image 
              src={Logo}
              htmlWidth={"200px"}
            />
          </Link>
        </Flex>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button as={"a"} variant="link" colorScheme="blue" href={"/signup"}>
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" name="email" onChange={handleChange}/>
              </FormControl>
              <PasswordField  onChange={handleChange} />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6" mt={"10"}>
              <Button 
              type="submit"
              variant="primary" 
              bg={'teal.300'} 
              color={'white'}
              _hover={{
                bg: 'teal.400',
              }}
              >Sign in
              </Button>
            </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
    </Flex>
  );
}

export default Login;