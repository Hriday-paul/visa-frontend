import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../Redux/Store"
import { useForm } from "react-hook-form";
import { GrFormNextLink } from "react-icons/gr";
import { useCallback, useEffect } from "react";
import { updateStep } from "../../../../Redux/Slices/ApplicationStepSlice";
import { useNavigate } from "react-router-dom";


export type Visa_information_types = {
    passport_no: string,
    passport_issue_date: string;
    passport_expiry_date: string;
    country_of_passport_issuance: string;
}

export default function Visa_information() {
    const { step, stepList } = useSelector((state: RootState) => state.applicationStep);
    const dispatch = useDispatch<AppDispatch>();
    const draft = useSelector((state: RootState) => state.application_infoSlice);
    const navig = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Visa_information_types>({
        defaultValues: {
            passport_no: draft?.passport_no || '',
            passport_issue_date: draft?.passport_issue_date || '',
            passport_expiry_date: draft?.passport_expiry_date || '',
            country_of_passport_issuance: draft?.country_of_passport_issuance || "",
        }
    });

    const clickPrev = useCallback(() => {
        dispatch(updateStep(1))
    }, []);


    useEffect(() => {
        if (step !== 2) {
          if (step == 0) {
            navig(`/dashboard/application`)
          }
          else {
            navig(`/dashboard/application/${step + 1}`)
          }
        }
      }, [step])


    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    {stepList[step].title}
                </h3>
            </div>

            <form className="p-6.5">

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Passport number
                        </label>
                        <input
                            type="text"
                            {...register("passport_no", { required: true })}
                            placeholder="enter your passport no"
                            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white ${errors?.passport_no ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`}
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

                        Next
                        <GrFormNextLink className="text-xl text-white" />
                    </button>
                </div>
            </form>




        </div>
    )
}
