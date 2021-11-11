import React from 'react'

function ImageElement({ src, alt = process.env.title, width = 156, height = 42, ...rest }) {
    return (
        <>
            <Image
                alt={alt}
                src={src}
                width={width}
                height={height}
                objectFit
                {...rest}
            />
        </>
    )
}

export default ImageElement;
