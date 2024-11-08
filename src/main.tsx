import './styles.css';

import { FC, StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './app/router.tsx';

const Main: FC = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Main />);
