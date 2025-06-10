import React,{useState} from 'react';
import './LoginPage.css';

function LoginPage(){
//create useState hook for the variables 
const [Email, setEmail] = useState('');
const [password , setPassword] = useState('');
//create handle function and includes console.log
const handleLogin= async (e)=>{
    e.preventDefault();
}
  


return(
    <div className='container mt-5'>
        <div className='row justify-content-center'>
            <div className='col-md-6 col-lg-4'>
                <div className='login-card p-4 border rounded'>
                    <h2 className='text-center mb-4 font-weight-bold'>Login</h2>
                    {/*Email*/}
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input
                        id="email"
                        type="email"
                        className='form-control'
                        placeholder='Enter Your Email'
                        value={Email}
                        onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    {/*password*/}
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input 
                        id="password"
                        type="password"
                        className='form-control'
                        placeholder='Enter Your Password'
                        value ={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    {/*button*/}
                    <button className='btn btn-primary w-100 mb-3'onClick={handleLogin}>Login</button>
                       <p className='mt-4 text-center'>
                        New here? <a href='/app/register' className='text-primary'>Register Here</a>
                       </p>

                </div>
            </div>
        </div>

    </div>

)
}
export default LoginPage;