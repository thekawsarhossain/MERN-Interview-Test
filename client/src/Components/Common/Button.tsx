import React from "react";
import c from "classnames";
import { UrlObject } from "url";
import { useNavigate } from "react-router-dom";

const buttonClassesMap = {
    common: "inline-flex relative py-2 px-4 border shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
    primary: "border-transparent rounded text-white bg-primary hover:bg-red-700 focus:bg-red-700 disabled:bg-red-100 disabled:text-gray-300",
    secondary: "border-gray-300 rounded text-gray-900 bg-transparent hover:bg-gray-100 focus:ring-gray-200 disabled:bg-gray-200 disabled:text-gray-300",
};



interface IButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    kind?: keyof typeof buttonClassesMap;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    href?: string | UrlObject;
}

export default function Button({
    className,
    kind = "primary",
    loading,
    children,
    onClick,
    href,
    ...props
}: IButtonProps) {
    const navigate = useNavigate();
    let onButtonClick = onClick;
    if (href) {
        onButtonClick = (e) => {
            if (typeof href !== "string") navigate(href.toString());
            else navigate(href);
            if (onClick) onClick(e);
        };
    }

    let loaderClass = "border-gray-100  border-t-gray-600";
    if (kind === "primary") {
        loaderClass = "border-gray-100 border-t-red-700";
    }

    return (
        <button
            disabled={loading || props.disabled}
            className={c(buttonClassesMap[kind], buttonClassesMap.common, className)}
            onClick={onButtonClick}
            {...props}
        >
            {loading && (
                <div className="left-0 absolute w-full flex justify-center">
                    <div className={c(`border-2 w-5 h-5 rounded-full animate-spin`, loaderClass)} />
                </div>
            )}
            <span className={loading ? "opacity-0 inline-flex items-center" : "inline-flex items-center"}>
                {children}
            </span>
        </button>
    );
}