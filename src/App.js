import './App.css';
import { Route, Routes } from 'react-router-dom';
import { TaskContext } from './contexts/TaskContext';
import { useEffect, useState } from 'react';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';

function App() {
  const [tasksObject, setTasksObject] = useState(() => {
    const savedTasks = localStorage.getItem('Tasks');
    return savedTasks !== null ? JSON.parse(savedTasks) : [];
  });
  const [userName, setUserName] = useState(() => {
        return localStorage.getItem('userName') || 'User';
    });
    console.log(tasksObject, localStorage.getItem('Tasks'))
  useEffect(() => {
    localStorage.setItem('userName', userName);
}, [userName]);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

  }, [])
  return (
    <TaskContext.Provider value={{tasksObject, setTasksObject,userName, setUserName}}>

      <div className="App">
        <Navbar />
        <Routes>
          <Route index={true} element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />}/>
          <Route path='/settings' element={<Settings />}/>
        </Routes>
        <Footer />
      </div>
    </TaskContext.Provider>
  );
}

export default App;
