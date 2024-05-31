
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AboutUsPage from './pages/UserPage';
import HomePage from './pages/HomePage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import DashboardLayout from './components/layouts/DashboardLayout';
import TransferPage from './pages/transfer/TransferPage';
import WithdrawPage from './pages/WithdrawPage';
import DepositPage from './pages/DepositPage';

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
        path: 'transfer',
        element: <TransferPage />,
      },
      {
        path: "withdraw",
        element: <WithdrawPage />
      },
      {
        path: "deposit",
        element: <DepositPage />
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
