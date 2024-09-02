const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string) => {
    // if(email.length) {
        return emailRegex.test(email)
    // } else {
    //     return true
    // }
};