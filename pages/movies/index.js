import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { useState } from 'react';

export default function Movies({ movies, genres }) {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies =
    selectedGenre === 'all'
      ? movies
      : movies.filter((movie) => movie.genreId === selectedGenre);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        🎬 Movie Gallery
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
        <Chip
          label="All Genres"
          onClick={() => setSelectedGenre('all')}
          color={selectedGenre === 'all' ? 'primary' : 'default'}
          sx={{ m: 0.5 }}
        />
        {genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            onClick={() => setSelectedGenre(genre.id)}
            color={selectedGenre === genre.id ? 'primary' : 'default'}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🎞️ Release Year: {movie.releaseYear}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⭐ Rating: {movie.rating}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => router.push(`/movies/${movie.id}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="success" onClick={() => router.push('/genres')} size="large">
          Browse Genres
        </Button>
        <Button variant="contained" color="primary" onClick={() => router.push('/help')} size="large">
          Go to Help Center
        </Button>
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  try {
    const [moviesRes, genresRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`),
    ]);

    if (!moviesRes.ok || !genresRes.ok) return { notFound: true };

    const movies = await moviesRes.json();
    const genres = await genresRes.json();

    return {
      props: {
        movies,
        genres,
      },
      revalidate: 60, 
    };
  } catch (error) {
    return { notFound: true };
  }
}
