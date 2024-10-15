const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Check if email without start or end space s well formed
export const validateEmail = (email: string) => {
    return emailRegex.test(email.trim())
 
};