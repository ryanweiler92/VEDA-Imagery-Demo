/* TODO: 
1. Correctly define the 'data' & parameter as an object;
*/
import axios from './AxiosHelper';

// define public methods
export const roleService = {
    get,
    getById,
    post,
    deleteRole,
    getClaims,
    updateClaims
};

function get() {
    return axios.getData(`/api/role`, true);
}

function getById(id: any) {
    return axios.getData(`/api/role/${id}`, true);
}

function post(data: any) {
    return axios.upsertData(data.id, `/api/role`, data, true);
}

function deleteRole(id: any) {
    return axios.deleteData(`/api/role/${id}`, true);
}

function getClaims() {
    return axios.getData(`/api/role/claims`, true);
}

function updateClaims(roleid: any, data: any) {
    return axios.putData(`/api/role/${roleid}/claims`, data, true);
}