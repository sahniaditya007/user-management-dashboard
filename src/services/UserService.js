import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default {
    async getUsers() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
        },
        async createUser(userdata){
            try {
                const response = await axios.post(API_URL, userdata);
                return response.data;
            } catch (error) {
                throw new Error('User creation failed');
            }
        },
        async updateUser(userId, updatedData){
            try {
                const response = await axios.put(`${API_URL}/${userId}`, updatedData);
                return response.data;
            } catch (error) {
                throw new Error('User update failed');
            }
        },
        async deleteUser(userId){
            try {
                await axios.delete(`${API_URL}/${userId}`);
            } catch (error) {
                throw new Error ('User deletion failed');
        }
    }
}