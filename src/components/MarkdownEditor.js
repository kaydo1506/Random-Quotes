import { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { SkipNextOutlined, SkipPreviousOutlined } from '@mui/icons-material';



export default function MarkdownEditor() {
  
  const [markdown, setMarkdown] = useState('# Write your Markdown here');

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  const parseMarkdown = (text) => {
    // Replace Markdown with HTML elements
    text = text.replace(
      /(#{1,6})\s(.*?)(?=\n|$)/g,
      (match, hashes, content) => {
        const level = hashes.length; // Determine the heading level
        return `<h${level}>${content}</h${level}>`;
      }
    );

    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold (text within double asterisks)
    text = text.replace(/_(.*?)_/g, '<em>$1</em>'); // Italics (text within single underscores)
    text = text.replace(/\n/g, '<br>'); // new line
    
    // Add more conversions for other Markdown elements

    return { __html: text };
  };

  return (
    <div className='markdown px-4 py-6 bg-custom-color h-screen fixed inset-0 overflow-y-auto'>
      {/*Navigation*/}
      <ul className='flex justify-evenly'>
        <li>
          <Link to='/'>
            <SkipPreviousOutlined /> Back
          </Link>
        </li>
        <li>
          <Link to='drum-machine'>
            {' '}
            Next cool stuff <SkipNextOutlined />{' '}
          </Link>
        </li>
      </ul>

      {/*MARKDOWN*/}
      <div className='flex items-center flex-col pt-6 pb-4 bg-custom-color'>
        {/*Editor*/}
        <div className=''>
          <h1 className='font-bold border-b border-black'>Editor</h1>
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            // placeholder='Write your Markdown here'
            className='outline-none bg-custom-color mb-4 border border-black shadow-2xl  p-2 w-[70vw] md:w-[50vw] h-64'
          />
        </div>

        {/*Preview*/}
        <div >
          <h1 className='font-bold border-b border-black'>Previewer</h1>
          <div
            dangerouslySetInnerHTML={parseMarkdown(markdown)}
            className=' border border-black shadow-2xl  p-2 w-[80vw] md:w-[60vw] min-h-64'
          />
        </div>
      </div>
    </div>
  );
}
