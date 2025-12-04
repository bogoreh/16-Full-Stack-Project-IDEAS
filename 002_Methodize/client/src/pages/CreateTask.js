import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createTask } from '../features/tasks/taskSlice';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  padding: 0.75rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.secondaryDark};
  }
`;

export const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await dispatch(createTask({
        title,
        description,
        completed: false,
      })).unwrap();
      
      navigate('/');
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>Create New Task</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter task title"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </FormGroup>
        
        <ButtonGroup>
          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Task'}
          </SubmitButton>
          <CancelButton type="button" onClick={() => navigate('/')}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};