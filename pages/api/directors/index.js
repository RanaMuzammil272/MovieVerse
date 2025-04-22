// pages/api/directors.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const { movieId, directorId } = req.query;

  if (movieId) {
    const movie = data.movies.find(m => m.id === movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const director = data.directors.find(d => d.id === movie.directorId);
    if (!director) {
      return res.status(404).json({ error: 'Director not found' });
    }

    const moviesByDirector = data.movies.filter(m => m.directorId === director.id);
    const directorWithMovies = {
      ...director,
      movies: moviesByDirector.map(m => ({ id: m.id, title: m.title }))
    };

    return res.status(200).json(directorWithMovies);
  }

  if (directorId) {
    const director = data.directors.find(d => d.id === directorId);
    if (!director) {
      return res.status(404).json({ error: 'Director not found' });
    }

    const moviesByDirector = data.movies.filter(m => m.directorId === director.id);
    const directorWithMovies = {
      ...director,
      movies: moviesByDirector.map(m => ({ id: m.id, title: m.title }))
    };

    return res.status(200).json(directorWithMovies);
  }

  const allDirectors = data.directors.map(d => {
    const directedMovies = data.movies.filter(m => m.directorId === d.id);
    return {
      ...d,
      movies: directedMovies.map(m => ({ id: m.id, title: m.title }))
    };
  });

  return res.status(200).json(allDirectors);
}
