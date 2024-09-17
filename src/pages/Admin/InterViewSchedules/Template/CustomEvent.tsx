import { Popover } from 'antd'
import React from 'react'
import {
    EventProps
} from 'react-big-calendar'
import { IoEyeOutline } from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md'
import EditApplicationSchedule from './EditApplicationSchedule'

const CustomEvent = React.memo(({ event }: EventProps) => {
    const resource = event?.resource as { encodedId: string, applicationId : number }

    return <div>
        <Popover
            content={
                <ul className="rounded-sm z-999999 w-36 p-1 bg-white dark:bg-boxdark-2 text-slate-900 dark:text-slate-200">
                    <li onClick={()=>window.open(`${window.location.origin}/admin/applications/${resource?.encodedId}`)} className={`p-0.5 pl-2 hover:bg-[#3174AD] dark:hover:bg-boxdark duration-200 rounded cursor-pointer hover:text-white`}>
                        <p className='flex items-center gap-x-1'>
                            <IoEyeOutline />
                            <span>View Application</span>
                        </p>
                    </li>
                    <EditApplicationSchedule applicationId={resource?.applicationId} applicationEncodedId={resource?.encodedId}/>
                    
                    <li className={`p-0.5 pl-2 hover:bg-[#3174AD] dark:hover:bg-boxdark duration-200 rounded cursor-pointer hover:text-white`}>
                        <p className='flex items-center gap-x-1'>
                            <MdDeleteOutline />
                            <span>Delete</span>
                        </p>
                    </li>
                </ul>
            }
            trigger="click">
            <div className='flex flex-row items-center justify-between'>
                {event?.title}
            </div>
        </Popover>
    </div>
})

export default CustomEvent;