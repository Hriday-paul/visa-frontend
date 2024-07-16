import { Steps } from "antd"
import BreadCrumb from "../../../../components/Shared/BreadCrump"
import CountrySelect from "./templates/CountrySelect"
import DatePicker from "./templates/DatePicker"

const routList = [{ name: ' / application', rout: '/dashboard/application' }, { name: ' / student', rout: '/dashboard/application/student' }]
export default function Student() {
    const stepList = [
        {
            title: 'Personal details',
        },
        {
            title: 'Travel Information',
        },
        {
            title: 'Visa Information',
        },
        {
            title: 'Documents',
        },
    ]
    return (
        <div>
            <BreadCrumb pageName="Application Form" routList={routList} />

            <div className="mx-auto max-w-180">
                <Steps
                    direction="horizontal"
                    current={0}
                    size="small"
                    items={stepList}
                />

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Personal Details
                        </h3>
                    </div>
                    <form action="#">
                        <div className="p-6.5">

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your Email"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Phone
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter your phone number"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Permanent Address
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your permanent address"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>


                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Present Address
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your present address"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <CountrySelect />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your city"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Post Code
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter your post code"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>


                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nationality
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your nationality"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Occupation
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your occupation"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <DatePicker title="Date of Birth" />
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Place of Birth
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your place of birth"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Health Informayion
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter your health informayion"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Current Employer
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your current Employer"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>


                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <p className="mb-2.5 block text-black dark:text-white">
                                        Gender
                                    </p>

                                    <div className="flex items-center gap-x-2">
                                        <div className="flex items-center">
                                            <input id="male" type="radio" value="" name="disabled-radio" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="male" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500">Male</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input checked id="female" type="radio" value="" name="disabled-radio" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="female" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500">Female</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input checked id="others" type="radio" value="" name="disabled-radio" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="others" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500">Others</label>
                                        </div>
                                    </div>



                                </div>

                                <div className="w-full xl:w-1/2">
                                    <p className="mb-2.5 block text-black dark:text-white">
                                        Merital status
                                    </p>

                                    <div className="flex items-center gap-x-2">
                                        <div className="flex items-center">
                                            <input id="marit" type="radio" value="" name="disabled-radio" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="marit" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500">Marit</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input checked id="unmerit" type="radio" value="" name="disabled-radio" className="w-5 h-5 text-primary bg-transparent border-gray-300 focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="unmerit" className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-500">Unmerit</label>
                                        </div>
                                    </div>



                                </div>

                            </div>


                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Next
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div >
    )
}
