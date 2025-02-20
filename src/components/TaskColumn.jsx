import React, { useState } from 'react';
import TaskItem from './TaskItem';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskColumn = ({ title, tasks, addTask, updateTask, deleteTask }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(false); // ✅ লোডিং স্টেট
    const { user } = useAuth();

    const handleAddTask = async () => {
        if (newTaskTitle.trim()) {
            const newTask = {
                title: newTaskTitle,
                description: '',
                category: title,
                email: user.email,
            };

            try {
                await addTask(newTask);
                setNewTaskTitle('');
                toast.success('Task added successfully! 🎉');
            } catch (error) {
                toast.error('Failed to add task. Please try again. 😞');
            }
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border-0">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="space-y-2">
                {tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                ))}
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handleAddTask}
                    className="mt-2 w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loader border-t-2 border-white border-solid rounded-full w-5 h-5 animate-spin"></span>
                    ) : (
                        'Add Task'
                    )}
                </button>
            </div>
        </div>
    );
};

export default TaskColumn;
// import React, { useState } from 'react';
// import useAuth from '../hooks/useAuth';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TaskColumn = ({ title, addTask }) => {
//     const [newTaskTitle, setNewTaskTitle] = useState('');
//     const { user } = useAuth();

//     const handleAddTask = async () => {
//         if (newTaskTitle.trim()) {
//             const newTask = {
//                 title: newTaskTitle,
//                 description: '',
//                 category: title,
//                 email: user.email,
//             };

//             try {
//                 await addTask(newTask);
//                 setNewTaskTitle('');
//                 toast.success('Task added successfully! 🎉');
//             } catch (error) {
//                 toast.error('Failed to add task. Please try again. 😞');
//             }
//         }
//     };

//     return (
//         <div className="bg-white p-4 rounded-lg shadow-md border-0">
//             <h2 className="text-xl font-bold mb-4">{title}</h2>
//             <input
//                 type="text"
//                 placeholder="Add a new task"
//                 value={newTaskTitle}
//                 onChange={(e) => setNewTaskTitle(e.target.value)}
//                 className="w-full p-2 border rounded"
//             />
//             <button
//                 onClick={handleAddTask}
//                 className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
//             >
//                 Add Task
//             </button>
//         </div>
//     );
// };

// export default TaskColumn;
