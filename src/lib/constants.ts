import {
  ArrowDownToDot,
  ArrowUpFromDot,
  Forward,
  History,
  Home,
} from 'lucide-react';

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
]);
