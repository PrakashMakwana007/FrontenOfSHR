import { toast } from 'react-hot-toast';

// Success Toast
export const successToast = (message) => {
  toast.success(message, {
    duration: 3000,       // 3 seconds
    position: 'top-right',
    style: {
      borderRadius: '10px',
      background: '#48bb78', // green
      color: '#fff',
      padding: '10px 15px',
      fontWeight: 'bold',
    },
  });
};

// Error Toast
export const errorToast = (message) => {
  toast.error(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      borderRadius: '10px',
      background: '#f56565', // red
      color: '#fff',
      padding: '10px 15px',
      fontWeight: 'bold',
    },
  });
};

// Info Toast (optional)
export const infoToast = (message) => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      borderRadius: '10px',
      background: '#4299e1', // blue
      color: '#fff',
      padding: '10px 15px',
      fontWeight: 'bold',
    },
  });
};
