import React from 'react'
import {
    List,
    WorkOutlineOutlined,
    ShoppingCart,
    DashboardOutlined,
    RoomServiceSharp,
    AccountCircle,
    Storefront,
    LocationOn,
} from '@material-ui/icons'

export default [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardOutlined />,
    },
    {
        name: 'OSs',
        path: '/os',
        icon: <RoomServiceSharp />,
    },
    {
        name: 'Clientes',
        path: '/clients',
        icon: <AccountCircle />,
    },
    {
        name: 'Coloboradores',
        path: '/contributors',
        icon: <WorkOutlineOutlined />,
    },
    {
        name: 'Localizaçoes',
        path: '/location',
        icon: <LocationOn />,
    }
]
