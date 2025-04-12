import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
import { userVerifyUserToken } from '@/utils/verify-token';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';

function MyApp(props) {
  const { Component, pageProps } = props;
  userVerifyUserToken();
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <ToastContainer autoClose={2000} />
    </React.Fragment>
  );
}

export default MyApp;
