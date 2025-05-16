import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';

export default function GenresPage({ genres }) {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        🎭 Browse by Genre
      </Typography>

      <Grid container spacing={3}>
        {genres.map((genre) => (
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

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`);
    if (!res.ok) {
      return { notFound: true };
    }

    const genres = await res.json();

    return {
      props: {
        genres,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
