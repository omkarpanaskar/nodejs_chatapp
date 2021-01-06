import React from 'react'
import './input.css'
const input = ({message,setMessage,sendMessage}) => {
    return (
        <div>
            <form action="" onSubmit={sendMessage} className="form">
                <input type="text" value={message} className="input" placeholder="Type a message"
                    onChange={event => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
                <button className="sendbutton">Send messege</button>
            </form>
        </div>
    )
}

export default input
