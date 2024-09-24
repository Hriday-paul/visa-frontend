import React from 'react'
import { GrFormNextLink } from "react-icons/gr";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoTransgenderOutline } from "react-icons/io5";
import CountrySelect from '../UserDashboard/Application/templates/CountrySelect';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/Store';
import { editPersonalInfoApplication } from '../../../Redux/Slices/EditApplicationSlice';
import { Inputs } from '../UserDashboard/Personal_information/Personal_information';
import { MdErrorOutline } from 'react-icons/md';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";


const EditPersonalInfo = React.memo(({ setEditApplicationStep }: { setEditApplicationStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const draft = useSelector((state: RootState) => state.editApplication);
    const dispatch = useDispatch<AppDispatch>();
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
            marital_status: draft?.marital_status || 'Single',
            educational_background: draft?.educational_background || '',
            gender: draft?.gender || 'Male',
            postal_code: draft?.postal_code
        }
    });

    const handleEditPersonalInfo: SubmitHandler<Inputs> = (data) => {
        dispatch(editPersonalInfoApplication(data))
        setEditApplicationStep(1)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleEditPersonalInfo)}>
                <div className="p-3 md:p-4 xl:p-6.5 z-1 rounded-sm border border-stroke">

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Name
                                <span className="text-red-500 text-base ml-1">*</span>
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
                                <span className="text-red-500 text-base ml-1">*</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                                placeholder="Enter your Email"
                                className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.email ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                            />
                            {errors.email && <div className='flex items-center mt-0.5'>
                                <MdErrorOutline className='text-sm text-orange-500' />
                                <p className='text-orange-500 text-sm ml-1'>Invalid email address</p>
                            </div>}
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Phone
                                <span className="text-red-500 text-base ml-1">*</span>
                            </label>

                            <div className={`bg-white dark:bg-form-input border w-full px-4 py-3 rounded ${errors?.phone_number ? 'border-red-500' : 'border-stroke dark:border-strokedark'}`}>
                                <Controller
                                    name="phone_number"
                                    control={control}
                                    rules={{
                                        required: 'Phone number is required',
                                        validate: (value) => isValidPhoneNumber(value.toString()) || 'Invalid phone number'
                                    }}
                                    render={({ field }) => (
                                        <PhoneInput
                                            {...field}
                                            defaultCountry="BD"
                                            international
                                            withCountryCallingCode
                                            onChange={field.onChange}
                                            value={field.value.toString()}
                                        />
                                    )}
                                />
                            </div>
                            {
                                errors.phone_number && <div className='flex items-center mt-0.5'>
                                    <MdErrorOutline className='text-sm text-orange-500' />
                                    <p className='text-orange-500 text-sm ml-1'>Invalid phone number</p>
                                </div>
                            }
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Permanent Address
                                <span className="text-red-500 text-base ml-1">*</span>
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
                                <span className="text-red-500 text-base ml-1">*</span>
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
                                <span className="text-red-500 text-base ml-1">*</span>
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
                                <span className="text-red-500 text-base ml-1">*</span>
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
                                <span className="text-red-500 text-base ml-1">*</span>
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
                                Postal code
                                <span className="text-red-500 text-base ml-1">*</span>
                            </label>
                            <input
                                type="number"
                                {...register("postal_code", { required: true, min: 1 })}
                                placeholder="Enter your occupation"
                                className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.postal_code ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                            />
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                        <Controller
                            name="date_of_birth"
                            control={control}
                            rules={{ required: "date_of_birth is required" }}
                            render={({ field }) => (
                                <Flatpickr
                                    placeholder='YYYY-MM-DD'
                                    defaultValue={draft?.date_of_birth}
                                    onChange={(_, str) => {
                                        field.onChange(str)
                                    }}
                                    render={
                                        ({ defaultValue }, ref) => {
                                            return <div className='w-full xl:w-1/2'>
                                                <label className="mb-2.5 block text-black dark:text-white" >
                                                    Date Of Birth
                                                    <span className="text-red-500 text-base ml-1">*</span>
                                                </label>
                                                <input placeholder='YYYY-MM-DD' defaultValue={defaultValue} ref={ref} className={`form-datepicker w-full rounded border-[1.5px] bg-transparent px-5 py-3 font-normal outline-none transition dark:bg-form-input ${errors?.date_of_birth ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`} />
                                            </div>
                                        }
                                    }
                                />
                            )}
                        />

                        <div className="w-full xl:w-1/2">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Select Gender
                                    <span className="text-red-500 text-base ml-1">*</span>
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
                            <label className="mb-2.5 block text-black dark:text-white">
                                Occupation
                                <span className="text-red-500 text-base ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("occupation", { required: true })}
                                placeholder="Enter your occupation"
                                className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.occupation ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                            />
                        </div>
                        <div className="w-full xl:w-1/2">
                            <p className="mb-2.5 block text-black dark:text-white">
                                Merital status
                                <span className="text-red-500 text-base ml-1">*</span>
                            </p>

                            <div>
                                <div className="flex items-center gap-x-2">
                                    <div className="flex items-center">
                                        <input defaultChecked={draft?.marital_status == 'Married'} id="marit" type="radio" value="Married" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" {...register('marital_status', { required: 'Choose your marital_status' })} />
                                        <label htmlFor="marit" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer">Married</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input defaultChecked={draft?.marital_status == 'Single'} id="unmerit" type="radio" value="Single" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" {...register('marital_status', { required: 'Choose your marital_status' })} />
                                        <label htmlFor="unmerit" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer">Single</label>
                                    </div>
                                </div>
                                {errors?.marital_status && <p className="text-xs text-red-500 mt-1.5">Choose your marital status</p>}
                            </div>

                        </div>
                    </div>

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
    )
})

export default EditPersonalInfo
