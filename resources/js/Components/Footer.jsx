import React from "react";

const Footer = () => {
    return (
        <footer className="footer footer-center bg-slate-600 text-white p-3 lg:p-4 text-xs lg:text-md">
            <aside>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                    by BALBUENA
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
