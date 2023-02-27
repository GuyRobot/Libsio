import React from 'react'
import Form from '../../../components/ResourceForm'
import ProtectedRoute from '../../../utils/ProtectedRoute'

function NewResource() {
    return (
        <div className='w-1/3 mx-auto'>
            <Form />
        </div>
    )
}

export default ProtectedRoute(NewResource, true)
