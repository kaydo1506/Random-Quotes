import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { SkipNextOutlined, SkipPreviousOutlined } from '@mui/icons-material';

export default function MarkdownEditor() {
  return (
    <div className='container mx-auto px-4'>
      <ul className='flex justify-evenly'>
        <li>
          <Link to='/'><SkipPreviousOutlined /> Back</Link>
        </li>
        <li>
          <Link to='drum-machine'> Next cool stuff <SkipNextOutlined/> </Link>
        </li>
      </ul>
      <div className=''>
        <div className="">
          <h2 className=''>Editor</h2>
        </div>
        <div className=''>
          <h2>Previewer</h2>
        </div>
      </div>
    </div>
  );
}
