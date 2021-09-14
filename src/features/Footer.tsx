import * as React from 'react';
import { BopIcon } from '../svg/BopIcon';




export const Footer = () => {
    return (
        <footer className="Footer">
            <div className="column">
                <a className="footer_title">SOCIAL</a>
                <a>Follow us on social media</a>
                <a href="#" title="Facebook"><i className="fa fa-facebook"></i></a>
                <a href="#" title="Instagram"><i className="fa fa-instagram"></i></a>
                <a href="#" title="Twitter"><i className="fa fa-twitter"></i></a>
            </div>
            <div className="column">
                <a className="footer_title">RESOURCES</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Conditions</a>
                <a href="#">Contact Us</a>
            </div>
            <div className="column">
                <a className="footer_title">OUR COMPANY</a>
                <a href="">About Us</a>
                <a href="">Our Services</a>
                <a href="">Press</a>
                <a href="">Help & Support</a>
            </div>

            <div className="column">
                <a href="" title="Lorem ipsum dolor sit amet"></a><img src="https://i.dlpng.com/static/png/6895916_preview.png"></img>
            </div>

            <div className="column">
                <a className="footer_title">GET IN TOUCH</a>
                <a title="Address"><i className="fa fa-map-marker"></i> 001, Sunnyvale California, 23412</a>
                <a href="emailto:" title="Email"><i className="fa fa-envelope"></i> music@bop.com</a>
                <a href="tel:" title="Contact"><i className="fa fa-phone"></i> +(1)-212-631-6464</a>
            </div>

            <div className="sub-footer">
                <BopIcon className={"bop-logo_footer"}/>
                © CopyRights 2021 BOP || All rights reserved. 
            </div>
            
            
           
        </footer>
    )
}

