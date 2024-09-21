import { User } from "./User";

export interface Message {
    _id?: string;
    user: User;
    message: string;
    createdAt: string;
}