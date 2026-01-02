import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../common/Http';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';

const Login = () => {
    
    const {login}=useContext(AdminAuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log(data);

        const res = await fetch(`${apiUrl}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);

            if(result.status===200){
              const adminInfo={
                token:result.token,
                id:result.id,
                name:result.name
              }
              localStorage.setItem('adminInfo',JSON.stringify(adminInfo))
              login(adminInfo);
            toast.success('Login Successful')
              navigate('/admin/dashboard');
            }
            else{
                toast.error(result.message)
            }
            
        })
        // try {
        //     const res = await fetch(`${apiUrl}/admin/login`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     });
        //     const result = await res.json();

        //     if (res.status===200) { // Check for HTTP status directly
        //         const adminInfo = {
        //             token: result.token,
        //             id: result.id,
        //             name: result.name,
        //         };
        //         navigate('/admin/dashboard');
        //         localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
        //         // Redirect after successful login
        //         toast.success("Login successful!"); // Optional success message
        //     } else {
        //         console.error(result.message); // Debug API response
        //         toast.error(result.message); // Show error message
        //     }
        // } catch (error) {
        //     console.error("Login error:", error);
        //     toast.error("Something went wrong. Please try again."); // Handle fetch or network errors
        // }
    };

    return (
        <div>
            <div className="container d-flex justify-content-center py-5">
                <div className="card shadow border-0 login">
                    <div className="card-body p-4">
                        <h3>Admin Login</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                            <button type="submit" className="btn btn-primary d-flex justify-content-end ">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
