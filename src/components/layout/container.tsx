import React, { JSX } from "react";

type PropTypes = {
    fluid?: boolean;
    shrink?: boolean;
    children: JSX.Element | JSX.Element[];
    className?: string;
};

const Container = ({ children, shrink = false, className }: PropTypes) => {
    return (
        <div
            className={`mx-auto w-full ${shrink ? "max-w-[70rem]" : "max-w-[90rem]"} px-4 sm:px-6 xl:px-8 3xl:px-10 ${className}`}
        >
            {children}
        </div>
    );
};

export default Container;
