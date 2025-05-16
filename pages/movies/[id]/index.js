import Link from 'next/link';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Button,
  Link as MuiLink,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function MovieDetail({ movie, director, genre }) {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          {movie.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {movie.description}
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Box>
            <Typography variant="subtitle1" component="span" fontWeight="bold">
              🎬 Genre:
            </Typography>{' '}
            <Chip label={genre?.name || 'Unknown'} color="primary" variant="outlined" />
          </Box>

          <Box>
            <Typography variant="subtitle1" component="span" fontWeight="bold">
              📅 Release Year:
            </Typography>{' '}
            {movie.releaseYear}
          </Box>

          <Box>
            <Typography variant="subtitle1" component="span" fontWeight="bold">
              ⭐ Rating:
            </Typography>{' '}
            {movie.rating}
          </Box>

          <Box>
            <Typography variant="subtitle1" component="span" fontWeight="bold">
              🎥 Director:
            </Typography>{' '}
            <MuiLink
              component={Link}
              href={`/directors/${director.id}`}
              color="primary"
              underline="hover"
            >
              {director.name}
            </MuiLink>
          </Box>
        </Stack>

        <Button
          component={Link}
          href="/movies"
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          Back to Movies
        </Button>
      </Paper>
    </Container>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`);
  const movies = await res.json();

  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', 
  };
}

export async function getStaticProps({ params }) {
  const movieRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${params.id}`);
  if (!movieRes.ok) return { notFound: true };

  const movie = await movieRes.json();

  const [directorRes, genreRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/directors/${movie.directorId}`),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`),
  ]);

  const directorData = await directorRes.json();
  const genresData = await genreRes.json();
  const genre = genresData.find(g => g.id === movie.genreId);

  return {
    props: {
      movie,
      director: directorData,
      genre: genre || null,
    },
    revalidate: 60, 
  };
}
