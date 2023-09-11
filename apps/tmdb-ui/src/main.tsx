import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from '@tanstack/react-router';
import { FC, StrictMode, useMemo } from 'react';
import * as ReactDOM from 'react-dom/client';

import { router } from './app/router';
import { TmdbTheme } from './theme';

const Main: FC = () => {
  const basePath = useMemo(() => {
    const baseUrl = import.meta.env.BASE_URL;

    if (baseUrl === '/') return undefined;
    return baseUrl;
  }, []);

  return (
    <StrictMode>
      <ChakraProvider theme={TmdbTheme}>
        <RouterProvider router={router} basepath={basePath} />
      </ChakraProvider>
    </StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<Main />);
