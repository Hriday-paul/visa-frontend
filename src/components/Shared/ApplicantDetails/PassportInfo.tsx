import React from 'react'

interface passportInfoTypes {
    passport_no: string,
    passport_issue_date: string;
    passport_expiry_date: string;
    country_of_passport_issuance: string;
}

const PassportInfo = React.memo(({ applicationDetails }: { applicationDetails: passportInfoTypes}) => {
    return (
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
    )
})

export default PassportInfo;
