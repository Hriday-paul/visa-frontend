import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/Store';
import ChangeDocumentCard from './Template/ChangeDocumentCard';

const EditDocuments = React.memo(({ setEditApplicationStep }: { setEditApplicationStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const draft = useSelector((state: RootState) => state.editApplication);
    const dispatch = useDispatch<AppDispatch>();
    const [files, setFiles] = useState<{ user_photo: File | null, passport_photo: File | null, health_ensurence: File | null, travel_insurance: File | null, applicant_signature: File | null }>({
        user_photo: null,
        passport_photo: null,
        health_ensurence: null,
        travel_insurance: null,
        applicant_signature: null
    });

    return (
        <div className="p-6.5 z-1">
            <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4">
                <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                    <p className="text-base text-graydark dark:text-slate-200 font-medium">Files</p>
                </div>
                <div className="p-3 md:p-4 lg:p-5 flex flex-row items-center gap-5 flex-wrap">
                    <ChangeDocumentCard name={'Passport'} image={'applicationDetails?.passport_photo'} />
                    <ChangeDocumentCard name={'Passport'} image={'applicationDetails?.passport_photo'} />
                    <ChangeDocumentCard name={'Passport'} image={'applicationDetails?.passport_photo'} />
                    <ChangeDocumentCard name={'Passport'} image={'applicationDetails?.passport_photo'} />
                </div>
            </div>
        </div>
    )
})

export default EditDocuments;
