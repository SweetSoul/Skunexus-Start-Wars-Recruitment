import { useEffect } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import useSettings from "../../hooks/useSettings";
import { UPDATE_SETTINGS } from "../../store/reducers/settings.reducer";

export default function NotificationToast() {
    const { settings, updateSettings } = useSettings();

    function handleClose() {
        updateSettings(UPDATE_SETTINGS, { notification: { show: false } });
    }

    useEffect(() => {
        if (settings.notification.show) {
            setTimeout(() => {
                updateSettings(UPDATE_SETTINGS, { notification: { show: false } });
            }, settings.notification.delay || 5000);
        }
        // eslint-disable-next-line 
    }, [settings.notification.show]);

    return (
        <Toast isOpen={settings?.notification?.show || false}>
            <ToastHeader icon={settings?.notification?.type || "success"} toggle={handleClose}>
                {settings?.notification?.title}
            </ToastHeader>
            <ToastBody>
                {settings?.notification?.message}
            </ToastBody>
        </Toast>
    );
}
