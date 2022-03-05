/* eslint-disable jsx-a11y/anchor-has-content */
import { FunctionComponent } from "react";
import { FaTelegram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import "./css/footer.css";

interface FooterProps {
    
}
 
const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <footer className="footer">
            <div className="mis-redes">
                <a href="https://www.twitter.com/" title="Síguenos en Twitter" rel="external noreferrer" className="icon-social-twitter" target="_blank"><FaTwitter/></a>
                <a href="https://www.facebook.com/" title="Síguenos en Facebook" rel="external noreferrer" className="icon-social-facebook" target="_blank"><FaFacebook/></a>
                <a href="https://www.github.com/" title="Síguenos en github" className="icon-social-github" target="_blank" rel="noreferrer"><FaGithub/></a>
                <a href="http://correo.estudiantes.uci.cu/" title="Contactanos al correo" rel="external noreferrer" target="_blank"><MdEmail/></a>
                <a href="https://www.linkedin.com" title="Síguenos en linkedin" className="icon-social-linkedin" target="_blank" rel="noreferrer"><FaLinkedin/></a>
                <a href="http://intranet.uci.cu" title="Intranet" className="directorio"><FaNetworkWired/></a>
                <a href="https://telegram.org" title="Telegram" target="_blank" rel="noreferrer"><FaTelegram/></a>
            </div>
        </footer>
    );
}
 
export default Footer;
