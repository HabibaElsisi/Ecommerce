import joi from "joi"

const addCouponVal=joi.object({
    code:joi.string().required().trim().min(1).max(100),
    discount:joi.number().required(),
    expires:joi.date().required()
})
const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()
})

const updateCouponVal=joi.object({
    id:joi.string().hex().length(24).required(),
    code:joi.string().trim().min(1).max(100),
    discount:joi.number(),
    expires:joi.date()

})


export{
    addCouponVal,
    paramsIdVal,
    updateCouponVal
}