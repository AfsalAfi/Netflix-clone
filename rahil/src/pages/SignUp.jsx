import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function SignUp() {

    const { user, signUp } = UserAuth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signUp(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
            console.log("Account creation failed");
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='absolute w-full h-screen bg-black/60'></div>
            <img className='hidden sm:block w-full h-screen object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
            <div className='absolute rounded-md w-[450px] h-[600px] bg-black opacity-70 flex items-center justify-center'>
                <div className='absolute rounded-md w-[350px] h-[500px]'>
                    <h1 className='text-white font-extrabold text-3xl py-4'>Sign Up</h1>
                    <form action="post" onSubmit={handleSubmit} className='flex flex-col'>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='bg-slate-600 h-11 py-5 px-3 text-black rounded placeholder-white' />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='bg-slate-600 h-11 my-3 py-5 px-3 text-black rounded placeholder-white' />
                        <button type='submit' className='bg-red-700 text-white rounded cursor-pointer my-3 h-11 font-bold text-l'>Sign Up</button>
                        <div className='my-6 text-white flex justify-between'>
                            <p className='text-white text-sm'><input type="checkbox" /> Remember me</p>
                            <p className='text-white text-sm'> Need Help?</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <p className='text-white text-sm'> Already have an account? <span onClick={() => navigate('/sign-in')} className='text-gray-400 cursor-pointer'>Sign-In</span></p>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default SignUp