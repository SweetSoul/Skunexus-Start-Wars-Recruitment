import { useDispatch } from 'react-redux';
import { updateSettings } from '../store/slices/settingsSlice';

export default function useNotification() {
    const dispatch = useDispatch();

    function notify(message, title, type = "success", delay = null) {
        const notification = { message, title, show: true, delay, type };
        dispatch(updateSettings({ notification }));
    }

    return notify;
}
