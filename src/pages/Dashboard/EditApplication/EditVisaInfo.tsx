import React, { useCallback, useMemo } from 'react'
import { AppDispatch, RootState } from '../../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Visa_information_types } from '../UserDashboard/Application/Visa_information';
import { GrFormNextLink } from 'react-icons/gr';
import countryList from 'react-select-country-list';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { editVisaInfoApplication } from '../../../Redux/Slices/EditApplicationSlice';

const EditVisaInfo = React.memo(({ setEditApplicationStep }: { setEditApplicationStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const dispatch = useDispatch<AppDispatch>();
    const draft = useSelector((state: RootState) => state.editApplication);
    const countries = useMemo(() => countryList().getData(), []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Visa_information_types>({
        defaultValues: {
            passport_no: draft?.passport_no || '',
            passport_issue_date: draft?.passport_issue_date || '',
            passport_expiry_date: draft?.passport_expiry_date || '',
            country_of_passport_issuance: draft?.country_of_passport_issuance || "",
        }
    });

    const handleEditVisaInfo: SubmitHandler<Visa_information_types> = (data) => {
        dispatch(editVisaInfoApplication(data))
        // dispatch(updateStep(step + 1));
        console.log(data)
    }

    const clickPrev = useCallback(() => {
        setEditApplicationStep(1)
    }, []);

    return (
        <div>
            <form className="p-6.5" onSubmit={handleSubmit(handleEditVisaInfo)}>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Passport number
                        </label>
                        <input
                            type="text"
                            {...register("passport_no", { required: true })}
                            placeholder="enter your passport no"
                            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.passport_no ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                        />
                    </div>


                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Passport Issue Date
                        </label>
                        <input {...register("passport_issue_date", { required: true })} defaultValue={draft?.passport_issue_date} type="date" className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.passport_issue_date ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`} />
                    </div>


                </div>


                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Passport Expiry Date
                        </label>
                        <input {...register("passport_expiry_date", { required: true })} defaultValue={draft?.passport_expiry_date} type="date" className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.passport_expiry_date ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`} />
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Country of passport issuance
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="0.8">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                            fill="#637381"
                                        ></path>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                            fill="#637381"
                                        ></path>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                            fill="#637381"
                                        ></path>
                                    </g>
                                </svg>
                            </span>

                            <Controller
                                name="country_of_passport_issuance"
                                control={control}
                                rules={{ required: "country_of_passport_issuance is required" }}
                                render={({ field }) => (

                                    <select
                                        onChange={(e) => field.onChange(e.target.value)}
                                        defaultValue={draft?.country_of_passport_issuance || 'bangladesh'}
                                        className={`relative z-20 w-full appearance-none rounded border  bg-transparent py-3 px-12 outline-none transition  dark:bg-form-input ${errors?.country_of_passport_issuance ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                                    >
                                        <option value="" disabled className="text-body dark:text-bodydark">
                                            Choose a country
                                        </option>
                                        {
                                            countries?.map((country, indx) => {
                                                return <option value={country?.label} key={indx + country?.label} className="text-body dark:text-bodydark">
                                                    {country?.label}
                                                </option>
                                            })
                                        }

                                    </select>

                                )}
                            >
                            </Controller>



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
            </form>
        </div>
    )
})

export default EditVisaInfo;
