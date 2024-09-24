import React, { useCallback } from 'react'
import ChangeDocumentCard from './Template/ChangeDocumentCard';
import { GrFormNextLink } from 'react-icons/gr';

const EditDocuments = React.memo(({ setEditApplicationStep }: { setEditApplicationStep: React.Dispatch<React.SetStateAction<number>> }) => {

    const clickPrev = useCallback(() => {
        setEditApplicationStep(2)
    }, []);

    const clickNext = () => {
        setEditApplicationStep(4)
    }


    return (
        <div className="p-3 md:p-4 xl:p-6.5 z-1 rounded-sm border border-stroke">
            <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark mb-4">
                <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                    <p className="text-base text-graydark dark:text-slate-200 font-medium">Files</p>
                </div>
                <div className="p-3 md:p-4 lg:p-5 flex flex-row items-center gap-5 flex-wrap">
                    <ChangeDocumentCard name={'My photo'} />
                    <ChangeDocumentCard name={'Passport Front'} />
                    <ChangeDocumentCard name={'Passport Back'} />
                    <ChangeDocumentCard name={'Health ensurence'} />
                    <ChangeDocumentCard name={'Travel insurance'} />
                    <ChangeDocumentCard name={'Signature'} />
                </div>
            </div>

            <div className="flex flex-row items-center gap-x-5 justify-end">
                <span
                    onClick={clickPrev}
                    className="inline-flex cursor-pointer items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    <GrFormNextLink className="text-xl text-white rotate-180" />
                    Prev
                </span>
                <button
                    onClick={clickNext}
                    className="inline-flex items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Next
                    <GrFormNextLink className="text-xl text-white" />
                </button>
            </div>
        </div>
    )
})

export default EditDocuments;
