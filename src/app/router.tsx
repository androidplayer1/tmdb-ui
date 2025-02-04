import { HomePage } from './home/home.page.tsx';
import { RootPage } from './root/root.page.tsx';
import { createHashRouter } from 'react-router-dom';
import { TorrentiePageTsx } from './torrentie/torrentie.page.tsx.tsx';
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
        path: '/configuration',
        element: <TorrentiePageTsx />,
      },
      {
        path: '/torrentie',
        element: <TorrentiePageTsx />,
      },
      {
        path: '/sport',
        element: <SportPage />,
      },
    ],
  },
]);
