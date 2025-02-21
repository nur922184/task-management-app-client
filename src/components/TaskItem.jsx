import React, { useState } from 'react';
import { motion } from 'framer-motion'; // ✅ অ্যানিমেশন লাইব্রেরি
import { MdDelete, MdEditNote } from 'react-icons/md';

const TaskItem = ({ task, updateTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleSave = () => {
        updateTask(task._id, editedTask);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTask(task); // পুরোনো মান ফিরিয়ে আনা
        setIsEditing(false);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-200 p-2 rounded-lg shadow-sm"
        >
            {isEditing ? (
                <div className="space-y-2">
                    <input
                        type="text"
                        value={editedTask?.title}
                        onChange={(e) =>
                            setEditedTask({ ...editedTask, title: e.target.value })
                        }
                        className="w-full p-1 border rounded"
                    />
                    <textarea
                        value={editedTask?.description}
                        onChange={(e) =>
                            setEditedTask({ ...editedTask, description: e.target.value })
                        }
                        className="w-full p-1 border rounded"
                    />
                    <div className="flex space-x-2 mt-2">
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white p-1 rounded w-full"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-400 text-white p-1 rounded w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="font-bold">{task?.title}</h3>
                    <p>{task?.description}</p>
                    <div className="flex space-x-2 justify-end mt-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-green-700 p-1 rounded"
                        >
                            <MdEditNote size={20}/>
                        </button>
                        <button
                            onClick={() => deleteTask(task._id)}
                            className="text-red-500 rounded"
                        >
                            <MdDelete size={20} />
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TaskItem;
