import Joi from 'joi'

const validator=(schema)=>(payload)=>
    schema.validate(payload, {abortEarly:false});

const signupSchema=Joi.object({
    username:Joi.string().min(3).max(10).required(),
    email:Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
});




export const validateSignup = validator(signupSchema);

