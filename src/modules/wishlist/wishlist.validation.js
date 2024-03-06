import joi from "joi"
const addToWishlistVal=joi.object({
    product:joi.string().hex().length(24).required()
})


const paramsVal=joi.object({
    id:joi.string().hex().length(24).required()
})

const updateWishlistVal=joi.object({

    product:joi.string().hex().length(24).required()

})
export {
    addToWishlistVal,
    paramsVal,
    updateWishlistVal
}