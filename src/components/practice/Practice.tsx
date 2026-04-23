import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TOPICS } from '../../data/topics';

export default function Practice() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const topic = topicId ? TOPICS[topicId] : null;
  const [shown, setShown] = useState<Record<string, boolean>>({});

  if (!topic) { navigate('/'); return null; }

  if (topic.practice.length === 0) {
    return (
      <main className="page-shell-narrow">
        <button onClick={() => navigate(`/topic/${topicId}`)}
                className="ghost-action mb-4 cursor-pointer bg-transparent">
          ← {topic.title}
        </button>

        <section className="exam-panel p-6 text-center">
          <div className="section-kicker">Practice bay</div>
          <h2 className="display-title mt-2 text-3xl font-bold">ยังไม่มีชุดฝึกเฉพาะในหมวดนี้</h2>
          <p className="muted-copy mt-3 text-[0.92rem] leading-[1.8]">
            หมวดนี้เน้นเรียนผ่านบทเรียนเชิงโต้ตอบก่อน สามารถกลับไปที่บทเรียนเพื่อใช้เครื่องมือหลักของหมวดนี้ได้เลย
          </p>
          <div className="mt-5 flex justify-center">
            <button onClick={() => navigate(`/topic/${topicId}/lessons`)}
                    className="primary-action border-none cursor-pointer">
              เปิดบทเรียน →
            </button>
          </div>
        </section>
      </main>
    );
  }

  function toggle(key: string) {
    setShown((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <main className="page-shell-narrow">
      <button onClick={() => navigate(`/topic/${topicId}`)}
              className="ghost-action mb-4 cursor-pointer bg-transparent">
        ← {topic.title}
      </button>

      <header className="exam-panel mb-4 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="section-kicker">Practice bay</div>
            <h2 className="display-title mt-1 text-3xl font-bold">✏️ ฝึกโจทย์</h2>
            <p className="muted-copy mt-2 text-[.9rem]">ลองทำด้วยตัวเองก่อน — ถ้าต้องการความช่วยเหลือ กด "คำใบ้" หรือ "ดูเฉลย"</p>
          </div>
          <div className="exam-badge">{topic.practice.length} โจทย์</div>
        </div>
      </header>

      {topic.practice.map((p, i) => (
        <article key={i} className="exam-panel mb-3.5 p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="section-kicker">โจทย์ที่ {String(i + 1).padStart(2, '0')}</div>
            {(shown[`h${i}`] || shown[`s${i}`]) && <span className="exam-badge text-[0.66rem]">เปิดแล้ว</span>}
          </div>
          {p.tableHtml && (
            <div className="content-table mb-3 overflow-hidden border border-[rgba(248,239,216,0.1)] bg-[rgba(248,239,216,0.03)] px-3 pt-2.5 pb-1"
                 dangerouslySetInnerHTML={{ __html: p.tableHtml }} />
          )}
          <div className="text-[.98rem] font-semibold mb-3 leading-relaxed whitespace-pre-wrap">{p.q}</div>

          <div className="flex flex-wrap gap-1.5 items-center mb-4">
            {p.seq.map((v, j) => (
              <span key={j} className="flex items-center gap-1">
                {j > 0 && <span className="text-[rgba(248,239,216,0.28)]">›</span>}
                <span className={`seq-token ${v === '?' ? 'is-blank' : ''}`}>
                  {v}
                </span>
              </span>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap">
            <button onClick={() => toggle(`h${i}`)}
                    className="ghost-action cursor-pointer border-[rgba(255,209,102,0.26)] text-[var(--gold)]">
              💡 คำใบ้
            </button>
            <button onClick={() => toggle(`s${i}`)}
                    className="ghost-action cursor-pointer border-[rgba(67,184,156,0.26)] text-[var(--mint)]">
              🔍 ดูเฉลย
            </button>
          </div>

          {shown[`h${i}`] && (
            <div className="animate-fade-in mt-3 border-l-4 border-[rgba(255,209,102,0.78)] bg-[rgba(255,209,102,0.075)] px-4 py-3 text-[.85rem] leading-[1.75]">
              💡 {p.hint}
            </div>
          )}

          {shown[`s${i}`] && (
            <div className="animate-fade-in mt-3 border-l-4 border-[rgba(67,184,156,0.78)] bg-[rgba(67,184,156,0.075)] px-4 py-3 text-[.85rem] leading-[1.75]">
              ✅ <span dangerouslySetInnerHTML={{ __html: p.sol }} />
            </div>
          )}
        </article>
      ))}
    </main>
  );
}
