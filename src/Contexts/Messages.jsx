import { createContext, useCallback, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const Messages = createContext();

export const MessagesProvider = ({children}) => {

    const [messages, setMessages] = useState([]);

    const addMessage = useCallback(({text, type}) => {
        const id = uuidv4();
        setMessages(m => [...m, {text, type, id}]);
        setTimeout(() => {
            setMessages(m => m.filter(m => m.id !== id));
        }, 5000);

    }, []);

    return (
        <Messages.Provider value={{
            addMessage
        }}>
            <>
            <div className="messages">
                {
                    messages.map(message => (
                        <div style={{
                            cursor: 'pointer'
                        }}
                            key={message.id} 
                            className={`alert alert-${message.type}`} 
                            role="alert"
                            onClick={() => setMessages(m => m.filter(m => m.id !== message.id))}
                            >
                            {message.text}
                        </div>
                    ))
                }
            </div>
            {children}
            </>
        </Messages.Provider>
    )
}