import { Empty } from "antd";
import { MdOutlineLocalPolice, MdPendingActions } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { TbDeviceIpadMinus } from "react-icons/tb";
import Message from "./Template/Message";
import { useVisaStatusMutation } from "../../../Redux/Features/BaseApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import StatusError from "./Template/StatusError";
import { useCookies } from "react-cookie";

type Inputs = { id: string; };

export default function VisaStatus() {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const [getStatus, { isLoading, isError, isSuccess, error, data }] = useVisaStatusMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const handleTracking: SubmitHandler<Inputs> = (data) => {
        // console.log(data)
        getStatus({...data, token})
    };

    return (
        <div className="max-w-270 w-full">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Visa Status
                    </h3>
                </div>

                <div className="p-6 5">
                    <form onSubmit={handleSubmit(handleTracking)} className="w-full md:w-2/3 xl:w-1/2 mx-auto flex">

                        <input
                            type="text"
                            {...register("id", { required: true })}
                            placeholder="Enter your Tracking Id"
                            className={`w-full rounded rounded-r-none border-[1.5px] border-r-0 bg-transparent py-3 px-5 text-black outline-none transition ${errors.id ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white`}
                        />
                        <button className="bg-primary px-8 py-2 text-white">Track</button>
                    </form>

                    {
                        isLoading ?
                            <div className="min-h-80 flex justify-center items-center">
                                <ImSpinner8 className="text-4xl text-primary animate-spin" />
                            </div>
                            :
                            isError ?
                                <div className="min-h-80 flex justify-center items-center">
                                    <StatusError error={error} />
                                </div>
                                :
                                isSuccess ?
                                    <div>
                                        <div className="bg-white dark:bg-boxdark min-h-80 flex justify-center items-center">

                                            <div className="mb-8 text-center w-full relative px-12 flex flex-col my-10">
                                                <ul className="mx-1 before:top-18 before:absolute before:border-t before:border-dashed before:h-0 before:left-20 lg:before:left-16 xl:before:left-28 md:before:block before:w-4/5 flex flex-col gap-y-8 md:gap-y-0 md:flex-row justify-between items-center mt-5 before:hidden">
                                                    <li className="z-10">
                                                        <span className={`h-24 w-24 border-2 border-primary hover:bg-primary dark:hover:bg-primary hover:border-transparent group rounded-full flex justify-center items-center ${data?.visa_status === 'Panding' ? 'bg-primary dark:bg-primary' : 'bg-white dark:bg-form-input'}`}>
                                                            <MdPendingActions className={`text-4xl ${data?.visa_status === 'Panding' ? 'text-white' : 'text-primary group-hover:text-white dark:text-slate-100'}`} />
                                                        </span>
                                                        <div>
                                                            <p className="mt-2 text-center dark:text-slate-300">Step 1 </p>
                                                            <h3 className="text-xl font-medium text-black -mt-1 text-center dark:text-slate-100">Pending</h3>
                                                        </div>
                                                    </li>
                                                    <li className="z-10 ">
                                                        <div className="mx-auto flex justify-center items-center">
                                                            <div className={`h-24 w-24 border-2 border-primary hover:bg-primary dark:hover:bg-primary hover:border-transparent hover:border-white group rounded-full flex justify-center items-center ${data?.visa_status === 'AdminApprove' ? 'bg-primary dark:bg-primary' : 'bg-white dark:bg-form-input'}`}>
                                                                <TbDeviceIpadMinus className={`text-4xl ${data?.visa_status === 'AdminApprove' ? 'text-white' : 'text-primary group-hover:text-white dark:text-slate-100'}`} />
                                                            </div>
                                                        </div>
                                                        <p className="mt-2 text-center dark:text-slate-300">Step 2 </p>
                                                        <h3 className="text-xl font-medium text-black -mt-1 text-center dark:text-slate-100">Admin approve</h3>
                                                    </li>
                                                    <li className="z-10">
                                                        <div className="mx-auto flex justify-center items-center">
                                                            <div className={`h-24 w-24 border-2 border-primary hover:bg-primary dark:hover:bg-primary hover:border-transparent hover:border-white group rounded-full flex justify-center items-center ${data?.visa_status === 'PoliceVerification' ? 'bg-primary dark:bg-primary' : 'bg-white dark:bg-form-input '}`}>
                                                                <MdOutlineLocalPolice className={`text-4xl ${data?.visa_status === 'PoliceVerification' ? 'text-white' : 'text-primary group-hover:text-white dark:text-slate-100'}`} />
                                                            </div>
                                                        </div>
                                                        <p className="mt-2 text-center dark:text-slate-300">Step 3 </p>
                                                        <h3 className="text-xl font-medium text-black -mt-1 text-center dark:text-slate-100">Police verification</h3>
                                                    </li>
                                                    <li className="z-10 ">
                                                        <div className={`h-24 w-24 border-2 border-primary hover:bg-primary dark:hover:bg-primary hover:border-transparent hover:border-white group rounded-full flex justify-center items-center ${data?.visa_status === 'Approved' ? 'bg-primary dark:bg-primary' : 'bg-white dark:bg-form-input '}`}>
                                                            <SiTicktick className={`text-4xl ${data?.visa_status === 'Approved' ? 'text-white' : 'text-primary group-hover:text-white dark:text-slate-100'}`} />
                                                        </div>
                                                        <p className="mt-2 text-center dark:text-slate-300">Step 4 </p>
                                                        <h3 className="text-xl font-medium text-black -mt-1 text-center dark:text-slate-100">Approved</h3>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <Message msg={data?.message} />
                                    </div>
                                    :
                                    <div className="min-h-80 flex justify-center items-center">
                                        <Empty />
                                    </div>
                    }

                </div>
            </div>
        </div>
    )
}
