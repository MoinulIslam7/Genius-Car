import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext);

    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log("Login user : ", user);
                form.reset();
                setError('');
                //get jwt token
                const currentUSer = {
                    email: user.email
                }
                console.log(currentUSer);
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUSer)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        // local storage is the easiest but not the best place t store jwt
                        localStorage.setItem('genius-token', data.token);
                         navigate(from, { replace: true });
                    })


               
            })
            .catch((error) => {
                console.error("error : ", error);
                setError(error.message);
            })
    }
    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid md:grid-cols-2 flex-col lg:flex-row gap-4">
                <div className="lg:text-left">
                    <img className='w-3/4' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
                    <h1 className="text-5xl font-boldn text-center">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="text" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />

                        </div>
                    </form>
                    <p className='text-xl p-6'>New to Genius card? <Link className='text-orange-600 font-bold' to='/signup'>SignUp Here</Link></p>
                    <br />
                    <label className="text-red-800 text-3xl">
                        {error}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Login;