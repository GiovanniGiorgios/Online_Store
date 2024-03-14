import { $authHost } from "./index";

export const fetchAllUsers = async () => {
    console.log("fetchAllUsers");
    try {
        const response = await $authHost.get('api/usersInfo/allUsers');
        return response.data;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
}