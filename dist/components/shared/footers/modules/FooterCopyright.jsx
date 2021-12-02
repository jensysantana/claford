import React from 'react';
import FooterCopyrightText from '../FooterCopyrightText';

const FooterCopyright = () => (
    <div className="ps-footer__copyright">
        {/* <p>&copy;  2021 Martfury. All Rights Reserved hdhdjdjddj</p> */}
        <FooterCopyrightText className="ps-footer__copyrighter" />
        <p>
            <span>We Using Safe Payment For:</span>
            <a href="#">
                <img src="/static/img/payment-method/1.jpg" alt="Martfury" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/2.jpg" alt="Martfury" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/3.jpg" alt="Martfury" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/4.jpg" alt="Martfury" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/5.jpg" alt="Martfury" />
            </a>
        </p>
    </div>
);

export default FooterCopyright;
