import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

export const getOrsaveUserInDatabase = async (email, uid) => {
    const {data} = await $host.post('api/user/getOrsaveNewUserInDatabase', {email, uid})

    return data;
}
export const getUserFromDatabase = async (uid) => {
    const {data} = await $host.post('api/user/getUserFromDatabase', {uid})

    return data;
}
// export const logout = async () => {
//     const {data} = await $api.post('api/user/logout')

//     return data
// }

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token) // помещаєм token в localStorage
    return jwt_decode(data.token)
}
