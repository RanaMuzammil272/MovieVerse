import { useRouter } from 'next/router';
import { Box, Typography, Button, Container, Paper } from '@mui/material';

export default function Home() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/movies');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1740&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }}
      />

      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            🎬 Welcome to MovieVerse
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'grey.300' }}>
            Explore top-rated movies, genres, and directors from all over the world.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleEnter}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: '50px',
            }}
          >
            Explore
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
