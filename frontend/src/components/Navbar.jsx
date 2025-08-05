import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import '../componentStyles/Navbar.css';
import '../pageStyles/Search.css';
import { useSelector } from 'react-redux';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const { isAuthenticated } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);

    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate(`/products`);
        }
        setSearchQuery("");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">

            
                <div className="navbar-logo">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        <img 
                          src="/images/logo.png"   // ✅ No import needed
                          alt="CricKart Logo" 
                          className="crickart-logo"
                        />
                    </Link>
                </div>

                <div className={`navbar-links ${isMenuOpen ? 'active' : ""}`}>
                    <ul>
                        <li onClick={() => setIsMenuOpen(false)}><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                    </ul>
                </div>

                <div className="navbar-icons">
                    <div className="search-container">
                        <form className={`search-form ${isSearchOpen ? 'active' : ''}`} onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                className='search-input'
                                placeholder='Search products..'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="button" className="search-icon" onClick={toggleSearch}>
                                <SearchIcon focusable="false" />
                            </button>
                        </form>
                    </div>

                    <div className="cart-container">
                        <Link to="/cart">
                            <ShoppingCartIcon className="icon" />
                            <span className="cart-badge">{cartItems.length}</span>
                        </Link>
                    </div>

                    {!isAuthenticated && (
                        <Link to="/register" className='register-link'>
                            <PersonAddIcon className='icon' />
                        </Link>
                    )}

                    <div className="navbar-hamburger" onClick={toggleMenu}>
                        {isMenuOpen ? <CloseIcon className='icon' /> : <MenuIcon className='icon' />}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
