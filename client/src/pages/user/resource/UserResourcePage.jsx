import React from 'react'
import Resources from '../../../features/resource/Resources'
import ProtectedRoute from '../../../utils/ProtectedRoute'

function UserResourcesPage() {
    return (
        <div className=''>
            <Resources />
        </div>
    )
}

export default ProtectedRoute(UserResourcesPage)
