import classNames from 'classnames';
import React, { useRef, useEffect } from 'react'

const Skeleton = ({ width, height, xs }) => {

    const classes = classNames('bg-gray-200 rounded-lg', xs)

    return (
        <div style={{ width: `${width}px`, height: `${height}px` }} className={classes}>
        </div>
    );
}

export default Skeleton