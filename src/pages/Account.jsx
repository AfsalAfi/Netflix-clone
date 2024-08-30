import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';

function Account() {

    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();
    const movieRef = doc(db, 'users', `${user?.email}`)

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows);
        })
    }, [user?.email])

    const deleteShow = async (id) => {
        try {
            const update = movies.filter((item) => item.id !== id)
            await updateDoc(movieRef, {
                savedShows: update
            })

        } catch (error) {

        }
    }


    const slideLeft = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    const slideRight = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500;
    }
    return (
        <div>
            <div className='flex items-center justify-center '>
                <div className='absolute w-full h-[400px] md:h-[450px] bg-black/60'></div>
                <img className=' w-full h-[400px] md:h-[450px] object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
            </div>
            <div className='mx-2 mb-2'>
                <h2 className='text-white font-bold md:text-4xl px-2 py-2'>My Shows</h2>
                <div className='px-2 relative group'>
                    <div className='relative'>
                        <MdChevronLeft className='absolute left-0 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100 bg-white rounded-full text-4xl z-20 hidden group-hover:block' onClick={slideLeft} />
                        <div id={'slider'} className='flex overflow-x-auto scroll-smooth scrollbar-hide space-x-2'>
                            {movies?.map((item, id) => (
                                <div key={id} className='flex-shrink-0 w-[250px] cursor-pointer relative '>
                                    <div className='absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black/80 hover:opacity-100 flex items-center justify-center'>
                                        <h1 className='font-bold text-md text-white'>{item?.title}</h1>
                                        <AiOutlineClose className='absolute top-3 right-3 text-lg text-gray-300' onClick={() => deleteShow(item.id)} />
                                    </div>
                                    <img className='rounded-lg' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                                </div>
                            ))}
                        </div>
                        <MdChevronRight className='absolute right-0 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100 bg-white rounded-full text-4xl z-20 hidden group-hover:block' onClick={slideRight} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Account

