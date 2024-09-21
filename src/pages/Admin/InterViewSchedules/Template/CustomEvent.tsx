import { Popover } from 'antd'
import React, { useCallback } from 'react'
import {
    EventProps
} from 'react-big-calendar'
import { IoEyeOutline } from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md'
import EditApplicationSchedule from './EditApplicationSchedule'
import { useEditUserInterviewScheduleMutation } from '../../../../Redux/Features/BaseApi'
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast'

const CustomEvent = React.memo(({ event }: EventProps) => {
    const resource = event?.resource as { encodedId: string, applicationId: number; appointment: { id: number, interview_date: string | null; start_time: string | null; slot_duration: string; interview_status: 'Cancel' | 'Done' | 'Reschedule', visa_application: number; user: number, schedule_slot: number }[] }

    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];

    const [postCencelInterviewDate] = useEditUserInterviewScheduleMutation();

    const handleCancelInterview = useCallback(() => {
        const load = toast.loading('schedule canceling....')
        postCencelInterviewDate({ encodedId: resource?.encodedId, token, data: { status: 'Cancel', appoinmentId: event?.resource?.appointment[0]?.id } })
            .then(res => {
                if (res.data) {
                    toast.success('Schedule cancel successfully', {id : load})
                }
                if (res.error) {
                    toast.error('Schedule cancel failed, try again', {id : load})
                }
            })
    }, [])

    return <div className=''>
        <Popover
            content={
                <ul className="rounded-sm z-999999 w-36 p-1 bg-white dark:bg-boxdark-2 text-slate-900 dark:text-slate-200">
                    <li onClick={() => window.open(`${window.location.origin}/admin/applications/${resource?.encodedId}`)} className={`p-0.5 pl-2 hover:bg-[#3174AD] dark:hover:bg-boxdark duration-200 rounded cursor-pointer hover:text-white`}>
                        <p className='flex items-center gap-x-1'>
                            <IoEyeOutline />
                            <span>View Application</span>
                        </p>
                    </li>
                    <EditApplicationSchedule applicationId={resource?.applicationId} applicationEncodedId={resource?.encodedId} appoinmentId={event?.resource?.appointment[0]?.id} />

                    {
                        (event?.resource?.appointment.length && event?.resource?.appointment[0]?.interview_status !== 'Cancel') && <li onClick={handleCancelInterview} className={`p-0.5 pl-2 hover:bg-[#3174AD] dark:hover:bg-boxdark duration-200 rounded cursor-pointer hover:text-white`}>
                            <p className='flex items-center gap-x-1'>
                                <MdDeleteOutline />
                                <span>Cancel</span>
                            </p>
                        </li>
                    }
                </ul>
            }
            trigger="click">
            <div className='flex flex-row items-center justify-between'>
                {event?.title}
            </div>
        </Popover>
    </div>
})

export default CustomEvent;