import { useEffect, useState } from "react";

import logo from "../assets/devflix.png"
import searchIcon from "../assets/search.svg"
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"

import "./App.css";
import MovieCard from "../components/movieCard/movieCard";
import Footer from "../components/footer/footer";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    const apiKey = "5ce4c101";
    const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

    useEffect(() => {
        searchMovies("Batman")
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${apiUrl}&s=${title}`);
        const data = await response.json();

        console.log(data);
        setMovies(data.Search);
    };

    const handlekeyPress = (e) => {
        e.key === "Enter" && searchMovies(searchTerm);
    };

    // fetch(apiUrl).then((response) => response.json()).then((data) => console.log(data));
    return (
        <div id="app">
            <div className="logo">DEVFLIX</div>
            <div className="search">
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handlekeyPress} placeholder="Pesquise por filmes" />

                <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 90 90" fill="none">
                <path d="M15 22.5H75V30H15V22.5ZM15 41.25H75V48.75H15V41.25ZM75 60H15V67.5H75V60Z" fill="white"/>
            </svg>
            </div>

                <img src={searchIcon} alt="Icone de pesquisa" onClick={() => searchMovies(searchTerm)}  />

            </div>


    



            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (<MovieCard key={movie.imdbID} movies={movie} />))}
                </div>
            ) : (
                <div className="empty">
                    <h2>Nenhum filme encontrado 😔</h2>
                </div>
            )}
            <Footer link={"https:github.com.br"}></Footer>
        </div>
    );
};

export default App;