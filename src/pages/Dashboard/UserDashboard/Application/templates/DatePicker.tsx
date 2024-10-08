import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Inputs } from '../../Personal_information/Personal_information';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";


const DatePicker: React.FC<{ title: string; control: Control<Inputs>, errors: FieldErrors<Inputs>, defaultValue: string | undefined }> = ({ title, control, errors, defaultValue: dfvalue }) => {
  return (
    <Controller
      name="date_of_birth"
      control={control}
      rules={{ required: "date_of_birth is required" }}
      render={({ field }) => (
        <Flatpickr
          placeholder='YYYY-MM-DD'
          defaultValue={dfvalue || ''}
          onChange={(_, str) => {
            field.onChange(str)
          }}
          render={
            ({ defaultValue }, ref) => {
              return <div className='w-full xl:w-1/2'>
                <label className="mb-2.5 block text-black dark:text-white" >
                  {title}
                  <span className="text-red-500 text-base ml-1">*</span>
                </label>
                <input placeholder='YYYY-MM-DD' defaultValue={defaultValue} ref={ref} className={`form-datepicker w-full rounded border-[1.5px] bg-transparent px-5 py-3 font-normal outline-none transition dark:bg-form-input ${errors?.date_of_birth ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`} />
              </div>
            }
          }
        />
      )}
    />
  );
};

export default DatePicker;
