import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useApplicationDetailsQuery } from "../../../Redux/Features/BaseApi";
import { useCookies } from "react-cookie";
import AdminError from "../../../components/Shared/AdminError";
import AdminLoading from "../../../components/Shared/AdminLoading";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import FileCard from "../../Admin/ApplicationDetails/FileCard";
import { CiEdit } from "react-icons/ci";
import { useRef } from "react";
import { IoCalendarNumberSharp } from "react-icons/io5";
import InterviewDatePicker from "./Template/InterviewDatePicker";
import moment from "moment";
import PersonalInfo from "../../../components/Shared/ApplicantDetails/PersonalInfo";
import VisaInfo from "../../../components/Shared/ApplicantDetails/VisaInfo";
import PassportInfo from "../../../components/Shared/ApplicantDetails/PassportInfo";
import ImergencyInfo from "../../../components/Shared/ApplicantDetails/ImergencyInfo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Redux/Store";
import { addAllInfo } from "../../../Redux/Slices/EditApplicationSlice";

export default function MyApplicationDetails() {
    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const params = useParams();
    const { isLoading, isError, isSuccess, data: applicationDetails } = useApplicationDetailsQuery({ id: params?.id || 0, token });
    const interviewModalRef = useRef<HTMLDialogElement | null>(null);
    const navig = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const handleEdit = () => {
        if(applicationDetails) dispatch(addAllInfo(applicationDetails))
        navig('/applications/' + params?.id + '/edit?back='+location?.pathname)
    }

    const openInterviewModal = () => {
        interviewModalRef?.current?.showModal()
    }

    return (
        <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke p-5 md:p-6.5 xl:p-10 dark:border-strokedark">
                {
                    isLoading ? <AdminLoading /> : isError ? <AdminError /> : !isSuccess ? <></> : <div>
                        <div>
                            {/* // top section */}
                            <div className="flex flex-col md:flex-row justify-between gap-x-0 md:gap-x-5  gap-y-3 md:gap-y-0">
                                <div className="flex flex-col-reverse md:flex-row gap-x-5 md:gap-x-3 lg:gap-x-5 md:items-center">
                                    <div>
                                        <h2 className="text-xl font-medium text-black dark:text-white">{applicationDetails?.full_name}</h2>
                                        <ul className="mt-1.5 md:mt-3 mb-3">
                                            <li className="flex items-center gap-x-2 mb-2">
                                                <MdEmail className="text-lg text-graydark dark:text-slate-200" />
                                                <p className="text-base text-graydark dark:text-slate-200">{applicationDetails?.email}</p>
                                            </li>
                                            <li className="flex items-center gap-x-2">
                                                <MdPhoneInTalk className="text-lg text-graydark  dark:text-slate-200" />
                                                <p className="text-base text-graydark dark:text-slate-200">{applicationDetails?.phone_number}</p>
                                            </li>
                                            {
                                                applicationDetails?.appointment.length > 0 && <li className="flex items-center gap-x-2 mt-1">
                                                    <IoCalendarNumberSharp className="text-lg text-graydark  dark:text-slate-200" />
                                                    <p className="text-base text-graydark dark:text-slate-200">{moment(applicationDetails?.appointment[0]?.interview_date).format('L')}</p>
                                                    <p className="text-base text-graydark dark:text-slate-200">{applicationDetails?.appointment[0]?.start_time}</p>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                    <div className="border-l border-stroke dark:border-strokedark pl-0 lg:pl-3 mb-3 md:mb-0">
                                        <img src={applicationDetails?.user_photo} loading="lazy" alt="user photo" className="h-24 w-auto" />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-y-3 md:gap-y-0 gap-x-5 md:gap-x-3 lg:gap-x-10 items-center flex-wrap">
                                    <div className="flex flex-row gap-x-3 items-center">
                                        {
                                            (applicationDetails?.visa_statuses[0].visa_status == 'Schedule' && applicationDetails?.appointment.length === 0) &&
                                            <button onClick={openInterviewModal} className="inline-flex items-center justify-center gap-x-1 rounded bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 m-1 cursor-pointer border-0 outline-none">
                                                <IoCalendarNumberSharp className="mr-1" />
                                                Apply
                                            </button>
                                        }

                                        <dialog ref={interviewModalRef} className="modal z-10">
                                            <div className="modal-box w-[380px] max-w-4xl">
                                                <InterviewDatePicker applicationId={applicationDetails?.id} applicationEncodedId={applicationDetails?.encoded_id} interviewModalRef={interviewModalRef} />
                                            </div>
                                            <form method="dialog" className="modal-backdrop">
                                                <button>close</button>
                                            </form>
                                        </dialog>

                                        {
                                            applicationDetails?.is_approved && < p className={`dark:text-white  inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs lg:text-sm font-medium bg-success text-success`}>Approved</p>
                                        }
                                        {
                                            applicationDetails?.is_modified && < p className={`dark:text-white  inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs lg:text-sm font-medium bg-success text-success`}>Modify access</p>
                                        }
                                        {
                                            applicationDetails?.rejected && < p className={`dark:text-white  inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs lg:text-sm font-medium bg-danger text-danger`}>Rejected</p>
                                        }
                                    </div>
                                    <div className={applicationDetails?.is_modified ? 'block' : 'hidden'}>
                                        <button onClick={handleEdit} disabled={!applicationDetails?.is_modified} className="inline-flex items-center justify-center gap-x-1 rounded bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 m-1 cursor-pointer border-0 outline-none">
                                            Edit
                                            <CiEdit />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* // start list section  */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-0 lg:gap-x-8">
                                {/* // left side section  */}
                                <div>
                                    {/* //personal details */}
                                    <PersonalInfo applicationDetails={applicationDetails} />
                                    {/* // visa details  */}
                                    <VisaInfo applicationDetails={applicationDetails} />
                                </div>

                                {/* // right side section */}
                                <div>
                                    {/* // passport information  */}
                                    <PassportInfo applicationDetails={applicationDetails} />
                                    {/* // imargency contact  */}
                                    <ImergencyInfo applicationDetails={applicationDetails} />
                                    {/* files  */}
                                    <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4 mt-8">
                                        <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                                            <p className="text-base text-graydark dark:text-slate-200 font-medium">Files</p>
                                        </div>
                                        <div className="p-3 md:p-4 lg:p-5 flex flex-row items-center gap-5 flex-wrap">
                                            <FileCard name={'Passport Front'} url={applicationDetails?.passport_front_photo} />
                                            <FileCard name={'Passport Back'} url={applicationDetails?.passport_front_photo} />
                                            <FileCard name={'Health ensurence'} url={applicationDetails?.health_ensurence} />
                                            <FileCard name={'Travel ensurence'} url={applicationDetails?.travel_insurance} />
                                            <FileCard name={'Signature'} url={applicationDetails?.applicant_signature} />

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                }

            </div>

        </div>

    )
}
