// frontend/features/Auth/CallbackPage.tsx
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const CallbackPage: React.FC = () => {
  const { handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processLogin = async () => {
      await handleRedirectCallback();
      // redireciona para a página inicial (ou outra rota)
      navigate('/', { replace: true });
    };
    processLogin();
  }, [handleRedirectCallback, navigate]);

  return <div>Processando login...</div>;
};

export default CallbackPage;
