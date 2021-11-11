import { Button } from 'antd';
function ButtonWithLoadding({
    showLoadding = false,
    onClick = () => { },
    className = "",
    type = 'submit',
    btnIconClass = '',
    showBtnIcon = true,
    component = null,
    children
}) {

    let newIcon = '';
    if (!btnIconClass) {
        newIcon = <i className="fa fa-paper-plane d-inline-block mr-1" aria-hidden="true"></i>;
    }
    if (btnIconClass) {
        newIcon = <i className={`${btnIconClass} d-inline-block mr-1`} aria-hidden="true"></i>;
    }
    if (!showBtnIcon) { newIcon = '' }

    if (component) {
        newIcon = component;
    }
    return (
        <>
            <Button
                block={true}
                className={className}
                // disabled={disabled || showLoadding}
                type="primary"
                size="large"
                icon={newIcon}
                loading={showLoadding}
                htmlType={type}
                onClick={onClick}
            // onClick={onClick}
            >
                {children}
            </Button>
            <style jsx global>{`
                svg {
                    overflow: hidden;
                    vertical-align: baseline;
                }
            `}</style>
        </>
    );

}

export default ButtonWithLoadding;
