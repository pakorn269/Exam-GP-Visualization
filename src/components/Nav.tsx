import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TOPICS } from '../data/topics';

const links = [
  { label: 'หน้าแรก',  path: '/' },
  { label: 'บทเรียน',  path: 'lessons' },
  { label: 'ฝึกโจทย์', path: 'practice' },
  { label: 'จำลองสอบ', path: 'exam' },
];

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTopic } = useApp();
  const topic = currentTopic ? TOPICS[currentTopic] : null;

  function handleNav(path: string) {
    if (path === '/') { navigate('/'); return; }
    if (!currentTopic) { navigate('/'); return; }
    if (path !== 'lessons' && topic && topic[path as 'practice' | 'exam'].length === 0) {
      navigate(`/topic/${currentTopic}`);
      return;
    }
    navigate(`/topic/${currentTopic}/${path}`);
  }

  function isUnavailable(path: string) {
    if (path === '/' || path === 'lessons' || !topic) return false;
    return topic[path as 'practice' | 'exam'].length === 0;
  }

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/';
    return location.pathname.endsWith(`/${path}`);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[rgba(248,239,216,0.12)]
                    bg-[rgba(17,20,17,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex h-[62px] max-w-6xl items-center justify-between gap-3 px-3 sm:px-6">
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-3 border-none bg-transparent text-left cursor-pointer"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,209,102,0.28)]
                           bg-[rgba(255,209,102,0.1)] text-xl transition-transform group-hover:-rotate-3">
            🎓
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="display-title block text-[1.02rem] font-bold leading-tight text-gradient-btn">
              ก.พ. สื่อการเรียน
            </span>
            <span className="hidden text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[rgba(248,239,216,0.48)] sm:block">
              Exam Visualization
            </span>
          </span>
        </button>

        <div className="flex max-w-[calc(100vw-84px)] gap-1 overflow-x-auto rounded-lg border border-[rgba(248,239,216,0.1)]
                        bg-[rgba(248,239,216,0.035)] p-1 sm:max-w-none">
          {links.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => handleNav(path)}
              disabled={isUnavailable(path)}
              className={`nav-button whitespace-nowrap border-none bg-transparent ${isUnavailable(path) ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'} ${isActive(path) ? 'is-active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
