import useSWR from 'swr';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  CircularProgress,
} from '@mui/material';

const fetcher = url => fetch(url).then(res => res.json());

export default function AllDirectorsPage() {
  const router = useRouter();
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">Failed to load directors.</Typography>
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
      <Typography variant="h3" component="h1" gutterBottom align="center">
        🎬 All Directors
      </Typography>

      <List>
        {data.map(director => (
          <ListItem key={director.id} disablePadding>
            <ListItemButton onClick={() => router.push(`/directors/${director.id}`)}>
              <ListItemText 
                primary={director.name}
                primaryTypographyProps={{
                  variant: 'h6',
                  color: 'primary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
