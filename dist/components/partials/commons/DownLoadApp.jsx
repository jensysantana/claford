import React from 'react';
import { useTranslation } from 'react-i18next';

const DownloadApp = () => {

    const { t } = useTranslation();
    return (
        <section className="ps-download-app">
            <div className="ps-container">
                <div className="ps-block--download-app">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                                <div className="ps-block__thumbnail">
                                    <img src="/static/img/app.png" alt={process.env.title} />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                                <div className="ps-block__content">
                                    {/* <h3>Download Martfury App Now!</h3> */}
                                    <h3>{t('common:appPages.homePage.1', { APPNAME: process.env.title })}</h3>
                                    <p>
                                        {/* Shopping fastly and easily more with our app. Get a link to
                                        download the app on your phone */}
                                        {t('common:appPages.homePage.2')}
                                    </p>
                                    <form
                                        className="ps-form--download-app"
                                    >
                                        <div className="form-group--nest">
                                            <input
                                                className="form-control"
                                                type="Email"
                                                placeholder={t('common:appPages.homePage.4')}
                                            />
                                            <button className="ps-btn">{t('common:appPages.homePage.3')}</button>
                                        </div>
                                    </form>
                                    <p className="download-link">
                                        <a href="#">
                                            <img src="/static/img/google-play.png" alt={process.env.title} />
                                        </a>
                                        <a href="#">
                                            <img src="/static/img/app-store.png" alt={process.env.title} />
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DownloadApp;
