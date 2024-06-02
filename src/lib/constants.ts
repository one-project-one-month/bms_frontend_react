import {
  ArrowDownToDot,
  ArrowUpFromDot,
  Forward,
  History,
  Home,
  User,
} from 'lucide-react';

// endpoints
export const endpoints = Object.freeze({
  staff: {
    login: '/login',
  },
});

// side bar navigation links
export const navLinks = Object.freeze([
  {
    route: '/',
    Icon: Home,
    routeName: 'Home',
  },
  {
    route: '/transfer',
    Icon: Forward,
    routeName: 'Transfer',
  },
  {
    route: '/deposit',
    Icon: ArrowDownToDot,
    routeName: 'Deposit',
  },
  {
    route: '/withdraw',
    Icon: ArrowUpFromDot,
    routeName: 'Withdraw',
  },
  {
    route: '/transactionHistory',
    Icon: History,
    routeName: 'TransactionHistory',
  },
  {
    route: '/users',
    Icon: User,
    routeName: 'Users',
  },
]);
