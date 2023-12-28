import { Routes, Route, Outlet } from 'react-router-dom';
import React from 'react'
import AdminPanel from './AdminPanel';
import Admin from './Admin';
import Users from './Users';
import PrivateAdmin from './PrivateAdmin';
import Bills from '../indexPages/Bills';
import EditData from '../indexPages/EditData';
import Editsheet from '../misc/Editsheet';
import ListsSheets from '../misc/ListsSheets';
import Edit from '../indexPages/Edits';
import Extras from './Extras';
import DeleteSheet from '../misc/DeleteSheet';
import DeleteCert from '../Certificate/DeleteCert';

const AdminLayout = () => {
    return (
        <Routes>
            <Route path='/' element={<PrivateAdmin />}>
                <Route index element={<AdminPanel />} />
                <Route path='admins' element={<Admin />} />
                <Route path='users' element={<Users />} />
                <Route path='extras' element={<Outlet />}>
                    <Route index element={<Extras />} />
                    <Route path='editledger' element={<Outlet />}>
                        <Route index element={<Edit />} />
                        <Route path='edit' element={<EditData />} />
                    </Route>
                    <Route path='editmiscsheet' element={<Outlet />}>
                        <Route index element={<ListsSheets />} />
                        <Route path='edit' element={<Editsheet />} />
                    </Route>
                    <Route path='deletemiscsheet' element={<Outlet />}>
                        <Route index element={<ListsSheets />} />
                        <Route path='delete' element={<DeleteSheet />} />
                    </Route>
                    <Route path='deletecertificate' element={<DeleteCert />}/>
                    

                </Route>
            </Route>
        </Routes>
    )
}

export default AdminLayout