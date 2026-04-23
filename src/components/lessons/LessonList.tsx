import { useNavigate, useParams } from 'react-router-dom';
import { TOPICS } from '../../data/topics';

const vocabTrainerCategories = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'work', label: 'การทำงาน' },
  { id: 'change', label: 'การเปลี่ยนแปลง' },
  { id: 'desc', label: 'คุณลักษณะ' },
  { id: 'think', label: 'การคิด' },
] as const;

export default function LessonList() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const topic = topicId ? TOPICS[topicId] : null;
  const vocabTrainerEntry = topic?.lessons
    .map((lesson, index) => ({ lesson, index }))
    .find(({ lesson }) => lesson.template === 'vocab_trainer');

  if (!topic) { navigate('/'); return null; }

  return (
    <main className="page-shell-narrow">
      <button onClick={() => navigate(`/topic/${topicId}`)}
              className="ghost-action mb-4 cursor-pointer bg-transparent">
        ← {topic.title}
      </button>

      <header className="exam-panel mb-4 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="section-kicker">Lesson sequence</div>
            <h2 className="display-title mt-1 text-3xl font-bold">📚 บทเรียน</h2>
            <p className="muted-copy mt-2 text-[0.92rem]">เลือกประเภทที่ต้องการเรียน — แนะนำเรียนตามลำดับ</p>
          </div>
          <div className="exam-badge">{topic.lessons.length} บท</div>
        </div>
      </header>

      {vocabTrainerEntry && (
        <section className="exam-panel mb-4 p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="section-kicker">Fast Track</div>
              <h3 className="display-title mt-1 text-[1.2rem] font-bold">เปิด Vocabulary Trainer พร้อมหมวดที่อยากลุย</h3>
            </div>
            <div className="exam-badge">Jump in</div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {vocabTrainerCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/topic/${topicId}/lessons/${vocabTrainerEntry.index}?category=${category.id}`)}
                className="ghost-action cursor-pointer"
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {topic.lessons.map((l, i) => (
          <button
            key={l.id}
            onClick={() => navigate(`/topic/${topicId}/lessons/${i}`)}
            style={{ '--accent': topic.color } as React.CSSProperties}
            className="exam-card cursor-pointer p-5 text-left"
          >
            <div className="relative z-10 flex min-h-[172px] flex-col">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="mode-icon">{l.ico}</div>
                <div className="flex flex-col items-end gap-2">
                  <span className="display-title text-[0.78rem] font-bold text-[rgba(255,209,102,0.9)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {l.template && (
                    <span className="exam-badge border-[rgba(122,184,255,0.28)] bg-[rgba(122,184,255,0.08)] text-[0.62rem]">
                      {l.template === 'vocab_trainer' ? 'Interactive Trainer' : 'Interactive Lesson'}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-[1.02rem] font-bold">{l.tt}</div>
                <div className="muted-copy mt-1 text-[.74rem]">{l.sub}</div>
              </div>
              <div className="muted-copy mt-2 text-[.84rem] leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: l.desc }} />
              {l.template === 'vocab_trainer' && (
                <div className="mt-3 rounded-[8px] border border-[rgba(67,184,156,0.2)] bg-[rgba(67,184,156,0.08)] px-3 py-2 text-[0.75rem] font-semibold text-[rgba(248,239,216,0.88)]">
                  เข้าไปแล้วเลือกหมวดได้ทันที: ทั้งหมด / การทำงาน / การเปลี่ยนแปลง / คุณลักษณะ / การคิด
                </div>
              )}
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[rgba(248,239,216,0.48)]">ระดับ</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((d) => (
                    <div key={d}
                         className={`h-2 w-8 rounded-full ${d <= l.diff ? 'bg-[rgba(255,209,102,0.85)]' : 'bg-[rgba(248,239,216,0.14)]'}`} />
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
