import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setIsLoading(false);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <h3>rating: {movie.rating}</h3>
          <h3>runtime: {movie.runtime} mins</h3>
          <ul>
            {movie.genres &&
              movie.genres.map((genre) => <li key={genre}>{genre}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
