import React, { useEffect, useState } from 'react'
import axios from 'axios';
import requests from '../Request';

function Main() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(requests.Popular).then((response) => {
            setMovies(response.data.results);
        })
    }, [])
    const movie = movies[Math.floor(Math.random() * movies.length)];

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + ' ...'
        } else {
            return str
        }
    }

    return (
        <div className='w-full h-[550px] text-white'>
            <div className='w-full h-full'>
                <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
                <div className='absolute top-[20%] p-5 md:p-8'>
                    <h1 className='font-bold text-5xl my-3'>{movie?.original_title}</h1>
                    <button className='text-black border font-semibold py-2 px-2 bg-slate-100 '>Play</button>
                    <button className='text-white border py-2 font-semibold px-2 mx-3'>Watch Later</button>
                    <h3 className='my-3 text-slate-300 text-sm'>Released {movie?.release_date}</h3>
                    <h3 className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[38%]'>{truncateString(movie?.overview, 180)}</h3>
                </div>
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.original_title} />
            </div>
        </div>
    )
}

export default Main