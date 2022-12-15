/* TODO: 
1. Correctly define the 'data' & 'o' parameter as an object;
*/

const { default: axios } = require('axios');

// set default baseURL
axios.defaults.baseURL = process.env.REACT_APP_WEBAPI_URL;

// create a response interceptor to check for 401s
axios.interceptors.response.use (
    (response: any) => response,
    (error: any) => {
        
        if(error.response) {
            const {status} = error.response;
            if (status === 401) {
                localStorage.removeItem('user_info');
                // changed this from window.location.reload(true);
                window.location.reload();
            }
        }
        
        return Promise.reject(error);
    }
);

// create a default instance of axios
const instance = axios.create({
    responseType: "json"
});


//#region generic crud methods
instance.getData = (url: string, needsAuth: boolean) => {    
    const requestOptions = needsAuth === true || needsAuth === undefined ? { headers: authHeader() } : {};

    return new Promise((resolve, reject) => {
        axios.get(url, requestOptions)
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((res: any) => {
                reject(formatReject(res));
            })
    });
}

instance.upsertData = (id: any, url: string, data: any, needsAuth: boolean) => {
    if(id === undefined || id === null || id === 0 || id === "")
        return instance.postData(url, data, needsAuth);
    else
        return instance.putData(`${url}/${id}`, data, needsAuth);
}

instance.postData = (url: string, data: any, needsAuth: boolean) => {
    const requestOptions = needsAuth === true || needsAuth === undefined ? { headers: authHeader() } : {};

    return new Promise((resolve, reject) => {
        axios.post(url, data, requestOptions)
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((res: any) => {
                reject(formatReject(res));
            })
    });
}

instance.putData = (url: string, data: any, needsAuth: boolean) => {
    const requestOptions = needsAuth === true || needsAuth === undefined ? { headers: authHeader() } : {};

    return new Promise((resolve, reject) => {
        axios.put(url, data, requestOptions)
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((res: any) => {
                reject(formatReject(res));
            })
    });
}

instance.deleteData = (url: string) => {
    const requestOptions = { headers: authHeader() }; // deletes always need security

    return new Promise((resolve, reject) => {
        axios.delete(url, requestOptions)
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((res: any) => {
                reject(formatReject(res));
            })
    });
}

instance.deleteMultipleData = (url: string, ids: any[]) => {
    const requestOptions = { 
        headers: authHeader(), // deletes always need security
        data: { ids } 
    };

    return new Promise((resolve, reject) => {
        axios.delete(url, requestOptions)
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((res: any) => {
                reject(formatReject(res));
            })
    });
}

function formatReject(res: any) {    
    if(res === null)
        return "error";
        
    // normal operation
    if(res.response) {
        if(Array.isArray(res.response.data)) {
            // 'idx' use to be the second argument for the 'm' function. Removed to fix typescript error of arguement not being called. Not sure if needed.
            let m = res.response.data.map((o: any) => {
                return o.description;
            });
            return m.join("\n");
        }
    
        return res.response.data;
    }
    else if (res.request) {
        return "network error";
    }
    else
        return "error";
    
}
//#endregion

export default instance;

export function authHeader() {
    // return authorization header with jwt token
    let info = localStorage.getItem('user_info');
    let user = info !== null ? JSON.parse(window.atob(info)) : null;

    if (user && user.token) {
        return { 
            'Authorization': 'Bearer ' + user.token,
            'Content-Type': 'application/json'
         };
    } else {
        return {'Content-Type': 'application/json'};
    }
}