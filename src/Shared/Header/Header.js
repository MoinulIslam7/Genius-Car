import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';


const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log('context', user);
    console.log(user?.photoURL);

    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error));
    }

    const menuItem = <>
        <li className='font-semibold'><Link to='/'>Home</Link></li>
    </>

    return (
        <div>
            <div className="navbar h-32  mb-12 bg-blue-500">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItem}
                            {
                                user?.uid
                                    ?
                                    <>
                                    <Link to='/orders' className="btn btn-ghost normal-case text-xl mt-0">Orders</Link>
                                     <Link onClick={handleSignOut} className="btn btn-ghost normal-case text-xl mt-0">Sign Out</Link>
                                     
                                     
                                    </>
                                    :
                                    <>
                                        <Link to='/login'>
                                            <button className='btn btn-ghost normal-case text-xl'>Log In</button>
                                        </Link>
                                        <Link to='/signup'>
                                            <button className='btn btn-ghost normal-case text-xl'>SignUp</button>
                                        </Link>
                                    </>
                            }
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost  "><img src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItem}
                        <div className='w-52'>
                            {
                                user?.uid
                                    ?
                                    <Link onClick={handleSignOut} className="btn btn-ghost normal-case text-xl mt-0">Sign Out</Link>
                                    :
                                    <>
                                        <Link to='/login'>
                                            <button className='btn btn-ghost normal-case text-xl'>Log In</button>
                                        </Link>
                                        <Link to='/signup'>
                                            <button className='btn btn-ghost normal-case text-xl'>SignUp</button>
                                        </Link>
                                    </>
                            }
                        </div>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='flex roundedCircle'>
                        {
                            user?.photoURL ?
                                <>
                                    {user?.photoURL && <img className='w-8 h-8 mx-2 mt-2 rounded-full' title={user.displayName} src={user?.photoURL} alt="" />
                                    }
                                </>
                                :
                                <>
                                    {user?.email && <p className='text-2xl'>welcome, {user.email}</p>}
                                </>

                        }
                    </div>
                    <div>
                        <Link className="btn"><button className="btn btn-active">Appointment</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;