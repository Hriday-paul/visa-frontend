import { useCallback, useEffect } from 'react';
import { AppDispatch, RootState } from '../../../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { updateStep } from '../../../../Redux/Slices/ApplicationStepSlice';
import { useNavigate } from 'react-router-dom';
import { GrFormNextLink } from 'react-icons/gr';
import FileCard from '../../../Admin/ApplicationDetails/FileCard';
import { LiaRocketSolid } from "react-icons/lia";
import { useCookies } from 'react-cookie';
import { useAddvisaApplicationMutation } from '../../../../Redux/Features/BaseApi';
import { resetApplication } from '../../../../Redux/Slices/Application_infoSlice';
import toast from 'react-hot-toast';
import { Spin } from 'antd';
import { ImSpinner8 } from 'react-icons/im';
import PersonalInfo from '../../../../components/Shared/ApplicantDetails/PersonalInfo';
import PassportInfo from '../../../../components/Shared/ApplicantDetails/PassportInfo';
import ImergencyInfo from '../../../../components/Shared/ApplicantDetails/ImergencyInfo';
import VisaInfo from '../../../../components/Shared/ApplicantDetails/VisaInfo';

export default function ReviewApplication() {
    const { step, stepList } = useSelector((state: RootState) => state.applicationStep);
    const applicationDetails = useSelector((state: RootState) => state.application_infoSlice);
    const dispatch = useDispatch<AppDispatch>();
    const navig = useNavigate();
    const applicationData = useSelector((state: RootState) => state.application_infoSlice);

    const [cookies] = useCookies(['baerer-token']);

    const [postApplication, { isLoading, isError, isSuccess, data }] = useAddvisaApplicationMutation();

    const handleSubmitForm = useCallback(async () => {
        const token = cookies["baerer-token"];
        if (!token) {
            navig('/login')
            return;
        }
        await postApplication({ data: applicationData, token }).unwrap();
    }, [])


    useEffect(() => {
        if (isSuccess) {
            dispatch(resetApplication());
            dispatch(updateStep(0))
            navig(`/dashboard/my-applications/${data?.encoded_id}/success`)
        }
        if (isError) {
            toast.error('Application failed, try again')
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        if (step !== 4) {
            if (step == 3) {
                navig(`/dashboard/application/${step + 1}`)
            }
        }
    }, [step]);

    const clickPrev = useCallback(() => {
        dispatch(updateStep(step - 1))
    }, []);


    return (
        <Spin spinning={isLoading} size="large" indicator={<ImSpinner8 className="text-xl text-primary animate-spin" />}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        {stepList[step].title}
                    </h3>
                </div>
                <div className='p-6.5'>

                    {/* // personal details  */}
                    <PersonalInfo applicationDetails={applicationDetails} />

                    {/* // passport information  */}
                    <PassportInfo applicationDetails={applicationDetails} />

                    {/* // imargency contact  */}
                    <ImergencyInfo applicationDetails={applicationDetails} />

                    {/* // visa details  */}
                    <VisaInfo applicationDetails={applicationDetails} />

                    {/* files  */}
                    <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4 mt-8">
                        <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                            <p className="text-base text-graydark dark:text-slate-200 font-medium">Files</p>
                        </div>
                        <div className="p-3 md:p-4 lg:p-5 flex flex-row items-center gap-5 flex-wrap">
                            <FileCard name={'Applicant Photo'} url={applicationDetails?.user_photo || "https://res.cloudinary.com/devlj6p7h/image/upload/v1726732902/test/n5hyojbhnc6hpwofahis.jpg"} />
                            <FileCard name={'Passport Front'} url={applicationDetails?.passport_front_photo || "https://res.cloudinary.com/devlj6p7h/image/upload/v1726732902/test/n5hyojbhnc6hpwofahis.jpg"} />
                            <FileCard name={'Passport Back'} url={applicationDetails?.passport_front_photo || 'https://res.cloudinary.com/devlj6p7h/image/upload/v1726732902/test/n5hyojbhnc6hpwofahis.jpg'} />
                            <FileCard name={'Health ensurence'} url={applicationDetails?.health_ensurence || 'https://res.cloudinary.com/devlj6p7h/image/upload/v1726732902/test/n5hyojbhnc6hpwofahis.jpg'} />
                            <FileCard name={'Travel ensurence'} url={applicationDetails?.travel_insurance || 'https://res.cloudinary.com/devlj6p7h/image/upload/v1726732902/test/n5hyojbhnc6hpwofahis.jpg'} />
                            <FileCard name={'Signature'} url={applicationDetails?.applicant_signature || 'https://res.cloudinary.com/devlj6p7h/image/upload/v1726732902/test/n5hyojbhnc6hpwofahis.jpg'} />
                        </div>
                    </div>


                    {/* // button section  */}
                    <div className="flex flex-row items-center gap-x-5 justify-end">
                        <button
                            onClick={clickPrev}
                            className="inline-flex cursor-pointer items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 "
                        >
                            <GrFormNextLink className="text-xl text-white rotate-180" />
                            Prev
                        </button>
                        <button
                            onClick={handleSubmitForm}
                            className="inline-flex items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 "
                        >
                            Finish
                            <LiaRocketSolid className="text-xl text-white" />
                        </button>
                    </div>

                </div>
            </div>
        </Spin>
    )
}
