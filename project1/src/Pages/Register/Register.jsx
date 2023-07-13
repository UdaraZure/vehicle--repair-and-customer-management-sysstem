import React from 'react'
import './Register.css'

export default function Register () {
  return (
    <>
    <div>
    <center>
        <table>
            <tr>
                <td className='td'>
                <button className='userButton'>
                    OWNER
                </button>
                </td>
                <td>
                <button className='userButton'>
                    MANAGER
                </button>
                </td>
            </tr>
            <tr>
                <td className='td'>
                <button className='userButton'>
                    EMPLOYEE
                </button>
                </td>
                <td>
                <button className='userButton'>
                    CUSTOMER
                </button>
                </td>
            </tr>
        </table>
        </center>
    </div>
    </>
  )
}
