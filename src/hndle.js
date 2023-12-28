import os from 'os';

export const handleError = (errorMessage) => {
 const hostname = os.hostname();
 console.error(`An error occurred on host ${hostname}:`, errorMessage);
 alert(`An error occurred on host ${hostname}. Please contact your administrator for assistance.`);
};