import { useNavigate, useParams } from 'react-router-dom';
import { TOPICS } from '../../data/topics';
import Visualization from './Visualization';

export default function LessonDetail() {
  const { topicId, idx } = useParams<{ topicId: string; idx: string }>();
  const navigate = useNavigate();
  const topic = topicId ? TOPICS[topicId] : null;
  const i = Number(idx ?? 0);
  const lesson = topic?.lessons[i];

  if (!topic || !lesson) { navigate('/'); return null; }

  const lessons = topic.lessons;

  return (
    <main className="max-w-[860px] mx-auto px-4 py-8 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="text-[2.8rem]">{lesson.ico}</div>
        <div>
          <div className="text-[.74rem] text-white/55">{lesson.sub}</div>
          <div className="text-[1.45rem] font-bold">{lesson.tt}</div>
        </div>
      </div>

      {/* Visualization */}
      <Visualization lesson={lesson} />

      {/* Definition */}
      <div className="bg-white/[0.07] border border-white/[0.12] rounded-2xl p-5 mb-3">
        <h3 className="text-[.97rem] font-bold mb-2.5 flex items-center gap-1.5">📖 นิยาม</h3>
        <p className="text-[.88rem] leading-[1.75]" dangerouslySetInnerHTML={{ __html: lesson.def }} />

        {/* Plain-language rule — the core takeaway */}
        <div className="bg-ac1/10 border border-ac1/30 rounded-xl px-4 py-3 mt-3 text-center">
          <div className="text-[.68rem] font-bold text-ac1 uppercase tracking-widest mb-1">กฎง่ายๆ</div>
          <div className="text-[.97rem] font-bold">{lesson.rule}</div>
        </div>

        {/* Formula — secondary, with explicit "when to use" context */}
        <div className="mt-3">
          <div className="text-[.72rem] text-white/45 mb-1.5">
            🔢 สูตร — ใช้เมื่อโจทย์ถามว่า <em>"พจน์ที่ 50 คืออะไร?"</em> (ไม่ต้องนับทีละขั้น)
          </div>
          <div className="bg-pri/10 border border-pri/25 rounded-[9px] px-4 py-2.5 text-[.9rem]
                          font-semibold text-[#c3b1ff] text-center"
               dangerouslySetInnerHTML={{ __html: lesson.fm }} />
        </div>
      </div>

      {/* Tip */}
      <div className="bg-gradient-to-br from-ac2/10 to-[rgba(255,140,0,.06)] border border-ac2/22
                      rounded-xl px-4 py-3.5 mb-3">
        <div className="flex items-center gap-1.5 text-[.77rem] font-bold text-ac2 uppercase
                        tracking-wide mb-1.5">
          🔮 เทคนิคลับ
        </div>
        <p className="text-[.87rem] leading-[1.75]" dangerouslySetInnerHTML={{ __html: lesson.tip }} />
      </div>

      {/* Examples */}
      <div className="bg-white/[0.07] border border-white/[0.12] rounded-2xl p-5 mb-3">
        <h3 className="text-[.97rem] font-bold mb-2.5">📝 ตัวอย่างพร้อมวิธีทำ</h3>
        {lesson.exs.map((ex, ei) => (
          <div key={ei} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-2">
            <div className="text-[.72rem] font-bold text-white/55 uppercase tracking-wide mb-1.5">
              ตัวอย่าง
            </div>
            <div className="text-[.86rem] mb-1.5">{ex.q}</div>
            <div className="flex flex-wrap gap-1.5 items-center my-1.5">
              {ex.seq.map((v, j) => (
                <span key={j} className="flex items-center gap-1">
                  {j > 0 && <span className="text-white/22">›</span>}
                  {ex.ops?.[j] && <span className="text-ac2 text-[.75rem] font-bold">{ex.ops[j]}</span>}
                  <span className={`rounded-lg px-2.5 py-1 text-[.93rem] font-semibold
                    ${v === '?' ? 'bg-ac1/20 border border-ac1 text-ac1' : 'bg-white/[0.07]'}`}>
                    {v === '?' ? ex.ans : v}
                  </span>
                </span>
              ))}
            </div>
            <div className="mt-2">
              {ex.steps.map((s, si) => (
                <div key={si} className="text-[.84rem] leading-[1.65] text-white/82 py-1
                                         border-b border-white/[0.05] last:border-none"
                     dangerouslySetInnerHTML={{ __html: s }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Nav buttons */}
      <div className="flex justify-between gap-2.5 mt-6 flex-wrap">
        {i > 0
          ? <button onClick={() => navigate(`/topic/${topicId}/lessons/${i - 1}`)}
                    className="bg-white/[0.06] border border-white/[0.13] text-white font-sarabun
                               text-[.86rem] font-semibold px-5 py-2.5 rounded-xl cursor-pointer
                               transition-all hover:bg-white/[0.12]">
              ← {lessons[i - 1].tt}
            </button>
          : <button onClick={() => navigate(`/topic/${topicId}/lessons`)}
                    className="bg-white/[0.06] border border-white/[0.13] text-white font-sarabun
                               text-[.86rem] font-semibold px-5 py-2.5 rounded-xl cursor-pointer
                               transition-all hover:bg-white/[0.12]">
              ← รายการบทเรียน
            </button>
        }
        {i < lessons.length - 1
          ? <button onClick={() => navigate(`/topic/${topicId}/lessons/${i + 1}`)}
                    className="bg-gradient-to-br from-pri to-sec border-none text-white font-sarabun
                               text-[.86rem] font-semibold px-5 py-2.5 rounded-xl cursor-pointer
                               transition-all shadow-[0_4px_16px_rgba(108,99,255,.3)]
                               hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(108,99,255,.5)]">
              {lessons[i + 1].tt} →
            </button>
          : <button onClick={() => navigate(`/topic/${topicId}/practice`)}
                    className="bg-gradient-to-br from-pri to-sec border-none text-white font-sarabun
                               text-[.86rem] font-semibold px-5 py-2.5 rounded-xl cursor-pointer
                               transition-all shadow-[0_4px_16px_rgba(108,99,255,.3)]
                               hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(108,99,255,.5)]">
              ✏️ ฝึกโจทย์ →
            </button>
        }
      </div>
    </main>
  );
}
