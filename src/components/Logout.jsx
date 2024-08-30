import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Logout = () => {

    const { logOut } = UserAuth();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleLogoutConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCancelLogout = () => {
        setShowConfirmation(false);
    };

    const handleLogOut = async (e) => {
        e.preventDefault()
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.log(error);
            console.log("logging out failed");
        }
    }


    return (
        <div>
            <button className='text-white rounded px-4 py-2 text-lg md:px-6 md:py-3 md:text-lg' onClick={handleLogoutConfirmation}>Logout</button>
            {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full p-10 flex justify-center items-center bg-black bg-opacity-50" onClick={handleCancelLogout}>
                    <div className="bg-white p-6 rounded ">
                        <p className="mb-4">Are you sure you want to logout?</p>
                        <div className='flex justify-center items-center'>
                            <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogOut}>Logout</button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded" onClick={handleCancelLogout}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;
