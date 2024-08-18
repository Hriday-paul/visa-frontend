import { useParams } from "react-router-dom"
import { useApplicationDetailsQuery, useApproveApplicationMutation, useRejectApplicationMutation, useUpdateAccessToModifyApplicationMutation } from "../../../Redux/Features/BaseApi";
import { useCookies } from "react-cookie";
import AdminError from "../../../components/Shared/AdminError";
import AdminLoading from "../../../components/Shared/AdminLoading";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import FileCard from "./FileCard";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Spin } from "antd";
import { ImSpinner8 } from "react-icons/im";
import { useEffect } from "react";
import toast from "react-hot-toast";
import EditVisaStep from "./EditVisaStep";
import CopyTrackId from "./Template/CopyTrackId";

export default function ApplicationDetails() {

    const [cookies] = useCookies(['baerer-token']);
    const token = cookies["baerer-token"];
    const params = useParams();

    const { isLoading, isError, isSuccess, data: applicationDetails } = useApplicationDetailsQuery({ id: params?.id || 0, token });
    const [postAccessModify, { isError: accessModifyIsError, isSuccess: accessModifySuccess, error: accessModifyError, data: accessModifyData, isLoading: accessModifyLoding }] = useUpdateAccessToModifyApplicationMutation();
    const [postApproveApplication, { isError: approveApplicationIsError, isSuccess: approveApplicationSuccess, error: approveApplicationError, data: approveApplicationData, isLoading: approveApplicationLoding }] = useApproveApplicationMutation();
    const [postRejectApplication, { isError: rejectApplicationIsError, isSuccess: rejectApplicationSuccess, error: rejectApplicationError, data: rejectApplicationData, isLoading: rejectApplicationLoding }] = useRejectApplicationMutation();

    const handleAccessToModify = () => {
        postAccessModify({ token, id: params?.id, is_modified: !applicationDetails?.is_modified })
    }

    const handleAproveApplication = () => {
        if (applicationDetails?.is_approved) {
            postApproveApplication({ token, id: params?.id, is_approved: !applicationDetails?.is_approved, rejected: applicationDetails?.rejected })
        }
        else {
            postApproveApplication({ token, id: params?.id, is_approved: !applicationDetails?.is_approved, rejected: false })
        }
    }

    const handleRejectApplication = () => {
        if (applicationDetails?.rejected) {
            postRejectApplication({ token, id: params?.id, rejected: !applicationDetails?.rejected, is_approved: applicationDetails?.is_approved })
        } else {
            postRejectApplication({ token, id: params?.id, rejected: !applicationDetails?.rejected, is_approved: false })
        }
    }

    useEffect(() => {
        if (accessModifySuccess) {
            toast.success(accessModifyData?.message || "Access to modify update successfully")
        }
        if (accessModifyIsError) {
            const errType = accessModifyError as { data: { error: string } }
            toast.error(errType?.data?.error || "Access to modify update failed")
        }
    }, [accessModifySuccess, accessModifyIsError, accessModifyError]);

    useEffect(() => {
        if (approveApplicationSuccess) {
            toast.success(approveApplicationData?.message || "Approve application successfully")
        }
        if (approveApplicationIsError) {
            const errType = approveApplicationError as { data: { error: string } }
            toast.error(errType?.data?.error || "Approve application failed")
        }
    }, [approveApplicationSuccess, approveApplicationIsError, approveApplicationError])

    useEffect(() => {
        if (rejectApplicationSuccess) {
            toast.success(rejectApplicationData?.message || "Application reject successfully")
        }
        if (rejectApplicationIsError) {
            const errType = rejectApplicationError as { data: { error: string } }
            toast.error(errType?.data?.error || "Application reject failed")
        }
    }, [rejectApplicationSuccess, rejectApplicationIsError, rejectApplicationError])

    return (
        <Spin spinning={accessModifyLoding || approveApplicationLoding || rejectApplicationLoding} size="large" indicator={<ImSpinner8 className="text-4xl animate-spin" />}>
            <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
                <div className="border-b border-stroke p-5 md:p-6.5 xl:p-10 dark:border-strokedark">
                    {
                        isLoading ? <AdminLoading /> : isError ? <AdminError /> : !isSuccess ? <></> : <div>
                            <div>
                                <div className="flex flex-col md:flex-row justify-between gap-x-0 md:gap-x-5  gap-y-5 md:gap-y-0">
                                    <div className="flex flex-row gap-x-5 md:gap-x-3 lg:gap-x-5 items-center">
                                        <div>
                                            <h2 className="text-xl font-medium text-black dark:text-white">{applicationDetails?.full_name}</h2>
                                            <ul className="my-3">
                                                <li className="flex items-center gap-x-2 mb-2">
                                                    <MdEmail className="text-lg text-graydark dark:text-slate-200" />
                                                    <p className="text-base text-graydark dark:text-slate-200">{applicationDetails?.email}</p>
                                                </li>
                                                <li className="flex items-center gap-x-2">
                                                    <MdPhoneInTalk className="text-lg text-graydark  dark:text-slate-200" />
                                                    <p className="text-base text-graydark dark:text-slate-200">{applicationDetails?.phone_number}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="border-l border-stroke dark:border-strokedark pl-0 lg:pl-3">
                                            <img src={applicationDetails?.user_photo} loading="lazy" alt="user photo" className="h-24 w-auto" />
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-y-3 md:gap-y-0 gap-x-5 md:gap-x-3 lg:gap-x-10 items-center flex-wrap">
                                        <div className="flex flex-row gap-x-3 items-center">
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
                                        <div className="dropdown dropdown-end ">
                                            <div tabIndex={0} role="button" className="inline-flex items-center justify-center gap-x-1 rounded bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 m-1">
                                                Edit
                                                <HiOutlineDotsVertical />
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] w-52 p-2 shadow-6 bg-white dark:bg-boxdark-2 rounded">
                                                {
                                                    !applicationDetails?.is_modified ? <li onClick={handleAccessToModify} className={`p-2 pl-4 hover:bg-slate-100 dark:hover:bg-boxdark duration-200 rounded cursor-pointer`}>
                                                        <p>Access to modify</p>
                                                    </li> :
                                                        <li onClick={handleAccessToModify} className={`p-2 pl-4 hover:bg-slate-100 dark:hover:bg-boxdark duration-200 rounded cursor-pointer`}>
                                                            <p>Remove modify access</p>
                                                        </li>
                                                }
                                                {
                                                    !applicationDetails?.is_approved ? <li onClick={handleAproveApplication} className={`p-2 pl-4 hover:bg-slate-100 dark:hover:bg-boxdark duration-200 rounded cursor-pointer`}>
                                                        <p>Approve</p>
                                                    </li> :
                                                        <li onClick={handleAproveApplication} className={`p-2 pl-4 hover:bg-slate-100 dark:hover:bg-boxdark duration-200 rounded cursor-pointer`}>
                                                            <p>Remove Approve</p>
                                                        </li>
                                                }

                                                {
                                                    !applicationDetails?.rejected ? <li onClick={handleRejectApplication} className="p-2 pl-4 hover:bg-slate-100 dark:hover:bg-boxdark duration-200 rounded cursor-pointer">
                                                        <p>Reject</p>
                                                    </li> :
                                                        <li onClick={handleRejectApplication} className="p-2 pl-4 hover:bg-slate-100 dark:hover:bg-boxdark duration-200 rounded cursor-pointer">
                                                            <p>Remove Reject</p>
                                                        </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-0 lg:gap-x-8">
                                    <div>
                                        <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4">
                                            <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                                                <p className="text-base text-graydark dark:text-slate-200 font-medium">Personal Details</p>
                                            </div>
                                            <div className="p-3 md:p-4 lg:p-5">
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Country</span>
                                                    <span className="w-1/2">{applicationDetails?.nationality}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Permanent Address</span>
                                                    <span className="w-1/2">{applicationDetails?.permanent_address}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Present Address</span>
                                                    <span className="w-1/2">{applicationDetails?.present_address}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">City</span>
                                                    <span className="w-1/2">{applicationDetails?.city}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">State province</span>
                                                    <span className="w-1/2">{applicationDetails?.state_province}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Educational Background</span>
                                                    <span className="w-1/2">{applicationDetails?.educational_background}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Occupation</span>
                                                    <span className="w-1/2">{applicationDetails?.occupation}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Date of Birth</span>
                                                    <span className="w-1/2">{applicationDetails?.date_of_birth}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Gender</span>
                                                    <span className="w-1/2">{applicationDetails?.gender}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Merital status</span>
                                                    <span className="w-1/2">{applicationDetails?.marital_status}</span>
                                                </div>


                                            </div>
                                        </div>
                                        <div className="w-full mt-8">
                                            <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4">
                                                <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                                                    <p className="text-base text-graydark dark:text-slate-200 font-medium">Visa Details</p>
                                                </div>
                                                <div className="p-3 md:p-4 lg:p-5">
                                                    <div className=" flex flex-row items-center justify-between mb-3.5">
                                                        <span className="w-1/2">Visa Type</span>
                                                        <span className="w-1/2">{applicationDetails?.visa_type}</span>
                                                    </div>
                                                    <div className=" flex flex-row items-center justify-between mb-3.5">
                                                        <span className="w-1/2">Planed Duration of stay</span>
                                                        <span className="w-1/2">{applicationDetails?.planned_duration_of_stay} days</span>
                                                    </div>
                                                    <div className=" flex flex-row items-center justify-between mb-3.5">
                                                        <span className="w-1/2">Accommodation Details</span>
                                                        <span className="w-1/2">{applicationDetails?.accommodation_details}</span>
                                                    </div>
                                                    <div className=" flex flex-row items-center justify-between mb-3.5">
                                                        <span className="w-1/2">Purpose of visit</span>
                                                        <span className="w-1/2">{applicationDetails?.purpose_of_visit}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full mt-8">
                                            <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4">
                                                <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                                                    <p className="text-base text-graydark dark:text-slate-200 font-medium">Visa Status</p>
                                                </div>
                                                <div className="p-3 md:p-4 lg:p-5">
                                                    <div className=" flex flex-row items-center justify-between mb-3.5">
                                                        <span className="w-1/2">Visa Step</span>
                                                        <span className="w-1/2 ">
                                                            <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-xs lg:text-sm font-medium bg-success text-success">{applicationDetails?.visa_statuses[0]?.visa_status}</p>
                                                        </span>
                                                    </div>

                                                    {/* // copy traxking id */}
                                                    <CopyTrackId id={applicationDetails?.visa_statuses[0]?.traking_id}/>

                                                    <div className=" flex flex-row items-center justify-between mb-3.5">
                                                        <span className="w-1/2">Message</span>
                                                        <span className="w-1/2 line-clamp-2">
                                                            {applicationDetails?.visa_statuses[0]?.message}
                                                        </span>
                                                    </div>
                                                    <div className=" flex flex-row items-center justify-between mb-3.5">
                                                        <span className="w-1/2">Edit</span>
                                                        <EditVisaStep visaStatus={applicationDetails?.visa_statuses[0]} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4">
                                            <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                                                <p className="text-base text-graydark dark:text-slate-200 font-medium">Passport Information</p>
                                            </div>
                                            <div className="p-3 md:p-4 lg:p-5">
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Passport number</span>
                                                    <span className="w-1/2">{applicationDetails?.passport_no}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Passport Issue Date</span>
                                                    <span className="w-1/2">{applicationDetails?.passport_issue_date}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Passport Expairy Date</span>
                                                    <span className="w-1/2">{applicationDetails?.passport_expiry_date}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Country of passport issuance</span>
                                                    <span className="w-1/2">{applicationDetails?.country_of_passport_issuance}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4 mt-8">
                                            <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                                                <p className="text-base text-graydark dark:text-slate-200 font-medium">Emergency Contact</p>
                                            </div>
                                            <div className="p-3 md:p-4 lg:p-5">
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Name</span>
                                                    <span className="w-1/2">{applicationDetails?.emergency_contact_name}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Relation</span>
                                                    <span className="w-1/2">{applicationDetails?.emergency_contact_relationship}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Phone</span>
                                                    <span className="w-1/2">{applicationDetails?.emergency_contact_phone}</span>
                                                </div>
                                                <div className=" flex flex-row items-center justify-between mb-3.5">
                                                    <span className="w-1/2">Email</span>
                                                    <span className="w-1/2">{applicationDetails?.emergency_contact_email}</span>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4 mt-8">
                                            <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                                                <p className="text-base text-graydark dark:text-slate-200 font-medium">Files</p>
                                            </div>
                                            <div className="p-3 md:p-4 lg:p-5 flex flex-row items-center gap-5 flex-wrap">
                                                <FileCard name={'Passport'} url={applicationDetails?.passport_photo} />
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
        </Spin >
    )
}
