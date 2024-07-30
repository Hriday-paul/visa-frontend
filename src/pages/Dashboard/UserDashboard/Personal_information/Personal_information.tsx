import DatePicker from "../Application/templates/DatePicker";
import CountrySelect from "../Application/templates/CountrySelect";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateStep } from "../../../../Redux/Slices/ApplicationStepSlice";
import { addPersonalInfo } from "../../../../Redux/Slices/Application_infoSlice";

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
    health_information: string;
    gender: 'Male' | 'Female' | 'Others'
}

export default function Personal_information() {

    const navig = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const draft = useSelector((state:RootState)=>state.application_infoSlice);

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
            health_information: draft?.health_information || '',
            gender: draft?.gender || 'Male',
        }
    });

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
                        Personal Details
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
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Health Informayion
                                </label>
                                <input
                                    type="text"

                                    {...register("health_information", { required: true })}
                                    placeholder="Enter your health informayion"
                                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.health_information ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                />
                            </div>
                        </div>


                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <p className="mb-2.5 block text-black dark:text-white">
                                    Gender
                                </p>

                                <div>
                                    <div className="flex items-center gap-x-2">
                                        <div className="flex items-center">
                                            <input id="male" type="radio" value="Male" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" {...register('gender', { required: 'Choose your gender' })} />
                                            <label htmlFor="male" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer">Male</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="female" type="radio" value="Female" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" {...register('gender', { required: 'Choose your gender' })} />
                                            <label htmlFor="female" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer">Female</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="others" type="radio" value="Others" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" {...register('gender', { required: 'Choose your gender' })} />
                                            <label htmlFor="others" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer">Others</label>
                                        </div>
                                    </div>
                                    {errors?.gender && <p className="text-xs text-red-500 mt-1.5">Choose your gender</p>}
                                </div>


                            </div>


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
