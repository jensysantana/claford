import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const FooterWidgets = () => {
    const { t } = useTranslation();
    const [state, setState] = useState('1800 97 97 69');

    return (
        <div className="ps-footer__widgets">
            <aside className="widget widget_footer widget_contact-us">
                <h4 className="widget-title">Contact us</h4>
                <div className="widget_content">
                    <p>Call us 24/7</p>
                    <h3 onClick={(e) => {
                        e.preventDefault();
                        // setState('Hi, if you can see this message is because the owner of claford.com let you see it to contact him personal: owner Jack Daniel (Jensy).\n\n\n Hola, si puedes ver este mensaje es porque el dueño de claford.com te dejó verlo para contactarlo personalmente: dueño Jack Daniel (Jensy).')
                        alert('Hi, if you can see this message is because the owner of claford.com let you see it to contact him personal: owner Jack Daniel (Jensy).\n\n\n Hola, si puedes ver este mensaje es porque el dueño de claford.com te dejó verlo para contactarlo personalmente: dueño Jack Daniel (Jensy).')
                    }}>{state}</h3>
                    <p>
                        8202 four winds dr louisville, ky 40222<br />
                        <a href="mailto:jensysantana@gmail.com">contact@claford.com</a>
                    </p>
                    <ul className="ps-list--social">
                        <li>
                            <a className="facebook" href="#">
                                <i className="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a className="twitter" href="#">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a className="google-plus" href="#">
                                <i className="fa fa-google-plus"></i>
                            </a>
                        </li>
                        <li>
                            <a className="instagram" href="#">
                                <i className="fa fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <aside className="widget widget_footer">
                <h4 className="widget-title">Quick links</h4>
                <ul className="ps-list--link">
                    <li>
                        <Link href="/page/blank">
                            <a>Policy</a>
                        </Link>
                    </li>

                    <li>
                        <Link href="/page/blank">
                            <a>Term & Condition</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/blank">
                            <a>Shipping</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/blank">
                            <a>Return</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/faqs">
                            <a>FAQs</a>
                        </Link>
                    </li>
                </ul>
            </aside>
            <aside className="widget widget_footer">
                <h4 className="widget-title">Company</h4>
                <ul className="ps-list--link">
                    <li>
                        <Link href="/page/about-us">
                            <a>About Us</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/blank">
                            <a>Affilate</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/blank">
                            <a>Career</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/page/contact-us">
                            <a>Contact</a>
                        </Link>
                    </li>
                </ul>
            </aside>
            <aside className="widget widget_footer">
                <h4 className="widget-title">Bussiness</h4>
                <ul className="ps-list--link">
                    <li>
                        <Link href="/page/about-us">
                            <a>Our Press</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account/checkout">
                            <a>Checkout</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account/user-information">
                            <a>My account</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop">
                            <a>Shop</a>
                        </Link>
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default FooterWidgets;
