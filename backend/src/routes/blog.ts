import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
    },
    Variables:{
        userId: string
        userName: string
        userEmail: string
    }
}>();

//Middleware
blogRouter.use("/*", async (c,next) => {
    try{
        const jwt = await c.req.header('Authorization')
        if(!jwt){
            c.status(403);
            return c.json({Error:"Unauthorized"})
        }
        const token = jwt.split(' ')[1];
        const payload = await verify(token,c.env.JWT_SECRET) as { id: string };
        if(!payload){
            c.status(403);
            return c.json({Error:"UnAuthorized"})
        }
        c.set("userId",payload.id);
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const user = await prisma.user.findUnique({
            where:{id:payload.id},
            select:{name :true, email:true}
        })
        if(!user){
            c.status(403);
            return c.json({Error: "User not found"})
        }
        c.set("userName", user.name ?? "Unknown User");
        c.set("userEmail", user.email);
        await next();
    }catch(e){
        c.status(403)
        return c.json({
            message: "You are not Logged In"
        })
    }
})

//BLOG POST
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const userId = c.get("userId");
    const userName = c.get("userName");
    const userEmail = c.get("userEmail")

    const post = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })

    return c.json({
        id: post.id
    })
})

//BLOG PUT
blogRouter.put('/', async (c)=>{
    const body = await c.req.json();
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: post.id
    })
})

//BLOG BULK
blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        select:{
            content: true,
            title: true,
            id: true,
            author:{
                select:{
                    name: true
                }
            },
            createdAt:true
        }
    });
    return c.json({
        posts
    })
})

//BLOG GET USER
blogRouter.get('/user', async (c)=>{
    const userName = c.get("userName")
    const userEmail = c.get("userEmail")

    return c.json({
        userName,
        userEmail
    });
});

//BLOG GET
blogRouter.get('/:id', async (c)=>{
    const id = c.req.param("id");
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const post = await prisma.post.findFirst({
            where:{
                id: Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                },
                createdAt:true
            }
        })

        return c.json({
            post
        })
    }catch (e){
        c.status(411);
        return c.json({
            message: "Error While Fetching blog post"
        })
    }
})

//TODO: ADD PAGINATION




