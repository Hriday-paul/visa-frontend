import React from 'react'
import { RxCross2 } from 'react-icons/rx';
import ScheduleForm from './ScheduleForm';

const CreateSchedule = React.memo(() => {
    return (
        <div>
            <div className="drawer drawer-end z-9999">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button">
                        <span className="bg-primary px-6 py-3.5 text-white rounded-full hover:bg-opacity-80 duration-200 cursor-pointer">Create Schedule</span>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 dark:bg-boxdark text-base-content min-h-full w-full md:w-80 lg:w-96 xl:w-2/6 p-4">
                        {/* Sidebar content here */}
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay cursor-pointer w-8">
                            <div className='border border-stroke dark:border-strokedark p-2 rounded-full inline-block hover:bg-gray duration-200'>
                                <RxCross2 className='text-lg text-slate-900 dark:text-slate-200' />
                            </div>
                        </label>

                        <div className='p-5'>
                            <ScheduleForm />
                        </div>

                    </ul>
                </div>
            </div>
        </div>
    )
})

export default CreateSchedule;
