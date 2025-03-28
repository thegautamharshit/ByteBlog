import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks";


export const Blogs = () =>{
    const {loading, posts} = useBlogs();

    if(loading){
        return <div>
            <Appbar></Appbar>
            <div className="h-screen flex items-center justify-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-gray-900"role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
        </div>
        
    }
    return <div>
            <Appbar></Appbar>
            <div className="flex justify-center">
            <div className="w-9/12">
                {posts.map(post => (
                    <BlogCard
                    key={post.id} 
                    id = {post.id}
                    authorName = {post.author.name}
                    title = {post.title}
                    content = {post.content}
                    createdAt = {post.createdAt}
                />
                ))}
                
            </div>
        </div>
    </div>
    
}