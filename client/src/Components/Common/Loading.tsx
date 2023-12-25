import c from "classnames";

interface LoadingProps {
    className?: string
}

const Loading = ({ className }: LoadingProps) => {

    return (
        <div className="flex justify-center">
            <div className={c("border-4 rounded-full border-gray-100 border-t-indigo-600 animate-spin w-6 h-6", className)} />
        </div>
    );
};

export default Loading;