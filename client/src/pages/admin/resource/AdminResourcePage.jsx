import React from 'react'
import Resources from '../../../features/admin/resource/AdminResources'
import ProtectedRoute from '../../../utils/ProtectedRoute'

function AdminResourcePage() {
    return (
        <div className=''>
            <Resources />
        </div>
    )
}

export default ProtectedRoute(AdminResourcePage, true)
