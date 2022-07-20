import React from "react";
import footer from './images/boat_footer.png'



function Footer(){

    return (
        <div>
            <img className="footer-image" src={footer} alt="4LW footer" />
            <div className="footer">
                <p className="signature">John Mook 2022</p>
            </div>
        </div>
    )

}

export default Footer;