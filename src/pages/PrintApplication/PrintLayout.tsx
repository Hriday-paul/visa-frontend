import React from 'react'
import { ApplicationResponseType } from '../../Redux/Features/Types';

const PrintLayout = React.memo(({ contentToPrintRef, data }: { contentToPrintRef: React.MutableRefObject<HTMLDivElement | null>, data: ApplicationResponseType }) => {

    return (
        <>
            <div className="overflow-hidden h-0 hidden">
                <div className='' ref={contentToPrintRef}>
                    <div className='bg-white mx-auto border border-slate-500 p-8 pt-4'>
                        <div>
                            <div className="relative border-b border-black pb-4">
                                <div>
                                    <h2 className='text-center text-3xl text-black font-bold uppercase'>Visa Application</h2>
                                    <p className='text-center text-base text-slate-800 font-semibold mt-5 uppercase'>Republic of Bangladesh</p>
                                    <p className='text-center text-base text-slate-700 font-semibold uppercase'>Consular wing</p>
                                    <p className='text-center text-base text-slate-700 font-semibold'>Khilkhet, Dhaka, Bangladesh</p>
                                    <p className='text-center text-sm text-blue-500 font-semibold'>https://bangladesh.gov.bd</p>
                                    <p className='text-center text-sm text-black font-bold'>Applications are accepted at the counter from 9:00am to 12:00pm (Mon to Fri) only</p>

                                </div>

                                <div className="border-l border-stroke dark:border-strokedark pl-0 lg:pl-3 mb-3 md:mb-0 absolute top-5 left-0">
                                    <img src={'https://e7.pngegg.com/pngimages/18/660/png-clipart-dhaka-government-of-bangladesh-vision-2021-logo-logo-sign.png'} loading="lazy" alt="republic photo" className="h-24 w-auto object-cover" />
                                </div>
                                <div className="border-l border-stroke dark:border-strokedark pl-0 lg:pl-3 mb-3 md:mb-0 absolute top-5 right-0">
                                    <img src={data?.user_photo} loading="lazy" alt="user photo" className="h-24 w-auto object-cover" />
                                </div>
                            </div>

                        </div>

                        <table className='border border-black w-full mt-3 text-black font-medium'>
                            <tbody>
                                <tr className='border border-black'>
                                    <td colSpan={6} className='border border-black font-semibold w-40 px-2 text-center py-1'>Personal Informatiion</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Applicant Name</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.full_name}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Applicant Phone</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.phone_number}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Applicant Email</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.email}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Present Address</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.present_address}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Permanent Address</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.permanent_address}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Date Of Birth</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.date_of_birth}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Division</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1'>{data?.state_province}</td>
                                    <td className='border border-black w-20 px-2 py-1'>City</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1'>{data?.city}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Gender</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1'>{data?.gender} </td>
                                    <td className='border border-black w-32 px-2 py-1'>Marital Status</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1'>{data?.marital_status}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Education</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1'>{data?.educational_background}</td>
                                    <td className='border border-black w-32 px-2 py-1'>Occupation</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1'>{data?.occupation}</td>
                                </tr>

                                {/* // passport information */}
                                <tr className='border border-black'>
                                    <td colSpan={6} className='border border-black font-semibold w-40 px-2 text-center py-1'>Passport Information</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Passport Number</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.passport_no}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Passport Issued Date</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.passport_issue_date}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Passport Expairy Date</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.passport_expiry_date}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Country of Passport Issuance</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.country_of_passport_issuance}</td>
                                </tr>

                                {/* // visa information  */}
                                <tr className='border border-black'>
                                    <td colSpan={6} className='border border-black font-semibold w-40 px-2 text-center py-1'>Visa Details</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Visa Type</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.visa_type}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Stay Duration</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.planned_duration_of_stay} days</td>
                                </tr>

                                {/* // emeregency contact  */}
                                <tr className='border border-black'>
                                    <td colSpan={6} className='border border-black font-semibold w-40 px-2 text-center py-1'>Emergency Contact</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Name</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.emergency_contact_name}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Email</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1' colSpan={4}>{data?.emergency_contact_email}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='border border-black w-40 px-2 py-1'>Relation</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1'>{data?.emergency_contact_relationship}</td>
                                    <td className='border border-black w-32 px-2 py-1'>Phone</td>
                                    <td className='border border-black w-0 text-center px-2 py-1'>:</td>
                                    <td className='border border-black px-2 py-1'>{data?.emergency_contact_phone}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='mt-16 flex flex-row justify-between items-center'>
                            <div>
                                <p className='overline text-black font-semibold'>Applicant Signature</p>
                            </div>
                            <div>
                                <p className='overline text-black font-semibold'>Receiver Signature</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default PrintLayout;