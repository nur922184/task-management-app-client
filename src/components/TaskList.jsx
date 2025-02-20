import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ title, tasks = [], updateTask, deleteTask }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border-0">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="space-y-2">
                {(tasks || []).map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                ))}
            </div>
        </div>
    );
};


export default TaskList;
