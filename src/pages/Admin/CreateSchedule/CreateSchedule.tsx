import { TbPoint } from "react-icons/tb";
import ScheduleForm from "../InterViewSchedules/Template/ScheduleForm";


export default function CreateSchedule() {
    return (
        <div className="flex flex-col-reverse 2xl:flex-row gap-y-10 xl:gap-y-0 xl:gap-x-10 justify-between">
            <div className="2xl:max-w-270 w-full">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Create Schedule
                        </h3>
                    </div>
                    <div className="p-6.5">
                        <ScheduleForm />
                    </div>
                </div>
            </div>
            <div className="w-full 2xl:w-[calc(100vw-1080px)] mt-6">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8 p-8">
                    <h6 className="text-lg text-black dark:text-gray font-medium">Application Guide</h6>
                    <ul className="mt-3">
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Choose the specific date for the interview schedule start date from the calendar.</span>
                        </li>
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Choose the specific date for the interview schedule end date from the calendar.</span>
                        </li>
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Enter the time the interview schedule begins. Ensure it's in the correct format (e.g., 10:00 AM or 14:00).</span>
                        </li>
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Provide the time when the interview schedule ends. Make sure it is after the start time.</span>
                        </li>
                        <li className="flex flex-row gap-x-1 items-start my-2">
                            <TbPoint className="text-lg text-black dark:text-gray-3" />
                            <span>Provide how many slot you need to creat per day.</span>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div >
    )
}
