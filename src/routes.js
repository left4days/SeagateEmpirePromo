import { AdminPanel } from './modules/Admin';
import { Home } from './modules/Home';
import { AuthPage } from './modules/AuthPage';
import { Policy } from './modules/Policy';

export default [
    {
        path: '/',
        Component: Home,
        exact: true,
    },
    {
        path: '/admin',
        Component: AdminPanel,
    },
    {
        path: '/auth',
        Component: AuthPage,
        componentProps: {
            authType: 'auth',
        },
    },
    {
        path: '/policy',
        Component: Policy,
        componentProps: {
            authType: 'auth',
        },
    },
    {
        path: '/register',
        Component: AuthPage,
        componentProps: {
            authType: 'register',
        },
    },
];
