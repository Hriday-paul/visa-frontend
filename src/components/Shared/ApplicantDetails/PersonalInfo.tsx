import React from 'react'

interface personInfoTypes {
    full_name: string,
    email: string;
    phone_number: string;
    permanent_address: string;
    present_address: string;
    city: string;
    nationality: string;
    occupation: string;
    date_of_birth: string;
    state_province: string;
    marital_status: 'Single' | 'Married' | '';
    educational_background: string;
    postal_code: number;
    gender: 'Male' | 'Female' | 'Others' | '',
    visa_type: 'Tourist' | 'Business' | 'Student' | 'Work' | 'Medical' | 'Family',
}

const PersonalInfo = React.memo(({ applicationDetails }: { applicationDetails: personInfoTypes }) => {
    return (
        <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark my-4">
            <div className="border-b border-stroke p-3 dark:border-strokedark bg-slate-50 dark:bg-boxdark">
                <p className="text-base text-graydark dark:text-slate-200 font-medium">Personal Details</p>
            </div>

            <div className="p-3 md:p-4 lg:p-5">
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Name</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.full_name}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Email</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.email}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Phone</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.phone_number}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Country</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.nationality}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Permanent Address</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.permanent_address}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Present Address</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.present_address}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">City</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.city}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">State province</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.state_province}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Postal code</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.postal_code}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Educational Background</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.educational_background}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Occupation</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.occupation}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Date of Birth</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.date_of_birth}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Gender</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.gender}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Merital status</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.marital_status}</span>
                </div>
            </div>
        </div>
    )
})

export default PersonalInfo;
