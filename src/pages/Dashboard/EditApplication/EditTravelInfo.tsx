import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/Store';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MdErrorOutline, MdOutlineCategory } from 'react-icons/md';
import { GrFormNextLink } from 'react-icons/gr';
import { editTravelInfoApplication } from '../../../Redux/Slices/EditApplicationSlice';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

export type TravelInput_types = {
    visa_type: 'Tourist' | 'Business' | 'Student' | 'Work' | 'Medical' | 'Family',
    purpose_of_visit: string;
    planned_duration_of_stay: number;
    emergency_contact_name: string;
    emergency_contact_relationship: string;
    emergency_contact_phone: string;
    emergency_contact_email: string;
    accommodation_details: string;
}

const EditTravelInfo = React.memo(({ setEditApplicationStep }: { setEditApplicationStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const draft = useSelector((state: RootState) => state.editApplication);
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TravelInput_types>({
        defaultValues: {
            visa_type: draft?.visa_type || '',
            purpose_of_visit: draft?.purpose_of_visit || '',
            emergency_contact_name: draft?.emergency_contact_name || '',
            emergency_contact_relationship: draft?.emergency_contact_relationship || "",
            emergency_contact_phone: draft?.emergency_contact_phone || '',
            emergency_contact_email: draft?.emergency_contact_email || '',
            planned_duration_of_stay: draft?.planned_duration_of_stay || 0,
            accommodation_details: draft?.accommodation_details || '',
        }
    });

    const handleEditTravelInfo: SubmitHandler<TravelInput_types> = (data) => {
        dispatch(editTravelInfoApplication(data))
        setEditApplicationStep(2)
    }
    const clickPrev = useCallback(() => {
        setEditApplicationStep(0)
    }, [])

    return (

        <form onSubmit={handleSubmit(handleEditTravelInfo)}>
            <div className="p-3 md:p-4 xl:p-6.5 rounded-sm border border-stroke">

                <div className="flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Select visa type
                                <span className="text-red-500 text-base ml-1">*</span>
                            </label>

                            <div className="relative z-20 bg-white dark:bg-form-input">
                                <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                    <MdOutlineCategory />
                                </span>

                                <select
                                    {...register("visa_type", { required: true })}
                                    className={`relative z-20 w-full appearance-none rounded border  bg-transparent py-3 px-12 outline-none transition  dark:bg-form-input ${errors?.visa_type ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                >
                                    <option value="" disabled className="text-body dark:text-bodydark">
                                        Select visa type
                                    </option>
                                    {
                                        ['Tourist', 'Business', 'Student', 'Work', 'Medical', 'Family'].map((type, indx) => {
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
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Planed Duration of stay - min ( 7 days )
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            type="number"
                            {...register("planned_duration_of_stay", { required: true, min: 7 })}
                            placeholder="Planned duration of stay / day format"
                            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.planned_duration_of_stay ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                        />
                    </div>

                </div>

                <p className="my-5 text-black dark:text-white text-base">Emergency</p>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Name
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("emergency_contact_name", { required: true })}
                            placeholder="Emergency contact name"
                            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.emergency_contact_name ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                        />
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Relation
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("emergency_contact_relationship", { required: true })}
                            placeholder="Emergency contact relation"
                            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.emergency_contact_relationship ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                        />
                    </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Phone
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <div className={`bg-white dark:bg-form-input border w-full px-4 py-3 rounded ${errors?.emergency_contact_phone ? 'border-red-500' : 'border-stroke dark:border-strokedark'}`}>
                            <Controller
                                name="emergency_contact_phone"
                                control={control}
                                rules={{
                                    required: 'Phone number is required',
                                    validate: (value) => isValidPhoneNumber(value) || 'Invalid phone number'
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
                        {errors.emergency_contact_phone && <div className='flex items-center mt-0.5'>
                            <MdErrorOutline className='text-sm text-orange-500' />
                            <p className='text-orange-500 text-sm ml-1'>Invalid phone number</p>
                        </div>}
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Email
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("emergency_contact_email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                            placeholder="Emergency contact email"
                            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.emergency_contact_email ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                        />
                        {errors.emergency_contact_email && <div className='flex items-center mt-0.5'>
                            <MdErrorOutline className='text-sm text-orange-500' />
                            <p className='text-orange-500 text-sm ml-1'>Invalid email address</p>
                        </div>}
                    </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Purpose of visit
                        </label>
                        <textarea
                            {...register("purpose_of_visit")}
                            placeholder="Write why you visit"
                            rows={5}
                            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.purpose_of_visit ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                        />
                    </div>
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Accommodation Details
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            {...register("accommodation_details", { required: true })}
                            placeholder="House, road, place"
                            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.accommodation_details ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                        />
                    </div>
                </div>

                <div className="flex flex-row items-center gap-x-5 justify-end">
                    <span
                        onClick={clickPrev}
                        className="inline-flex cursor-pointer items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 "
                    >
                        <GrFormNextLink className="text-xl text-white rotate-180" />
                        Prev
                    </span>
                    <button
                        className="inline-flex items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 "
                    >

                        Next
                        <GrFormNextLink className="text-xl text-white" />
                    </button>
                </div>



            </div>
        </form>

    )
})

export default EditTravelInfo;
