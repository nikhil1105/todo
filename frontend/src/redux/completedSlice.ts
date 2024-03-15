import { createSlice, current } from '@reduxjs/toolkit';
import { todo } from '../App';

const initialState = {
    tasks: JSON.parse(localStorage.getItem('completedTodos') || '[]')
};

const completedSlice = createSlice({
    name: 'completed',
    initialState,
    reducers: {
        Update(state, action) {
            state.tasks = action.payload;
            localStorage.setItem('completedTodos', JSON.stringify(action.payload));
            console.log(current(state));
            
        },
       
    },
});



export const { Update } = completedSlice.actions;
export default completedSlice.reducer;
