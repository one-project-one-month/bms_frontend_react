import { History, Home, User } from 'lucide-react';

export const endpoints = Object.freeze({
  staff: {
    login: '/login',
  },
});

export const navLinks = Object.freeze([
  {
    route: '/',
    Icon: Home,
    routeName: 'Home',
  },
  {
    route: '/user',
    Icon: User,
    routeName: 'User',
  },
  {
    route: '/transactionHistory',
    Icon: History,
    routeName: 'TransactionHistory',
  },
]);
