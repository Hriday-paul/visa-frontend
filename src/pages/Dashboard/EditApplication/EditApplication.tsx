import React, { useState } from 'react'
import EditPersonalInfo from './EditPersonalInfo'
import EditTravelInfo from './EditTravelInfo';
import EditVisaInfo from './EditVisaInfo';

const EditApplication = React.memo(() => {
  const [editApplicationStep, setEditApplicationStep] = useState<number>(0);

  return (
    <div>
      {
        editApplicationStep === 0 ? <EditPersonalInfo setEditApplicationStep={setEditApplicationStep} /> :
          editApplicationStep === 1 ? <EditTravelInfo setEditApplicationStep={setEditApplicationStep} /> :
            editApplicationStep === 2 ? <EditVisaInfo setEditApplicationStep={setEditApplicationStep} /> :
              <></>
      }
    </div>
  )
})

export default EditApplication
