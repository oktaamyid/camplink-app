import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { 
    Bold, 
    Italic, 
    List, 
    ListOrdered, 
    Image as LucideImage, 
    Heading1, 
    Heading2,
    Undo,
    Redo
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { useEffect } from 'react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    onImageUpload?: (file: File) => Promise<string>;
}

export default function RichTextEditor({ content, onChange, onImageUpload }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-2xl max-w-full h-auto my-4 shadow-md',
                },
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[200px] p-4',
            },
        },
    });

    useEffect(() => {
        if (editor && content === '' && editor.getHTML() !== '') {
            editor.commands.setContent('');
        }
    }, [content, editor]);

    const addImage = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file && onImageUpload) {
                const url = await onImageUpload(file);
                if (url) {
                    editor?.chain().focus().setImage({ src: url }).run();
                }
            }
        };
        input.click();
    };

    if (!editor) {
        return <div className="p-4 border rounded-xl bg-gray-50 text-gray-400">Loading editor...</div>;
    }

    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-100">
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bold')}
                    onPressedChange={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('italic')}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="size-4" />
                </Toggle>
                <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                <Toggle
                    size="sm"
                    pressed={editor.isActive('heading', { level: 1 })}
                    onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <Heading1 className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('heading', { level: 2 })}
                    onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="size-4" />
                </Toggle>
                <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bulletList')}
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('orderedList')}
                    onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="size-4" />
                </Toggle>
                <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addImage}
                    className="h-8 w-8 p-0"
                >
                    <LucideImage className="size-4" />
                </Button>
                <div className="ml-auto flex gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className="h-8 w-8 p-0"
                    >
                        <Undo className="size-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className="h-8 w-8 p-0"
                    >
                        <Redo className="size-4" />
                    </Button>
                </div>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
