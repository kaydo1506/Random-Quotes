import RandomQuotes from './components/RandomQuotes';
import MarkdownEditor from './components/MarkdownEditor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RandomQuotes />} />
        <Route path='markdown' element={<MarkdownEditor />} />
      </Routes>
    </BrowserRouter>
  );
}
