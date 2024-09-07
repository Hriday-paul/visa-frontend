import { Spin } from 'antd';
import React, { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast';
import { GrFormPreviousLink } from 'react-icons/gr';
import { ImSpinner8 } from 'react-icons/im';
import { useSetInterviewDateMutation } from '../../../../Redux/Features/BaseApi';
import { useCookies } from 'react-cookie';

const times = [
    '10:00', '10:30', "11:00", '11:30', "12:00", '12:30', "1:00", '1:30', "2:00"
]

type propTypes = {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setSelectedDateTime: React.Dispatch<React.SetStateAction<{ date: string, time: string } | null>>,
    selectedDateTime: { date: string, time: string } | null;
    interviewModalRef: React.MutableRefObject<HTMLDialogElement | null>,
    applicationId : string | number,
    applicationEncodedId : string
}

const InterviewTimePicker = React.memo(({ setCurrentPage, selectedDateTime, setSelectedDateTime, interviewModalRef, applicationEncodedId, applicationId }: propTypes) => {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const [postInterviewDate, { isLoading: postLoading, isError: postIsErr, isSuccess: postSuccess }] = useSetInterviewDateMutation();

    const handleSubmit = useCallback(() => {
        if (selectedDateTime?.date && selectedDateTime?.time) {
            postInterviewDate({ token, data: { id: applicationId, interview_date: selectedDateTime?.date, interview_time : selectedDateTime?.time }, encodedId: applicationEncodedId })
        }
    }, [selectedDateTime])

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
            <span className='flex flex-row items-center gap-x-3'>
                <div onClick={() => setCurrentPage(1)} className='bg-primary p-1.5 rounded-full inline-block my-2 cursor-pointer'>
                    <GrFormPreviousLink className='text-2xl text-white' />
                </div>
                <h3 className="text-lg text-black dark:text-gray">Select Interview Time</h3>
            </span>
            <div className='grid grid-cols-2 gap-4 items-center mt-5'>
                {
                    times?.map(time => {
                        return <span key={time} onClick={()=>setSelectedDateTime({date : selectedDateTime?.date || '', time})} className={`w-full border border-slate-400 dark:border-graydark rounded-md py-2 hover:border-primary duration-200 cursor-pointer ${selectedDateTime?.time === time ? 'bg-primary text-white' : 'text-black dark:text-white'}`}>
                            <h4 className='text-center'>{time}</h4>
                        </span>
                    })
                }
            </div>
            <button onClick={handleSubmit} disabled={!selectedDateTime?.date || !selectedDateTime?.time} className="rounded bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 m-1 cursor-pointer border-0 outline-none mt-2 mr-auto float-end disabled:bg-opacity-60 disabled:cursor-not-allowed">
                Done
            </button>
        </Spin>
    )
})

export default InterviewTimePicker;
