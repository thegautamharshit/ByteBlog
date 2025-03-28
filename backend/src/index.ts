import { Hono } from 'hono'
import {userRouter} from './routes/user'
import {blogRouter} from './routes/blog'
import { cors } from 'hono/cors'

type Bindings = {
  DATABASE_URL: string
  DIRECT_URL: string
  JWT_SECRET: string
}
type Variables = {
  userId:string
}

const app = new Hono<{Bindings: Bindings, Variables:Variables}>();

app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app
