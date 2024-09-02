import { Steps } from "antd"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import { TbPoint } from "react-icons/tb";

export default function Application() {
    const { stepList, step } = useSelector((state: RootState) => state.applicationStep);

    return (
        <div className="flex flex-col-reverse xl:flex-row gap-y-10 xl:gap-y-0 xl:gap-x-10 justify-between">

            <div className="xl:max-w-270 w-full">
                <Steps
                    direction="horizontal"
                    current={step}
                    size="small"
                    items={stepList}
                />

                <Outlet />

            </div>

            <div className="w-full xl:w-[calc(100vw-1080px)] mt-6">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8 p-8">
                    <h6 className="text-lg text-black dark:text-gray font-medium">Application Guide</h6>
                    <ul className="mt-3">
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Enter your full name, date of birth, nationality, and other personal details.</span>
                        </li>
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Provide your passport number, issue date, and expiration date.</span>
                        </li>
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Enter your travel plans, including the intended date of entry and exit.</span>
                        </li>
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Provide your current address, email, and phone number.</span>
                        </li>
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Select the visa type you are applying for (e.g., tourist, student, work).</span>
                        </li>
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Set your emergancy contact information.</span>
                        </li>
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Ensure that all documents are in the required format (e.g. JPEG, PNG, JPG) and within the file size limits.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}
