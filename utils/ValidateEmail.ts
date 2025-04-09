const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Check if email without start or end space s well formed
export const validateEmail = (email: string) => {
    if(email){
        return emailRegex.test(email.trim())
    }
    return true
};