import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Redux/Store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateStep } from "../../../../Redux/Slices/ApplicationStepSlice";
import { GrFormNextLink } from "react-icons/gr";
import { addApplicationType, useAddvisaApplicationMutation } from "../../../../Redux/Features/BaseApi";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { resetApplication } from "../../../../Redux/Slices/Application_infoSlice";
import { useCookies } from "react-cookie";


export default function Documents() {
    const { step, stepList } = useSelector((state: RootState) => state.applicationStep);
    const dispatch = useDispatch<AppDispatch>();
    const navig = useNavigate();
    const applicationData = useSelector((state: RootState) => state.application_infoSlice);
    const [files, setFiles] = useState<{ user_photo: File | null, passport_photo: File | null, health_ensurence: File | null, travel_insurance: File | null, applicant_signature: File | null }>({
        user_photo: null,
        passport_photo: null,
        health_ensurence: null,
        travel_insurance: null,
        applicant_signature: null
    });
    const [cookies] = useCookies(['baerer-token']);

    const [postApplication, { isLoading, isError, isSuccess, data }] = useAddvisaApplicationMutation();

    useEffect(() => {
        if (step !== 3) {
            if (step == 0) {
                navig(`/dashboard/application`)
            }
            else {
                navig(`/dashboard/application/${step + 1}`)
            }
        }
    }, [step]);

    const clickPrev = useCallback(() => {
        dispatch(updateStep(step - 1))
    }, []);


    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            toast.success('Your application successfully');
            dispatch(resetApplication());
        }
        if (isError) {
            toast.error('Application failed, try again')
        }
    }, [isSuccess, isError]);


    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = cookies["baerer-token"];
        if (!token) {
            navig('/login')
            return;
        }
        const form = new FormData();
        for (const key in applicationData) {
            const value = applicationData[key as keyof addApplicationType];

            if (value !== undefined && value !== null) {
                if (key === 'user_photo') {
                    console.log(files.user_photo)
                    form.append(key, files.user_photo as File);
                }
                else if (key === 'passport_photo') {
                    form.append(key, files.passport_photo as File);
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
        form.append('token', token);
        await postApplication(form).unwrap();
    }

    const addPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (fileList) {
            setFiles({ ...files, user_photo: fileList[0] })
        }
    }
    const addPassport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (fileList) {
            setFiles({ ...files, passport_photo: fileList[0] })
        }
    }
    const addHealthInsurance = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (fileList) {
            setFiles({ ...files, health_ensurence: fileList[0] })
        }
    }
    const addTravel_insurance = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (fileList) {
            setFiles({ ...files, travel_insurance: fileList[0] })
        }
    }
    const signature = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (fileList) {
            setFiles({ ...files, applicant_signature: fileList[0] })
        }
    }

    return (
        <Spin spinning={isLoading}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        {stepList[step].title}
                    </h3>
                </div>

                <form className="p-6.5" onSubmit={submitForm}>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-black dark:text-white">
                                Your Photo
                            </label>
                            <input
                                onChange={addPhoto}
                                type="file"
                                required
                                className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white "
                            />
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-black dark:text-white">
                                Passport Photo
                            </label>
                            <input
                                onChange={addPassport}
                                type="file"
                                required
                                className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                            />
                        </div>

                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-black dark:text-white">
                                Health Ensurence
                            </label>
                            <input
                                onChange={addHealthInsurance}
                                type="file"
                                required
                                className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                            />
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-black dark:text-white">
                                Travel Ensurence
                            </label>
                            <input
                                onChange={addTravel_insurance}
                                type="file"
                                required
                                className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                            />
                        </div>

                    </div>


                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-black dark:text-white">
                                Upload your signature
                            </label>
                            <input
                                onChange={signature}
                                type="file"
                                required
                                className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                            />
                        </div>
                    </div>



                    <div className="flex flex-row items-center gap-x-5 justify-end">
                        <span
                            onClick={clickPrev}
                            className="inline-flex cursor-pointer items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 "
                        >
                            <GrFormNextLink className="text-xl text-white rotate-180" />
                            Prev
                        </span>
                        <button
                            className="inline-flex items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 "
                        >

                            Finish
                            <GrFormNextLink className="text-xl text-white" />
                        </button>
                    </div>
                </form>
            </div>
        </Spin>
    )
}
