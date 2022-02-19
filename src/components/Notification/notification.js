import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { updateSettings } from "../../store/slices/settingsSlice";

export default function NotificationToast() {
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    function handleClose() {
        dispatch(updateSettings({ notification: { show: false } }));
    }

    useEffect(() => {
        if (settings.notification.show) {
            setTimeout(() => {
                dispatch(updateSettings({ notification: { show: false } }));
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
