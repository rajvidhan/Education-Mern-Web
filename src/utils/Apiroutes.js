export const host = process.env.REACT_APP_API_KEY;
console.log("host is ",process.env.REACT_APP_API_KEY)
export const allcategiryRoute = `${host}/api/v1/course/showAllCategories`;

export const signUp =`${host}/api/v1/auth/signup`;
export const sendOtp = `${host}/api/v1/auth/sendOtp`;
export const resetPasswordToken = `${host}/api/v1/auth/reset-password-token`;
export const resetPassword = `${host}/api/v1/auth/reset-password`;
export const signup = `${host}/api/v1/auth/signup`;
export const login =`${host}/api/v1/auth/login`;




