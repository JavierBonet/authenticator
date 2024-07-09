import { useState, useContext, useEffect } from 'react';
import { Movie } from '../../../../common/interfaces';
import EntitiesApi from '../../api/entitiesApi';
import TokenContext from '../../contexts/TokenContext';
import { CircularProgress } from '@mui/material';
import MoviesTable from './Movies/MoviesTable';
import styles from './Movies.module.scss';
import { toast } from 'react-toastify';

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { setToken, tokenRef } = useContext(TokenContext);
  const entitiesApi = new EntitiesApi(setToken, () => tokenRef.current);

  useEffect(() => {
    setLoading(true);
    entitiesApi
      .getMovies()
      .then((response) => {
        setMovies(response.movies);
      })
      .catch(() => toast.warn('Could not load movies'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles['movies-table']}>
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <MoviesTable movies={movies} />
      )}
    </div>
  );
};

export default Movies;
