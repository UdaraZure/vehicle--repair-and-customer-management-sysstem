import React from 'react'
import './Employee.css';

export default function EmployeeDashboard () {
  return (
    <>
        <table>
            <tr>
                <td>
                <div class="input-wrapper" style={{margin: '19vh'}}>
                    <input placeholder="Searth Your Job" type="text" name="text" class="input"/>
                </div>
                </td>
            </tr>
        </table>
    </>
  )
}
