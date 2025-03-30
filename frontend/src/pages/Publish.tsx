import { useRef, useState } from "react"
import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import Tiptap from "../Tiptap"

export const Publish = () => {
  const [title, setTitle] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Create a ref for the Tiptap component.
  const tiptapRef = useRef<any>(null)

  const handlePublish = async () => {
    // Check title exists.
    if (title.trim() === "") {
      alert("Please enter a title.")
      return
    }

    // Call the exportContent function on Tiptap to get the editor content.
    const content = tiptapRef.current?.exportContent()
    if (!content) {
      alert("Content is empty.")
      return
    }

    setIsLoading(true)
    try {
      // Post title and content JSON to your backend.
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      navigate(`/blog/${response.data.id}`)
    } catch (e) {
      console.error("Publish failed", e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div className="flex justify-center pt-10 ">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          placeholder="Title"
          className="w-8/12 border-b text-4xl font-old text-gray-700 outline-none placeholder-slate-400 font-serif m-10"
        />
      </div>

      <div className="ml-30 mr-30 text-gray-800">
        {/* Attach the ref to Tiptap */}
        <Tiptap ref={tiptapRef} />
      </div>

      <div className="flex justify-center pt-10">
        <button
          onClick={handlePublish}
          type="button"
          className={`mr-4 focus:outline-none text-white bg-green-600/90 hover:bg-green-700 focus:ring-4 focus:ring-green-300 
                    font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
          disabled={isLoading}
        >
          {isLoading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  )
}
