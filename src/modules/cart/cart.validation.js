import joi from "joi"


const addToCartVal=joi.object({
    product:joi.string().hex().length(24).required(),
    quantity:joi.number().optional().options({convert:false})
})

const updateQTYVal=joi.object({
    id:joi.string().hex().length(24).required(),
    quantity:joi.number().required().options({convert:false})
})
const pramsIdVal=joi.object({
    id:joi.string().hex().length(24).required(),
})



export{
    addToCartVal,
    updateQTYVal,
    pramsIdVal
}