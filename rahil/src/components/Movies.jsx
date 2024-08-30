import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import requests from '../Request';
import axios from 'axios';

const Movies = ({ item, id, liked }) => {
    const [like, setLike] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const [saved, setSaved] = useState(false);

    const [isHovered, setIsHovered] = useState(false);

    const { user } = UserAuth();

    const movieID = doc(db, 'users', `${user?.email}`);

    useEffect(() => {
        setLike(liked);
    }, [liked]);

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like);
            setSaved(true);
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.backdrop_path,
                }),
            });
        } else {
            alert('Please login to save the movies');
        }
    };

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmUzMjc0NjA4OGEzOGI1ZDY4NWNjZDBiZjY4ZjFhZSIsInN1YiI6IjYyN2U5ZjAyMjBlNmE1MzQ4NzY0MjgwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ObVxE9-uf5SeJLkegTfAvSCPbDMIve7he3fMF3x1S68',
        },
    };

    const playVideo = async (itemID) => {
        setShowVideo(true);
        try {
            const response = await axios(
                `${requests.GetVideo}${itemID}/videos?language=en-US`,
                options
            );
            if (response.data.results.length > 0) {
                setVideoURL(response.data.results[0].key);
            } else {
                console.error('No video found for this movie.');
            }
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };

    return (
        <div
            // onClick={() => playVideo(item.id)}
            // key={id}
            className='cursor-pointer min-w-[250px] inline-block'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                className={`rounded-lg w-[270px] ${isHovered ? "scale-[3]" : ""}`}
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                alt={item?.original_title}
            />
            <div className={`bg-hover-card-ash ${isHovered ? "hidden" : "hidden"}`}>
                <h1 className='font-bold text-md text-white mb-2'>{item?.original_title}</h1>
                <button className='bg-white text-black px-4 py-2 rounded-lg mb-2 w-full'>Play</button>
                <button className='bg-gray-500 text-white px-4 py-2 rounded-lg mb-2 w-full'>Add to List</button>
                <p className='text-sm mb-2'>3h 24m | HD</p>
                <p className='text-sm mb-2'>Violent • Notable Soundtrack • Revenge</p>
            </div>
        </div>
    );
};

export default Movies;





//   {/* Main Image */}
//   <img
//   className='rounded-lg w-[270px] transition-transform duration-300 ease-in-out'
//   src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
//   alt={item?.original_title}
// />

// {/* Hover Card */}
// <div
//   className='absolute top-0 left-0 w-[330px]  bg-hover-card-ash text-white opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:translate-y-[-20%] group-hover:translate-x-[-10%] z-10 shadow-lg rounded-lg'
//   style={{ overflow: 'visible' }}
// >
//   <img
//       className='rounded-tl-lg rounded-tr-lg w-full mb-4'
//       src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
//       alt={item?.original_title}
//   />
//   <h1 className='font-bold text-md text-white mb-2'>{item?.original_title}</h1>
//   <button className='bg-white text-black px-4 py-2 rounded-lg mb-2 w-full'>Play</button>
//   <button className='bg-gray-500 text-white px-4 py-2 rounded-lg mb-2 w-full'>Add to List</button>
//   <p className='text-sm mb-2'>3h 24m | HD</p>
//   <p className='text-sm mb-2'>Violent • Notable Soundtrack • Revenge</p>
// </div>





{/* <div className='absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black/80 hover:opacity-100 flex items-center justify-center'>
                <h1 className='font-bold text-md text-white'>{item?.original_title}</h1>
                <p onClick={saveShow}>
                    {like ? (
                        <FaHeart
                            className='absolute top-3 left-3 text-lg text-gray-300'
                            onClick={() => setLike(false)}
                        />
                    ) : (
                        <FaRegHeart
                            className='absolute top-3 left-3 text-lg text-gray-300'
                            onClick={() => setLike(true)}
                        />
                    )}
                </p>
            </div> */}



{/* {showVideo && (
                <div className='fixed top-0 left-0 w-full h-full p-10 flex justify-center items-center bg-black bg-opacity-80 z-40' onClick={() => setShowVideo(false)}>
                    <iframe
                        width='560'
                        height='315'
                        src={`https://www.youtube.com/embed/${videoURL}`}
                        title='YouTube video player'
                        allow='autoplay;'
                        allowFullScreen
                        style={{ pointerEvents: 'auto' }}
                        className='cursor-none'
                        onClick={(e) => e.stopPropagation()}
                    ></iframe>
                </div>
            )} */}