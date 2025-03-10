import { FooterTop } from '~/layouts/Footer/FooterTop';
import { FooterBot } from '~/layouts/Footer/FooterBot';

const Footer = () => {
  return (
    <footer className="footer padding-t-100 bg-off-white">
      <div className="container">
        <FooterTop />
        <FooterBot />
      </div>
    </footer>
)
}

export default Footer;