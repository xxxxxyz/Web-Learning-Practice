import React from "react";

function Footer() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer>
            <p> Copyright ⓒ {currentYear} </p>
        </footer>
    );
}

export default Footer;