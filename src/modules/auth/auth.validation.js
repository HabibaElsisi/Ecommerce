import joi from "joi"

const signUpVal=joi.object({
    name:joi.string().trim().required().min(2).max(30),
    email:joi.string().required().trim().email(),
    password:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).required().min(8),
    repassword:joi.valid(joi.ref("password")).required(),   
})



const signinVal=joi.object({
    email:joi.string().required().trim().email(),
    password:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).required().min(8),

})
const changePasswordVal=joi.object({
    oldPassword:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).required().min(8),
    newPassword:joi.string().pattern(/^(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}$/).required().min(8),
    reNewPassword:joi.valid(joi.ref("newPassword")).required(),   

})


export{
    signUpVal,
    signinVal,
    changePasswordVal
}