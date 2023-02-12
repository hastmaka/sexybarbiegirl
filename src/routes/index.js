import {lazy, Suspense} from "react";
import {useRoutes} from 'react-router-dom';
// Routes
import Layout from '../layout/Layout';
import CartCustomCheckout from "../sections/cart/CartCustomCheckout";
import Home from '../sections/home/Home';
import TestLayout from "../layout/test_layout/TestLayout";
import Test from "../sections/testMode/Test";

//async import
// const CartCustomCheckout = lazy(() => import('../sections/cart/CartCustomCheckout'));
const Shop = lazy(() => import('../sections/shop/Shop'));
const Cart = lazy(() => import('../sections/cart/Cart'));
const Thanks = lazy(() => import('../sections/cart/thanks/Thanks'));
const Profile = lazy(() => import('../sections/profile/Profile'));
const Login = lazy(() => import('../sections/login/Login'));
const CreateAccount = lazy(() => import('../sections/login/CreateAccount'));
const ForgotPassword = lazy(() => import('../sections/login/ForgotPassword'));
const EzProductFullDetails = lazy(() => import('../sections/productDetail/EzProductFullDetails'));
const AboutUs = lazy(() => import('../sections/aboutUs/AboutUs'));
const Error = lazy(() => import('../pages/Error'));

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
            path: 'shop',
            element: <Suspense fallback={<div>Loading Shop...</div>}><Shop/></Suspense>,
        }, {
            path: 'cart',
            element: <Suspense fallback={<div>Loading Cart...</div>}><Cart/></Suspense>,
        }, {
            path: 'checkout',
            element: <CartCustomCheckout/>,
        }, {
            path: 'thanks',
            element: <Suspense fallback={<div>Loading Thanks...</div>}><Thanks/></Suspense>,
        }, {
            path: 'profile/:path',//taking dynamic params
            element: <Suspense fallback={<div>Loading Profile...</div>}><Profile/></Suspense>,
        }, {
            path: 'full-detail/:id',//taking dynamic params
            element: <Suspense fallback={<div>Loading Profile...</div>}><EzProductFullDetails/></Suspense>,
        }, {
            path: 'about-us',
            element: <Suspense fallback={<div>Loading Profile...</div>}><AboutUs/></Suspense>,
        }, {
            path: '/error',
            element: <Suspense fallback={<div>Loading Profile...</div>}><Error/></Suspense>,
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
