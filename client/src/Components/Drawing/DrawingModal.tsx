import Modal from '../Common/Modal';
import { Dialog } from '@headlessui/react';
import { Form, FormField, FormInputFuncProps } from '../Common/Form';
import Button from '../Common/Button';
import { useMutation } from 'react-query';
import { editDrawing, saveDrawing } from '../../providers/reactQuery';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IAxiosError } from '../../interfaces/Error';
import { queryClient } from '../../config/queryClient';
import { IDrawingElements } from '../../interfaces/Drawing';

interface Props {
    isOpen: boolean;
    close: () => void;
    elements: IDrawingElements[];
    title?: string;
    description?: string;
}

const SaveDrawingModal = ({ isOpen, close, elements, title, description }: Props) => {
    const { drawingId } = useParams();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(drawingId ? editDrawing : saveDrawing, {
        onMutate: async (newDrawing) => {
            const previousDrawings = queryClient.getQueryData('drawings');
            queryClient.setQueryData('drawings', newDrawing);
            return { previousDrawings };
        },

        onSuccess: () => {
            close();
            toast.success(`Drawing ${drawingId ? "updated" : "saved"} succesfully`);
            navigate("/drawings/explore");
        },
        onError: (err) => {
            toast.error((err as IAxiosError)?.response?.data?.message)
        }
    })

    const handleSubmit = async (data: Record<string, string>) => {
        const { title, description } = data || { title: "", description: "" }
        const payload = { title, description, elements };
        if (drawingId) (payload as unknown as { id: string })["id"] = drawingId;
        mutate(payload);
    }

    return (
        <Modal isOpen={isOpen} close={close}>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-8 text-gray-900"
            >
                Enter the Title and Description for your Drawing!
            </Dialog.Title>

            <Form onSubmit={handleSubmit} className="flex flex-col items-center justify-center px-2 md:px-0 mt-4 space-y-4">
                <FormField
                    required
                    name="title"
                    type="text"
                >
                    {({ errors, ...props }: FormInputFuncProps) => (
                        <div className="flex flex-col gap-2 w-full">
                            <input
                                {...props}
                                placeholder='Title'
                                defaultValue={title}
                                className={`shadow-sm block px-3 py-2 border rounded-md placeholder-gray-400 sm:text-sm focus:outline-none focus:border-indigo-600 ${errors ? "border-red-600" : ""}`}
                            />
                            {errors && (<p className="text-xs text-error-red capitalize">{errors.message}</p>)}

                        </div>
                    )}
                </FormField>

                <FormField
                    required
                    name="description"
                    type="text"
                >
                    {({ errors, ...props }: FormInputFuncProps) => (
                        <div className="flex flex-col gap-2 w-full">
                            <textarea
                                {...props}
                                rows={3}
                                placeholder='Description'
                                defaultValue={description}
                                className={`shadow-sm block px-3 py-2 border rounded-md placeholder-gray-400 sm:text-sm focus:outline-none focus:border-indigo-600 ${errors ? "border-red-600" : ""}`}
                            />
                            {errors && (<p className="text-xs text-error-red capitalize">{errors.message}</p>)}

                        </div>
                    )}
                </FormField>

                <div className="mt-4 flex items-center space-x-4 justify-end w-full">
                    <Button type='button' kind='secondary' onClick={close}>Cancel</Button>
                    <Button disabled={isLoading} loading={isLoading} type='submit'>Save</Button>
                </div>
            </Form>
        </Modal>
    )
}

export default SaveDrawingModal;