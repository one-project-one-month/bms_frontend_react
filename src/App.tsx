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

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
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
        path: 'user',
        element: <UserPage />,
      },
      {
        path: 'user/create',
        element: <CreateUserPage />,
      },
      {
        path: 'user/update',
        element: <UpdateUserPage />,
      },
      {
        path: 'transactionHistory',
        element: <TransactionHistoryPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
