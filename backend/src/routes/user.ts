import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import {registerSchema} from "@thegautamharshit/blog-common"


type Bindings = {
    DATABASE_URL: string
    DIRECT_URL: string
    JWT_SECRET: string
}
  type Variables = {
    userId:string
}

export const userRouter = new Hono<{Bindings: Bindings, Variables:Variables}>();

//User SIGNUP
userRouter.post('/signup', async (c) => {
try{
    const body = await c.req.json();
    const {success} = registerSchema.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Incorrect Input"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const existingUser = await prisma.user.findUnique({
        where:{
            email:body.email
        }
    });
    if(existingUser){
        return c.json({ error: "Email already exists" }, 409)
    }

    const user = await prisma.user.create({
        data:{
            email: body.email,
            password: body.password,
            name:body.name
        }
    });
    
    const jwt = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({jwt})

}catch(e){
        // console.error("Signup error:", e);
        c.status(403);
        return c.json({Error:"Error While SignUp"})
    }
})
  
//User SIGNIN
userRouter.post('/signin', async (c) => {
const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
}).$extends(withAccelerate());

const body = await c.req.json();
try{
    const user = await prisma.user.findFirst({
    where:{
        email: body.email,
        password: body.password
    }
    })
    if(!user){
    c.status(403);
    return c.json({message:"User not found"})
    }
    const jwt = await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({jwt});

}catch (e){
    // console.log(e);
    c.status(411);
    return c.text('Invalid Entry')
}
})