import * as React from 'react';
import { BopIcon } from '../svg/BopIcon';




export const Footer = () => {
    return (
        <footer className="Footer">
            <div className="column">
                <a className="footer_title">SOCIAL</a>
                <a>Follow us on social media</a>
                <a href="#" title="Facebook">
                    <svg width="50" height="50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M171.169 20H28.831A8.831 8.831 0 0 0 20 28.831v142.338A8.83 8.83 0 0 0 28.831 180h76.638v-61.875H84.688V93.906h20.781V76.083c0-20.666 12.621-31.919 31.056-31.919c8.83 0 16.42.657 18.632.951v21.597l-12.714.006c-10.031 0-11.974 4.767-11.974 11.762v15.425h23.982l-3.123 24.219h-20.86V180h40.701a8.831 8.831 0 0 0 8.831-8.831V28.831A8.831 8.831 0 0 0 171.169 20z">
                        </path>
                    </svg>
                </a>
                <a href="#" title="Instagram"><i className="fa fa-instagram"></i>
                    <svg width="50" height="50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M132.313 34.909c21.483.98 31.797 11.276 32.778 32.778c.668 14.642.668 49.977 0 64.625c-.98 21.483-11.276 31.797-32.778 32.778c-14.64.668-49.979.668-64.625 0c-21.483-.98-31.797-11.276-32.778-32.778c-.668-14.642-.668-49.977 0-64.625c.98-21.483 11.276-31.797 32.778-32.778c14.641-.668 49.976-.668 64.625 0zM67.031 20.516C38.273 21.828 21.85 37.812 20.516 67.031c-.688 15.09-.688 50.854 0 65.939c1.312 28.751 17.288 45.181 46.514 46.514c15.086.688 50.856.688 65.939 0c28.751-1.312 45.181-17.288 46.514-46.514c.688-15.09.688-50.854 0-65.939c-1.312-28.758-17.296-45.181-46.514-46.514c-15.089-.689-50.854-.689-65.938-.001zM100 58.937c-22.678 0-41.063 18.385-41.063 41.063S77.322 141.063 100 141.063s41.063-18.385 41.063-41.063c0-22.679-18.385-41.063-41.063-41.063zm0 67.718c-14.721 0-26.655-11.934-26.655-26.655c0-14.721 11.934-26.655 26.655-26.655c14.721 0 26.655 11.934 26.655 26.655c0 14.721-11.934 26.655-26.655 26.655z"></path><circle cx="142.685" cy="57.315" r="9.596"></circle></svg>
                </a>
                <a href="#" title="Twitter"><i className="fa fa-twitter"></i>
                    <svg width="50" height="50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M66.609 173.144c67.927 0 105.074-56.276 105.074-105.074c0-1.599-.032-3.191-.106-4.774A75.133 75.133 0 0 0 190 44.175a73.717 73.717 0 0 1-21.208 5.813c7.624-4.571 13.478-11.805 16.239-20.428a74.017 74.017 0 0 1-23.449 8.964c-6.739-7.178-16.336-11.668-26.957-11.668c-20.396 0-36.935 16.539-36.935 36.927c0 2.899.325 5.716.958 8.42c-30.692-1.542-57.908-16.238-76.12-38.583a36.796 36.796 0 0 0-5.002 18.561c0 12.813 6.52 24.123 16.434 30.74a36.651 36.651 0 0 1-16.726-4.62c-.008.154-.008.309-.008.471c0 17.887 12.731 32.819 29.628 36.205a37.035 37.035 0 0 1-9.735 1.299c-2.379 0-4.693-.235-6.942-.666c4.701 14.672 18.334 25.349 34.5 25.65c-12.642 9.905-28.564 15.808-45.867 15.808c-2.98 0-5.919-.171-8.81-.511c16.344 10.473 35.75 16.587 56.609 16.587"></path></svg>
                </a>
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

            {/* <div className="column">
                <a href="" title="Lorem ipsum dolor sit amet"></a><img src="https://i.dlpng.com/static/png/6895916_preview.png"></img>
            </div> */}

            <div className="column">
                <a className="footer_title">GET IN TOUCH</a>
                <a title="Address"><i className="fa fa-map-marker"></i> 1 Armstrong St. Los Angeles, CA 90022</a>
                <br></br>
                <a href="emailto:" title="Email"><i className="fa fa-envelope"></i> Email: music@bop.com</a>
                <br></br>
                <a href="tel:" title="Contact"><i className="fa fa-phone"></i> +(1)-212-631-6464</a>
            </div>

            <div className="sub-footer">
                <BopIcon className={"bop-logo_footer"} />
                © CopyRights 2021 BOP || All rights reserved.
            </div>



        </footer>
    )
}

