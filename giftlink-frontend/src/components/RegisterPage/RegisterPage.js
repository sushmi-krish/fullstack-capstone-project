import React, {useState} from 'react';
import './RegisterPage.css';

function RegisterPage(){

    // create usestate hook variables for the firstName, lastname, email and password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //create handleRegister function console.log 
    const handleRegister = async()=>{
        console.log("Register invoked")
    }


    return(
        <div className ="container mt-5">
            <div className='row justify-content-center'>
                <div className='col-md-6 col-lg-4'>
                    <div className='register-card p-4 border rounded'>
                        <h2 className='text-center mb-4 font-weight-bold'>Register</h2>
                       <div className='mb-4'>

                        <label htmlFor='firstName' className='form-label'>firstName</label>
                        <input 
                        id="firstName"
                        type='text'
                        className='form-control'
                        placeholder='Enter your firstName'
                        value={firstName}
                        onChange={ (e)=> setFirstName(e.target.value)}
                        />
                        </div>
                        {/*lastName */}
                        <div className='mb-3'>
                            <lable htmlFor="lastName" className="form-label">LastName </lable>
                        <input 
                        id="lastName" 
                        type='text' 
                        className='form-control' 
                        placeholder= "Enter Your lastName"
                        value = {lastName} 
                        onChange = {(e)=> setLastName(e.target.value)}/>
                        </div>
                        {/*Email*/}
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email </label>
                        <input 
                        id= "email" 
                        type="email" 
                        className='form-control' 
                        value ={email} 
                        onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        {/*Password*/}
                        <div className='mb-4'>
                            <label htmlFor='password' className="form-label">Password</label>
                        <input id ="password" 
                        type="password"
                         className='form-control' 
                         value={password} 
                         onChange={(e)=>setPassword(e.target.value)}/>
                       </div>
                        <button className='btn btn-primary w-100 mb-3' onClick={handleRegister}>Register</button>

                        <p className='mt-4' text-center>
                            Already a member? <a href ="/app/login" className='text-primary'>Login</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
} 

export default RegisterPage;