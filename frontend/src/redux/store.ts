import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import completedReducer from './completedSlice'
import ProgressReducer from "./progressSlice";

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    complete:completedReducer,
    Progress:ProgressReducer,
  },
});
