import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import DashboardLayout from './components/layouts/DashboardLayout';
import TransferPage from './pages/TransferPage';
import UserPage from './pages/UserPage';
import ProtectedRoute from './components/layouts/ProtectedRoute';
import TransactionPage from './pages/TransactionPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'transfer',
        element: <TransferPage />,
      },
      {
        path: 'transaction',
        element: <TransactionPage />,
      },
      {
        path: 'transactionHistory',
        element: <TransactionHistoryPage />,
      },
      {
        path: 'users',
        element: <UserPage />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
