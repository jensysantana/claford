import React from 'react';
import { Typography } from 'antd';
import { DataFormater } from '~/helpers/helper-classes';
import SanitizerData from '~/components/securities/SanitizerData';
const { Text } = Typography;

function TypografyText({ className, shoIcon = true, children, text, ...rest }) {
    return (
        <>
            <Text className={`localp ` + className} {...rest} type="danger">
                {shoIcon && <i className="fa fa-exclamation-circle" /> }
                <SanitizerData text={text || children} /> 
            </Text>
            {/* <Text className={`localp ` + className} {...rest} type="danger"><i className="fa fa-exclamation-circle" /> <SanitizerData text={rest.children} /> {DataFormater.SanitizerData(rest.children)}</Text> */}
            <style jsx global>{`
                .localp {
                    font-size:16px !important;
                    font-weight:400;
                }
                
                `
            }
            </style>
        </>
    )
}

export default TypografyText;
