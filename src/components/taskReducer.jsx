export const taskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_OPTIMISTIC":
            return [...state, action.payload]; // ✅ সাথে সাথে টাস্ক যোগ করবো

        case "CONFIRM_ADD":
            return state.map(task =>
                task._id === action.tempId ? action.payload : task
            ); // ✅ সার্ভার থেকে আসলে আসল ID সেট করবো

        case "REMOVE_OPTIMISTIC":
            return state.filter(task => task._id !== action.tempId); // ❌ ব্যর্থ হলে মুছে ফেলবো

        default:
            return state;
    }
};
