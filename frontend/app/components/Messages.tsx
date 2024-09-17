import { Message } from "../interfaces"

const Messages = ({ messages } : { messages: Message[] }) => {
  return (
    <>
        {messages.map((item) => (
          <p key={item._id}>{item.user.username} - {item.message}</p>
        ))}
    </>
  )
}

export default Messages