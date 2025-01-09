// Toast.js
export function notify(message, type) {
    const toastContainer = document.getElementById('toast-container');
  
    if (toastContainer) {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`; // Add your toast styles here (success, error, etc.)
      toast.innerHTML = message;
      
      toastContainer.appendChild(toast);
  
      setTimeout(() => {
        toast.remove(); // Remove the toast after some time
      }, 3000); // 3 seconds duration
    }
  }
  