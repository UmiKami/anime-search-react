import "./App.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useEffect } from "react";
import AnimeCard from "./Components/AnimeCard";
import { useNavigate, useParams } from "react-router-dom";

function App() {
    const navigate = useNavigate();
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { animeTitle } = useParams();

    const handleSubmit = (submitEvent) => {
        let inputVal = submitEvent.target[0].value;
        navigate(`/search/${inputVal}`);
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `https://kitsu.io/api/edge/anime?page[limit]=20${
                    animeTitle ? "&filter[text]=" + animeTitle : ""
                }`
            )
            .then((res) => {
                setAnimeList(res.data.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [animeTitle]);

    console.log(animeList);

    return (
        <div className="App">
            <div className="container mt-5">
                <h1 className="mb-5 text-success">Anime Search</h1>

                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>

                <div className="row mx-0 mt-4" style={{ maxWidth: "100%" }}>
                    {animeList.length !== 0
                        ? animeList.map((anime) => {
                              return (
                                  <AnimeCard
                                      loading={loading}
                                      anime={anime}
                                      key={uuidv4()}
                                  />
                              );
                          })
                        : ""}
                </div>
            </div>
        </div>
    );
}

export default App;
