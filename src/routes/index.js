import {lazy, Suspense} from "react";
import {useRoutes} from 'react-router-dom';
// Routes
import Layout from '../layout/Layout';
// import Shop from '../sections/shop/Shop';
// import Cart from '../sections/cart/Cart';
// import CartCustomCheckout from "../sections/cart/CartCustomCheckout";
// import Thanks from "../sections/cart/thanks/Thanks";
// import Profile from "../sections/profile/Profile";
// import Login from '../sections/login/Login';
// import CreateAccount from '../sections/login/CreateAccount';
// import ForgotPassword from '../sections/login/ForgotPassword';
import Home from '../sections/home/Home';
import AboutUs from '../sections/aboutUs/AboutUs';
import Error from "../pages/Error";
import TestLayout from "../layout/test_layout/TestLayout";
import EzProductFullDetails from "../sections/productDetail/EzProductFullDetails";
import Test from "../sections/testMode/Test";

//async import
const Shop = lazy(() => import('../sections/shop/Shop'));
const Cart = lazy(() => import('../sections/cart/Cart'));
const CartCustomCheckout = lazy(() => import('../sections/cart/CartCustomCheckout'));
const Thanks = lazy(() => import('../sections/cart/thanks/Thanks'));
const Profile = lazy(() => import('../sections/profile/Profile'));
const Login = lazy(() => import('../sections/login/Login'));
const CreateAccount = lazy(() => import('../sections/login/CreateAccount'));
const ForgotPassword = lazy(() => import('../sections/login/ForgotPassword'));

// import {Elements} from "@stripe/react-stripe-js";
// import {stripeJs} from "./stripeAsyncImport";
// import {loadStripe} from "@stripe/stripe-js";
// const {loadStripe} = await stripeJs()
// const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
//----------------------------------------------------------------

export default function Router() {
    return useRoutes([{
        path: '/test_layout',
        element: <TestLayout/>,
    }, {
        path: '/login',
        element: <Suspense fallback={<div>Loading Login...</div>}><Login/></Suspense>,
    }, {
        path: '/create-account',
        element: <Suspense fallback={<div>Loading Create Account...</div>}><CreateAccount/></Suspense>,
    }, {
        path: '/forgot-password',
        element: <Suspense fallback={<div>Loading Forgot Password...</div>}><ForgotPassword/></Suspense>,
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
            element: <Suspense fallback={<div>Loading Shop...</div>}><Shop/></Suspense>,
        }, {
            path: '/cart',
            element: <Suspense fallback={<div>Loading Cart...</div>}><Cart/></Suspense>,
        }, {
            path: '/checkout',
            element: <Suspense fallback={<div>Loading CheckOut...</div>}><CartCustomCheckout/></Suspense>,
        }, {
            path: '/thanks',
            element: <Suspense fallback={<div>Loading Thanks...</div>}><Thanks/></Suspense>,
        }, {
            path: '/profile/:path',//taking dynamic params
            element: <Suspense fallback={<div>Loading Profile...</div>}><Profile/></Suspense>,
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
