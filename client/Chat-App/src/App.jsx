import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3000")

export default function App() {
    const [message,setMessage] = useState("")
    const [room,setRoom] = useState("")
    useEffect(()=>{
        socket.on("recieve-message",(data)=>{
            const messageBox = document.querySelector(".message-box")
            const h2 = document.createElement("h2")
            h2.style.textAlign = 'right'
            h2.innerHTML = data.message
            messageBox.appendChild(h2)
        })
    },[socket])
    const sendMessage = (event) => {
        socket.emit("send-message",{room,message})
        const messageBox = document.querySelector(".message-box")
        const h2 = document.createElement("h2")
        h2.innerHTML = message
        messageBox.appendChild(h2)
        document.getElementById("message-input").value = ""
    }
    const joinRoom = (event) => {
      if(room!=='')socket.emit("join-room",room)
    }
  return (
    <div className='chat-box'>
      <div className='input-box'><input type='text' placeholder='Room ID...' onChange={(e)=> setRoom(e.target.value)}/>
      <button onClick={joinRoom}>Join Room</button></div>
      <div className='input-box'><input type='text' placeholder='Message...' id="message-input" onChange={(e)=> setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send</button></div>
      <div className='message-box'></div>
    </div>
  )
}
