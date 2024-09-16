'use server'

import axios from "axios";
import { Name } from "../interfaces";

export async function getRandomName() {
    if (process.env.USE_STATIC_NAME) {
        return {
            username: 'jhndoe',
            name: 'John Doe'
        }; 
    }
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/randomuser', {
            headers: {
                'X-Api-Key': process.env.API_NINJAS_KEY
            }
        });
        const data: Name = response.data;
        return {
            username: data.username,
            name: data.name
        };
    } catch (error) {
        console.error('Error fetching messages:', error);
        return {
            username: '',
            name: ''
        };
    }
}