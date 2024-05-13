import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

interface Props {
  content: string;
  setContent: (value: string) => void;
  width?: number | string;
  height?: number | string;
}

function Editor({ content, setContent, width = 'auto', height = 600 }: Props) {
  const quillRef = useRef<ReactQuill | null>(null);

  const handleImage = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files?.[0];

      try {
        // 이미지 업로드
        console.log(file);
        // 이미지 업로드 후 url 가져오기
      } catch (error) {
        console.log(error);
      }
    });
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
