import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/Store';
import ChangeDocumentCard from './Template/ChangeDocumentCard';
import { GrFormNextLink } from 'react-icons/gr';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { useEditApplicationMutation } from '../../../Redux/Features/BaseApi';
import { Spin } from 'antd';
import { ImSpinner8 } from 'react-icons/im';
import toast from 'react-hot-toast';
import { addAllInfo } from '../../../Redux/Slices/EditApplicationSlice';

const EditDocuments = React.memo(({ setEditApplicationStep }: { setEditApplicationStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const [postEdit, { isLoading, isError, isSuccess, data }] = useEditApplicationMutation()
    const draft = useSelector((state: RootState) => state.editApplication);
    const dispatch = useDispatch<AppDispatch>();
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const [files, setFiles] = useState<{ user_photo: File | null, passport_front_photo: File | null, passport_back_photo: File | null, health_ensurence: File | null, travel_insurance: File | null, applicant_signature: File | null }>({
        user_photo: null,
        passport_front_photo: null,
        passport_back_photo: null,
        health_ensurence: null,
        travel_insurance: null,
        applicant_signature: null
    });
    const params = useParams();

    const clickPrev = useCallback(() => {
        setEditApplicationStep(2)
    }, []);

    const clickFinish = () => {
        const copyDraft = { ...draft };
        const keysToDelete = ['id', 'user_photo', 'passport_front_photo','passport_back_photo', 'health_ensurence', 'travel_insurance', 'applicant_signature'];

        keysToDelete.forEach(key => {
            delete (copyDraft as { [key: string]: any })[key];
        });

        if (files?.user_photo) {
            copyDraft.user_photo = files?.user_photo
        }
        if (files?.passport_front_photo) {
            copyDraft.passport_front_photo = files?.passport_front_photo
        }
        if (files?.passport_back_photo) {
            copyDraft.passport_back_photo = files?.passport_back_photo
        }
        if (files?.health_ensurence) {
            copyDraft.health_ensurence = files?.health_ensurence
        }
        if (files?.travel_insurance) {
            copyDraft.travel_insurance = files?.travel_insurance
        }
        if (files?.applicant_signature) {
            copyDraft.applicant_signature = files?.applicant_signature
        }

        const form = new FormData();
        for (const key in copyDraft) {
            const value = (copyDraft as { [key: string]: any })[key];
            if (value !== undefined && value !== null) {
                if (key === 'user_photo') {
                    form.append(key, files.user_photo as File);
                }
                else if (key === 'passport_front_photo') {
                    form.append(key, files.passport_front_photo as File);
                }
                else if (key === 'passport_back_photo') {
                    form.append(key, files.passport_back_photo as File);
                }
                else if (key === 'health_ensurence') {
                    form.append(key, files.health_ensurence as File);
                }
                else if (key === 'travel_insurance') {
                    form.append(key, files.travel_insurance as File);
                }
                else if (key === 'applicant_signature') {
                    form.append(key, files.applicant_signature as File);
                }
                else form.append(key, value.toString());
            }
        }

        postEdit({ token, id: params?.id || 0, data: form })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Your application edit successfully');
            dispatch(addAllInfo(data));
            setEditApplicationStep(0);
        }
        if (isError) {
            toast.error('Application failed, try again')
        }
    }, [isSuccess, isError]);

    return (
        <Spin spinning={isLoading} size="large" indicator={<ImSpinner8 className="text-lg text-primary animate-spin" />}>
            <div className="p-3 md:p-4 xl:p-6.5 z-1">
                <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark mb-4">
                    <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                        <p className="text-base text-graydark dark:text-slate-200 font-medium">Files</p>
                    </div>
                    <div className="p-3 md:p-4 lg:p-5 flex flex-row items-center gap-5 flex-wrap">
                        <ChangeDocumentCard name={'My photo'} image={files?.user_photo || draft?.user_photo} setFiles={setFiles} />
                        <ChangeDocumentCard name={'Passport Front'} image={files?.passport_front_photo || draft?.passport_front_photo} setFiles={setFiles} />
                        <ChangeDocumentCard name={'Passport Back'} image={files?.passport_back_photo || draft?.passport_back_photo} setFiles={setFiles} />
                        <ChangeDocumentCard name={'Health ensurence'} image={files?.health_ensurence || draft?.health_ensurence} setFiles={setFiles} />
                        <ChangeDocumentCard name={'Travel insurance'} image={files?.travel_insurance || draft?.travel_insurance} setFiles={setFiles} />
                        <ChangeDocumentCard name={'Signature'} image={files?.applicant_signature || draft?.applicant_signature} setFiles={setFiles} />
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
                        onClick={clickFinish}
                        className="inline-flex items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        Update
                        <GrFormNextLink className="text-xl text-white" />
                    </button>
                </div>

            </div>
        </Spin>
    )
})

export default EditDocuments;
