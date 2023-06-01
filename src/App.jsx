import { useContext, useState } from 'react'
import './App.css'
import AuthPage from './components/AuthPage'
import ChatsPage from './components/ChatsPage'
import { AuthContext } from './context/AuthContext'

function App() {
  // const [user, setUser] = useState(undefined)
  const { loading, user, error, dispath} = useContext(AuthContext)

  if (!user) {
    return <AuthPage/>
  } else {
    return <ChatsPage user={user}/>
  }
}

export default App
