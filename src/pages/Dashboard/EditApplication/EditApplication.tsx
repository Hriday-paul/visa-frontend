import React, { useState } from 'react'
import EditPersonalInfo from './EditPersonalInfo'

const EditApplication = React.memo(()=> {
  const [editApplicationStep, setEditApplicationStep] = useState<number>(0);

  return (
    <div>
      {
        editApplicationStep === 0 && <EditPersonalInfo/>
      }
    </div>
  )
})

export default EditApplication
