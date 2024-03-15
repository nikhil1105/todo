import React, { useState, useEffect,FormEvent } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { todo } from '../App';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, completeTask, deleteTask } from '../redux/tasksSlice';
import { Update } from '../redux/completedSlice';
import { progressaddTask, progressdeleteTask } from '../redux/progressSlice';
import './todo.css'



function TodoList() {
    const dispatch = useDispatch()
    const [todo, settodo] = useState<todo[]>([])
    const [allTodos, setAllTodos] = useState<todo[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [ProgressTodos, setProgressTodos] = useState<todo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<todo[]>([]);
    const [isCompletedScreen, setIsCompletedScreen] = useState<boolean>(false);
    const [isProgressScreen, setisProgressScreen] = useState<boolean>(false);

    const handleAddNewToDo = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newToDoObj: todo = {
            id: uuidv4(),
            title: newTodoTitle,
            description: newDescription,
            status: "To Do",
            completedOn: ''
        };
        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newToDoObj);
        setAllTodos(updatedTodoArr);

        dispatch(addTask(updatedTodoArr))

        setNewDescription('');
        setNewTodoTitle('');
    };


    let savedTodos = useSelector((state: any) => state.tasks.tasks);
    let completed = useSelector((state: any) => state.complete.tasks);
    let Progress = useSelector((state: any) => state.Progress.tasks);


    useEffect(() => {

        if (savedTodos) {
            setProgressTodos(Progress);
            setCompletedTodos(completed);
            setAllTodos(savedTodos)
        }

    }, [savedTodos])


    const handleToDoDelete = (index: number) => {
        let reducedTodos = [...allTodos];
        reducedTodos.splice(index, 1);
        setAllTodos(reducedTodos);
        dispatch(deleteTask(reducedTodos))
    };


    const handleProgressDelete = (index: number) => {
        let reducedTodos = [...ProgressTodos];
        reducedTodos.splice(index, 1);
        setProgressTodos(reducedTodos);
        dispatch(progressdeleteTask(reducedTodos))
    };

    const handleCompletedTodoDelete = (index: number) => {
        let reducedCompletedTodos = [...completedTodos];
        reducedCompletedTodos.splice(index, 1);

        dispatch(Update(reducedCompletedTodos))

        setCompletedTodos(reducedCompletedTodos);
    };

    const handleComplete = (index: number) => {
        const date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var minutes = date.getMinutes();
        var ss = date.getSeconds();
        var finalDate =
            dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

        let filteredTodo = {
            ...allTodos[index],
            status: 'In progress',
            completedOn: finalDate,
        };


        let updatedCompletedList = [...ProgressTodos, filteredTodo];
        setProgressTodos(updatedCompletedList);

        dispatch(progressaddTask(updatedCompletedList))

        handleToDoDelete(index);
    };

    const handleProgressComplete = (index: number) => {
        const date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var minutes = date.getMinutes();
        var ss = date.getSeconds();
        var finalDate =
            dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

        let filteredTodo = {
            ...ProgressTodos[index],
            status: 'In progress',
            completedOn: finalDate,
        };


        let updatedCompletedList = [...completedTodos, filteredTodo];
        setCompletedTodos(updatedCompletedList);

        dispatch(Update(updatedCompletedList))

        handleProgressDelete(index);
    };

    return (
        <div className='main' >
            <div className='' >
                <h1>Schedule</h1>



                <div className=' todo-wrapper content ' >
                    <form onSubmit={handleAddNewToDo}>

                        <div className=' todo-input' >
                            <div className=' todo-input-item' >
                                <label>Title:</label>
                                <input
                                    type="text"
                                    required
                                    value={newTodoTitle}
                                    onChange={e => setNewTodoTitle(e.target.value)}
                                    placeholder="What's the title of your To Do?"
                                />
                            </div>
                            <div className=' todo-input-item' >
                                <label>Description:</label>
                                <input
                                    type="text"
                                    required
                                    value={newDescription}
                                    onChange={e => setNewDescription(e.target.value)}
                                    placeholder="What's the description of your To Do?"
                                />
                            </div>
                            <div className='todo-input-item' >
                                <button
                                    className='primary-btn'
                                    type="submit"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className='title btn-area '>
                        <button
                            className={`  secondaryBtn ${isProgressScreen === false && isCompletedScreen === false && 'active'}`}
                            onClick={() => { setIsCompletedScreen(false); setisProgressScreen(false) }}
                        >
                            To Do
                        </button>
                        <button
                            className={` secondaryBtn ${isCompletedScreen === false && isProgressScreen === true && 'active'}`}

                            onClick={() => { setisProgressScreen(true); setIsCompletedScreen(false) }}
                        >
                            In Progress
                        </button>
                        <button
                            className={` secondaryBtn ${isCompletedScreen === true && isProgressScreen === false && 'active'}`}

                            onClick={() => { setIsCompletedScreen(true); setisProgressScreen(false) }}
                        >
                            Completed
                        </button>
                    </div>
                    <div className=' todo-list ' >
                        {isProgressScreen === false && isCompletedScreen === false &&
                            allTodos.map((item, index) => (
                                <div className='todo-list-item' key={index}>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>

                                    </div>
                                    <div>
                                        <div
                                            onClick={() => handleToDoDelete(index)}
                                            className='icon'
                                        >
                                            <AiOutlineDelete
                                                title="Delete?"
                                            />
                                        </div>

                                        <div
                                            className=' check-icon'
                                            onClick={() => handleComplete(index)}
                                        >
                                            <BsCheckLg
                                                title="In Progress?"
                                            />
                                        </div>

                                    </div>
                                </div>
                            ))}

                        {isCompletedScreen === false && isProgressScreen === true &&
                            ProgressTodos.map((item, index) => (
                                <div className='todo-list-item' key={index}>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <p><i>Currently In Progress Started at: {item.completedOn}</i></p>

                                    </div>
                                    <div>
                                        <div
                                            onClick={() => handleProgressDelete(index)}
                                            className='icon'
                                        >
                                            <AiOutlineDelete
                                                title="Delete?"
                                            />
                                        </div>

                                        <div
                                            className='check-icon'
                                            onClick={() => handleProgressComplete(index)}
                                        >
                                            <BsCheckLg
                                                title="Completed?"
                                            />
                                        </div>

                                    </div>
                                </div>
                            ))}

                        {isCompletedScreen === true && isProgressScreen === false &&
                            completedTodos.map((item, index) => (
                                <div className='todo-list-item' key={index}>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <p> <i>Completed at: {item.completedOn}</i></p>
                                    </div>
                                    <div
                                        onClick={() => handleCompletedTodoDelete(index)}
                                        className='icon'
                                    >
                                        <AiOutlineDelete
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default TodoList;