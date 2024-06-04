import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import DashboardLayout from './components/layouts/DashboardLayout';
import TransferPage from './pages/TransferPage';
import WithdrawPage from './pages/WithdrawPage';
import DepositPage from './pages/DepositPage';

import UserPage from './pages/UserPage';
import CreateUserPage from './pages/CreateUserPage';
import UpdateUserPage from './pages/UpdateUserPage';
import ProtectedRoute from './components/layouts/ProtectedRoute';

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
        path: 'withdraw',
        element: <WithdrawPage />,
      },
      {
        path: 'deposit',
        element: <DepositPage />,
      },
      {
        path: 'transactionHistory',
        element: <TransactionHistoryPage />,
      },
      {
        path: 'users',
        element: <UserPage />,
      },
      {
        path: 'users/create',
        element: <CreateUserPage />,
      },
      {
        path: 'users/update',
        element: <UpdateUserPage />,
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
