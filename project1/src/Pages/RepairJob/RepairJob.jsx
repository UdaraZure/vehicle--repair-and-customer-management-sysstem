import React from 'react'
import {useParams} from "react-router-dom"

function RepairJob() {
    let { JobID } = useParams();

  return (
    <div>
      {JobID}
    </div>
  )
}

export default RepairJob
