import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AboutUsPage from './pages/UserPage';
import HomePage from './pages/HomePage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';

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
    path: 'user',
    element: <AboutUsPage />,
  },
  {
    path: 'transactionHistory',
    element: <TransactionHistoryPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
