import React from 'react'

type imergencyInfoType = {
    emergency_contact_name: string;
    emergency_contact_relationship: string;
    emergency_contact_phone: string;
    emergency_contact_email: string;
}

const ImergencyInfo = React.memo(({ applicationDetails }: { applicationDetails: imergencyInfoType }) => {
    return (
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
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.emergency_contact_relationship}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Phone</span>
                    <span className="w-1/2">{applicationDetails?.emergency_contact_phone}</span>
                </div>
                <div className=" flex flex-row items-center justify-between mb-3.5">
                    <span className="w-1/2">Email</span>
                    <span className="w-1/2 hyphens-auto">{applicationDetails?.emergency_contact_email}</span>
                </div>

            </div>
        </div>
    )
})

export default ImergencyInfo;