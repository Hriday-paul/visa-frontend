import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Redux/Store";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateStep } from "../../../../Redux/Slices/ApplicationStepSlice";
import { GrFormNextLink } from "react-icons/gr";
import toast from "react-hot-toast";
import { addDocument } from "../../../../Redux/Slices/Application_infoSlice";


export default function Documents() {
    const { step, stepList } = useSelector((state: RootState) => state.applicationStep);
    const dispatch = useDispatch<AppDispatch>();
    const navig = useNavigate();
    const applicationData = useSelector((state: RootState) => state.application_infoSlice);

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


    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateStep(step + 1))
    }

    const toBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        })
    }

    const addFile = async (e: React.ChangeEvent<HTMLInputElement>, key: 'user_photo' | 'passport_front_photo' | 'passport_back_photo' | 'health_ensurence' | 'travel_insurance' | 'applicant_signature') => {
        const fileList = e.target.files as File[] | null;
        if (!fileList) {
            return;
        }
        try {
            const result = await toBase64(fileList[0]);
            dispatch(addDocument({ key, value: result as string }));
        } catch (error) {
            toast.error('File upload failed, try again.')
            return;
        }
    }

    return (

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
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            onChange={(e) => addFile(e, 'user_photo')}
                            type="file"
                            accept="image/*"
                            required={applicationData?.user_photo ? false : true}
                            className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white "
                        />
                        {applicationData?.user_photo && <div className="relative">
                            <img src={applicationData?.user_photo} alt="" className="h-20 w-auto my-2" />
                        </div>}
                    </div>
                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                            Passport Front Photo
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            onChange={(e) => addFile(e, 'passport_front_photo')}
                            type="file"
                            accept="image/*"
                            required={applicationData?.passport_front_photo ? false : true}
                            className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                        />
                        {applicationData?.passport_front_photo && <img src={applicationData?.passport_front_photo} alt="" className="h-20 w-auto my-2" />}
                    </div>

                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                            Passport Back Photo
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            onChange={(e) => addFile(e, 'passport_back_photo')}
                            type="file"
                            accept="image/*"
                            required={applicationData?.passport_back_photo ? false : true}
                            className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                        />
                        {applicationData?.passport_back_photo && <img src={applicationData?.passport_back_photo} alt="" className="h-20 w-auto my-2" />}
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                            Travel Ensurence
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            onChange={(e) => addFile(e, 'travel_insurance')}
                            type="file"
                            accept="image/*"
                            required={applicationData?.travel_insurance ? false : true}
                            className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                        />
                        {applicationData?.travel_insurance && <img src={applicationData?.travel_insurance} alt="" className="h-20 w-auto my-2" />}
                    </div>

                </div>


                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                            Health Ensurence
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            onChange={(e) => addFile(e, 'health_ensurence')}
                            type="file"
                            accept="image/*"
                            required={applicationData?.health_ensurence ? false : true}
                            className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                        />
                        {applicationData?.health_ensurence && <img src={applicationData?.health_ensurence} alt="" className="h-20 w-auto my-2" />}
                    </div>

                    <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-black dark:text-white">
                            Upload your signature
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <input
                            onChange={(e) => addFile(e, 'applicant_signature')}
                            type="file"
                            accept="image/*"
                            required={applicationData?.applicant_signature ? false : true}
                            className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                        />
                        {applicationData?.applicant_signature && <img src={applicationData?.applicant_signature} alt="" className="h-20 w-auto my-2" />}
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
                    <button type="submit"
                        className="inline-flex items-center justify-center gap-2.5 bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 "
                    >

                        Next
                        <GrFormNextLink className="text-xl text-white" />
                    </button>
                </div>
            </form>
        </div>
    )
}
