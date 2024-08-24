import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineCategory, MdOutlineEdit } from "react-icons/md";
import { useEditVisaStepMutation } from "../../../Redux/Features/BaseApi";
import { useCookies } from "react-cookie";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";

type proptype = {
    id: number, tracking_id: string; visa_status: string; message: string;
}

type formType = {
    visa_status: string;
    message: string;
}

const EditVisaStep = React.memo(({ visaStatus, applicationId }: { visaStatus: proptype, applicationId : string }) => {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];

    const [postEdit, { isLoading, isError, isSuccess }] = useEditVisaStepMutation();

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<formType>({
        defaultValues: {
            visa_status: visaStatus?.visa_status || '',
            message: visaStatus?.message || '',
        }
    });

    const handleEdit: SubmitHandler<formType> = (data) => {
        postEdit({...data, token, tracking_id : visaStatus?.tracking_id, id : applicationId})
    }

    const openModal = () => {
        modalRef?.current?.showModal()
    }

    useEffect(()=>{
        if(isSuccess){
            modalRef?.current?.close();
            toast.success('Edit successfully')
        }
        if(isError){
            toast.error('Something went wrong, try again')
        }
    },[isSuccess, isError])


    return (
        <span className="w-1/2 line-clamp-2">
            <div className="flex items-center space-x-3.5">
                <span className=" bg-primary text-white p-3 hover:opacity-80 cursor-pointer" onClick={openModal}>
                    <MdOutlineEdit className="text-lg text-white " />
                </span>
                <dialog ref={modalRef} id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <h3 className="text-lg mb-5">Edit Visa step</h3>
                        <form onSubmit={handleSubmit(handleEdit)}>
                            <div className="w-full">
                                <label className="mb-3 block text-black dark:text-white">
                                    Select visa step
                                </label>

                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                        <MdOutlineCategory />
                                    </span>

                                    <select
                                        {...register("visa_status", { required: true })}
                                        className={`relative z-20 w-full appearance-none rounded border  bg-transparent py-3 px-12 outline-none transition  dark:bg-form-input ${errors?.visa_status ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                    >
                                        <option value="" disabled className="text-body dark:text-bodydark">
                                            Select visa type
                                        </option>
                                        {
                                            ['Pending', 'AdminApprove', 'PoliceVerification', 'Approved'].map((type, indx) => {
                                                return <option value={type} key={indx + type} className="text-body dark:text-bodydark">
                                                    {type}
                                                </option>
                                            })
                                        }

                                    </select>

                                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.8">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                    fill="#637381"
                                                ></path>
                                            </g>
                                        </svg>
                                    </span>

                                </div>
                            </div>
                            <div className="w-full mt-3">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Message
                                </label>
                                <textarea
                                    {...register("message")}
                                    placeholder="Write message..."
                                    rows={5}
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.message ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>
                            <div className="w-full mt-3 flex justify-end">
                                <button className="bg-primary text-white p-3 hover:opacity-80 cursor-pointer border-none outline-0 rounded text-sm flex gap-x-2 items-center">
                                    {isLoading && < ImSpinner2 className="text-lg text-white animate-spin"/>}
                                    <span>Update</span>
                                </button>

                            </div>
                        </form>


                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

            </div>
        </span>
    )
})

export default EditVisaStep
