import { useNavigate, useParams } from "react-router-dom";
import DrawingBoard from "../Components/Drawing/DrawingBoard";
import { getDrawing } from "../providers/reactQuery";
import { useQuery } from "react-query";
import { useEffect } from "react";
import Loading from "../Components/Common/Loading";
import toast from "react-hot-toast";
import { IAxiosError } from "../interfaces/Error";

const EditDrawing = () => {
    const navigate = useNavigate();
    const { drawingId } = useParams();
    const { data: drawing, isLoading, isError, error } = useQuery(["drawing", drawingId], () => getDrawing(drawingId as string));

    useEffect(() => {
        if (isError) {
            toast.error((error as IAxiosError)?.response?.data?.message);
            navigate("/drawings/explore");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isError])

    return (
        isLoading ?
            <div className="flex justify-center items-center h-screen w-full">
                <Loading className="w-12 h-12" />
            </div>
            : <DrawingBoard drawing={drawing?.data} />
    );
};

export default EditDrawing;