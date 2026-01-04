import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderInterfaces from '../Header/HeaderInterfaces';
import Menu from '../Navigation/Menu';

function Layout() {
    return (
        <>
            <HeaderInterfaces />
            <Menu />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
