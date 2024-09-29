import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { useAddNewInterviewScheduleMutation } from '../../../../Redux/Features/BaseApi';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { Spin } from 'antd';
import { ImSpinner8 } from 'react-icons/im';

export type Inputs = {
    start_date: string,
    end_date: string;
    total_interview: string;
    start_time: string;
    end_time: string;
}

const ScheduleForm = React.memo(() => {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const [postSchedule, { isLoading, isError, isSuccess }] = useAddNewInterviewScheduleMutation();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>();

    const handleAddSchedule: SubmitHandler<Inputs> = (data) => {
        postSchedule({ ...data, token })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('New schedule created successfully');
            reset()
        }
        if (isError) {
            toast.error('Schedule added, try again')
        }
    }, [isSuccess, isError]);

    return (
        <Spin spinning={isLoading} size="large" indicator={<ImSpinner8 className="text-lg text-primary animate-spin" />}>
            <form onSubmit={handleSubmit(handleAddSchedule)}>

                <Controller
                    name="start_date"
                    control={control}
                    rules={{ required: "start date is required" }}
                    render={({ field }) => (
                        <Flatpickr
                            placeholder="YYYY-MM-DD"
                            onChange={(_, str) => {
                                field.onChange(str);
                            }}
                            options={{
                                minDate: 'today',
                                defaultDate: Date.now()
                            }}
                            render={({ defaultValue }, ref) => (
                                <div className="w-full mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Start Date
                                        <span className="text-red-500 text-base ml-1">*</span>
                                    </label>
                                    <input
                                        placeholder="YYYY-MM-DD"
                                        defaultValue={defaultValue}
                                        ref={ref}
                                        className={`form-datepicker w-full rounded border-[1.5px] bg-transparent px-5 py-3 font-normal outline-none transition dark:bg-form-input dark:text-gray ${errors?.start_date ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'
                                            }`}
                                    />
                                </div>
                            )}
                        />
                    )}
                />


                <Controller
                    name="end_date"
                    control={control}
                    rules={{ required: "End date is required" }}
                    render={({ field }) => (
                        <Flatpickr
                            placeholder='YYYY-MM-DD'
                            defaultValue={field.value}
                            onChange={(_, str) => {
                                field.onChange(str)
                            }}
                            options={{
                                minDate: 'today',
                                defaultDate: Date.now()
                            }}
                            render={
                                ({ defaultValue }, ref) => {
                                    return <div className='w-full mb-4.5'>
                                        <label className="mb-2.5 block text-black dark:text-white" >
                                            End Date
                                            <span className="text-red-500 text-base ml-1">*</span>
                                        </label>
                                        <input placeholder='YYYY-MM-DD' defaultValue={defaultValue} ref={ref} className={`form-datepicker w-full rounded border-[1.5px] bg-transparent px-5 py-3 font-normal outline-none transition dark:bg-form-input dark:text-gray ${errors?.end_date ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`} />
                                    </div>
                                }
                            }
                        />
                    )}
                />

                <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Interview Start Time
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <input
                        type="time"
                        {...register("start_time", { required: true, min: 1 })}
                        placeholder="Enter Daily Total InterView"
                        className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.start_time ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                    />
                </div>

                <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Interview End Time
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <input
                        type="time"
                        {...register("end_time", { required: true, min: 1 })}
                        placeholder="Enter Daily Total InterView"
                        className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.end_time ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                    />
                </div>

                <div className="w-full mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Daily Total Interview
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <input
                        type="number"
                        defaultValue={10}
                        {...register("total_interview", { required: true, min: 1 })}
                        placeholder="Enter Daily Total InterView"
                        className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.total_interview ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
                    />

                </div>


                <button className="bg-primary border-none outline-none px-6 py-3 text-white rounded-full hover:bg-opacity-80 duration-200 cursor-pointer">Create</button>


            </form>
        </Spin>
    )
})

export default ScheduleForm;