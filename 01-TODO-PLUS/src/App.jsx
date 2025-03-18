import './App.css'
import { TaskProvider } from './context/TaskContext';
import { router } from './router'
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
<TaskProvider>
  <RouterProvider router={router} />
</TaskProvider>
  )
}

export default App
