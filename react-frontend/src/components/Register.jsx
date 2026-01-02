import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { apiUrl } from './common/Http.jsx';
import { toast } from 'react-toastify';
const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
  const onSubmit = async (data) => {
         console.log(data);
 
         const res = await fetch(`${apiUrl}/register`, {
             method: 'POST',
             headers: {
                 'Content-type': 'application/json',
             },
             body: JSON.stringify(data),
         }).then(res=>res.json())
         .then(result=>{
             console.log(result);
 
             if(result.status===200){
               
             toast.success('Registered successfully')
               navigate('/account/login');
             }
             else{
                 toast.error(result.message)
             }
             
         })

     };
  return (
    <div className="container d-flex justify-content-center py-5">
    <div className="card shadow border-0 login">
                    <div className="card-body p-4">
                        <h3 className='border-bottom pb-2'>Register</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3 mt-2">
                                <label htmlFor="email" className="form-label">
                                    Username
                                </label>
                                <input
                                    {...register('name', {
                                        required: "The name field is required",
                                       minLength: { value: 3, message: "Username must be at least 3 characters long" },
                                    })}
                                    type="text"
                                    className={`form-control ${errors.name && 'is-invalid'}`}
                                    placeholder="Name"
                                />
                                {errors.name && (
                                    <p className="invalid-feedback">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    {...register('email', {
                                        required: "The email field is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    type="text"
                                    className={`form-control ${errors.email && 'is-invalid'}`}
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className="invalid-feedback">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    {...register('password', { required: "The password field is required" })}
                                    type="password" // Use password input type
                                    className={`form-control ${errors.password && 'is-invalid'}`}
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <p className="invalid-feedback">{errors.password.message}</p>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary w-full">
                                Register
                            </button>
                            <div className="d-flex justify-content-center pt-4 pb-2">
                                Already have an account? &nbsp; <Link to="/account/login">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
  </div>
  )
}

export default Register