import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useAuth0CallbackMutation } from '../../commons/redux/services/authApi';
import { setCredentials } from '../../commons/redux/slices/auth.slice';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, getAccessTokenSilently, isLoading } =
    useAuth0();
  const [isInitialized, setIsInitialized] = useState(false);
  const [auth0Callback] = useAuth0CallbackMutation();

  useEffect(() => {
    const setupAuth = async () => {
      if (isAuthenticated && user?.sub && user?.email) {
        try {
          // Obter token do Auth0
          const token = await getAccessTokenSilently();
          console.log('Obtained Auth0 token:', token);
          // Atualizar estado Redux
          dispatch(setCredentials({ token }));

          // Sincronizar usuário com backend
          await auth0Callback({
            sub: user.sub,
            email: user.email,
          });

          setIsInitialized(true);
        } catch (error) {
          console.error('Auth setup failed:', error);
          setIsInitialized(false);
        }
      }
    };

    setupAuth();
  }, [isAuthenticated, user, getAccessTokenSilently, auth0Callback, dispatch]);

  if (isLoading || (!isInitialized && isAuthenticated)) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
