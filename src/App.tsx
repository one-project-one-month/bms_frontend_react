import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AboutUsPage from './pages/UserPage';
import HomePage from './pages/HomePage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import DashboardLayout from './components/layouts/DashboardLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
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
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
