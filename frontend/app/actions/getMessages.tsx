'use server'

import axios from "axios";
import { Message } from "../interfaces";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getMessages() {
    try {
        const response = await axios.get(`${apiUrl}/messages`);
        const data: Message[] = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}