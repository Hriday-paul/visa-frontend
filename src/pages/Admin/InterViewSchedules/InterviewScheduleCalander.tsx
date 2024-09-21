import { Fragment } from 'react'
import moment from 'moment'
import {
    Calendar,
    momentLocalizer,
} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useCookies } from 'react-cookie'
import { useAllInterviewScheduleQuery } from '../../../Redux/Features/BaseApi'
import { ImSpinner8 } from 'react-icons/im'
import AdminError from '../../../components/Shared/AdminError'
import CustomEvent from './Template/CustomEvent'

const mLocalizer = momentLocalizer(moment)

export default function InterviewScheduleCalander() {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const { isLoading, isError, isSuccess, data: schedules } = useAllInterviewScheduleQuery({ token })

    return (
        <div>
            {isLoading ?
                <div className="min-h-80 flex justify-center items-center">
                    <ImSpinner8 className="text-3xl text-primary animate-spin" />
                </div> :
                isError ? <AdminError /> :
                    !isSuccess ? <></> :
                        <Fragment>
                            <div className="">
                                <Calendar
                                    components={{
                                        event: CustomEvent
                                    }}
                                    defaultDate={new Date()}
                                    events={schedules?.map(schedule => {
                                        const timeWithMoment = moment(schedule?.appointment[0]?.start_time, 'HH:mm:ss');
                                        timeWithMoment.add(schedule?.appointment[0]?.slot_duration, 'minutes');
                                        return {
                                            id: schedule?.id,
                                            title: schedule?.full_name,
                                            start: new Date(schedule?.appointment[0]?.interview_date + 'T' + schedule?.appointment[0]?.start_time),
                                            end: new Date(schedule?.appointment[0]?.interview_date + 'T' + timeWithMoment.format('HH:mm:ss')),
                                            resource: {
                                                encodedId: schedule?.encoded_id,
                                                applicationId: schedule?.id,
                                                appointment: schedule?.appointment
                                            }
                                        }
                                    })}
                                    localizer={mLocalizer}
                                    showMultiDayTimes
                                    step={30}
                                    defaultView="month"
                                    style={{ height: 750, width: '100%' }}
                                    popup
                                    views={['month', 'week', 'day']}
                                    eventPropGetter={(event) => {
                                        const resource = event?.resource as { encodedId: string, applicationId: number, appointment : {id: number, interview_date: string | null; start_time: string | null; slot_duration: string; interview_status: 'Cancel' | 'Done' | 'Reschedule', visa_application: number; user: number, schedule_slot: number}[] };

                                        const bg = resource?.appointment?.length > 0 ? (resource?.appointment[0]?.interview_status === 'Cancel' ? { style: { backgroundColor: '#ef4444' } } : resource?.appointment[0]?.interview_status === 'Reschedule' ? { style: { backgroundColor: '#f59e0b' } } : { style: { backgroundColor: 'green' } })
                                        : 
                                        { style: { backgroundColor: 'green' } }
                                        return bg;
                                    }}
                                />
                            </div>
                        </Fragment>
            }
        </div>
    )
}
