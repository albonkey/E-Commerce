import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../actions/orderActions';
import './OrdersScreen.css';
const OrdersScreen = (props) => {
  const orderList = useSelector(state=>state.orderList);
  const { loading, orders, error } = orderList;

  const userSignin = useSelector(state=>state.userSignin);
  const { loading: loadingUser, userInfo, error: errorUser } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if(userInfo.isAdmin){
      dispatch(listOrders());
    } else {
      props.history.push('/');
    }
    return () => {

    };
  }, [])

  return(
    <div className='orders-screen'>
      {orders &&
        <table>
          <tr>
            <th>Order ID</th>
            <th>Transaction ID</th>
            <th>Email</th>
            <th>Shipping Info</th>
            <th>Amount</th>
            <th>Products</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
          {
            orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>{order.transaction_id}</td>
                <td>{order.buyer_info.email}</td>
                <td>{order.buyer_info.address}, {order.buyer_info.city} {order.buyer_info.postalCode} {order.buyer_info.state}, {order.buyer_info.country}</td>
                <td>${order.amount}</td>
                <td>products</td>
                <td>{order.status}</td>
                <td>{order.createdAt.slice(0,10)}</td>
              </tr>
            ))
          }
        </table>
      }
    </div>

  )
}

export default OrdersScreen;
