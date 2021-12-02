import React from 'react'
import DOMPurify from 'isomorphic-dompurify';
function SanitizerData({ text }) {
    // const cleanText = DOMPurify.sanitize(text);
    return (
        <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(text)}}></span>
    )
}

export default SanitizerData;