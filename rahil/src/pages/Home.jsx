import React from 'react'
import Main from '../components/Main';
import Row from '../components/Row';
import requests from '../Request';

function Home() {


    return (
        <div className='bg-background '>
            <Main />
            <div className=''>
                <Row rowId='4' title="Trending" fetchURL={requests.Trending} />
                <Row rowId='1' title="Up Coming" fetchURL={requests.UpComing} />
                <Row rowId='2' title="Now Playing" fetchURL={requests.Now_playing} />
                <Row rowId='5' title="Top Rated" fetchURL={requests.TopRated} />
                <Row rowId='4' title="Popular" fetchURL={requests.Popular} />
            </div>
        </div>
    )
}

export default Home









{/* <Row title="Horror" fetchURL={requests.Horror} /> */ }