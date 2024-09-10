import React from 'react'
import { useInterviewAvailableDatesQuery } from '../../../../Redux/Features/BaseApi';
import { useCookies } from 'react-cookie';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { ImSpinner8 } from 'react-icons/im';
import AdminError from '../../../../components/Shared/AdminError';

const DateSearch = React.memo(({setSelectedDate, selectedDate} : {selectedDate : string | null, setSelectedDate : React.Dispatch<React.SetStateAction<string | null>>}) => {
  const [cookies] = useCookies(['baerer-token']);
  const token = cookies["baerer-token"];
  const { isLoading, isSuccess, data, isError } = useInterviewAvailableDatesQuery({ token });

  return (
    <div className='sticky top-0 left-0'>
      {isLoading ?
        <div className="min-h-80 flex justify-center items-center">
          <ImSpinner8 className="text-3xl text-primary animate-spin" />
        </div> : isError ? <AdminError /> : !isSuccess ? <></> :
          <div className="borderd-date border rounded-xl border-stroke dark:border-strokedark p-6 w-[358px] mx-auto">
            <Flatpickr
              data-enable-time
              value={selectedDate || ''}
              onChange={(_, str) => {
                setSelectedDate(str)
              }}
              options={{
                disable: data?.fully_booked_dates,
                minDate: data?.start_date,
                maxDate: data?.end_date,
                inline: true,
                altInput: true,
                dateFormat: 'Y-m-d',
                enableTime: false,
                altInputClass: 'invisible',
              }}
            />
            {selectedDate && <button onClick={()=>setSelectedDate(null)} className='bg-primary text-white mt-5 py-2 px-3 block rounded w-full hover:bg-opacity-85 duration-150'>Clear</button>}
          </div>}
    </div>
  )
})

export default DateSearch
