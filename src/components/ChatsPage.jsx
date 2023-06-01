import React, { useContext } from 'react'
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic, OptionsSettings } from "react-chat-engine-advanced"
import { AuthContext } from '../context/AuthContext'

const ChatsPage = (props) => {
  const {user, dispatch} = useContext(AuthContext)
  const chatProps = useMultiChatLogic(import.meta.env.VITE_PUBLIC_KEY_CHAT_ENGINE ,user.username, user.secret)
  
  const logout = () => {
    dispatch({type: "LOGOUT"})
  }
  
  return (
  <div style={{height: '100vh'}}>
    <MultiChatSocket {...chatProps}/>
    <MultiChatWindow {...chatProps} style={{height: '100%'}}
    renderOptionsSettings={(props) => 
      <div>
        <OptionsSettings/>
        <div style={{textAlign: 'center', padding: '12px'}}>
          <button className="btn btn-default btn-sm" onClick={logout}>Log out</button>
        </div>

      </div>
    }
    >

    </MultiChatWindow>
  </div>)
}

export default ChatsPage