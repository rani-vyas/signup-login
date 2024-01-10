import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './page.css'
export function UserPage () {

    return(
        <>
        <div className='div-class' style={{border:'10px solid black',width:'50%',padding:'20px',marginLeft:'20%',marginTop:'10%',borderRadius:'10px', height:'300px'}}>
            <button type="button" className="primaryButton"><Link to='/signup' style={{textDecoration:'none'}}>SignUp</Link></button>
            <p>If you already SignUp?<Link to='/login' style={{textDecoration:'none'}}>login</Link></p>
            <button type="button" className="primaryButton" ><Link to='/login' style={{textDecoration:'none'}}>LogIn!</Link></button>
            <p>If you didn't have any account? <Link to='/signup' style={{textDecoration:'none'}}>Signup</Link></p>
        </div>
        </>
    )
}