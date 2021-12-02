import React from 'react'
import Image from 'next/image';
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
