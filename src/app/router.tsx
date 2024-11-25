import { HomePage } from './home/home.page.tsx';
import { RootPage } from './root/root.page.tsx';
import { createHashRouter } from 'react-router-dom';
import { DocsPage } from './docs/docs.page.tsx';
import { TmdbPage } from './tmdb/tmdb.page.tsx';
import { SportPage } from './sport/sport.page.tsx';

export const router = createHashRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/docs',
        element: <DocsPage />,
      },
      {
        path: '/configuration',
        element: <TmdbPage />,
      },
      {
        path: '/tmdb',
        element: <TmdbPage />,
      },
      {
        path: '/sport',
        element: <SportPage />,
      },
    ],
  },
]);
