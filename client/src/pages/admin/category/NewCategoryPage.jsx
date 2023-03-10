import React from 'react'
import Form from '../../../components/admin/CategoryForm'
import ProtectedRoute from '../../../utils/ProtectedRoute'

function NewCategoryPage() {
    return (
        <div className='w-1/3 mx-auto'>
            <Form />
        </div>
    )
}

export default ProtectedRoute(NewCategoryPage, true)
