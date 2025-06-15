import React, { useEffect, useState } from 'react';
import { addToCart, createProduct, fetchProducts } from '../slices/AddToCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    branchName: '',
    rating: '',
    title: '',
    price: '',
    description: '',
    imageBase64: '',
    imagePreview: ''
  });

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value === 'All') {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter(p => p.category === value));
    }
  };

  const handleAddProductClick = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setNewProduct({
      branchName: '',
      rating: '',
      title: '',
      description: '',
      imageBase64: '',
      imagePreview: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({
          ...prev,
          imageBase64: reader.result,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      name: newProduct.title,
      category: newProduct.branchName,
      price: newProduct.price,
      image: newProduct.imageBase64,
      rating: newProduct.rating,
      description: newProduct.description,
    };
    const result = await dispatch(createProduct(newItem));
    if (result.payload) {
      setProducts(prev => [...prev, result.payload]); // update local state
      setAllProducts(prev => [...prev, result.payload]);
      toast.success("You have successfully added product.")
    }
    closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchProducts());
      console.log(result, ">>>>>>>>>>>>>");

      if (result.payload && result.payload) {
        setProducts(result.payload);
        setAllProducts(result.payload);
      }
    };
    fetchData();
  }, [dispatch]);

  const addtocart = async (productId) => {
    const data = await dispatch(addToCart(productId));
    console.log(data, "----------");
  };
// const cartCount = useSelector((state) => state?.products?.products?.ength);
// console.log(cartCount);


  
  return (
    <div className="cart-container">
      
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ position: 'relative', width: "100%", maxWidth: "600px", height: "85%", backgroundColor: '#fff', borderRadius: '12px', padding: '30px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)', fontFamily: 'sans-serif' }}>
            <h2 style={{ marginBottom: "10px", color: '#333', textAlign: 'center' }}>Add New Product</h2>
            <form
  onSubmit={handleFormSubmit}
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "24px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', sans-serif",
    maxWidth: "700px",
    margin: "auto",
  }}
>
  {/* Upload image */}
  <div>
    <label style={{ fontWeight: 600, marginBottom: "6px", display: "block" }}>Upload Image:</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      required
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        backgroundColor: "#fff",
        width: "100%",
      }}
    />
    {/* {newProduct.imagePreview && (
      <img
        src={newProduct.imagePreview}
        alt="Preview"
        style={{
          width: "30%",
          height: "80px",
          marginTop: "10px",
          borderRadius: "6px",
          objectFit: "cover",
        }}
      />
    )} */}
  </div>

  {/* First row: Branch Name + Rating */}
  <div style={{ display: "flex", gap: "20px" }}>
    <div style={{ flex: 1 }}>
      <label style={{ fontWeight: 600 }}>Branch Name:</label>
      <input
        name="branchName"
        type="text"
        value={newProduct.branchName}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      />
    </div>
    <div style={{ flex: 1 }}>
      <label style={{ fontWeight: 600 }}>Rating (0–5):</label>
      <input
        name="rating"
        type="number"
        max="5"
        min="0"
        step="0.1"
        value={newProduct.rating}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      />
    </div>
  </div>

  {/* Second row: Title + Price */}
  <div style={{ display: "flex", gap: "20px" }}>
    <div style={{ flex: 1 }}>
      <label style={{ fontWeight: 600 }}>Title:</label>
      <input
        name="title"
        type="text"
        value={newProduct.title}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      />
    </div>
    <div style={{ flex: 1 }}>
      <label style={{ fontWeight: 600 }}>Price (₹):</label>
      <input
        name="price"
        type="number"
        min="0"
        value={newProduct.price || ""}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      />
    </div>
  </div>

  {/* Description */}
  <div>
    <label style={{ fontWeight: 600 }}>Description:</label>
    <textarea
      name="description"
      rows="4"
      value={newProduct.description}
      onChange={handleChange}
      required
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        marginTop: "6px",
        resize: "vertical",
      }}
    />
  </div>

  {/* Buttons */}
  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
    <button
      type="button"
      onClick={closeModal}
      style={{
        padding: "10px 18px",
        backgroundColor: "#ccc",
        color: "#333",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      Cancel
    </button>
    <button
      type="submit"
      style={{
        padding: "10px 18px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: 600,
        transition: "background-color 0.3s ease",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
    >
      Submit
    </button>
  </div>
</form>


            <button onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, background: '#e60023', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', fontSize: '16px', cursor: 'pointer' }}>✕</button>
          </div>
        </div>
      )}

      <div className="cart-header">
        <h2>Products</h2>
        <div className="cart-actions">
          <select value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Accessories">Accessories</option>
          </select>
          <button onClick={handleAddProductClick}>Add Product</button>
        </div>
      </div>

      <div className="product-grid">
        
        {products.map((product, i) => (
          <div key={i} className="product-card" style={{ borderRadius: "8px" }}>
            <div className="product-image" style={{ position: 'relative', height: '200px' }}>
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />

              <div
                className="rating"
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  backgroundColor: "rgb(0, 166, 14)",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}
              >
                ⭐ {product.rating || 4.5} 
              </div>
            </div>

            <div style={{ width: "95%", margin: "auto" }}>
              <div style={{ display: "flex", justifyContent: 'space-between', fontSize: "12px", marginTop: "10px" }}>
                <span className="brand">{product.category || 'Brand'}</span>
                <div className="rating">
                  ⭐ {product.rating || 4.5}
                </div>
              </div>
              <div className="product-info" style={{ textAlign: "left", marginTop: "10px" }}>
                <h3 className="product-name">{product.name}</h3>
                <p className="description">{product.description}</p>
                <div className="price-row">
                  <span className="discounted-price">₹{product.price || '0'}</span>
                  <span
                    style={{
                      textDecoration: 'line-through',
                      color: '#999',
                      marginRight: '10px',
                    }}
                  >
                    ₹{Math.round(product.price * 1.1)}
                  </span>

                  {/* <span style={{ color: '#000', fontWeight: 'bold' }}>
  ₹{product.price || '0'}
</span> */}

                </div>
                <button className="add-btn" onClick={() => addtocart(product._id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
