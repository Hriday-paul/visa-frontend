import React, { useRef } from 'react'
import InterviewDatePicker from '../../../Dashboard/MyApplicationDetails/Template/InterviewDatePicker';
import { MdOutlineModeEditOutline } from 'react-icons/md';

const EditApplicationSchedule = React.memo(({ applicationId, applicationEncodedId, appoinmentId }: { applicationId: number, applicationEncodedId: string; appoinmentId ?: number ;}) => {
    const interviewModalRef = useRef<HTMLDialogElement | null>(null);
    const openInterviewModal = () => {
        interviewModalRef?.current?.showModal()
    }
    return (
        <div>
            <li onClick={openInterviewModal} className="p-0.5 pl-2 hover:bg-[#3174AD] dark:hover:bg-boxdark duration-200 rounded cursor-pointer hover:text-white">
                <p className='flex items-center gap-x-1'>
                    <MdOutlineModeEditOutline />
                    <span>Reshedule</span>
                </p>
            </li>
            <dialog ref={interviewModalRef} className="modal z-10">
                <div className="modal-box w-[380px] max-w-4xl">
                    <InterviewDatePicker applicationId={applicationId} applicationEncodedId={applicationEncodedId} interviewModalRef={interviewModalRef} isEditComponent={true} appoinmentId={appoinmentId}/>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
})

export default EditApplicationSchedule;
