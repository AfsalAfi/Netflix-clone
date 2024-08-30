const key = '22e32746088a38b5d685ccd0bf68f1ae'
const requests = {
    UpComing: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
    Now_playing: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`,
    Popular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
    TopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
    Trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`,
    GetVideo: `https://api.themoviedb.org/3/movie/`,
}

export default requests