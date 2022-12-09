import {useRoutes} from 'react-router-dom';
// Routes
import Layout from '../layout/Layout';
import Login from '../sections/login/Login';
import ForgotPassword from '../sections/login/ForgotPassword';
import Shop from '../sections/shop/Shop';
import Home from '../sections/home/Home';
import AboutUs from '../sections/aboutUs/AboutUs';
import CreateAccount from '../sections/login/CreateAccount';
import Cart from '../sections/cart/Cart';
import Error from "../pages/Error";
import TestLayout from "../layout/test_layout/TestLayout";
import Profile from "../sections/profile/Profile";
import Thanks from "../sections/cart/thanks/Thanks";
import EzProductFullDetails from "../sections/productDetail/EzProductFullDetails";
import Test from "../sections/testMode/Test";

//----------------------------------------------------------------

export default function Router() {
    return useRoutes([{
        path: '/test_layout',
        element: <TestLayout/>,
    }, {
        path: '/login',
        element: <Login/>,
    }, {
        path: '/create-account',
        element: <CreateAccount/>,
    }, {
        path: '/forgot-password',
        element: <ForgotPassword/>,
    }, {
        path: '/',
        element: <Layout/>,
        children: [{
            index: true,
            element: <Home/>,
        }, {
            path: '/',
            element: <Home/>,
        }, {
            path: '/shop',
            element: <Shop/>,
        }, {
            path: '/cart',
            element: <Cart/>,
        }, {
            path: '/thanks',
            element: <Thanks/>,
        }, {
            path: '/profile/:path',//taking dynamic params
            element: <Profile/>,
        }, {
            path: '/full-detail/:id',//taking dynamic params
            element: <EzProductFullDetails/>,
        }, {
            path: '/about-us',
            element: <AboutUs/>,
        }, {
            path: '/error',
            element: <Error/>,
        }, {
            path: '/test',
            element: <Test/>,
        }]
    },
        //     {
        //     path: '*',
        //     element: <Navigate to='/error' replace/>
        // }
    ])
}
