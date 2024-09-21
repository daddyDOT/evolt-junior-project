import { Message } from "./Message";

export interface UpdatedMessages extends Message {
    to?: string;
}