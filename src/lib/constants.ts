import {
  ArrowRightLeft,
  Forward,
  History,
  Home,
  User,
} from 'lucide-react';

// endpoints
export const endpoints = Object.freeze({
  staff: {
    login: '/admins/login',
  },
  transfer : {
    submit : 'admins/transfer'
  }
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
    route: '/transaction',
    Icon: ArrowRightLeft,
    routeName: 'Deposit/Withdraw'
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
