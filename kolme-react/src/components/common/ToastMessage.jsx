import { toast } from 'react-toastify';

export function showToast(msg, type = 'info') {
  toast[msg.type ? msg.type : type](msg.text || msg, { toastId: msg.id });
}

export const Toast = () => null; // component placeholder
