import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">GiftLink</a>
            
        
            

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/gifts/:productId">Gifts</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
