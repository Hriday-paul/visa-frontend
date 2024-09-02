import React, { useEffect, useState } from 'react'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { useBookedDateListQuery, useSetInterviewDateMutation } from '../../../../Redux/Features/BaseApi';
import { useCookies } from 'react-cookie';
import { ImSpinner8 } from 'react-icons/im';
import AdminError from '../../../../components/Shared/AdminError';
import { Spin } from 'antd';
import toast from 'react-hot-toast';

const InterviewDatePicker = React.memo(({ applicationId, applicationEncodedId, interviewModalRef }: { applicationId: string | number, applicationEncodedId: string; interviewModalRef: React.MutableRefObject<HTMLDialogElement | null> }) => {
    const [postInterviewDate, { isLoading: postLoading, isError: postIsErr, isSuccess: postSuccess }] = useSetInterviewDateMutation();
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const { isLoading, isSuccess, data, isError } = useBookedDateListQuery({ token });
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleSubmit = () => {
        if (selectedDate) {
            postInterviewDate({ token, data: { id: applicationId, interview_date: selectedDate }, encodedId: applicationEncodedId })
        }
    }

    useEffect(() => {
        if (postSuccess) {
            interviewModalRef?.current?.close();
            toast.success('Interview date added successfully');
        }
        if (postIsErr) {
            toast.error('Interview date added failed, try again')
        }
    }, [postSuccess, postIsErr]);

    return (
        <Spin spinning={postLoading} size="default" indicator={<ImSpinner8 className="text-xl text-primary animate-spin" />}>
            <div className='w-[305px] mx-auto'>
                {
                    isLoading ?
                        <div className="min-h-80 flex justify-center items-center">
                            <ImSpinner8 className="text-3xl text-primary animate-spin" />
                        </div> : isError ? <AdminError /> : !isSuccess ? <></> :
                            <div className=''>
                                <Flatpickr
                                    data-enable-time
                                    onChange={(_, str) => {
                                        setSelectedDate(str)
                                    }}
                                    options={{
                                        disable: data?.fully_booked_dates,
                                        minDate: "today",
                                        inline: true,
                                        altInput: true,
                                        dateFormat: 'Y-m-d',
                                        enableTime: false,
                                        altInputClass: 'invisible',
                                    }}
                                />
                                <button onClick={handleSubmit} disabled={!selectedDate} className="rounded bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 m-1 cursor-pointer border-0 outline-none mt-5 mr-auto float-end disabled:bg-opacity-60 disabled:cursor-not-allowed">
                                    Done
                                </button>
                            </div>
                }
            </div>
        </Spin>
    )
})

export default InterviewDatePicker;