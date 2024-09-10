import React, { useRef } from 'react'
import { ApplicationResponseType } from '../../../../Redux/Features/Types';
import InterviewDatePicker from '../../../Dashboard/MyApplicationDetails/Template/InterviewDatePicker';

const EditApplicationSchedule = React.memo(({ applicationDetails }: { applicationDetails: ApplicationResponseType }) => {
    const interviewModalRef = useRef<HTMLDialogElement | null>(null);
    const openInterviewModal = () => {
        interviewModalRef?.current?.showModal()
    }
    return (
        <div>
            <li onClick={openInterviewModal} className={`p-2 pl-4 hover:bg-slate-50 dark:hover:bg-boxdark duration-200 rounded cursor-pointer`}>
                <p>Edit</p>
            </li>
            <dialog ref={interviewModalRef} className="modal z-10">
                <div className="modal-box w-[380px] max-w-4xl">
                    <InterviewDatePicker applicationId={applicationDetails?.id} applicationEncodedId={applicationDetails?.encoded_id} interviewModalRef={interviewModalRef} isEditComponent={true} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
})

export default EditApplicationSchedule;
