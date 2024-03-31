import React from 'react'
import AdminDashboardHeader from './AdminDashboardHeader'
import DashboardWidgets from './widgets/DashboardWidgets'

type Props = {}

const AdminDashboard = (props: Props) => {
  return (
    <div>
        <AdminDashboardHeader />
        <DashboardWidgets />
    </div>
  )
}

export default AdminDashboard