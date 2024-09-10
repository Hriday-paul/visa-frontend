import React from 'react'
import { useAllInterviewScheduleQuery } from '../../../../Redux/Features/BaseApi'
import { useCookies } from 'react-cookie';
import { ImSpinner8 } from 'react-icons/im';
import AdminError from '../../../../components/Shared/AdminError';
import InterViewer from './InterViewer';

const AllSchedule = React.memo(({selectedDate} : {selectedDate : string | null}) => {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const { isLoading, isError, isSuccess, data } = useAllInterviewScheduleQuery({ token, selectedDate })

    return (
        <div>
            {isLoading ?
                <div className="min-h-80 flex justify-center items-center">
                    <ImSpinner8 className="text-3xl text-primary animate-spin" />
                </div> :
                isError ? <AdminError /> :
                    !isSuccess ? <></> :
                        <div>
                            <ul>
                                {
                                    data?.map(application=>{
                                        return  <InterViewer key={application?.id} photo={application?.user_photo} name={application?.full_name} interviewDate={application?.interview_date || ''} interViewTime={application?.interview_start_time || ''} application={application}/>
                                    })
                                }
                            </ul>
                            {
                                data?.length <= 0 && <div className='min-h-32 xl:min-h-60 flex flex-col justify-center items-center'>
                                    <img src="https://static.vecteezy.com/system/resources/previews/010/856/652/non_2x/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg" alt="empty image" className='h-36 w-auto' />
                                    <p className='text-xl text-slate-900 dark:text-slate-200 text-center'>No Results Found</p>
                                </div>
                            }
                        </div>       
            }
            
        </div>
    )
})

export default AllSchedule;
