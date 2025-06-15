import React, { useEffect, useState } from 'react';
import { fetchCart } from '../slices/AddToCartSlice';
import { useDispatch } from 'react-redux';
import Checkout from './Checkout';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [checkout,setcheckout] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchCart());
      if (Array.isArray(result.payload)) {
        const ordersWithQuantity = result.payload.map(order => ({
          ...order,
          quantity: order.quantity || 1,
        }));
        setOrders(ordersWithQuantity);
        
      }
    };
    fetchData();
  }, [dispatch]);

  const updateQuantity = (id, type) => {
    const updated = orders.map(order => {
      if (order._id === id) {
        const newQty = type === 'increase' ? order.quantity + 1 : order.quantity - 1;
        return { ...order, quantity: newQty > 0 ? newQty : 1 };
      }
      return order;
    });
    setOrders(updated);
  };

  const removeOrder = id => {
    setOrders(orders.filter(order => order._id !== id));
  };

  const totalItems = orders.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalTotal = orders.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);

  return (
    <div style={{ display: 'flex', padding: '30px', gap: '30px', fontFamily: 'sans-serif' }}>
      {/* Left: Orders */}
      <div style={{ flex: 3 }}>
        {/* <h2 style={{ marginBottom: '20px' }}>Your Orders</h2> */}
{/* shadab */}
       {
        checkout? (
           <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} style={{
              display: 'flex',
              gap: '20px',
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '10px',
              alignItems: 'flex-start',
              backgroundColor: '#fff',
              boxShadow: '0 0 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{ width: '160px', height: '120px', overflow: 'hidden', borderRadius: '8px' }}>
                <img
                  src={order.image}
                  alt={order.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0 }}>{order.name}</h3>
                  <span style={{ fontWeight: 'bold', color: '#e60023' }}>₹{order.price.toLocaleString()}</span>
                </div>
                <p style={{ fontSize: '14px', margin: '4px 0', color: '#666' }}>{order.description}</p>
                <p style={{ fontSize: '14px' }}><strong>Branch:</strong> {order.branch}</p>
                <p style={{ fontSize: '14px' }}>⭐ {order.rating} ({order.reviews} reviews)</p>

                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <button
                      onClick={() => updateQuantity(order._id, 'decrease')}
                      style={{ padding: '4px 10px', marginRight: '8px', cursor: 'pointer' }}
                    >–</button>
                    <span>{order.quantity}</span>
                    <button
                      onClick={() => updateQuantity(order._id, 'increase')}
                      style={{ padding: '4px 10px', marginLeft: '8px', cursor: 'pointer' }}
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeOrder(order._id)}
                    style={{
                      backgroundColor: '#ff4d4d',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        ):(
          <div>
            <Checkout originalTotal={originalTotal}/>
          </div>
        )
       }
      </div>

      {/* Right: Order Summary */}
      {
        checkout?(
          <div style={{
        flex: 1,
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        height: 'fit-content',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        backgroundColor: '#fff'
      }}>
        <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Items:</span>
          <strong>{totalItems}</strong>
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>Total MRP:</span>
          <span >₹{originalTotal.toLocaleString()}</span>
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>Discount:</span>
          <span style={{ color: 'green',textDecoration: 'line-through'  }}>- ₹{originalTotal*14/100}</span>
        </div>
        <hr />
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Final Price:</span>
          <span>₹{originalTotal-  originalTotal*14/100}</span>
        </div>
        <button style={{
          marginTop: '20px',
          width: '100%',
          padding: '10px 0',
          backgroundColor: '#e60023',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
        onClick={()=>{setcheckout(false)}}
        >
          Checkout
        </button>
      </div>
        ):(
          <div></div>
        )
      }
    </div>
  );
};

export default Orders;
