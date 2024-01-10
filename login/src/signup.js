import { isDisabled } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import'./signup.css';

export function SignUp () {

const navigate = useNavigate()
const [username,setUsername] = useState('')
const [email,setEmail] = useState('')
const [password1,setPassword1] = useState('')
const [password2,setPassword2] = useState('')
const [error,seterror] = useState('')
const [usernameError,setUsernameError] = useState('')
const [emailError,setemailError] = useState('')
const [password1Error,setPassword1Error] = useState('')
const [password2Error,setPassword2Error] = useState('')
const [message,setsignupmessage]= useState('')
const [isFormDisabled,setFormDisabled] = useState(true);
const [successMessage,setsuccessMesseage] = useState('')


const data = JSON.stringify({
    'username':username,
    email:email,
    password1:password1,
    password2:password2
})

 const handleSignup = async(e) =>{    
    e.preventDefault();
        try{  
            const user = await axios({
                'url': 'http://127.0.0.1:8000/register/',
                'method': 'POST',
                'headers': {
                            "Content-Type":'application/json',
                            Accept:'application/json'
                        },
                        data:data
            })
           console.log(user)
           if(username && email && password1 && password2){
            setsignupmessage('User Signup Successfully.')
            navigate('/page')
           }
           

        }catch(error){
           // debugger;
            //showing backend error
            console.log(error)
            if(error.response && error.response.data && error.response.data.username){
            setUsernameError(error.response.data.username);
            }else{
                setUsernameError('')
            }
            if (error.response && error.response.data && error.response.data.email) {
            setemailError(error.response.data.email);
            }
            else{
                setemailError('')
            }
            if(error.response && error.response.data && error.response.data.password1){
            setPassword1Error(error.response.data.password1)
            }
            else{
                setPassword1Error('')
            }

            if(error.response && error.response.data && error.response.data.password2){
            setPassword2Error(error.response.data.password2)
            }
            else{
            setPassword2Error('')
            }
            if(error.response && error.response.data && error.response.data.non_field_errors){
            seterror(error.response.data.non_field_errors)
            }
            else{
                seterror('')
            }
        }
    }
   //function for disable button
    const handleChangeUsername = (e) =>{
       setUsername(e.target.value)
        setFormDisabled(!e.target.value || !email || !password1 || !password2)
    }
    const handleChangeEmail = (e) =>{
       setEmail(e.target.value) 
       setFormDisabled(!username || !e.target.value || !password1 || !password2)  
    }
    const handleChangePassword1 = (e) =>{
            setPassword1(e.target.value)
            setFormDisabled(!username || !email || !e.target.value || !password2)
        } 
    const handleChangePassword2 = (e) =>{
            setPassword2( e.target.value)
            setFormDisabled(!username || !email || !password1 || !e.target.value )
     }
     
     // function for Validation
     const handleCheckemail = () =>{
      // debugger;
        let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if(!email){
            setemailError('This is field required.')
        }
        else if(!emailRegex.test(email)){
            setemailError('this is not valid email address')
        }
        else {
            setemailError('')
        }
    }
     const handleCheckpassword = () =>{
       // debugger
        // /^(?=.[0-9])(?=.[a-zA-Z])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    let passwordRegex =    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        if(!password1){
            setPassword1Error('This field is required')
        }
        else if(!passwordRegex.test(password1)){
            setPassword1Error('Password length should be minimum 8.One uppercase,One lowercase,special characters or one digit must be included.')
        }
       
        else{
            setPassword1Error('')
        }
    // return  passwordRegex.test(password1)
        }
    const handleCheckConfirmpassword = () =>{
       // debugger;
            if( !password2){
                setPassword2Error('This Field may not be blank')
            }
            else if(password1 !== password2){
                setPassword2Error('Password did not match.')
            }
            else{
                setPassword2Error('')
            }
        }  
    return(
        <>
        <div className="admin-div">
            <form style={{backgroundColor:'white'}} className="form-class">    
                <label style={{fontSize:'1rem', fontFamily:'sans-serif'}}>Username: <span>&#128231;</span></label>
                <input 
                id="username"
                className="input-class"
                type="text" 
                value={username}
                onChange={handleChangeUsername}
                placeholder="enter Username"
                required 
                />
                <br/>
                <br/>
                {usernameError && <p style={{color:'red'}}>{usernameError}</p>}
                <label style={{fontSize:'1rem', fontFamily:'sans-serif'}}>Email:<span>&#128231;</span></label>
                <input 
                id="usermail"
                className="input-class"
                type="email" 
                onChange={handleChangeEmail}
                value={email}
                onBlur={handleCheckemail}
                placeholder="enter Email"
                required
                />
                <br/>
                <br/>
                {emailError && <p style={{ color: "red"}}>{emailError}</p>}
                <label style={{fontSize:'1rem', fontFamily:'sans-serif'}}>Password:<span>&#128274;</span></label>
                <input 
                id="userpassword"
                className="input-class"
                type="password" 
                onChange={handleChangePassword1}
                value={password1}
                onBlur={handleCheckpassword}
                placeholder="enter password"
                required
                />
                {password1Error && <p style={{ color: "red" }}>{password1Error}</p>}
                <br/>
                <br/>
                <label style={{fontSize:'1rem', fontFamily:'sans-serif'}}>ConfirmPassword:<span>&#128274;</span></label>
                <input
                id="userconfirmpassword"
                className="input-class"
                type="password"
                onChange={handleChangePassword2}
                value={password2}
                onBlur={handleCheckConfirmpassword}
                placeholder="enter confirm password"
                required
                /> 
                <br/>
                <br/>
                {password2Error && <p style={{color:'red'}}>{password2Error}</p>}

                <button type="button" id="btn-id" onClick={handleSignup} disabled={isFormDisabled} style={{width:'30%',marginTop:'20px', padding:'10px', borderRadius:'2px', fontSize:'1rem'}}>Submit</button>
                {error && <p style={{color:'red'}}>{error}</p>}
                {message && <p style={{color:'green'}}>{message}</p>}
                <br/>
                <br/>
                <p>If you already SignUp.?<Link to='/login' style={{textDecoration:'none'}}>login</Link></p>
            </form>
        </div>
        </>
    )
}