import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

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

  function handleNav(path: string) {
    if (path === '/') { navigate('/'); return; }
    if (!currentTopic) { navigate('/'); return; }
    navigate(`/topic/${currentTopic}/${path}`);
  }

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/';
    return location.pathname.endsWith(`/${path}`);
  }

  return (
    <nav className="sticky top-0 z-50 bg-[rgba(15,12,41,0.93)] backdrop-blur-xl
                    border-b border-white/[0.12] px-4 flex items-center
                    justify-between h-14">
      <button
        onClick={() => navigate('/')}
        className="text-base font-bold text-gradient-btn bg-none border-none cursor-pointer"
      >
        🎓 ก.พ. สื่อการเรียน
      </button>

      <div className="flex gap-0.5">
        {links.map(({ label, path }) => (
          <button
            key={path}
            onClick={() => handleNav(path)}
            className={`border-none font-sarabun text-[.82rem] px-[11px] py-[7px] rounded-lg
                        cursor-pointer transition-all duration-200
                        ${isActive(path)
                          ? 'bg-pri/20 text-[#c3b1ff] font-semibold'
                          : 'bg-transparent text-white/55 hover:bg-white/[0.07] hover:text-white'
                        }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
