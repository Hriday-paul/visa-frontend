import React from 'react'

type visaInfoType = {
    visa_type: 'Tourist' | 'Business' | 'Student' | 'Work' | 'Medical' | 'Family',
    purpose_of_visit: string;
    accommodation_details: string;
    planned_duration_of_stay: number;
}

const VisaInfo = React.memo(({ applicationDetails }: { applicationDetails: visaInfoType }) => {
    return (
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
                        <span className="w-1/2 hyphens-auto">{applicationDetails?.accommodation_details}</span>
                    </div>
                    <div className=" flex flex-row items-center justify-between mb-3.5">
                        <span className="w-1/2">Purpose of visit</span>
                        <span className="w-1/2 hyphens-auto">{applicationDetails?.purpose_of_visit}</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default VisaInfo;
