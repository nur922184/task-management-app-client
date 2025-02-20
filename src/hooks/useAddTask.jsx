import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useAddTask = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (task) => {
            const response = await axios.post('https://task-management-backend-ochre.vercel.app/tasks', task);
            return response.data;
        },
        {
            // ✅ UI তে তাৎক্ষণিক নতুন টাস্ক যোগ (Optimistic Update)
            onMutate: async (newTask) => {
                await queryClient.cancelQueries(['tasks']);
                const previousTasks = queryClient.getQueryData(['tasks']);

                queryClient.setQueryData(['tasks'], (oldTasks) => [...oldTasks, { ...newTask, _id: Date.now() }]);

                return { previousTasks };
            },
            // ✅ সার্ভার থেকে ডাটা রিফ্রেশ (Ensure Fresh Data)
            onSuccess: () => {
                queryClient.invalidateQueries(['tasks']);
            },
            // ❌ কোনো সমস্যা হলে আগের ডাটা ফিরিয়ে দাও
            onError: (error, newTask, context) => {
                console.error('Error adding task:', error);
                queryClient.setQueryData(['tasks'], context.previousTasks);
            }
        }
    );
};

export default useAddTask;
