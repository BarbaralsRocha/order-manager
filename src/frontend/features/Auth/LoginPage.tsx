import React, { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { env } from 'process';

const LoginPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const redirectPath =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_FRONTEND_URL
      : process.env.REACT_APP_FRONTEND_URL_HML;

  console.log({ redirectPath, env: process.env.NODE_ENV });
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Button
          onClick={() => loginWithRedirect()}
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          Login HML com Auth0
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
