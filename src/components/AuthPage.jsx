import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AuthPage = (props) => {
  const [loginMode, setLoginMode] = useState(true)
  const {dispatch, error, loading} = useContext(AuthContext)

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    const username = e?.target?.["username"]?.value || "";
    const password = e?.target?.["password"]?.value || "";
    await axios.post(import.meta.env.VITE_API_ENDPOINT + "authenticate",
    {username, password})
    .then(r => dispatch({ type: "LOGIN_SUCCESS" ,payload:{...r.data, secret: password} }))
    .catch(e => {
        dispatch({ type: "LOGIN_FAILURE", payload: e?.response?.data})
      }
    )
  }

  useEffect(() => {
    let clearClass;
    if(Boolean(error)) {
      const errorElm = document.querySelector("#error");
      errorElm.classList.add("error-show")
      clearClass = setTimeout(() => {
        errorElm.classList.remove("error-show")
      }, 3000)
    }
    
    return () => clearTimeout(clearClass)
  }, [error])

  useEffect(() => {
    const overplayElm = document.querySelector("#overplay");
    if(loading) {
      overplayElm.classList.add("overplay-show")
    } else {
      overplayElm.classList.remove("overplay-show")
    }
  }, [loading])

  return (
    <div>
      <div id='overplay' className="overplay">
        <div className="lds-dual-ring"></div>
      </div>
      <div className='background'>
        <div id='error' className={`error ${error && "error-show"}`}>Validation Failed</div>
        <form onSubmit={onSubmit} className="form-card">
          <div className='form-title'>Welcome to <br/> Chat Engine👋 </div> 
          <div className='form-subtitle'>Set a username to get started</div>

          {/* <div className="row">
            <button className={`auth-button ${!loginMode && "btn-disabled"}`}>
              Sign In
            </button>
            <button className={`auth-button ${loginMode && "btn-disabled"}`}>
              Sign Up
            </button>
          </div> */}
          {/* {Boolean(error) && 
          <div className='error'>Validation Failed</div>} */}

          <div className='auth'>
            <div className="auth-row">
              <div className='auth-label'>Username</div>
              <input type='text' className='auth-input' name='username'></input>
            </div>
            <div className="auth-row">
              <div className='auth-label'>Password</div>
              <input type='password' className='auth-input' name='password'></input>
            </div>
            <button className='auth-button' type='submit'>Sign In/Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthPage