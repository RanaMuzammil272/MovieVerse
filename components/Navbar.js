import { AppBar, Toolbar, Typography, Button, IconButton, useTheme, Box } from '@mui/material';
import { Brightness4, Brightness7, Movie, Person, Category, Help } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useTheme as useCustomTheme } from '../context/ThemeContext';

export default function Navbar() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useCustomTheme();
  const theme = useTheme();

  const navItems = [
    { label: 'Movies', path: '/movies', icon: <Movie /> },
    { label: 'Directors', path: '/directors', icon: <Person /> },
    { label: 'Genres', path: '/genres', icon: <Category /> },
    { label: 'Help', path: '/help', icon: <Help /> },
  ];

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 'bold',
            '&:hover': {
              opacity: 0.8,
            },
          }}
          onClick={() => router.push('/')}
        >
          MovieVerse
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => router.push(item.path)}
              startIcon={item.icon}
              sx={{
                mx: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}

          <IconButton 
            color="inherit" 
            onClick={toggleDarkMode}
            sx={{
              ml: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 