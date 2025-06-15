import React, { useState } from 'react';
import './Checkout.css';
import { useDispatch } from 'react-redux';
import { clearCart } from '../slices/AddToCartSlice';
import { toast } from 'react-toastify';

const Checkout = ({ originalTotal }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const deletedata = async (e) => {
    e.preventDefault();

    const {
      fullName,
      mobileNumber,
      email,
      pincode,
      locality,
      address,
      city,
      state,
    } = formData;

    if (
      !fullName || !mobileNumber || !email || !pincode ||
      !locality || !address || !city || !state
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const result = await dispatch(clearCart());
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Your order has been placed.");
        setFormData({
          fullName: '',
          mobileNumber: '',
          email: '',
          pincode: '',
          locality: '',
          address: '',
          city: '',
          state: '',
        });
      } else {
        toast.error("Failed to place order. Try again.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  const discountedPrice = originalTotal * 0.14;
  const finalAmount = originalTotal - discountedPrice;

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        {/* Left Section - Billing Info */}
        <div className="billing-section">
          <h3 className="section-title">Delivery Address</h3>
          <form className="address-form" onSubmit={deletedata}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              required
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              required
              value={formData.pincode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="locality"
              placeholder="Locality"
              required
              value={formData.locality}
              onChange={handleChange}
            />
            <textarea
              name="address"
              placeholder="Address (Area and Street)"
              rows={3}
              required
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City/District/Town"
              required
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              required
              value={formData.state}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* Right Section - Price Details */}
        <div className="summary-section">
          <h3 className="section-title">Price Details</h3>
          <div className="price-card">
            <div className="price-row">
              <span>Price (items)</span>
              <span>₹{originalTotal}</span>
            </div>
            <div className="price-row">
              <span>Discount</span>
              <span className="discount">− ₹{discountedPrice.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Delivery Charges</span>
              <span className="free">Free</span>
            </div>
            <hr />
            <div className="price-total">
              <strong>Total Amount</strong>
              <strong>₹{finalAmount.toFixed(2)}</strong>
            </div>
          </div>
          <button className="place-order-btn" onClick={deletedata}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
