import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { IconBase } from "react-icons";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'

const ArrowComponent = ({ state, icon, setCount, value }) => {
    return (
        <button
            className="flex items-center px-2 active:enabled:text-white active:enabled:bg-black text-2xl"
            disabled={state}
            onClick={() => {
                setCount((currentValue) => currentValue + value);
            }}
        >
            {icon}
        </button>
    );
};

const Paginate = ({ onPageChange, page, maxPage, maxLimit, className }) => {
    
    const [count, setCount] = useState(0);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);

    useEffect(() => {
        if (count * maxPage + maxPage > maxLimit) setNext(true);
        else setNext(false);

        if (count * maxPage <= 0) setPrev(true);
        else setPrev(false);

    }, [maxPage, maxLimit, count]);

    const handleChangePage = useCallback(
        (value) => {
            onPageChange(value);
        },
        [onPageChange]
    );

    const pageCount = Math.min(maxPage, Math.abs(maxLimit - count * maxPage));
    
    const renderedPages = Array(pageCount)
        .fill(0)
        .map((_, idx) => {
            const value = count * maxPage + (idx + 1);

            return (
                <div
                    key={idx}
                    style={page === value ? { backgroundColor: "black", color: "white" } : { backgroundColor: "transparent", color: "black" }}
                    className="flex items-center hover:bg-black hover:text-white p-1.5">
                    <button
                        onClick={() => {
                            handleChangePage(value);
                        }}

                        className="w-full outline-none px-2 font-raleway font-semibold font-sm"
                        key={idx}
                    >
                        {value}
                    </button>
                </div>
            );
        });

    const classes = classNames("flex flex-row gap-y-2 justify-center border-2 lg:border-4 border-solid border-black rounded-lg mx-2", className)

    return (
        <div className={classes}>
            <ArrowComponent
                state={prev}
                icon={<MdKeyboardArrowLeft />}
                setCount={setCount}
                value={-1}
            />
            {renderedPages}
            <ArrowComponent
                state={next}
                icon={<MdKeyboardArrowRight />}
                setCount={setCount}
                value={1}
            />
        </div>
    );
};

export default Paginate;
