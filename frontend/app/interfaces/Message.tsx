export interface Message {
    _id: string;
    user: { username: string, name: string };
    message: string;
    createdAt: string;
}