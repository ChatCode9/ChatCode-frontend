import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postFile } from '../services/http';
import { useMutation } from '@tanstack/react-query';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link', 'image', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'code-block',
];

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader?.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface Props {
  content: string;
  setContent: (value: string) => void;
  width?: number | string;
  height?: number | string;
}

function Editor({ content, setContent, width = 'auto', height = 600 }: Props) {
  const quillRef = useRef<ReactQuill | null>(null);

  const {
    mutate, error: mutationError,
  } = useMutation({
    mutationFn: postFile,
    onSuccess: (data, variables, context) => {
      const { imageUrl } = data;
      insertImageToEditor(imageUrl);
    },
  });

  const handleImage = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      if (input.files && input.files[0]) {
        try {
          const base64String = await readFileAsBase64(input.files[0]);
          const base64File = `data:${input.files[0].type};base64,${base64String}`;
          mutate({ base64File, targetId: 1 });
        } catch (error) {
          console.error(error);
        } finally {
          // 임시
        }
      } else {
        alert('Please select a file.');
      }
    });
  };

  const insertImageToEditor = (imageUrl: string) => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection(true);

    if (range) {
      editor?.insertEmbed(range.index, 'image', imageUrl);
      range.index += 1; // Move the cursor to the next position
      editor?.setSelection(range.index);
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule('toolbar');
      toolbar.addHandler('image', handleImage);
    }
  }, []);

  return (
    <div>
      <ReactQuill
        theme="snow"
        bounds="#scrolling-container"
        scrollingContainer=".parent-scroll"
        style={{ width, height }}
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        ref={quillRef}
      />
    </div>
  );
}

export default Editor;
