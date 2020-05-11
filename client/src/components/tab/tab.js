import React from 'react';

const Tab = ({
    isActive,
    className,
    style,
    toggle,
    children
}) => {

    const classNames = isActive ? ('active '.concat(className ? className : '')) : (''.concat(className ? className : ''))

    return (
        <div className={classNames} style={style ? style : null} onClick={toggle}>
            <div>{children}</div>
        </div>
    )
}

export default Tab