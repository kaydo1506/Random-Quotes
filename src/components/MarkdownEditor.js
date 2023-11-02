import { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { SkipNextOutlined, SkipPreviousOutlined } from '@mui/icons-material';

export default function MarkdownEditor() {
  const defaultMarkdown = `# Welcome to my very basic React Markdown Previewer!

## This is a sub-heading...

### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

You can also make text **bold**... whoa!

Or _italic_.

Or... wait for it... **_both!_**`;


  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  const parseMarkdown = (text) => {
    // Replace Markdown with HTML elements
    text = text.replace(/(#{1,6})\s(.*?)(?=\n|$)/g, (match, hashes, content) => {
      const level = hashes.length; // Determine the heading level
      let borderStyle = '';
      if (level === 1) {
        borderStyle = 'border-b-2 border-black';
      } else if (level === 2) {
        borderStyle = 'border-b border-black';
      }
      return `<h${level} class="${borderStyle} mt-4 mb-4">${content}</h${level}>`;
    });

    // Bold and italic text
    text = text.replace(
      /\*\*_(.*?)_\*\*/g,
      '<strong class="font-bold italic">$1</strong>'
    );

    // Bold (text within double asterisks)
    text = text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold mt-4 mb-4">$1</strong>'
    );

    // Italics (text within single underscores)
    text = text.replace(/_(.*?)_/g, '<em class="font-normal mt-4 mb-4">$1</em>');

    // Escape HTML tags within the content enclosed in backticks
    text = text.replace(/`([^`]+)`/g, (match, content) => {
      return `<code style="background-color: white; padding: 3px" class="font-bold mt-4 mb-4">${content
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</code>`;
    });

    // Handle unmatched text as paragraph elements
    text = text.replace(/^[a-zA-Z].*$/gm, (match) => {
      return `<p class="mt-4 mb-4">${match}</p>`;
    });

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
          <h1 className='border border-black border-custom-border shadow-custom-boxShadow bg-header-color pl-2'>
            Editor
          </h1>
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            // placeholder='Write your Markdown here'
            className='outline-none bg-inner-color mb-4 border border-black shadow-custom-boxShadow  p-2 w-[70vw] md:w-[50vw] h-64'
          />
        </div>

        {/*Preview*/}
        <div>
          <h1 className='border border-black border-custom-border shadow-custom-boxShadow bg-header-color pl-2'>
            Previewer
          </h1>
          <div
            dangerouslySetInnerHTML={parseMarkdown(markdown)}
            className='font-serif border border-black shadow-custom-boxShadow  p-4 w-[80vw] md:w-[60vw] min-h-64 bg-inner-color'
          />
        </div>
      </div>
    </div>
  );
}
