import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom"; 

export function LoginUser () {
  
const userNavigate = useNavigate()
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const  [error,setError] = useState('')
    const [usernameError,setusernameError] = useState('')
    const [emailError,setEmailError] =useState('')
    const [passwordError,setPasswordError]= useState('')
    const [message,setmessage] = useState('')
    const [isFormDisable,setisFormDisable] = useState(true)
    const [successMessage, setsuccessMessage] = useState('');

 const data = JSON.stringify({
    'username':username,
    email:email,
    password:password
})
    const login = async(e) =>{
        e.preventDefault();

        try{
            debugger;
            const logindata = await axios({
                    'url':'http://127.0.0.1:8000/login/',
                    'method' : 'POST',
                    'headers':{
                        'Content-Type':'application/json',
                        'Accept' : 'application/json'
                    },
                    'data':data
            });
            const token = logindata.data.key
            console.log(token)
            if(token){
                localStorage.setItem('token',token)
                userNavigate('/category')
                setmessage('user Successfully login.')
            }
            else{
                console.log('no token!')
            }
            /*if(username && email && password && password){
                setmessage('User Successfully login.')
             }*/

        }catch(error){
            console.error('error',error)
            if(error.response && error.response.data && error.response.data.username){
                    setusernameError(error.response.data.username)
            }
            else{
                setError('')
            }
            if(error.response && error.response.data && error.response.data.email){
                setEmailError(error.response.data.email)
            }
            else{
                setError('')
            }
            if(error.response && error.response.data && error.response.data.password){
                setPasswordError(error.response.data.password)
            }
            else{
                setError('')
            }
           if( error.response.data && error.response.data.non_field_errors){
                setError(error.response.data.non_field_errors)
            }
            else{
                setError('')
            }
        }
    }
    const handleChangeUsername = (e) =>{
        setUsername(e.target.value)
         setisFormDisable(!e.target.value || !email || !password)
        
         
     }
     const handleChangeEmail = (e) =>{
        setEmail(e.target.value)    
        setisFormDisable(!username || !e.target.value || !password ) 
        
           
      }
     const handleChangePassword = (e) =>{
             setPassword( e.target.value)
             setisFormDisable(!username || !email || !e.target.value )
            if(password !== password){
                setisFormDisable(true)
            }
         } 

         const handleCheckUsername = () =>{
            if(username == ''){
                setusernameError('must included username')
            }
            else{
                setusernameError('')
            }
         }
         const handleCheckemail = () =>{
          //  debugger;
            let emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!email) {
            setEmailError("this field may not be blank!")
          }
          else if(!emailRegex.test(email)){
            setEmailError('Enter A Valid Email!')
          }
          else{
            setEmailError('')
          }
        }
         const handleCheckpassword = () =>{
         // debugger
        // let passwordRegexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
         if(!password){
            setPasswordError('This field is required.')
        }
                else{
                    setPasswordError('')
                }
            }
    return(
        <>
          
        <div style={{border:'1px solid black' ,marginTop:'5%', width:'40%'}}>
            <form>
            <label>Enter Username:</label>
            <input 
            type="text" 
            placeholder="username" 
            value={username} 
            onChange={handleChangeUsername} 
            onBlur={handleCheckUsername}
            />
            <br/>
            {usernameError && <p style={{color:'red'}}>{usernameError}</p>}
            <label>Enter Email:</label>
            <input 
            type="email" 
            placeholder="email" 
            value={email} 
            onChange={handleChangeEmail}
            onBlur={handleCheckemail}
            />
            <br/>
            {emailError && <p style={{color: 'red'}}>{emailError}</p>}
            <label>Enter Password:</label>
            <input 
            type="password" 
            placeholder="password" 
            value={password} 
            onChange={handleChangePassword }
            onBlur={handleCheckpassword}
            />
            <br/>
            {passwordError && <p style={{color : 'red'}}>{passwordError}</p>}

            <button type="button" onClick={login} disabled={isFormDisable} >Login</button>
            {error && <p style={{color:'red'}}>{error}</p>}
            {message && <p style={{color:'green'}}>{message}</p>}
        </form>
        <p>If you didn't have any account? <Link to='/signup'>Signup</Link></p>
        </div>
        </>
    )
}