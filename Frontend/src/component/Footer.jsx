import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
            <div className="container text-center text-md-start">
                <div className="row text-center text-md-start">
                    
                    {/* Column 1: Brand & Desc */}
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold text-warning">
                            Hidden Places
                        </h5>
                        <p>
                            Discover the world's best-kept secrets. 
                            We connect travelers with lesser-known destinations 
                            to create unforgettable memories.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold">Quick Links</h5>
                        <p>
                            <Link to="/" className="text-white" style={{textDecoration: 'none'}}>Home</Link>
                        </p>
                        <p>
                            <Link to="/locations" className="text-white" style={{textDecoration: 'none'}}>Destinations</Link>
                        </p>
                        <p>
                            <Link to="/about" className="text-white" style={{textDecoration: 'none'}}>About Us</Link>
                        </p>
                        <p>
                            <Link to="/register" className="text-white" style={{textDecoration: 'none'}}>Join Us</Link>
                        </p>
                    </div>

                    {/* Column 3: Support */}
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold">Support</h5>
                        <p>
                            <Link to="/contact" className="text-white" style={{textDecoration: 'none'}}>Contact Us</Link>
                        </p>
                        <p>
                            <Link to="/feedback" className="text-white" style={{textDecoration: 'none'}}>Feedback</Link>
                        </p>
                        <p>
                            <Link to="/login" className="text-white" style={{textDecoration: 'none'}}>Admin Login</Link>
                        </p>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 fw-bold">Contact</h5>
                        <p>
                            <i className="fas fa-home mr-3"></i> Mumbai, Maharashtra, India
                        </p>
                        <p>
                            <i className="fas fa-envelope mr-3"></i> info@hiddenplaces.com
                        </p>
                        <p>
                            <i className="fas fa-phone mr-3"></i> +91 98765 43210
                        </p>
                    </div>
                </div>

                <hr className="mb-4" />

                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-8">
                        <p>
                            © {new Date().getFullYear()} Copyright: 
                            <strong className="text-warning"> Hidden Places</strong>
                        </p>
                    </div>
                    <div className="col-md-5 col-lg-4">
                        <div className="text-center text-md-end">
                            {/* Social Icons Placeholders */}
                            <ul className="list-unstyled list-inline">
                                <li className="list-inline-item">
                                    <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}><i className="fab fa-facebook"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}><i className="fab fa-twitter"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}><i className="fab fa-instagram"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;