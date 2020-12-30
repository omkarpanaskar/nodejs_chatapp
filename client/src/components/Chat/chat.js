import React,{useContext,useEffect,useState} from 'react'
import {UserContext} from '../../UserContext';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import io from 'socket.io-client';
import Message from './message/message';
let socket;
 const chat = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user,setUser}=useContext(UserContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let {room_id,room_name}=useParams();
    const ENDPT='localhost:5000'
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [messege,setMessege]=useState('');
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [messages,setMessages]=useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        socket= io(ENDPT)
        socket.emit('join',{name:user.name,room_id,user_id:user.id})
    }, [])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        socket.on('message',message=>{
            setMessages([...messages,message])
        })
    }, [messages])
    // send message
    const sendMessege=event=>{
        event.preventDefault();
        if(messege){
            console.log(messege);
            socket.emit('sendMessege',messege,room_id,()=>setMessege(''))
        }
    }

    return (
        <div>
            <div>{room_id} {room_name}</div>
            <h1>Chat {JSON.stringify(user)}</h1>
            <pre>{JSON.stringify(messages,null,'\t')}</pre>
            <Message messages={messages} user_id={user.id} />
            <form action="" onSubmit={sendMessege}>
                <input type="text" value={messege} 
                onChange={event=>setMessege(event.target.value)}
                onKeyPress={event=>event.key==='Enter'?sendMessege(event):null}/>
                <button>Send messege</button>
            </form>

        </div>
    )
}

export default chat