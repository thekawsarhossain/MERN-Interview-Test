/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "react-query";
import { deleteDrawing, getDrawings } from "../providers/reactQuery";
import Button from "../Components/Common/Button";
import Loading from "../Components/Common/Loading";
import DrawingPreview from "../Components/Drawing/DrawingPreview";
import { IDrawing } from "../interfaces/Drawing";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { IAxiosError } from "../interfaces/Error";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { queryClient } from "../config/queryClient";

const ExploreDrawings = () => {
    const { data: drawings, isLoading, isError, error } = useQuery("drawings", () => getDrawings());

    const { mutate: deleteMutate } = useMutation(deleteDrawing, {
        onMutate: async (drawingId) => {
            const previousDrawings = queryClient.getQueryData('drawings');
            queryClient.setQueryData('drawings', (old: any) => ({ ...old, data: old?.data?.filter((drawing: { _id: string; }) => drawing._id !== drawingId) }));
            return { previousDrawings };
        },

        onSuccess: () => {
            toast.success(`Drawing deleted successfully`);
        },
        onError: (err, _variables, context) => {
            toast.error((err as IAxiosError)?.response?.data?.message);
            if (context?.previousDrawings) {
                queryClient.setQueryData('drawings', context.previousDrawings);
            }
        }
    })

    useEffect(() => {
        if (isError) toast.error((error as IAxiosError)?.response?.data?.message);
    }, [error, isError])

    const handleDelete = async (drawingId: string) => {
        deleteMutate(drawingId);
    }

    return (
        <div className="container mx-auto mt-4">
            <div className="flex justify-between items-center px-4 md:px-0">
                <h2 className="text-2xl md:text-4xl font-bold font-fira-sans my-10">Explore list of drawings!</h2>
                <Button className="min-w-fit" href="/draw/create">Start Drawing</Button>
            </div>
            {isLoading ? (
                <Loading className="w-12 h-12 mt-10" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {drawings?.data?.map((drawing: IDrawing | undefined) => (
                        <div key={drawing?._id} className="relative border p-4 rounded-lg duration-150 hover:border-red-300 hover:shadow block group">
                            <Link to={`/draw/edit/${drawing?._id}`}>
                                <h3 className="text-lg font-bold font-fira-sans">{drawing?.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{drawing?.description}</p>
                                <DrawingPreview drawing={drawing} />
                            </Link>
                            <div className="absolute top-2 right-2 hidden group-hover:block">
                                <Button onClick={() => handleDelete(drawing?._id as string)} ><MdDeleteOutline className="w-4 h-4" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExploreDrawings;
