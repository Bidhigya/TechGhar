import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { apiUrl } from './common/Http.jsx';
import { toast } from 'react-toastify';
import { AuthContext } from './context/Auth.jsx';
const Logins = () => {
        const { login } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        setError, // <-- make sure to include this
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);

        try {
            const res = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            console.log(result);

            if (result.status === 200) {
                const userInfo = {
                    token: result.token,
                    id: result.id,
                    name: result.name,
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                login(userInfo);
                toast.success('Login Successfully');
                navigate('/account');
            } else if (result.status === 401) {
                // Unauthorized
                toast.error(result.message || 'Wrong credentials');
            } else if (result.status === 400 && result.errors) {
                // Validation errors
                const formErrors = result.errors;
                Object.keys(formErrors).forEach((field) => {
                    setError(field, { message: formErrors[field][0] });
                });
                toast.error(result.message || 'Validation error');
            } else {
                toast.error(result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            toast.error('Network error. Please try again.');
        }
    };
  return (
    <div className="container d-flex justify-content-center py-5">
    <div className="card shadow border-0 login">
                    <div className="card-body p-4">
                        <h3 className='border-bottom pb-1'>Login</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                         
                            <div className="mb-3 mt-3">
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
                                Login
                            </button>
                            <div className="d-flex justify-content-center pt-4 pb-2">
                                Don't have an account? &nbsp; <Link to="/account/register">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
  </div>
  )
}

export default Logins