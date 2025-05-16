import Link from 'next/link';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
} from '@mui/material';

export async function getServerSideProps({ params }) {
  const genreId = params.id;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres/${genreId}`);

    if (!res.ok) return { notFound: true };

    const { genre, movies } = await res.json();

    return {
      props: {
        genre,
        movies,
      },
    };
  } catch (err) {
    console.error('Error fetching genre:', err);
    return { notFound: true };
  }
}

export default function GenrePage({ genre, movies }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom color="primary">
        🎭 {genre.name} Movies
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card 
              elevation={3}
              sx={{
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardActionArea component={Link} href={`/movies/${movie.id}`}>
                <CardContent>
                  <Typography variant="h6" component="h2" color="primary" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Release Year: {movie.releaseYear}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {movie.rating}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
