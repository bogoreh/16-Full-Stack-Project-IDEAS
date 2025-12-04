import { Routes, Route } from 'react-router-dom';
import { TaskList } from './pages/TaskList';
import { CreateTask } from './pages/CreateTask';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
    </>
  );
}

export default App;