import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) =>{
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 pb-4 p-4 cursor-pointer hover:bg-amber-100 hover:rounded-xl">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar name = {authorName} />
                </div>
                <div className="pl-2 font-extralight">
                    {authorName}
                </div>
                <div className="pl-2 font-extralight">
                    <p>.</p>
                </div>
                <div className="pl-2 font-thin text-slate-700">
                    {publishedDate}
                </div>
            </div>
            <div className="pt-3 font-bold text-xl">
                {title}
            </div>
            <div className="pt-3 text-md font-thin">
                {content.slice(0,132) + "..."}
            </div>
            <div className="pt-4 pl-1 font-thin text-slate-700">
                {`${Math.ceil(content.length / 100)}`} minute(s) read
            </div>
        </div>
    </Link>
}

export function Avatar({name, className}: {name:string; className?:string}){
    return <div className={`relative inline-flex items-center justify-center w-6 h-6
        overflow-hidden bg-gray-100 rounded-full dark:bg-gray-900 ${className}`}>
        <span className="font-medium text-gray-600 dark:text-gray-300" >
            {name[0]}</span>
    </div>
}