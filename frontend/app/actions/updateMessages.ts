import { MessageList, UpdatedMessages } from "../interfaces";

export const updateMessages = ({ _id, user, message, createdAt, to, setStateAction } : UpdatedMessages) => {

  setStateAction((prevMessages : MessageList) => {
    const updatedMessages = { ...prevMessages };
    if (!updatedMessages[to || 'main']) {
      updatedMessages[to || 'main'] = [];
    }
    updatedMessages[to || 'main'] = [
      {
        _id,
        user,
        message,
        createdAt
      },
      ...updatedMessages[to || 'main']
    ];

    return updatedMessages;
  });
}