'use server'

import axios from "axios";
import { Message } from "../interfaces";

export async function getMessages() {
    try {
        const response = await axios.get('http://localhost:5000/messages');
        const data: Message[] = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}