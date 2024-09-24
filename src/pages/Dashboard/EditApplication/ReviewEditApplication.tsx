import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../Redux/Store';
import { useEditApplicationMutation } from '../../../Redux/Features/BaseApi';
import toast from 'react-hot-toast';
import { addAllInfo } from '../../../Redux/Slices/EditApplicationSlice';
import { Spin } from 'antd';
import { ImSpinner8 } from 'react-icons/im';
import PersonalInfo from '../../../components/Shared/ApplicantDetails/PersonalInfo';
import PassportInfo from '../../../components/Shared/ApplicantDetails/PassportInfo';
import ImergencyInfo from '../../../components/Shared/ApplicantDetails/ImergencyInfo';
import VisaInfo from '../../../components/Shared/ApplicantDetails/VisaInfo';
import { GrFormNextLink } from 'react-icons/gr';
import FileCard from '../../Admin/ApplicationDetails/FileCard';
import { LiaRocketSolid } from 'react-icons/lia';

const ReviewEditApplication = React.memo(({ setEditApplicationStep }: { setEditApplicationStep: React.Dispatch<React.SetStateAction<number>> }) => {
    const [postEdit, { isLoading, isError, isSuccess, data }] = useEditApplicationMutation()
    const draft = useSelector((state: RootState) => state.editApplication);
    const [cookies] = useCookies(['baerer-token']);
    const params = useParams();
    const token = cookies["baerer-token"];
    const dispatch = useDispatch<AppDispatch>();

    const clickPrev = () => {
        setEditApplicationStep(3)
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

    const handleFinish = () => {
        const form = new FormData();
        for (const key in draft) {
            const value = (draft as { [key: string]: any })[key];
            if (value !== undefined && value !== null) {
                if (key === 'user_photo') {
                    console.log("I , called in root user photo", draft?.user_photo.startsWith('http'))
                    if (!draft?.user_photo.startsWith('http')) {
                        console.log("I , called in user photo", draft?.user_photo.startsWith('http'))
                        form.append(key, draft?.user_photo);
                    }
                }
                else if (key === 'passport_front_photo') {
                    if (!draft?.passport_front_photo.startsWith('http')) {

                        form.append(key, draft.passport_front_photo);
                    }
                }
                else if (key === 'passport_back_photo') {
                    if (!draft?.passport_back_photo.startsWith('http')) {
                        form.append(key, draft.passport_back_photo);
                    }
                }
                else if (key === 'health_ensurence') {
                    if (!draft?.health_ensurence.startsWith('http')) {
                        form.append(key, draft.health_ensurence);
                    }
                }
                else if (key === 'travel_insurance') {
                    if (!draft?.travel_insurance.startsWith('http')) {
                        form.append(key, draft.travel_insurance);
                    }
                }
                else if (key === 'applicant_signature') {
                    if (!draft?.applicant_signature.startsWith('http')) {
                        form.append(key, draft.applicant_signature);
                    }
                }
                else {
                    console.log('called-----', key)
                    form.append(key, value.toString());
                }
            }
        }
        postEdit({ token, id: params?.id || 0, data: form })
    }


    return (
        <Spin spinning={isLoading} size="large" indicator={<ImSpinner8 className="text-lg text-primary animate-spin" />}>
            <div className="p-3 md:p-4 xl:p-6.5 rounded-sm border border-stroke">
                {/* // personal details  */}
                <PersonalInfo applicationDetails={draft} />

                {/* // passport information  */}
                <PassportInfo applicationDetails={draft} />

                {/* // imargency contact  */}
                <ImergencyInfo applicationDetails={draft} />

                {/* // visa details  */}
                <VisaInfo applicationDetails={draft} />

                {/* files  */}
                <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4 mt-8">
                    <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                        <p className="text-base text-graydark dark:text-slate-200 font-medium">Files</p>
                    </div>
                    <div className="p-3 md:p-4 lg:p-5 flex flex-row items-center gap-5 flex-wrap">
                        <FileCard name={'Applicant Photo'} url={draft?.user_photo} />
                        <FileCard name={'Passport Front'} url={draft?.passport_front_photo} />
                        <FileCard name={'Passport Back'} url={draft?.passport_front_photo} />
                        <FileCard name={'Health ensurence'} url={draft?.health_ensurence} />
                        <FileCard name={'Travel ensurence'} url={draft?.travel_insurance} />
                        <FileCard name={'Signature'} url={draft?.applicant_signature} />
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
                        onClick={handleFinish}
                        className="inline-flex items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        Finish
                        <LiaRocketSolid className="text-xl text-white" />
                    </button>
                </div>

            </div>
        </Spin>
    )
})

export default ReviewEditApplication;
