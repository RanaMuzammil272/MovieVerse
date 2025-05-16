import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const fetcher = url => fetch(url).then(res => res.json());

export default function DirectorPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/directors/${id}` : null, fetcher);

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">Failed to load director.</Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          🎬 {data.name}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {data.bio}
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Directed Movies:
        </Typography>

        <List>
          {data.movies.map(movie => (
            <ListItem key={movie.id} disablePadding>
              <MuiLink
                component={Link}
                href={`/movies/${movie.id}`}
                color="primary"
                underline="hover"
                sx={{ width: '100%' }}
              >
                <ListItemText 
                  primary={movie.title}
                  primaryTypographyProps={{
                    variant: 'h6',
                  }}
                />
              </MuiLink>
            </ListItem>
          ))}
        </List>

        <Button
          onClick={() => router.back()}
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 4 }}
        >
          Back
        </Button>
      </Paper>
    </Container>
  );
}
