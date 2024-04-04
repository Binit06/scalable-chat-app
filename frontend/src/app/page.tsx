'use client';

import { useState } from "react";
import { useSocket } from "./context/SocketProvider";

export default function Page() {

  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('')
  return (
    <div>
      <div>
        <h1>All Messages will appear here</h1>
      </div>
      <div>
        <input onChange={(e) => {setMessage(e.target.value)}} type="text" placeholder="Message..." className="p-3 text-black rounded-md mr-4"/>
        <button onClick={e => sendMessage(message)} className="bg-neutral-200 p-2 rounded-sm text-black font-mono font-bold">Send</button>
      </div>
      <div>
        {messages.map((e, index) => <li key={index}>{e}</li>)}
      </div>
    </div>
  );
}