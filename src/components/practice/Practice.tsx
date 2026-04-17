import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TOPICS } from '../../data/topics';

export default function Practice() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const topic = topicId ? TOPICS[topicId] : null;
  const [shown, setShown] = useState<Record<string, boolean>>({});

  if (!topic) { navigate('/'); return null; }

  function toggle(key: string) {
    setShown((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <main className="max-w-[860px] mx-auto px-4 py-8 pb-16 animate-fade-in">
      <button onClick={() => navigate(`/topic/${topicId}`)}
              className="text-white/55 text-[.82rem] cursor-pointer mb-1 hover:text-white
                         transition-colors flex items-center gap-1.5 bg-transparent border-none">
        ← {topic.title}
      </button>

      <div className="mb-5 mt-1">
        <h2 className="text-2xl font-bold mb-1">✏️ ฝึกโจทย์</h2>
        <p className="text-[.88rem] text-white/55">ลองทำด้วยตัวเองก่อน — ถ้าต้องการความช่วยเหลือ กด "คำใบ้" หรือ "ดูเฉลย"</p>
      </div>

      {topic.practice.map((p, i) => (
        <div key={i} className="bg-white/[0.07] border border-white/[0.12] rounded-[17px] p-5 mb-3.5">
          <div className="text-[.75rem] text-white/55 mb-1">โจทย์ที่ {i + 1}</div>
          {p.tableHtml && (
            <div className="mb-2.5 rounded-xl overflow-hidden border border-white/[0.1] bg-white/[0.03] px-3 pt-2.5 pb-1"
                 dangerouslySetInnerHTML={{ __html: p.tableHtml }} />
          )}
          <div className="text-[.97rem] font-medium mb-2.5 leading-snug whitespace-pre-wrap">{p.q}</div>

          {/* Sequence */}
          <div className="flex flex-wrap gap-1.5 items-center mb-3.5">
            {p.seq.map((v, j) => (
              <span key={j} className="flex items-center gap-1">
                {j > 0 && <span className="text-white/22">›</span>}
                <span className={`rounded-lg px-3 py-1.5 text-[.93rem] font-semibold
                  ${v === '?' ? 'border-2 border-dashed border-white/26 bg-white/[0.03] text-white/30'
                              : 'bg-white/[0.08] border border-white/[0.13]'}`}>
                  {v}
                </span>
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-1.5 flex-wrap">
            <button onClick={() => toggle(`h${i}`)}
                    className="px-4 py-1.5 rounded-lg font-sarabun text-[.81rem] font-semibold cursor-pointer
                               transition-all border bg-ac2/10 border-ac2/26 text-ac2 hover:bg-ac2/20">
              💡 คำใบ้
            </button>
            <button onClick={() => toggle(`s${i}`)}
                    className="px-4 py-1.5 rounded-lg font-sarabun text-[.81rem] font-semibold cursor-pointer
                               transition-all border bg-pri/14 border-pri/28 text-[#c3b1ff] hover:bg-pri/26">
              🔍 ดูเฉลย
            </button>
          </div>

          {/* Hint */}
          {shown[`h${i}`] && (
            <div className="animate-fade-in mt-2.5 rounded-[9px] px-4 py-3 text-[.84rem] leading-[1.7]
                            bg-ac2/[0.07] border border-ac2/17">
              💡 {p.hint}
            </div>
          )}

          {/* Solution */}
          {shown[`s${i}`] && (
            <div className="animate-fade-in mt-2 rounded-[9px] px-4 py-3 text-[.84rem] leading-[1.7]
                            bg-ac1/[0.07] border border-ac1/20">
              ✅ <span dangerouslySetInnerHTML={{ __html: p.sol }} />
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
