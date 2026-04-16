import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TOPICS } from '../../data/topics';

interface ResultState {
  correct: number;
  wrong: number;
  total: number;
  elapsed: number;
}

function confetti() {
  const colors = ['#6C63FF', '#FF6584', '#43B89C', '#FFD700', '#FF8C00'];
  for (let i = 0; i < 70; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'cf';
      el.style.cssText = [
        `left:${Math.random() * 100}vw`,
        `background:${colors[i % 5]}`,
        `width:${Math.random() * 9 + 5}px`,
        `height:${Math.random() * 9 + 5}px`,
        `border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`,
        `animation-duration:${Math.random() * 2 + 2}s`,
      ].join(';');
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }, i * 40);
  }
}

export default function Result() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const topic = topicId ? TOPICS[topicId] : null;
  const state = location.state as ResultState | null;

  useEffect(() => {
    if (!state || !topic) { navigate('/'); return; }
    if (state.correct === state.total) confetti();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!topic || !state) return null;

  const { correct, wrong, total, elapsed } = state;
  const p = correct / total;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  let grade: string, em: string, msg: string, scoreColor: string;
  if (p === 1)    { grade = 'S'; em = '🏆'; msg = 'เต็ม 100! คุณพร้อมสอบ ก.พ. จริงแล้ว 🏆';               scoreColor = 'from-[#FFD700] to-[#FF8C00]'; }
  else if (p >= .8) { grade = 'A'; em = '🌟'; msg = 'เกือบสมบูรณ์แบบ! ทำซ้ำเพื่อให้แม่นยิ่งขึ้น 🌟';     scoreColor = 'from-pri to-[#8A2BE2]'; }
  else if (p >= .6) { grade = 'B'; em = '💪'; msg = 'ผ่านดี! ลองกลับทบทวนบทที่ตอบผิด แล้วสอบอีกรอบ 💪'; scoreColor = 'from-ac1 to-[#2196F3]'; }
  else              { grade = 'C'; em = '📚'; msg = 'ยังพัฒนาได้ — กลับเรียนบทเรียนให้ครบก่อนสอบอีกครั้ง 📚'; scoreColor = 'from-sec to-[#FF4B2B]'; }

  const badgeCls = p >= .8 ? 'bg-ac2/12 border-ac2/28 text-ac2'
                 : p >= .6 ? 'bg-ac1/15 border-ac1/30 text-ac1'
                           : 'bg-pri/20 border-pri/40 text-[#c3b1ff]';

  return (
    <main className="max-w-[860px] mx-auto px-4 py-8 pb-16">
      <div className="bg-white/[0.07] border border-white/[0.12] rounded-[22px] px-6 py-11
                      text-center animate-fade-in">
        <div className="text-[3.5rem] mb-3">{em}</div>
        <div className="text-[.85rem] text-white/55 mb-1">คะแนนของคุณ</div>

        {/* Score */}
        <div className={`text-[4.2rem] font-bold leading-none bg-gradient-to-br ${scoreColor}
                         bg-clip-text text-transparent`}>
          {correct}
          <span className="text-[1.4rem] text-white/35"> / {total}</span>
        </div>

        <div className="mt-3 mb-5">
          <span className={`inline-block rounded-full px-3.5 py-1 text-[.75rem] font-bold tracking-wide
                            uppercase border ${badgeCls}`}>
            ระดับ {grade}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            { val: correct, label: '✅ ถูก',  cls: 'text-ok' },
            { val: wrong,   label: '❌ ผิด',  cls: 'text-err' },
            { val: fmt(elapsed), label: '⏱ เวลา', cls: 'text-[#c3b1ff]' },
          ].map(({ val, label, cls }) => (
            <div key={label} className="bg-white/[0.05] border border-white/[0.08] rounded-xl py-3 px-2">
              <span className={`text-[1.65rem] font-bold block ${cls}`}>{val}</span>
              <div className="text-[.73rem] text-white/55">{label}</div>
            </div>
          ))}
        </div>

        <div className="text-[.93rem] leading-[1.65] text-white/80 mb-5">{msg}</div>

        <div className="flex gap-2.5 justify-center flex-wrap">
          <button onClick={() => navigate(`/topic/${topicId}/exam`)}
                  className="px-8 py-3 bg-gradient-to-br from-pri to-sec border-none rounded-full
                             text-white font-sarabun text-[.9rem] font-semibold cursor-pointer
                             transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(108,99,255,.5)]">
            🔄 ทำใหม่
          </button>
          <button onClick={() => navigate(`/topic/${topicId}/lessons`)}
                  className="px-5 py-3 bg-white/[0.06] border border-white/[0.13] text-white
                             font-sarabun text-[.86rem] font-semibold rounded-xl cursor-pointer
                             transition-all hover:bg-white/[0.12]">
            📚 กลับเรียน
          </button>
        </div>
      </div>
    </main>
  );
}
