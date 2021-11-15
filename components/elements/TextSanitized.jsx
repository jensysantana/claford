import React from 'react';
import { Typography } from 'antd';
import { DataFormater } from '~/helpers/helper-classes';
import SanitizerData from '~/components/securities/SanitizerData';
const { Text } = Typography;

function TextSanitized({ className = '', children, text = '', ...rest }) {
    return (
        <SanitizerData text={text || children} />
    )
}

export default TextSanitized;
