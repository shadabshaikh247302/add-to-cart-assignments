import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // optional for custom styling
import { FaHome, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../slices/AddToCartSlice';
const Navbar = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      const fetchData = async () => {
        const result = await dispatch(fetchCart());
      };
      fetchData();
    }, [dispatch]);
  
  
  const count = useSelector((state) => state?.products?.cart?.length);


  console.log(count,"<<<<<<<<<<");
  
  return (
    <nav className="navbar">
      <h2 className="logo">Flipkart</h2>
      <div className="navbar-left">
        <input
          type="text"
          placeholder="Search for products"
          className="search-bar"
        />
      </div>
      <div className="navbar-right">
        <Link to="/" style={{ marginRight: "20px" }} className="nav-link">
          {/* <FaHome className="icon" />  */}
          Home
        </Link>
        <Link to="/orders" style={{ marginRight: "20px" }} className="nav-link">
          {/* <FaClipboardList className="icon" />  */}
          Orders
        </Link>
        <Link to="/cart" style={{ marginRight: "10px" }} className="nav-link">
          <FaShoppingCart className="icon" /> Cart <span style={{backgroundColor:"orange",padding:"1px 6px",borderRadius:"100px"}}>{count}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
