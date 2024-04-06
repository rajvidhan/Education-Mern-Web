export const host = process.env.REACT_APP_API_KEY;
console.log("host is ",process.env.REACT_APP_API_KEY)
export const allcategiryRoute = `${host}/course/showAllCategories`;

export const signUp =`${host}/auth/signup`;
export const sendOtp = `${host}/auth/sendOtp`;
export const resetPasswordToken = `${host}/auth/reset-password-token`;
export const resetPassword = `${host}/auth/reset-password`;
export const signup = `${host}/auth/signup`;
export const login =`${host}/auth/login`;




