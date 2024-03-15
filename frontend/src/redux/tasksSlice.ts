import { createSlice, current } from '@reduxjs/toolkit';
import { todo } from '../App';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('todolist') || '[]')
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks = action.payload;
      console.log(action);

      console.log(current(state));
      localStorage.setItem('todolist', JSON.stringify(action.payload));

    },
    completeTask(state, action) {
      const taskId = action.payload;
      console.log('taskId' ,taskId);
      
      state.tasks = state.tasks.map((task: todo) =>
        task.id === taskId ? { ...task, completed: true } : task
      );
    },
    deleteTask(state, action) {
      state.tasks = action.payload;
      console.log(action);
      console.log(current(state));
      localStorage.setItem('todolist', JSON.stringify(action.payload));
    },
  },
});




export const { addTask, completeTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
