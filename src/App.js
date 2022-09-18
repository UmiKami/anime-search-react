import "./App.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useEffect } from "react";

function App() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleTitleEnter = (hoverEvent) => {
      hoverEvent.target.scroll(0, 41)
    }
    const handleTitleOut = (hoverEvent) => {
      hoverEvent.target.scroll(0, 0)
    }

    const handleSubmit = (submitEvent) => {
        setLoading(true);
        submitEvent.preventDefault();
        let inputVal = submitEvent.target[0].value;

        axios
            .get(
                `https://kitsu.io/api/edge/anime?page[limit]=20&filter[text]=${inputVal}`
            )
            .then((res) => {
                setAnimeList(res.data.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        axios
            .get("https://kitsu.io/api/edge/anime?page[limit]=20")
            .then((res) => {
                setAnimeList(res.data.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

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
                                  <div
                                      className="d-flex flex-column col-md-3 mb-4 position-relative"
                                      key={uuidv4()}
                                  >
                                      {!loading ? (
                                          <>
                                              {anime.attributes.status ===
                                              "finished" ? (
                                                  <span class="badge bg-danger position-absolute m-2 fs-6">
                                                      Finished
                                                  </span>
                                              ) : anime.attributes.status ===
                                                "current" ? (
                                                  <span class="badge bg-success position-absolute m-2 fs-6">
                                                      Airing
                                                  </span>
                                              ) : (
                                                  <span class="badge bg-warning position-absolute m-2 fs-6">
                                                      Coming Soon
                                                  </span>
                                              )}
                                              <img
                                                  src={
                                                      anime.attributes
                                                          .posterImage.large
                                                  }
                                                  alt="anime poster"
                                              />
                                              <p className="fs-4 bg-primary text-light mb-0 anime-title" onMouseEnter={handleTitleEnter} onMouseOut={handleTitleOut}>
                                                  {Object.values(
                                                      anime.attributes.titles
                                                  )[0]
                                                      ? Object.values(
                                                            anime.attributes
                                                                .titles
                                                        )[0]
                                                      : Object.values(
                                                            anime.attributes
                                                                .titles
                                                        )[1]}
                                              </p>
                                              <p className="bg-secondary text-light card-description">
                                                  {anime.attributes.description}
                                              </p>
                                          </>
                                      ) : (
                                          <div className="d-flex justify-content-center">
                                              <div
                                                  className="spinner-border"
                                                  role="status"
                                                  style={{
                                                      color: "darkorange",
                                                  }}
                                              >
                                                  <span className="visually-hidden">
                                                      Loading...
                                                  </span>
                                              </div>
                                          </div>
                                      )}
                                  </div>
                              );
                          })
                        : ""}
                </div>
            </div>
        </div>
    );
}

export default App;
