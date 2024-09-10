import moment from 'moment';
import React from 'react'
import { FaRegCalendar } from 'react-icons/fa'
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import EditApplicationSchedule from './EditApplicationSchedule';
import { ApplicationResponseType } from '../../../../Redux/Features/Types';

type props = {
    photo: string;
    name: string;
    interviewDate: string;
    interViewTime: string;
    application : ApplicationResponseType
}

const InterViewer = React.memo(({ photo, name, interviewDate, interViewTime, application }: props) => {
    return (
        <li className="py-6 flex flex-row border-b border-stroke dark:border-strokedark items-center">
            <img src={photo} alt="applicant photo" className="h-14 w-14 object-cover rounded-full" />
            <div className="w-full mx-8">
                <h3 className="text-lg text-slate-800 dark:text-slate-300 font-bold">{name}</h3>
                <div className="mt-1.5">
                    <span className="flex flex-row items-center gap-x-2">
                        <FaRegCalendar className="text-base" />
                        <p className="text-base">
                            <span>{moment(interviewDate).format("MMM Do YY")}</span> at
                            <span> {interViewTime}</span>
                        </p>
                    </span>
                </div>
            </div>

            <div className='dropdown dropdown-end '>

                <div tabIndex={0} role="button" className="inline-flex items-center justify-center gap-x-1 rounded py-1 px-1.5 text-center font-medium hover:bg-opacity-90 lg:px-5 m-1">
                    <HiOutlineDotsHorizontal className='text-xl' />
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] w-36 p-1 shadow-6 bg-white dark:bg-boxdark-2 rounded">
                    <EditApplicationSchedule applicationDetails={application}/>

                    <li className={`p-2 pl-4 hover:bg-slate-50 dark:hover:bg-boxdark duration-200 rounded cursor-pointer`}>
                        <p>Cencel</p>
                    </li>

                </ul>
            </div>
        </li>
    )
})


export default InterViewer;