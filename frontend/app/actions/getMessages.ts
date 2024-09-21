'use server'

import axios from "axios";
import { Message } from "../interfaces";

export async function getMessages(url : string) {
    try {
        const response = await axios.get(`${url}/messages`);
        const data: Message[] = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}