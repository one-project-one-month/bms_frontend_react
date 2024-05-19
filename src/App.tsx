import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AboutUsPage from './pages/AboutUsPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'about',
    element: <AboutUsPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
