import { useImperativeHandle, forwardRef } from 'react'
import './Tiptap.css'

import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

import { all, createLowlight } from 'lowlight'

export const ReadOnlyEditor = ({ content }: any) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        codeBlock:false
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      Placeholder.configure({
        placeholder: "Tell Your Story ..."
      }),
      Image,
      CodeBlockLowlight.configure({ lowlight }),
      TextStyle.configure({}),
      Color.configure({ types: [TextStyle.name, ListItem.name] })
    ],
    content,
    editable: false,
  })

  if (!editor){
    return null
  }

  return <EditorContent editor={editor} className='max-h-150 overflow-scroll'/>
}

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const MenuBar = ({ editor }: any) => { 
  if (!editor) return null

  return (
    <div className="button-group">
      <button 
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
        H1
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
        H2
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
        H3
      </button>
      <button 
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}>
        P
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
        B
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}>
        <i>I</i>
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}>
        <s>Strike</s>
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive('highlight') ? 'is-active' : ''}>
        <mark>H</mark>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        UL
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        OL
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        Code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        Blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        Horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        Hard break
      </button>
      <button 
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive('textAlign', { textAlign: 'left' }) ? 'is-active' : ''}>
        Left
      </button>
      <button 
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive('textAlign', { textAlign: 'center' }) ? 'is-active' : ''}>
        Center
      </button>
      <button 
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive('textAlign', { textAlign: 'right' }) ? 'is-active' : ''}>
        Right
      </button>
      <button 
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive('textAlign', { textAlign: 'justify' }) ? 'is-active' : ''}>
        Justify
      </button>
      <button onClick={() => addImage(editor)}>Add Image from URL</button>
    </div>
  )
}

const addImage = (editor: any) => {
  const url = window.prompt('Please Enter the Image Link URL')
  if (url) {
    editor.chain().focus().setImage({ src: url }).run()
  }
}

// Wrap Tiptap with forwardRef to expose functions to parent components.
const Tiptap = forwardRef((_, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        codeBlock:false
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      Placeholder.configure({
        placeholder: "Tell Your Story ..."
      }),
      Image,
      CodeBlockLowlight.configure({ lowlight }),
      TextStyle.configure({}),
      Color.configure({ types: [TextStyle.name, ListItem.name] })
    ],
    content: ``,
    editorProps: {
      attributes: {
        class: "justify-center ml-5 mr-5 mt-2 outline-none",
      },
    }
  })

  // Expose exportContent function to the parent using the ref.
  useImperativeHandle(ref, () => ({
    exportContent: () => {
      if (editor) {
        const jsonContent = editor.getJSON()
        // console.log('Exported JSON:', jsonContent)
        return jsonContent
      }
      return null
    }
  }))

  if (!editor) {
    return null
  }

  return (
    <>
      <div className='flex justify-center pb-2 pt-2'>
        <MenuBar editor={editor} />
      </div>
      <div className='ml-50 mr-50'>
        <EditorContent editor={editor} className='min-h-100 overflow-scroll' />
      </div>
    </>
  )
})

export default Tiptap
