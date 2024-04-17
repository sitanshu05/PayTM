const zod = require('zod')

const signupBodySchema = zod.object({
    username : zod.string().email().min(3).max(30),
    firstName : zod.string().max(50),
    lastName : zod.string().max(50),
    password : zod.string().min(6)
})

const signinBodySchema = zod.object({
    username : zod.string().email().min(3).max(30),
    password : zod.string().min(6)
})

const updateUserInfoSchema = zod.object({
    password : zod.string().min(6).optional(),
    firstName : zod.string().max(50).optional(),
    lastName : zod.string().max(50).optional(),
})

module.exports = {signupBodySchema,signinBodySchema,updateUserInfoSchema}