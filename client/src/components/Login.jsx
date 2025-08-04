import React, { useContext, useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import upload_area from '../assets/upload_area.svg';
import { IoMdClose } from "react-icons/io";
import { AppContext } from '../context/AppContext';

const Login = () => {

    const {setShowLogin} = useContext(AppContext);

    const[state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(false);
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        if(state == "Sign Up" && !isTextDataSubmitted){
            setIsTextDataSubmitted(true);
        }
    }

    useEffect(()=> {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state} Form</h1>
                <p className='text-sm'>Welcome back! Please sign in to continue</p>
                {state === "Sign Up" && isTextDataSubmitted
                ? <>
                    <div className='flex items-center gap-4 my-10'>
                        <label htmlFor="image">
                            <img className='w-16 rounded-full cursor-pointer' src={image ? URL.createObjectURL(image) : upload_area} alt="" />
                            <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                        </label>
                        <p>Upload Profile <br /> Picture</p>
                    </div>
                </>
                : <>
                    {state !== 'Login' && (
                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <FaUser />
                            <input className='outline-none text-sm' onChange={e => setName(e.target.value)} type="text" placeholder='Name' required value={name} />
                        </div>
                    )}
                    <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                        <MdEmail />
                        <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} type="email" placeholder='Email Id' required value={email} />
                    </div>
                    <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                        <RiLockPasswordLine />
                        <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} type="password" placeholder='Enter password' required value={password} />
                    </div>
                </>}
                {state === "Login" && <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forgot password?</p>}
                <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
                    {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'Next'}
                </button>
                {
                    state === 'Login'
                    ? <p className='mt-5 text-center '>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState("Sign Up")}>Sign Up</span></p>
                    : <p className='mt-5 text-center '>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState("Login")}>Login</span></p>
                }
                <IoMdClose onClick={() => setShowLogin(false)} className="absolute top-5 right-5 text-xl text-gray-600 hover:text-red-500 cursor-pointer"/>
            </form>
        </div>
    )
}

export default Login