import React from 'react'
import styles from '../../CardShadow.module.scss'

function CardShadow({ children, style = {}, className = '' }) {
    return (
        <>
            <div className={`${styles.wrapper_v2_auth_right} ${className}`} style={style}>
                {children}
            </div>
        </>
    )
}

export default CardShadow;
