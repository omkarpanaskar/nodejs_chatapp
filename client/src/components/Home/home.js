/* eslint-disable react-hooks/rules-of-hooks */
import { UserContext } from '../../UserContext';
import React, { useContext,useState,useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import RoomList from './RoomList';
import io from 'socket.io-client';
let socket;
const home = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useContext(UserContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [room, setRoom] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rooms,setRooms]=useState([])
    const ENDPT='localhost:5000';
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        socket =io(ENDPT)
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPT])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // create room at client side
    useEffect(() => {
        socket.on('room-created',room=>{
            setRooms([...rooms,room])
        })
        
    }, [rooms]);
    // all output rooms from db
    useEffect(() => {
        socket.on('output-created',rooms=>{
            setRooms(rooms)
        })
        
    }, [])
    // handling form using socket.io 
    const handleSubmit=(e)=>{
        e.preventDefault()
        socket.emit('create-room',room)
        console.log(room)
        setRoom('');
    }
    if(!user) {
        return <Redirect to='/login'/>
    }
    return (
        <>
            <div>
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Welcome {user ? user.name : ''}</span>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="room" type="text" placeholder="Enter A Room Name" className="validate"
                                            value={room} onChange={e=>setRoom(e.target.value)}/>
                                                <label htmlFor="room">Room</label>
                                        </div>
                                        </div>
                                        <button className="btn">Create Room</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s6 m5 offset-1">
                        <RoomList rooms={rooms}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export { home }