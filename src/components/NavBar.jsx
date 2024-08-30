import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Logout from './Logout';

import netflixLogo from '../assets/images/logo.svg'
import DownArrow from './DownArrow';
import Icon from './Icon';


function NavBar() {

    const { user } = UserAuth();

    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);



    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    if (loading) {
        return <></>;
    }

    const toggleDropdown = () => setIsOpen(!isOpen);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };


    return (
        <div className={`flex px-10 py-4 justify-between fixed z-20 w-full transition-colors  duration-300 ease-in-out ${isScrolled ? 'bg-hover-card-ash' : 'bg-transparent'}`} style={{ backdropFilter: `${isScrolled ? 'blur(10px)' : 'blur(0px)'}` }} >

            <Link to='/'>
                <img src={netflixLogo} alt="" width={"100px"} />
            </Link>
            {user?.email ? (
                <div className="flex relative gap-6 text-left pr-3">
                    <Icon
                        color="#ffffff"
                        className="search-icon"
                        path="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
                    />

                    <p className='text-white font-bold'>Children</p>

                    {/* Bell Icon */}
                    <Icon
                        color="#ffffff"
                        className="bell-icon"
                        path="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z"
                    />
                    <div className='flex items-center' onClick={toggleDropdown}>
                        <img
                            className='rounded-sm w-[30px] md:w-[30px] cursor-pointer'
                            src="https://occ-0-3195-3663.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4"
                            alt="User"
                            aria-expanded={isOpen}
                        />
                        <DownArrow />

                    </div>
                    {isOpen && (
                        <div
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                        >
                            <div className="py-1" role="none">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-0"
                                >
                                    Account settings
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-1"
                                >
                                    Support
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-2"
                                >
                                    License
                                </a>
                                <form method="POST" action="#" role="none">
                                    <button
                                        type="submit"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="menu-item-3"
                                    >
                                        Sign out
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                // <div className={menuVisible ? 'bg-black/60 rounded-2xl w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex justify-end' : ''} >
                //     <div className=''>
                //         <img
                //             className='rounded-sm w-[30px] md:w-[30px] cursor-pointer'
                //             src="https://occ-0-3195-3663.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4"
                //             alt="User"
                //             onClick={toggleMenu}
                //         />
                //     </div>
                //     {menuVisible && (
                //         <div className='absolute top-20 md:top-24 right-10'>
                //             <Link to='/account'>
                //                 <button className='bg-red-700 text-white rounded cursor-pointer text-lg px-3 md:px-6 md:py-3 md:text-lg'>Account</button>
                //             </Link>
                //             {/* <div onClick={handleLogOut}>    
                //                 <button className='text-white rounded px-4 py-2 text-lg md:px-6 md:py-3 md:text-lg'>Log out</button>
                //             </div> */}
                //             <Logout />
                //         </div>
                //     )}
                // </div>
            ) : (
                <div className='flex py-3'>
                    <Link to='/sign-in'>
                        <button className='text-white rounded px-4 text-md md:px-6 md:py-3 md:text-lg'>Sign In</button>
                    </Link>
                    <Link to='/sign-up'>
                        <button className='bg-red-700 text-white rounded cursor-pointer text-md px-3 md:px-6 md:py-3 md:text-lg'>Sign Up</button>
                    </Link>
                </div>
            )
            }

        </div >
    )
}

export default NavBar