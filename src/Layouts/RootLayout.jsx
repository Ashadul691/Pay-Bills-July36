import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import  {useNavigation} from 'react-router-dom';
import LoadingPage from "../Provider/LoadingPage";
const RootLayout = () => {
    
    const {state}=useNavigation() 

    return (
        <div>
            <main>
                <Navbar></Navbar>
                {state=="loading" ? <LoadingPage/>:<Outlet></Outlet>} 
            </main>
        </div>
    );
};

export default RootLayout;