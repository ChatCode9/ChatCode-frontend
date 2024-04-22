import { useState } from 'react';
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

function Editor() {
  const [value, setValue] = useState('');

  return (
    <ReactQuill
      theme="snow"
      style={{ height: '600px' }}
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
    />
  );
}

export default Editor;
