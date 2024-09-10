import React, {useState } from 'react'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import InterviewTimePicker from './InterviewTimePicker';
import { useInterviewAvailableDatesQuery } from '../../../../Redux/Features/BaseApi';
import { useCookies } from 'react-cookie';
import { ImSpinner8 } from 'react-icons/im';
import AdminError from '../../../../components/Shared/AdminError';

const InterviewDatePicker = React.memo(({ applicationId, applicationEncodedId, interviewModalRef, isEditComponent = false }: { applicationId: string | number, applicationEncodedId: string; interviewModalRef: React.MutableRefObject<HTMLDialogElement | null>, isEditComponent ?: boolean }) => {

    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const { isLoading, isSuccess, data, isError } = useInterviewAvailableDatesQuery({ token });
    const [selectedDateTime, setSelectedDateTime] = useState<{ date: string, time: string, slotId : number } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    return (

        <div className='w-[305px] mx-auto normal-date-picker'>
            {
                isLoading ?
                    <div className="min-h-80 flex justify-center items-center">
                        <ImSpinner8 className="text-3xl text-primary animate-spin" />
                    </div> : isError ? <AdminError /> : !isSuccess ? <></> :
                currentPage == 1 ?
                    <div className='mb-8'>
                        <h3 className="text-lg text-black dark:text-gray font-medium">Select Interview date</h3>
                        <Flatpickr
                            data-enable-time
                            defaultValue={selectedDateTime?.date}
                            onChange={(_, str) => {
                                setSelectedDateTime({ date: str, time: '', slotId : 0 })
                                setCurrentPage(2)
                            }}
                            options={{
                                disable: data?.fully_booked_dates,
                                minDate: data?.start_date,
                                maxDate : data?.end_date,
                                inline: true,
                                altInput: true,
                                dateFormat: 'Y-m-d',
                                enableTime: false,
                                altInputClass: 'invisible',
                            }}
                        />

                    </div>
                    :
                    <InterviewTimePicker setCurrentPage={setCurrentPage} selectedDateTime={selectedDateTime} setSelectedDateTime={setSelectedDateTime} interviewModalRef={interviewModalRef} applicationId={applicationId} applicationEncodedId={applicationEncodedId} isEditComponent={isEditComponent}/>
            }
        </div>
    )
})

export default InterviewDatePicker;