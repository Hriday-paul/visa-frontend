import DatePicker from "../Application/templates/DatePicker";
import CountrySelect from "../Application/templates/CountrySelect";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateStep } from "../../../../Redux/Slices/ApplicationStepSlice";
import { addPersonalInfo } from "../../../../Redux/Slices/Application_infoSlice";
import { useEffect } from "react";
import { IoTransgenderOutline } from "react-icons/io5";

export type Inputs = {
    full_name: string,
    email: string;
    phone_number: string;
    permanent_address: string;
    present_address: string;
    city: string;
    nationality: string;
    occupation: string;
    date_of_birth: string;
    state_province: string;
    marital_status: 'Merit' | 'Unmerit';
    educational_background: string;
    gender: 'Male' | 'Female' | 'Others'
}

export default function Personal_information() {

    const navig = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const draft = useSelector((state: RootState) => state.application_infoSlice);
    const { step, stepList } = useSelector((state: RootState) => state?.applicationStep)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            full_name: draft?.full_name || '',
            email: draft?.email || '',
            phone_number: draft?.phone_number || '',
            permanent_address: draft?.permanent_address || "",
            present_address: draft?.present_address || '',
            city: draft?.city || '',
            nationality: draft?.nationality || '',
            occupation: draft?.occupation || '',
            date_of_birth: draft?.date_of_birth || '',
            state_province: draft?.state_province || '',
            marital_status: draft?.marital_status || 'Unmerit',
            educational_background: draft?.educational_background || '',
            gender: draft?.gender || 'Male',
        }
    });

    useEffect(() => {
        if (step !== 0) {
            navig(`/dashboard/application/${step + 1}`)
        }
    }, [step])

    const handleAddPersonalInfo: SubmitHandler<Inputs> = (data) => {
        dispatch(addPersonalInfo(data));
        dispatch(updateStep(1))
        navig('/dashboard/application/2');
    }

    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        {stepList[step].title}
                    </h3>
                </div>
                <form onSubmit={handleSubmit(handleAddPersonalInfo)}>
                    <div className="p-6.5">

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Name
                                </label>
                                <input
                                    type="text"

                                    {...register("full_name", { required: true })}
                                    placeholder="Enter your name"
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.full_name ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"

                                    {...register("email", { required: true, pattern: /(?=.*?[@])/ })}
                                    placeholder="Enter your Email"
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.email ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Phone
                                </label>
                                <input
                                    type="number"

                                    {...register("phone_number", { required: true, pattern: /(?=.*?[0-9])/ })}
                                    placeholder="Enter your phone number"
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.phone_number ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Permanent Address
                                </label>
                                <input
                                    type="text"

                                    {...register("permanent_address", { required: true })}
                                    placeholder="Enter your permanent address"
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.permanent_address ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>
                        </div>


                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Present Address
                                </label>
                                <input
                                    type="text"

                                    {...register("present_address", { required: true })}
                                    placeholder="Enter your present address"
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.present_address ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <CountrySelect defaultValue={draft?.nationality} control={control} errors={errors} />
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    City
                                </label>
                                <input
                                    type="text"
                                    {...register("city", { required: true })}
                                    placeholder="Enter your city"
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.city ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    State province
                                </label>
                                <input
                                    type="text"

                                    {...register("state_province", { required: true })}
                                    placeholder="Enter your state province"
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.state_province ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>
                        </div>


                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Educational Background
                                </label>
                                <input
                                    type="text"

                                    {...register("educational_background", { required: true })}
                                    placeholder="Enter your education"
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.educational_background ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Occupation
                                </label>
                                <input
                                    type="text"
                                    {...register("occupation", { required: true })}
                                    placeholder="Enter your occupation"
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.occupation ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>
                        </div>

                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <DatePicker control={control} defaultValue={draft?.date_of_birth} title="Date of Birth" errors={errors} />
                            <div className="w-full xl:w-1/2">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Select Gender
                                    </label>

                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                            <IoTransgenderOutline />
                                        </span>

                                        <select
                                            {...register("gender", { required: true })}
                                            defaultValue={draft?.gender || 'Male'}
                                            className={`relative z-20 w-full appearance-none rounded border  bg-transparent py-3 px-12 outline-none transition  dark:bg-form-input ${errors?.nationality ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                        >
                                            <option value="" disabled className="text-body dark:text-bodydark">
                                                Choose Gender
                                            </option>
                                            {
                                                ['Male', 'Female', 'Others']?.map((name, indx) => {
                                                    return <option value={name} key={indx + name} className="text-body dark:text-bodydark">
                                                        {name}
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

                            </div>

                        </div>


                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">



                            <div className="w-full xl:w-1/2">
                                <p className="mb-2.5 block text-black dark:text-white">
                                    Merital status
                                </p>

                                <div>
                                    <div className="flex items-center gap-x-2">
                                        <div className="flex items-center">
                                            <input defaultChecked={draft?.marital_status == 'Merit'} id="marit" type="radio" value="Merit" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" {...register('marital_status', { required: 'Choose your marital_status' })} />
                                            <label htmlFor="marit" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer">Marit</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input defaultChecked={draft?.marital_status == 'Unmerit'} id="unmerit" type="radio" value="Unmerit" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" {...register('marital_status', { required: 'Choose your marital_status' })} />
                                            <label htmlFor="unmerit" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer">Unmerit</label>
                                        </div>
                                    </div>
                                    {errors?.marital_status && <p className="text-xs text-red-500 mt-1.5">Choose your marital status</p>}
                                </div>

                            </div>
                        </div>


                        {/* <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Next
                            </button> */}
                        <div className="flex justify-end">
                            <button
                                className="inline-flex items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 "
                            >

                                Next
                                <GrFormNextLink className="text-xl text-white" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
