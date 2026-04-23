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
  const colors = ['#FFD166', '#FF6B5A', '#43B89C', '#F8EFD8', '#7A6CFF'];
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
  const p = total > 0 ? correct / total : 0;
  const percent = Math.round(p * 100);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  let grade: string, em: string, msg: string, gradient: string;
  if (p === 1)    { grade = 'S'; em = '🏆'; msg = 'เต็ม 100! คุณพร้อมสอบ ก.พ. จริงแล้ว 🏆'; gradient = 'linear-gradient(135deg, #FFD166, #FF9F6E)'; }
  else if (p >= .8) { grade = 'A'; em = '🌟'; msg = 'เกือบสมบูรณ์แบบ! ทำซ้ำเพื่อให้แม่นยิ่งขึ้น 🌟'; gradient = 'linear-gradient(135deg, #FFD166, #43B89C)'; }
  else if (p >= .6) { grade = 'B'; em = '💪'; msg = 'ผ่านดี! ลองกลับทบทวนบทที่ตอบผิด แล้วสอบอีกรอบ 💪'; gradient = 'linear-gradient(135deg, #43B89C, #7A6CFF)'; }
  else              { grade = 'C'; em = '📚'; msg = 'ยังพัฒนาได้ — กลับเรียนบทเรียนให้ครบก่อนสอบอีกครั้ง 📚'; gradient = 'linear-gradient(135deg, #FF6B5A, #FFD166)'; }

  return (
    <main className="page-shell-narrow">
      <section className="exam-panel-warm overflow-hidden p-5 text-center animate-fade-in md:p-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-lg border border-[rgba(255,209,102,0.28)]
                        bg-[rgba(255,209,102,0.1)] text-5xl">
          {em}
        </div>

        <div className="section-kicker mt-5 justify-center">คะแนนของคุณ</div>
        <div className="display-title mx-auto mt-3 text-[4.6rem] font-bold leading-none md:text-[5.4rem]"
             style={{ background: gradient, WebkitBackgroundClip: 'text', color: 'transparent' }}>
          {correct}
          <span className="text-[1.35rem] text-[rgba(248,239,216,0.42)]"> / {total}</span>
        </div>

        <div className="mt-3 flex justify-center">
          <span className="exam-badge border-[rgba(255,209,102,0.28)] text-[var(--gold)]">
            ระดับ {grade} · {percent}%
          </span>
        </div>

        <div className="mx-auto mt-6 grid max-w-[620px] grid-cols-3 gap-2.5">
          {[
            { val: correct, label: '✅ ถูก', cls: 'text-ok' },
            { val: wrong, label: '✕ ผิด', cls: 'text-err' },
            { val: fmt(elapsed), label: '⏱ เวลา', cls: 'text-[var(--gold)]' },
          ].map(({ val, label, cls }) => (
            <div key={label} className="stat-tile min-h-0 py-3">
              <span className={`stat-value text-[1.55rem] ${cls}`}>{val}</span>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-[560px] text-[.96rem] leading-[1.75] text-[rgba(248,239,216,0.82)]">{msg}</p>

        <div className="mt-6 flex gap-2.5 justify-center flex-wrap">
          <button onClick={() => navigate(`/topic/${topicId}/exam`)}
                  className="primary-action border-none cursor-pointer">
            🔄 ทำใหม่
          </button>
          <button onClick={() => navigate(`/topic/${topicId}/lessons`)}
                  className="ghost-action cursor-pointer">
            📚 กลับเรียน
          </button>
        </div>
      </section>
    </main>
  );
}
