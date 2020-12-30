import React from 'react'
import Message from '../messages/messages'
const message = ({messages,user_id}) => {
    return (
        <div>
            Message {user_id}
            {/* {JSON.stringify(messages)} */}
           {messages.map((message,i) => (
               <Message key={message._id}message={message}
               current_uid={user_id}/>
           ))}
        </div>
    )
}

export default message
