
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ToastStyles.css'
    
    
  const basicToast = (message) =>   toast(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'success-toast',
    autoClose: 3000,
    hideProgressBar: true,
    newestOnTop:true,
closeOnClick: true,
});

const errorToast = (message) =>   toast(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: 'error-toast',
    autoClose: 3000,
    hideProgressBar: true,
    newestOnTop:true,
closeOnClick: true,
});






  const CommonToasts = {
    basicToast,
    errorToast

  }

  export default CommonToasts;