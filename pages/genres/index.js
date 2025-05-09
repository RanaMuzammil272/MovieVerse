import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from '@mui/material';

export default function GenresPage() {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch('/api/genres');
      const data = await res.json();
      setGenres(data);
      setLoading(false);
    }

    fetchGenres();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        🎭 Browse by Genre
      </Typography>

      <Grid container spacing={3}>
        {genres.map(genre => (
          <Grid item xs={12} sm={6} md={4} key={genre.id}>
            <Card
              onClick={() => router.push(`/genres/${genre.id}`)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" color="primary">
                  {genre.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
