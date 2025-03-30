import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: any;
    createdAt: string;
}

// const extractImageLinks = (content: any): string[] => {
//     if (!content || !content.content) {
//         console.warn("Invalid content structure:", content);
//         return [];
//     }

//     const imageLinks: string[] = [];

//     const traverse = (nodes: any[]) => {
//         nodes.forEach((node) => {
//             if (node.type === "image" && node.attrs?.src) {
//                 imageLinks.push(node.attrs.src);
//             }
//             if (node.content) {
//                 traverse(node.content);
//             }
//         });
//     };

//     traverse(content.content);

//     if (imageLinks.length === 0) {
//         console.warn("No image links found in content:", content);
//     }

//     return imageLinks;
// };

const extractPlainText = (content: any): string => {
    if (!content || !content.content) {
        console.warn("Invalid content structure:", content);
        return "";
    }

    let plainText = "";

    const traverse = (nodes: any[]) => {
        nodes.forEach((node) => {
            if (node.type === "text" && node.text) {
                plainText += node.text + " ";
            }
            if (node.content) {
                traverse(node.content);
            }
        });
    };

    traverse(content.content);

    if (!plainText.trim()) {
        console.warn("No text extracted from content:", content);
    }

    return plainText.trim();
};

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    createdAt
}:BlogCardProps) =>{
    // Extract plain text from TipTap JSON
    const plainText = extractPlainText(content);

    // Calculate reading time (assuming 200 words per minute)
    const words = plainText.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    // Truncate the plain text to 100 characters
    const truncatedContent =
        plainText.length > 200 ? `${plainText.substring(0, 200)}...` : plainText;


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
                    {createdAt}
                </div>
            </div>
            <div className="pt-3 font-bold text-xl">
                {title}
            </div>
            <div className="pt-3 text-md font-thin">
                {truncatedContent}
            </div>
            <div className="pt-4 pl-1 font-thin text-slate-700">
                {`${readingTime}`} minute(s) read
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