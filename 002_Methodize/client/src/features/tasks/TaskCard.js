import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from './taskSlice';

const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const TaskInfo = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.text};
  text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
  opacity: ${({ completed }) => completed ? 0.6 : 1};
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;

  &.complete {
    background: ${({ theme }) => theme.success};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.successDark};
    }
  }

  &.delete {
    background: ${({ theme }) => theme.danger};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.dangerDark};
    }
  }
`;

export const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const handleComplete = () => {
    dispatch(updateTask({
      id: task._id,
      updates: { completed: !task.completed }
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  return (
    <Card>
      <TaskInfo>
        <Title completed={task.completed}>{task.title}</Title>
        <Description>{task.description}</Description>
        <small>{new Date(task.createdAt).toLocaleDateString()}</small>
      </TaskInfo>
      <Actions>
        <Button 
          className="complete"
          onClick={handleComplete}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button 
          className="delete"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Actions>
    </Card>
  );
};