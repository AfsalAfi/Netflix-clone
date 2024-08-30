import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import axios from 'axios';
import Movies from './Movies';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { onSnapshot, doc } from 'firebase/firestore';


const Row = ({ title, fetchURL, rowId }) => {

    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const { user } = UserAuth();


    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            console.log(response);
            setMovies(response.data.results);
        })
    }, [fetchURL])

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setSavedMovies(doc.data()?.savedShows);
        })
    }, [user?.email])

    // console.log(savedMovies);

    const slideLeft = () => {
        const slider = document.getElementById('slider' + rowId);
        if (slider) {
            slider.scrollLeft -= 500; // Adjust this value if necessary
        }
    };

    const slideRight = () => {
        const slider = document.getElementById('slider' + rowId);
        if (slider) {
            slider.scrollLeft += 500; // Adjust this value if necessary
        }
    };

    useEffect(() => {
        console.log(`Slider ID: ${'slider' + rowId}`);
    }, [rowId]);

    return (
        <div className='mx-10 my-5'>
            <h2 className='text-white font-bold md:text-2xl px-4 py-2 font-mono'>{title}</h2>
            <div className='p-2 group'>
                <div className='flex'>
                    {/* <MdChevronLeft
                        className='absolute left-0 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100 bg-white rounded-full text-4xl z-20 hidden group-hover:block'
                        onClick={slideLeft}
                    /> */}
                    {/* <div
                        id={'slider' + rowId}
                        className='flex scroll-smooth scrollbar-hide space-x-2 z-100 overflow-x-scroll'
                    > */}
                    {movies.map((item, id) => {
                        const liked = savedMovies?.some((savedItem) => savedItem.id === item.id);
                        return (
                            <Movies
                                key={id}
                                item={item}
                                id={id}
                                liked={liked}
                            />
                        );
                    })}
                    {/* </div> */}
                    {/* <MdChevronRight
                        className='absolute right-0 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100 bg-white rounded-full text-4xl z-20 hidden group-hover:block'
                        onClick={slideRight}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default Row




{/* <h2 className="text-white font-bold md:text-2xl font-mono">{title}</h2> */ }