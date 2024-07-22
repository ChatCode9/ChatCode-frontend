import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useMutation } from '@tanstack/react-query';

import 'react-quill/dist/quill.snow.css';
import { postFile } from '../services/image/postFile';

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

    reader.onload = () => {
      resolve((reader?.result as string).split(',')[1]);
    };
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

  const { mutate, error: mutationError } = useMutation({
    mutationFn: postFile,
    onSuccess: (data, variables, context) => {
      const imageUrl = data.data.url;

      if (!imageUrl) {
        console.error('imageUrl is undefined or empty');
      } else {
        insertImageToEditor(imageUrl);
      }

      console.log(variables, context, mutationError, data);
    },
  });

  const insertImageToEditor = (imageUrl: string) => {
    const editor = quillRef.current?.getEditor();

    if (!editor) {
      console.error('Editor is not available');
      return;
    }

    const range = editor.getSelection(true);

    if (range) {
      editor.insertEmbed(range.index, 'image', imageUrl);
      const newIndex = range.index + 1;
      editor.setSelection({ index: newIndex, length: 0 });
    }
  };

  //이미지 버튼에 커스텀 핸들러 추가 handleImage
  useEffect(() => {
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

            mutate({ base64File, targetId: 9 });
          } catch (error) {
            console.error(error);
          }
        } else {
          alert('Please select a file.');
        }
      });
    };

    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule('toolbar');
      toolbar.addHandler('image', handleImage);
    }
  }, [quillRef, mutate]);

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
