import { lazy } from 'react'
export default {
    WELCOME: {
        PATH: '/welcome',
        COMPONENT: lazy(() => import('../pages/Welcome')),
        EXACT: true,
    },
    CLIENTS: {
        PATH: '/clients',
        COMPONENT: lazy(() => import('../pages/Clients')),
        EXACT: true,
    },
    CONTRIBUTORS: {
        PATH: '/contributors',
        COMPONENT: lazy(() => import('../pages/Contributors')),
        EXACT: true,
    },
    OS: {
        PATH: '/',
        COMPONENT: lazy(() => import('../pages/Os')),
        EXACT: true,
    },
    DASHBOARD: {
        PATH: '/dashboard',
        COMPONENT: lazy(() => import('../pages/Dashboard')),
        EXACT: true,
    },
    LOCATION: {
        PATH: '/location',
        COMPONENT: lazy(() => import('../pages/Locations')),
        EXACT: true,
    },
}
