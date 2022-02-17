import { UPDATE_SETTINGS } from '../store/reducers/settings.reducer';
import useSettings from './useSettings';

export default function useNotification() {
    const { updateSettings } = useSettings();

    function notify(message, title, type = "success", delay = null) {
        const notification = { message, title, show: true, delay, type };
        updateSettings(UPDATE_SETTINGS, { notification });
    }

    return notify;
}
