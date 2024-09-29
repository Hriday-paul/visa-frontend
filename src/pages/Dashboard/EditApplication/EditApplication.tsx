import React, { useState } from 'react'
import EditPersonalInfo from './EditPersonalInfo'
import EditTravelInfo from './EditTravelInfo';
import EditVisaInfo from './EditVisaInfo';
import EditDocuments from './EditDocuments';
import ReviewEditApplication from './ReviewEditApplication';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TbPoint } from 'react-icons/tb';
import { Steps } from 'antd';

const EditApplication = React.memo(() => {
  const [editApplicationStep, setEditApplicationStep] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const navig = useNavigate();

  const handleCencel = () => {
    const rout = searchParams.get('back')
    navig(rout || '/')
  }

  const steps = [
    {
        title: 'Personal details',
    },
    {
        title: 'Travel Information',
    },
    {
        title: 'Passport Information',
    },
    {
        title: 'Documents',
    },
    {
        title: 'Review',
    },
]

  return (
    <div className=''>
      <div className='w-full bg-white dark:bg-graydark py-5 shadow  sticky top-0 left-0 z-1'>
        <div className='max-w-7xl mx-auto px-4 flex flex-row justify-between items-center'>
          <h4 className='text-lg lg:text-xl text-graydark dark:text-stroke font-medium'>Edit Your Application</h4>
          <button
            onClick={handleCencel}
            className="bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Cencel
          </button>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-4 mt-5'>
        <Steps
          direction="horizontal"
          current={editApplicationStep}
          size="small"
          items={steps}
        />
        <div className="flex flex-col-reverse xl:flex-row gap-y-10 xl:gap-y-0 xl:gap-x-10 justify-between min-h-screen mt-5">
          <div className='xl:w-2/3 w-full'>
            {
              editApplicationStep === 0 ? <EditPersonalInfo setEditApplicationStep={setEditApplicationStep} /> :
                editApplicationStep === 1 ? <EditTravelInfo setEditApplicationStep={setEditApplicationStep} /> :
                  editApplicationStep === 2 ? <EditVisaInfo setEditApplicationStep={setEditApplicationStep} /> :
                    editApplicationStep === 3 ? <EditDocuments setEditApplicationStep={setEditApplicationStep} /> :
                      editApplicationStep === 4 ? <ReviewEditApplication setEditApplicationStep={setEditApplicationStep} /> :
                        <></>
            }
          </div>
          <div className='w-full mt-6 xl:w-1/3'>
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
        </div>
      </div>
    </div>
  )
})

export default EditApplication
