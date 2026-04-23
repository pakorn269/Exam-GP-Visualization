import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { TOPICS } from '../../data/topics';
import Visualization from './Visualization';
import ReadingMasterclass from './ReadingMasterclass';
import VocabTrainer from './VocabTrainer';

export default function LessonDetail() {
  const { topicId, idx } = useParams<{ topicId: string; idx: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topic = topicId ? TOPICS[topicId] : null;
  const i = Number(idx ?? 0);
  const lesson = topic?.lessons[i];

  if (!topic || !lesson) { navigate('/'); return null; }

  const lessons = topic.lessons;
  const isReadingMasterclass = lesson.template === 'reading_masterclass';
  const isVocabTrainer = lesson.template === 'vocab_trainer';
  const preferredCategory = (() => {
    const category = searchParams.get('category');
    return category === 'all' || category === 'work' || category === 'change' || category === 'desc' || category === 'think'
      ? category
      : 'all';
  })();

  return (
    <main className="page-shell-narrow">
      <button onClick={() => navigate(`/topic/${topicId}/lessons`)}
              className="ghost-action mb-4 cursor-pointer bg-transparent">
        ← รายการบทเรียน
      </button>

      <header className="exam-panel mb-4 p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="topic-glyph">{lesson.ico}</div>
          <div className="min-w-0 flex-1">
            <div className="section-kicker">{lesson.sub}</div>
            <h1 className="display-title mt-1 text-3xl font-bold leading-tight">{lesson.tt}</h1>
          </div>
          <div className="exam-badge">{i + 1}/{lessons.length}</div>
        </div>
      </header>

      {isReadingMasterclass ? (
        <ReadingMasterclass />
      ) : isVocabTrainer ? (
        <VocabTrainer preferredCategory={preferredCategory} />
      ) : (
        <>
          <Visualization lesson={lesson} />

          <section className="exam-panel p-5 mb-3">
            <h3 className="display-title text-[1.08rem] font-bold mb-3 flex items-center gap-2">📖 นิยาม</h3>
            <p className="text-[.9rem] leading-[1.85] text-[rgba(248,239,216,0.86)]" dangerouslySetInnerHTML={{ __html: lesson.def }} />

            <div className="mt-4 border-l-4 border-[rgba(67,184,156,0.8)] bg-[rgba(67,184,156,0.08)] px-4 py-3">
              <div className="text-[.68rem] font-bold text-[var(--mint)] uppercase tracking-widest mb-1">กฎง่ายๆ</div>
              <div className="text-[.98rem] font-bold">{lesson.rule}</div>
            </div>

            <div className="mt-4">
              <div className="text-[.72rem] text-[rgba(248,239,216,0.5)] mb-2 flex items-center gap-1.5">
                📌 สูตร / โครงสร้าง / ข้อควรรู้
              </div>
              <div className="border border-[rgba(255,209,102,0.2)] bg-[rgba(255,209,102,0.08)] px-4 py-3 text-[.9rem]
                              font-semibold text-[rgba(255,209,102,0.96)] text-center"
                   dangerouslySetInnerHTML={{ __html: lesson.fm }} />
            </div>
          </section>

          <section className="exam-panel-warm px-4 py-3.5 mb-3">
            <div className="flex items-center gap-1.5 text-[.77rem] font-bold text-[var(--gold)] uppercase
                            tracking-wide mb-1.5">
              🔮 เทคนิคลับ
            </div>
            <p className="text-[.88rem] leading-[1.75]" dangerouslySetInnerHTML={{ __html: lesson.tip }} />
          </section>

          <section className="exam-panel p-5 mb-3">
            <h3 className="display-title text-[1.08rem] font-bold mb-3">📝 ตัวอย่างพร้อมวิธีทำ</h3>
            {lesson.exs.map((ex, ei) => (
              <div key={ei} className="exam-card mb-3 p-4">
                <div className="relative z-10">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="section-kicker">ตัวอย่าง</div>
                    <div className="display-title text-[0.78rem] font-bold text-[rgba(255,209,102,0.86)]">
                      {String(ei + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-[.88rem] mb-2 whitespace-pre-wrap leading-relaxed">{ex.q}</div>
                  {ex.tableHtml && (
                    <div className="content-table overflow-x-auto w-full my-3" dangerouslySetInnerHTML={{ __html: ex.tableHtml }} />
                  )}
                  <div className="flex flex-wrap gap-1.5 items-center my-2">
                    {ex.seq.map((v, j) => (
                      <span key={j} className="flex items-center gap-1">
                        {j > 0 && <span className="text-[rgba(248,239,216,0.28)]">›</span>}
                        {ex.ops?.[j] && <span className="text-[var(--gold)] text-[.75rem] font-bold">{ex.ops[j]}</span>}
                        <span className={`seq-token h-9 min-w-9 text-[.88rem]
                          ${v === '?' ? 'border-[var(--mint)] bg-[rgba(67,184,156,0.12)] text-[var(--mint)]' : ''}`}>
                          {v === '?' ? ex.ans : v}
                        </span>
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    {ex.steps.map((s, si) => (
                      <div key={si} className="text-[.84rem] leading-[1.75] text-[rgba(248,239,216,0.82)] py-1.5
                                               border-b border-[rgba(248,239,216,0.07)] last:border-none"
                           dangerouslySetInnerHTML={{ __html: s }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      <div className="flex justify-between gap-2.5 mt-6 flex-wrap">
        {i > 0
          ? <button onClick={() => navigate(`/topic/${topicId}/lessons/${i - 1}`)}
                    className="ghost-action cursor-pointer">
              ← {lessons[i - 1].tt}
            </button>
          : <button onClick={() => navigate(`/topic/${topicId}/lessons`)}
                    className="ghost-action cursor-pointer">
              ← รายการบทเรียน
            </button>
        }
        {i < lessons.length - 1
          ? <button onClick={() => navigate(`/topic/${topicId}/lessons/${i + 1}`)}
                    className="primary-action border-none cursor-pointer">
              {lessons[i + 1].tt} →
            </button>
          : <button onClick={() => navigate(`/topic/${topicId}/practice`)}
                    className="primary-action border-none cursor-pointer">
              ✏️ ฝึกโจทย์ →
            </button>
        }
      </div>
    </main>
  );
}
