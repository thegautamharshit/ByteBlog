import { useBlog } from "../hooks"
import { Appbar } from "../components/Appbar";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";

export const Blog = () => {
    const { id } = useParams();
    const {loading,post} = useBlog({
        id: (id || "")
    });
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
        {/* <FullBlog blog={post}/> */}
        {post && <FullBlog blog={post} />}
    </div>
}