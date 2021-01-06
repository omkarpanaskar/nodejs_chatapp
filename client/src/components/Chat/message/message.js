import React from 'react'
import Message from '../messages/messages';
import './message.css';
import STB from 'react-scroll-to-bottom'
const message = ({ messages, user_id }) => {
    return (
        <STB className="messages">
            {messages.map((message, i) => (
                <Message key={message._id} message={message}
                    current_uid={user_id} />
            ))}
        </STB>
    )
}

export default message
