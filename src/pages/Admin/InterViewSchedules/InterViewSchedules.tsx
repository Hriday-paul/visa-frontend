import DateSearch from "./Template/DateSearch";
import CreateSchedule from "./Template/CreateSchedule";
import AllSchedule from "./Template/AllSchedule";
import { useState } from "react";

export default function InterViewSchedules() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  return (
    <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-0">
      <div className="flex pt-10 px-16 justify-between items-center">
        <h3 className="text-lg text-slate-900 dark:text-slate-200 font-bold capitalize">
          Interview Schedules
        </h3>
        <CreateSchedule />
      </div>
      <div className="px-6.5 pt-8 pb-10">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-x-0 gap-y-5 md:gap-x-5 xl:gap-x-8 xl:gap-y-0 xl:px-10">
          <div className="xl:col-span-3">
            <AllSchedule selectedDate={selectedDate}/>
          </div>
          <div className="xl:col-span-2 normal-date-picker">
            <DateSearch setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
          </div>
        </div>
      </div>
    </div>
  )
}
