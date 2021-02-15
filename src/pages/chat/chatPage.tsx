import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageType } from '../../api/chat-api'
import { withAuthRedirect } from '../../components/common/withAuthRedirect'
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../reduxx/chat-reducer'
import { AppRootStateType } from '../../reduxx/redux-store'

const ChatPage: React.FC = (props) => {
  return (
    <div>
      <Chat />
    </div>
  )
}

// useEffect(() => {
//   let ws: WebSocket
//   const closeHandler = () => {
//     console.log('close Ws')
//     setTimeout(createChannel, 3000)
//   }

//   function createChannel() {
//     ws?.removeEventListener('close', closeHandler)
//     ws?.close()
//     ws = new WebSocket(
//       'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
//     )
//     ws.addEventListener('close', closeHandler)
//     setWsChannel(ws)
//   }
const Chat: React.FC = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  )
}

const Messages: React.FC<{}> = ({}) => {
  const messages = useSelector((state: AppRootStateType) => state.chat.messages)

  return (
    <div style={{ height: '700px', overflowY: 'auto' }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} alt="" />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </div>
  )
}

const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
  const dispatch = useDispatch()

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  return (
    <div>
      <textarea
        onChange={(e) => setMessage(e.currentTarget.value)}
        value={message}
      ></textarea>
      <button disabled={false} onClick={sendMessageHandler}>
        send
      </button>
    </div>
  )
}

export const ChatPageWithAuth = withAuthRedirect(ChatPage)
