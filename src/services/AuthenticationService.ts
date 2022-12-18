import {
    postData,
} from './AxiosHelper';

// define public methods
export const authenticationService = {    
    login,
    signUp,
    confirmEmail,
    confirmPassword,
    resetPassword
};

function login(o: object) {
    console.log(o)
    return postData(`/api/authentication/login`, o, false);
}

function signUp(o: any) {
    console.log(o);
    return postData(`/api/authentication/signup`, o, false);
}

function confirmEmail(o: object) {
    return postData(`/api/authentication/confirmemail`, o, false);
}

function confirmPassword(o: object) {
    return postData(`/api/authentication/confirmpassword`, o, false);
}

function resetPassword(email: string) {
    return postData(`/api/authentication/resetpassword?email=${email}`, null, false);
}