import { createSlice, current } from '@reduxjs/toolkit';
import { todo } from '../App';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('progresslist') || '[]')
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    progressaddTask(state, action) {
      state.tasks = action.payload;
      console.log(action);
      console.log(current(state));
      localStorage.setItem('progresslist', JSON.stringify(action.payload));

    },
    progresscompleteTask(state, action) {
      const taskId = action.payload;
      state.tasks = state.tasks.map((task: todo) =>
        task.id === taskId ? { ...task, completed: true } : task
      );
    },
    progressdeleteTask(state, action) {
      state.tasks = action.payload;
      console.log(action);
      console.log(current(state));
      localStorage.setItem('progresslist', JSON.stringify(action.payload));
    },
  },
});




export const { progressaddTask, progresscompleteTask, progressdeleteTask } = progressSlice.actions;
export default progressSlice.reducer;
