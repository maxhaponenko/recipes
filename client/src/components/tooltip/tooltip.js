import React from 'react';
import './tooltip.scss';

const Tooltip = ({
    className,
    ...rest
}) => {
    
    const classNames = className ? 'ap-tooltip '.concat(className) : 'ap-tooltip'
    
    return (
        <div className={classNames}>
            <span className="triangle"></span>
            <div className="text">{rest.children}</div>
        </div>
    )
}
    

export default Tooltip