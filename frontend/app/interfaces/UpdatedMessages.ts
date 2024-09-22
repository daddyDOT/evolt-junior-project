import { Dispatch, SetStateAction } from "react";
import { Message } from "./Message";
import { MessageList } from "./MessageList";

export interface UpdatedMessages extends Message {
    to?: string;
    setStateAction: Dispatch<SetStateAction<MessageList>>;
}