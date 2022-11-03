import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';


const SignUp = () => {
    const [error, setError] = useState('');
    const { createUser, signInWithGoogle, signInWithGitHub, updateUserProfile } = useContext(AuthContext);


    const handleSignUp = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;
        

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                form.reset();
                setError('');
                handleUserUpdateProfile(name, photoURL);
            })
            .catch((error) => {
                console.error("error : ", error);
            })
        
    }
    const handleUserUpdateProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        updateUserProfile(profile)
            .then(() => { })
            .then(error => {
                console.error(error);
            })
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                console.error("error : ", error);
            })
    }
    const handleGitHubSignIn = () => {
        signInWithGitHub()
            .then((result) => {
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                console.error("error : ", error);
            })
    }
    return (
        <div className="hero w-full ">
            <div className="hero-content grid md:grid-cols-2 flex-col lg:flex-row gap-4">
                <div className="lg:text-left">
                    <img className='w-3/4' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
                    <h1 className="text-5xl font-boldn text-center">SignUp</h1>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name='name' type="text" placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input name='photoURL' type="text" placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                            
                        </div>
                        <label className="text-red-800 text-3xl">
                                {error}
                            </label>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />

                        </div>
                    </form>
                    <p className='text-xl p-6'>Already Have an Account? <Link className='text-orange-600 font-bold' to='/login'>Login Here</Link></p>


                    <div className='flex justify-evenly mb-3'>
                            <div>
                                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-success"> Sign in with Google</button>
                            </div>
                            <div>
                                <button onClick={handleGitHubSignIn} className="btn btn-outline btn-success">Sign in with GitHub</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;