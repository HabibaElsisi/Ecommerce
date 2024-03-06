import joi from "joi"


const addSubCategoryVal=joi.object({
    name:joi.string().trim().required().min(2).max(100),
    category:joi.string().hex().length(24).required(),
    createdBy:joi.string().hex().length(24),
    
})
const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()

})
const updateSubCategoryVal=joi.object({
    id:joi.string().hex().length(24).required(),

    name:joi.string().trim().min(2).max(100),
    category:joi.string().hex().length(24),
    createdBy:joi.string().hex().length(24),
})



export{
    addSubCategoryVal,
    paramsIdVal,
    updateSubCategoryVal
}