import { FaqPage } from './faq/faq.page.tsx';
import { HomePage } from './home/home.page.tsx';
import { RootPage } from './root/root.page.tsx';
import { createHashRouter } from 'react-router-dom';
import { DocsPage } from './docs/docs.page.tsx';
import { ConfigurationPage } from './configuration/configuration.page.tsx';

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
        path: '/faq',
        element: <FaqPage />,
      },
      {
        path: '/docs',
        element: <DocsPage />,
      },
      {
        path: '/configuration',
        element: <ConfigurationPage />,
      },
    ],
  },
]);
