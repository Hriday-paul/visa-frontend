import React, {useState } from 'react'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import InterviewTimePicker from './InterviewTimePicker';

const InterviewDatePicker = React.memo(({ applicationId, applicationEncodedId, interviewModalRef }: { applicationId: string | number, applicationEncodedId: string; interviewModalRef: React.MutableRefObject<HTMLDialogElement | null> }) => {
    // const { isLoading, isSuccess, data, isError } = useBookedDateListQuery({ token });
    const [selectedDateTime, setSelectedDateTime] = useState<{ date: string, time: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    return (

        <div className='w-[305px] mx-auto'>
            {
                // isLoading ?
                //     <div className="min-h-80 flex justify-center items-center">
                //         <ImSpinner8 className="text-3xl text-primary animate-spin" />
                //     </div> : isError ? <AdminError /> : !isSuccess ? <></> :
                currentPage == 1 ?
                    <div className='mb-8'>
                        <h3 className="text-lg text-black dark:text-gray font-medium">Select Interview date</h3>
                        <Flatpickr
                            data-enable-time
                            defaultValue={selectedDateTime?.date}
                            onChange={(_, str) => {
                                setSelectedDateTime({ date: str, time: '' })
                                setCurrentPage(2)
                            }}
                            options={{
                                // disable: data?.fully_booked_dates,
                                minDate: "today",
                                inline: true,
                                altInput: true,
                                dateFormat: 'Y-m-d',
                                enableTime: false,
                                altInputClass: 'invisible',
                            }}
                        />

                    </div>
                    :
                    <InterviewTimePicker setCurrentPage={setCurrentPage} selectedDateTime={selectedDateTime} setSelectedDateTime={setSelectedDateTime} interviewModalRef={interviewModalRef} applicationId={applicationId} applicationEncodedId={applicationEncodedId}/>
            }
        </div>
    )
})

export default InterviewDatePicker;