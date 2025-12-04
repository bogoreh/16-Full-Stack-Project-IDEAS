import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchTasks } from '../features/tasks/taskSlice';
import { TaskCard } from '../features/tasks/TaskCard';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const AddButton = styled(Link)`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const Error = styled.div`
  color: ${({ theme }) => theme.danger};
  padding: 2rem;
  text-align: center;
`;

export const TaskList = () => {
  const dispatch = useDispatch();
  const { items: tasks, status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Loading>Loading tasks...</Loading>;
  }

  if (status === 'failed') {
    return <Error>Error: {error}</Error>;
  }

  return (
    <Container>
      <Header>
        <Title>My Tasks</Title>
        <AddButton to="/create">+ New Task</AddButton>
      </Header>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
      {tasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No tasks yet. Create your first task!
        </p>
      )}
    </Container>
  );
};