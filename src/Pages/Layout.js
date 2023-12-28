import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './Home'
import Private from './Private'
import Public from './Public'
import Contact from './Contact'
import Payment from '../indexPages/Payment'
import Profile from '../indexPages/Profile'
import Enterpeople from '../indexPages/Enterpeople'
import Updatepeople from '../indexPages/Updatepeople'
import Income from '../indexPages/Income'
import Bills from '../indexPages/Bills'
import BillsData from '../indexPages/BillsData'
import Paynow from '../indexPages/Paynow'
import Login from '../Components/Login'
import Misc from '../misc/Misc'
import CreateSheet from '../misc/CreateSheet'
import ListsSheets from '../misc/ListsSheets'
import AddsheetContent from '../misc/AddsheetContent'
import Viewsheet from '../misc/Viewsheet'
import PeopleSection from '../indexPages/PeopleSection'
import AdminLayout from './AdminLayout'
import Certificate from '../Certificate/Certificate'
import Generate from '../Certificate/Generate'
import CertList from '../Certificate/CertList'
const Layout = () => {
    return (
        <Routes>
            <Route path='/' element={<Outlet />}>
                <Route index element={<Home />} />
                <Route path='login' element={<Outlet />}>
                    <Route index element={<Login />} />
                </Route>
                <Route path='contacts' element={<Outlet />}>
                    <Route index element={<Contact />} />
                </Route>
                <Route path='adminpanel/*' element={<AdminLayout  />}/>
                <Route path='payment' element={<Public />}>
                    <Route index element={<Payment />} />
                    <Route path='profile' element={<Profile />} />


                </Route>
                <Route path='peopleinfo' element={<Private />}>
                    <Route index element={<PeopleSection />} />
                    <Route path='addpeople' element={<Enterpeople />} />
                    <Route path='updatepeople' element={<Payment />}/>
                     <Route path='updateprofile' element={<Updatepeople />} />   
                    
                </Route>
                <Route path='bills' element={<Private />}>
                    <Route index element={<Bills />} />
                    <Route path='generatedbill' element={<BillsData />} />
                    
                </Route>
                <Route path='income' element={<Private />}>
                    <Route index element={<Income />} />
                </Route>
                <Route path='expense' element={<Private />}>
                    <Route index element={<Income />} />
                </Route>
                <Route path='paynow' element={<Private />}>
                    <Route index element={<Paynow />} />
                </Route>
                <Route path='misc' element={<Private />}>
                    <Route index element={<Misc />} />
                    <Route path='createsheet' element={<CreateSheet />} />

                    <Route path='addsheetdata' element={<ListsSheets />} />
                    <Route path='add' element={<AddsheetContent />} />
                    <Route path='viewsheetdata' element={<ListsSheets />} />
                    <Route path='view' element={<Viewsheet />} />
                </Route>
                <Route path='certificate' element={<Private />}>
                    <Route index element={<Certificate />} />
                    <Route path='generate' element={<Generate />} />
                    <Route path='list' element={<CertList />} >                  
                    </Route>
                    </Route>


            </Route>
        </Routes>
    )
}

export default Layout