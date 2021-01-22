import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import HomeScreen from './components/HomeScreen/HomeScreen';
import ShopScreen from './components/ShopScreen/ShopScreen';
import ProductScreen from './components/ProductScreen/ProductScreen';
import CartScreen from './components/CartScreen/CartScreen';
import SigninScreen from './components/SigninScreen/SigninScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import AddProductScreen from './components/AddProductScreen/AddProductScreen';
import CheckoutScreen from './components/CheckoutScreen/CheckoutScreen';
import OrderSummary from './components/OrderSummary/OrderSummary';
import OrdersScreen from './components/OrdersScreen/OrdersScreen';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Route path='/checkout' component={CheckoutScreen} />
        <Route path='/addProduct' component={AddProductScreen} />
        <Route path='/signin' component={SigninScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/shop' component={ShopScreen} />
        <Route path='/orderSummary' component={OrderSummary} />
        <Route path='/ordersScreen' component={OrdersScreen} />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/'  exact={true} component={HomeScreen} />

        <Footer />
      </div>

    </BrowserRouter>
  );
}

export default App;
