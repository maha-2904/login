import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Todopage.css';
import Calc from './calc';
import { Modal } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons

const Todopage = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState({});
    const [showCalc, setShowCalc] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = () => {
        if (task) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask('');
        } else {
            alert('Task cannot be empty!');
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
        alert('Task deleted!');
    };

    const completeTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const editTask = (index) => {
        const taskToEdit = tasks[index];
        setIsEditing(true);
        setCurrentTask({ ...taskToEdit, index });
        setTask(taskToEdit.text);
    };

    const updateTask = () => {
        const updatedTasks = tasks.map((item, i) =>
            i === currentTask.index ? { ...item, text: task } : item
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setTask('');
        alert('Task updated!');
    };

    const handleLogout = () => {
        alert('Logged out successfully!');
        navigate('/');
    };

    const handleOpenCalc = () => {
        setShowCalc(true);
    };

    const handleCloseCalc = () => {
        setShowCalc(false);
    };

    return (
        <div className="container">
            <header>
                <h1>Todo List</h1>
                <button className="btn btn-info ms-2" onClick={handleOpenCalc}>
                    Open calculator
                </button>
                <button className="btn btn-light" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <div className="mb-3">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="form-control"
                    placeholder="Enter a Task"
                />
            </div>
            <button
                onClick={isEditing ? updateTask : addTask}
                className={`btn ${isEditing ? 'btn-warning' : 'btn-primary'} mb-3`}
            >
                {isEditing ? 'Update Task' : 'Add Task'}
            </button>
            <ul className="list-group">
                {tasks.map((item, index) => (
                    <li
                        key={index}
                        className={`list-group-item ${item.completed ? 'list-group-item-success' : ''}`}
                    >
                        <span className={item.completed ? 'completed-task' : ''}>
                            {item.text}
                        </span>
                        <div>
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => completeTask(index)}
                            >
                                {item.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => editTask(index)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => deleteTask(index)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal show={showCalc} onHide={handleCloseCalc}>
                <Modal.Header closeButton>
                    <Modal.Title>Calculator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Calc />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseCalc}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Todopage;
