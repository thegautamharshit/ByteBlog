import { Post } from "../hooks"
import { ReadOnlyEditor } from "../Tiptap";
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Post }) => {
    return (
      <div>
        <Appbar />
        <div className="grid grid-cols-12 px-10 pt-12 max-w-screen-3xl gap-8">
          {/* Main Content */}
          <div className="col-span-8 space-y-4">
            <h1 className="text-5xl font-extrabold">{blog.title}</h1>
            <div className="text-sm font-extralight text-slate-800">
              {formatDate(blog.createdAt)}
            </div>
            <div className="text-gray-700 prose">
              <ReadOnlyEditor content={blog.content} />
            </div>
          </div>
  
          {/* Author Section */}
          <div className="col-span-4 bg-green-50 p-6 rounded-lg space-y-4">
            <div className="text-gray-500 font-medium">Author</div>
            <div className="flex items-center gap-4">
              <Avatar name={blog.author.name} className="w-12 h-12" />
              <div className="space-y-1">
                <div className="font-medium">{blog.author.name}</div>
                <div className="text-sm text-gray-600">
                  Passionate about tech and storytelling
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

// Add this date formatting utility function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  
  // Add ordinal suffix (st, nd, rd, th)
  const day = date.getDate();
  const nth = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  };

  return `Posted on ${day}${nth(day)} ${date.toLocaleDateString('en-US', options)}`;
};