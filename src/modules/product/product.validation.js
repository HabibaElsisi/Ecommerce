import joi from "joi"


const addProductVal=joi.object({
    title:joi.string().trim().required().min(2).max(300),
    description:joi.string().trim().required().min(10).max(1500),

    imgCover:joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().valid('image/jpeg',"image/png","image/jpg","image/gif").required(),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required()
    })).required(),

    images:joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype:joi.string().valid('image/jpeg',"image/png","image/jpg","image/gif").required(),
        size:joi.number().max(5242880).required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required()
    })).required(),



    price:joi.number().min(0).required(),
    priceAfterDiscount:joi.number().min(0).optional(),
    quantity:joi.number().min(0).optional(),
    category:joi.string().hex().length(24).required(),
    subcategory:joi.string().hex().length(24).required(),
    brand:joi.string().hex().length(24).required(),
    createdBy:joi.string().hex().length(24).optional()


})

const paramsIdVal=joi.object({
    id:joi.string().hex().length(24).required()

})

const updateProductVal=joi.object({
    id:joi.string().hex().length(24).required(),

    title:joi.string().trim().min(2).max(300),
    description:joi.string().trim().min(10).max(1500),

    imgCover:joi.array().items(joi.object({
        fieldname:joi.string(),
        originalname:joi.string(),
        encoding:joi.string(),
        mimetype:joi.string().valid('image/jpeg',"image/png","image/jpg","image/gif"),
        size:joi.number().max(5242880),
        destination:joi.string(),
        filename:joi.string(),
        path:joi.string()
    })),

    images:joi.array().items(joi.object({
        fieldname:joi.string(),
        originalname:joi.string(),
        encoding:joi.string(),
        mimetype:joi.string().valid('image/jpeg',"image/png","image/jpg","image/gif"),
        size:joi.number().max(5242880),
        destination:joi.string(),
        filename:joi.string(),
        path:joi.string()
    })),


    price:joi.number().min(0),
    priceAfterDiscount:joi.number().min(0).optional(),
    quantity:joi.number().min(0).optional(),
    category:joi.string().hex().length(24),
    subcategory:joi.string().hex().length(24),
    brand:joi.string().hex().length(24),
})



export{
    addProductVal,
    paramsIdVal,
    updateProductVal
}