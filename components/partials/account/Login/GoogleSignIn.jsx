import React from 'react';

export default function GoogleSignIn({
    text,
    backGround = '#DD4B39',
    textColor = "#fff",
    iconColor = '#fff',
    className = '',
    disabled = false,
    icon,
    onClick = () => { }
}) {

    return (
        <>
            <button disabled={disabled} className={`signin-with-wrapper ${className}`} onClick={onClick}>
                {/* <p><a className="google" href="#">
                </a></p> */}
                {icon === 'google' && <i className="fa fa-google-plus iconbtn"></i>}
                {icon === 'facebook' && <i className="fa fa-facebook iconbtn"></i>}
                {icon === 'twitter' && <i className="fa fa-twitter iconbtn"></i>}
                {icon === 'instagram' && <i className="fa fa-instagram iconbtn"></i>}
                <span className="text-button">{text}</span>
            </button>
            <style jsx>
                {
                    `
                    .signin-with-wrapper{
                        position:relative;
                        background:${backGround};
                        width:100%;
                        display:flex;
                        justify-content: center;
                        align-items: center;
                        vertial-align:middle;
                        padding:8px;
                        cursor:pointer;
                        border: thin solid #888;
                        border-radius: 12px;
                        
                    }
                    .iconbtn{
                        left:10px;
                        position:absolute;
                        font-size: 23px;
                        color:${iconColor};
                    }
                   
                    .text-button{
                        font-size: 18px;
                        color:${textColor};
                    }
                   `
                }
            </style>
        </>
    )

}

 // .iconbtn{
                    //     left:10px;
                    //     position:absolute;
                    //     font-size: 23px;
                    //     color:${iconColor};
                    // }