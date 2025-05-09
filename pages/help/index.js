import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';

export default function HelpHome() {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom color="primary">
        Welcome to the Help Center
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        How can we assist you today?
      </Typography>

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/help/faqs')}>
            <ListItemText 
              primary="FAQs"
              primaryTypographyProps={{
                variant: 'h6',
                color: 'primary',
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/help/contact')}>
            <ListItemText 
              primary="Contact Us"
              primaryTypographyProps={{
                variant: 'h6',
                color: 'primary',
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/help/privacy')}>
            <ListItemText 
              primary="Privacy Policy"
              primaryTypographyProps={{
                variant: 'h6',
                color: 'primary',
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <ListItemButton 
          onClick={() => router.push('/movies')}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <ListItemText 
            primary="Go Back to Movies"
            primaryTypographyProps={{
              variant: 'h6',
              align: 'center',
            }}
          />
        </ListItemButton>
      </Box>
    </Container>
  );
}
  