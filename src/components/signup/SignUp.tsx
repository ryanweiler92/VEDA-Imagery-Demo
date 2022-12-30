import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Image,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import Logo from '../../layout/logo.png'
import { authenticationService } from '../../services/AuthenticationService';
import { setUserToLocalStorage } from '../../localStorage/localStorage';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  type FormData = {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
  };
  
  const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

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
    authenticationService.signUp(formData)
    .then((data: any) => {
        handleLogin(data);
    })
    .catch((err: any) => {
        console.log(err);
    }); 
  }

  const [formData, setFormData] = useState(initialFormData);
  const { handleSubmit } = useForm();

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Link href="/">
            <Image 
              src={Logo}
              htmlWidth={"200px"}
            />
          </Link>
          <Text fontSize={'lg'} color={'gray.600'}>
            Sign up for an account
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Input type="text" id="firstName" name="firstName" onChange={handleChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Input type="text" id="lastName" name="lastName" onChange={handleChange}  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input type="email" id="email" name="email" onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} id="password" name="password" onChange={handleChange} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                variant="primary" 
                bg={'blue.300'} 
                color={'white'}
                _hover={{
                  bg: 'blue.400',
                }}
                >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link href={'/login'} color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}