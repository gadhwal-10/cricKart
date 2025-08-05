import React, { useEffect } from 'react';
import '../AdminStyles/Dashboard.css';
import {
  AddBox,
  AttachMoney,
  CheckCircle,
  Dashboard as DashboardIcon,
  Error,
  Inventory,
  People,
  ShoppingCart,
  Star,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, fetchAllOrders } from '../features/admin/adminSlice';

function Dashboard() {
  const { products, orders, totalAmount } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const outOfStock = products.filter(product => product.stock === 0).length;
  const inStock = products.filter(product => product.stock > 0).length;
  const totalReviews = products.reduce((acc, product) => acc + (product.reviews.length || 0), 0);

  return (
    <>
      <Navbar />
      <PageTitle title="Admin Dashboard" />
      <div className="dashboard-container">
        <div className="sidebar">
          <div className="logo">
            <DashboardIcon className="logo-icon" />
            Admin Dashboard
          </div>
          <nav className="nav-menu">
            <div className="nav-section">
              <h3>Products</h3>
              <Link to="/admin/products">
                <Inventory className="nav-icon" />
                All Products
              </Link>
              <Link to="/admin/product/create">
                <AddBox className="nav-icon" />
                Create Product
              </Link>
            </div>

            <div className="nav-section">
              <h3>Users</h3>
              <Link to="/admin/users">
                <People className="nav-icon" />
                All Users
              </Link>
            </div>

            <div className="nav-section">
              <h3>Orders</h3>
              <Link to="/admin/orders">
                <ShoppingCart className="nav-icon" />
                All Orders
              </Link>
            </div>

            <div className="nav-section">
              <h3>Reviews</h3>
              <Link to="/admin/reviews">
                <Star className="nav-icon" />
                All Reviews
              </Link>
            </div>
          </nav>
        </div>

        <div className="main-content">
          <div className="stats-grid">
            <div className="stat-box">
              <Inventory className="icon" />
              <h3>Total Products</h3>
              <p>{totalProducts}</p>
            </div>

            <div className="stat-box">
              <ShoppingCart className="icon" />
              <h3>Total Orders</h3>
              <p>{totalOrders}</p>
            </div>

            <div className="stat-box">
              <Star className="icon" />
              <h3>Total Reviews</h3>
              <p>{totalReviews}</p>
            </div>

            <div className="stat-box">
              <AttachMoney className="icon" />
              <h3>Total Revenue</h3>
              <p>{totalAmount}/-</p>
            </div>

            <div className="stat-box">
              <Error className="icon" />
              <h3>Out Of Stock</h3>
              <p>{outOfStock}</p>
            </div>

            <div className="stat-box">
              <CheckCircle className="icon" />
              <h3>In Stock</h3>
              <p>{inStock}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
