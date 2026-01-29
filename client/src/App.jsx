import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import CreateTasks from './pages/admin/CreateTasks'
import ManageTask from './pages/admin/ManageTask'
import ManageUsers from './pages/admin/ManageUsers'
import PrivateRoute from './routes/PrivateRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserDashboard from './pages/user/UserDashboard'
import MyTasks from './pages/user/MyTasks'
import TaskDetails from './pages/user/TaskDetails'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/task" element={<ManageTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path='/admin/create-task' element={<CreateTasks />} />
          </Route>

          {/* User Routes  */}
          <Route element={<PrivateRoute allowedRoles={['user']} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/my-tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<TaskDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App