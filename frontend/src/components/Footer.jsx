import React from 'react';
import {Phone , Mail, GitHub, LinkedIn} from '@mui/icons-material'
import '../componentStyles/Footer.css'

function Footer() {
  return (
    <footer className='footer'>

<div className="footer-container">

       
    <div className="footer-section contact">
        <h3>Contact US</h3>
        <p><Phone fontSize='small'/> Phone: +9000800085</p>
        <p><Mail fontSize='small'/> Email: gadhwalaryan1@gmail.com</p>

    </div>

    <div className="footer-section social">
        <h3>Follow me</h3> 

        <div className="social-links">
        <a href="https://www.linkedin.com/in/aryan-gadhwal/" target="_blank">
        <LinkedIn className="social-icon linkedin" />
        </a>
        <a href="https://github.com/gadhwal-10" target="_blank">
        <GitHub className="social-icon github" />
        </a>
        </div>

    </div>

        <div className="footer-section about">
            <h3>About</h3>
            <p>cricKart is your one-stop destination for premium cricket gear and accessories, bringing the spirit of the game closer to every fan and player.</p>
        </div>
</div>

    <div className="footer-bottom">
        <p>&copy; cricKart . All rights reserved </p>
        <br/>
        <p>Created with ❤️</p>
    </div>

    </footer>
  )
}

export default Footer