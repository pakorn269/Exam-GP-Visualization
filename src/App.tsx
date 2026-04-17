import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Nav from './components/Nav';
import Home from './components/home/Home';
import TopicHub from './components/topic/TopicHub';
import LessonList from './components/lessons/LessonList';
import LessonDetail from './components/lessons/LessonDetail';
import Practice from './components/practice/Practice';
import Exam from './components/exam/Exam';
import Result from './components/exam/Result';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename="/exam">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:topicId" element={<TopicHub />} />
          <Route path="/topic/:topicId/lessons" element={<LessonList />} />
          <Route path="/topic/:topicId/lessons/:idx" element={<LessonDetail />} />
          <Route path="/topic/:topicId/practice" element={<Practice />} />
          <Route path="/topic/:topicId/exam" element={<Exam />} />
          <Route path="/topic/:topicId/result" element={<Result />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
