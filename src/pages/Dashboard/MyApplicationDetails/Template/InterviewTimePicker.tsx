import { Spin } from 'antd';
import React, { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast';
import { GrFormPreviousLink } from 'react-icons/gr';
import { ImSpinner8 } from 'react-icons/im';
import { useInterviewAvailableTimesQuery, useSetInterviewDateMutation } from '../../../../Redux/Features/BaseApi';
import { useCookies } from 'react-cookie';
import AdminError from '../../../../components/Shared/AdminError';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

type propTypes = {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setSelectedDateTime: React.Dispatch<React.SetStateAction<{ date: string, time: string, slotId: number } | null>>,
    selectedDateTime: { date: string, time: string, slotId: number } | null;
    interviewModalRef: React.MutableRefObject<HTMLDialogElement | null>,
    applicationId: string | number,
    applicationEncodedId: string
}

const InterviewTimePicker = React.memo(({ setCurrentPage, selectedDateTime, setSelectedDateTime, interviewModalRef, applicationEncodedId, applicationId }: propTypes) => {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const { id: userId } = useSelector((state: RootState) => state?.user)
    const { isLoading, isError, isSuccess, data } = useInterviewAvailableTimesQuery({ token, date: selectedDateTime?.date || '' });
    const [postInterviewDate, { isLoading: postLoading, isError: postIsErr, isSuccess: postSuccess, error: postErr }] = useSetInterviewDateMutation();

    const handleSubmit = useCallback(() => {
        if (selectedDateTime?.date && selectedDateTime?.time) {
            postInterviewDate({ token, data: { applicationId: applicationId, slotId: selectedDateTime?.slotId, userId }, encodedId: applicationEncodedId })
        }
    }, [selectedDateTime])

    useEffect(() => {
        if (postSuccess) {
            interviewModalRef?.current?.close();
            toast.success('Interview date added successfully');
            setSelectedDateTime(null)
            setCurrentPage(1)
        }
        if (postIsErr) {
            const error = postErr as { data : {message: string} };
            toast.error(error?.data?.message || 'Interview date added failed, try again')
        }
    }, [postSuccess, postIsErr]);

    return (
        <Spin spinning={postLoading} size="default" indicator={<ImSpinner8 className="text-xl text-primary animate-spin" />}>
            {
                isLoading ?
                    <div className="min-h-80 flex justify-center items-center">
                        <ImSpinner8 className="text-3xl text-primary animate-spin" />
                    </div> : isError ? <AdminError /> : !isSuccess ? <></> :
                        <div>
                            <span className='flex flex-row items-center gap-x-3'>
                                <div onClick={() => setCurrentPage(1)} className='bg-primary p-1.5 rounded-full inline-block my-2 cursor-pointer'>
                                    <GrFormPreviousLink className='text-2xl text-white' />
                                </div>
                                <h3 className="text-lg text-black dark:text-gray">Select Interview Time</h3>
                            </span>
                            <div className='grid grid-cols-3 gap-4 items-center mt-5'>
                                {
                                    data?.slots?.map(time => {
                                        return <span key={time?.id} onClick={() => setSelectedDateTime({ date: selectedDateTime?.date || '', time: time?.start_time, slotId: time?.id })} className={`w-full border border-slate-400 dark:border-graydark rounded-md py-1.5 hover:border-primary duration-200 cursor-pointer text-sm ${selectedDateTime?.time === time?.start_time ? 'bg-primary text-white' : 'text-black dark:text-white'} ${time?.is_booked ? 'opacity-50' : ''}`}>
                                            <h4 className='text-center'>{time?.start_time}</h4>
                                        </span>
                                    })
                                }
                            </div>
                            <button onClick={handleSubmit} disabled={!selectedDateTime?.date || !selectedDateTime?.time} className="rounded bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 m-1 cursor-pointer border-0 outline-none mt-2 mr-auto float-end disabled:bg-opacity-60 disabled:cursor-not-allowed">
                                Done
                            </button>
                        </div>
            }
        </Spin>
    )
})

export default InterviewTimePicker;
