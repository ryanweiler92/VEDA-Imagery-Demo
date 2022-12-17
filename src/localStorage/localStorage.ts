export const setUserToLocalStorage = (user: any) => {
  localStorage.setItem('user_info', window.btoa(JSON.stringify(user)));
}

export const getUser = () => {
  let info = localStorage.getItem('user_info');
  let user = info !== null ? JSON.parse(window.atob(info)) : null;

  if (user && user.token) {
      return user;
  } 
  return null;
}

export const getToken = () => {
  // return authorization header with jwt token
  let info = localStorage.getItem('user_info');
  let user = info !== null ? JSON.parse(window.atob(info)) : null;

  if (user && user.token) {
      return user.token;
  } 
  return null;
}

export const logout = () => {
  console.log('logging out');
  localStorage.removeItem("user_info");
  window.location.href = "/"; 
}