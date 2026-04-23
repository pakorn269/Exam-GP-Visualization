import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/topics';

const modes = [
  { ico: '📚', label: 'บทเรียน',  path: 'lessons',  color: '#FFD166', tag: 'แนะนำเริ่มต้น' },
  { ico: '✏️', label: 'ฝึกโจทย์', path: 'practice', color: '#43B89C', tag: 'มีคำใบ้ + เฉลย' },
  { ico: '🎯', label: 'จำลองสอบ', path: 'exam',     color: '#FF6B5A', tag: 'เหมาะหลังเรียนครบ' },
];

const vocabTrainerCategories = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'work', label: 'การทำงาน' },
  { id: 'change', label: 'การเปลี่ยนแปลง' },
  { id: 'desc', label: 'คุณลักษณะ' },
  { id: 'think', label: 'การคิด' },
] as const;

export default function TopicHub() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { setCurrentTopic } = useApp();

  const topic = topicId ? TOPICS[topicId] : null;
  const featuredLessons = topic?.lessons
    .map((lesson, index) => ({ lesson, index }))
    .filter(({ lesson }) => lesson.template);
  const vocabTrainerEntry = topic?.lessons
    .map((lesson, index) => ({ lesson, index }))
    .find(({ lesson }) => lesson.template === 'vocab_trainer');
  const stats = topic
    ? [
        { label: 'บทเรียน', count: topic.lessons.length },
        { label: 'ฝึกโจทย์', count: topic.practice.length },
        { label: 'ข้อสอบ', count: topic.exam.length },
      ].filter((item) => item.count > 0)
    : [];
  const availableModes = topic
    ? modes.filter((mode) => topic[mode.path as 'lessons' | 'practice' | 'exam'].length > 0)
    : [];

  useEffect(() => {
    if (topicId && TOPICS[topicId]) setCurrentTopic(topicId);
    else navigate('/');
  }, [topicId, navigate, setCurrentTopic]);

  if (!topic) return null;

  return (
    <main className="page-shell-narrow">
      <button
        onClick={() => navigate('/')}
        className="ghost-action mb-4 cursor-pointer bg-transparent"
      >
        ← เลือกหมวดวิชา
      </button>

      <section
        className="exam-panel-warm relative overflow-hidden p-5 md:p-7"
        style={{ '--accent': topic.color } as React.CSSProperties}
      >
        <div className="absolute right-4 top-4 hidden h-28 w-28 rotate-12 border border-[color-mix(in_srgb,var(--accent)_32%,transparent)] md:block" />
        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
          <div className="topic-glyph text-4xl md:h-20 md:w-20 md:text-5xl">{topic.ico}</div>
          <div>
            <div className="section-kicker">{topic.subtitle}</div>
            <h1 className="display-title mt-2 text-[2.2rem] font-bold leading-tight text-gradient-hero md:text-[3.3rem]">
              {topic.title}
            </h1>
            <p className="muted-copy mt-3 max-w-[620px] text-[0.98rem] leading-[1.8]">
              {topic.desc}
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max(stats.length, 1)}, minmax(0, 1fr))` }}>
          {stats.map((item) => (
            <div key={item.label} className="stat-tile">
              <span className="stat-value">{item.count}</span>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
        {availableModes.map((m) => {
          const count = topic[m.path as 'lessons' | 'practice' | 'exam'].length;
          const desc = m.path === 'lessons'
            ? `${count} บทเรียน พร้อม Animation อธิบายทีละขั้นตอน`
            : m.path === 'practice'
            ? `${count} โจทย์ตัวอย่าง มีคำใบ้ + เฉลยละเอียด`
            : `${count} ข้อ · จับเวลา · ทำเหมือนสอบจริง`;

          return (
            <button
              key={m.path}
              onClick={() => navigate(`/topic/${topicId}/${m.path}`)}
              style={{ '--accent': m.color } as React.CSSProperties}
              className="exam-card min-h-[210px] cursor-pointer p-5 text-left"
            >
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="mode-icon">{m.ico}</div>
                  <span className="display-title text-[0.78rem] font-bold text-[color-mix(in_srgb,var(--accent)_88%,white)]">
                    {String(count).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-4 text-lg font-bold">{m.label}</div>
                <p className="muted-copy mt-2 text-[0.84rem] leading-relaxed">{desc}</p>
                <div className="mt-auto pt-5">
                  <span className="exam-badge border-[color-mix(in_srgb,var(--accent)_34%,transparent)] text-[0.66rem]">
                    {m.tag}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      {featuredLessons && featuredLessons.length > 0 && (
        <section className="mt-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="section-kicker">Quick Access</div>
              <h2 className="display-title mt-1 text-2xl font-bold">เครื่องมือเรียนแบบอินเทอร์แอ็กทีฟ</h2>
            </div>
            <div className="exam-badge">เปิดตรงได้เลย</div>
          </div>

          <div className="grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {featuredLessons.map(({ lesson, index }) => (
              <button
                key={lesson.id}
                onClick={() => navigate(`/topic/${topicId}/lessons/${index}`)}
                style={{ '--accent': topic.color } as React.CSSProperties}
                className="exam-card min-h-[200px] cursor-pointer p-5 text-left"
              >
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="mode-icon">{lesson.ico}</div>
                    <span className="exam-badge border-[rgba(122,184,255,0.28)] bg-[rgba(122,184,255,0.08)] text-[0.66rem]">
                      {lesson.template === 'vocab_trainer' ? 'Trainer' : 'Masterclass'}
                    </span>
                  </div>
                  <div className="mt-4 text-lg font-bold">{lesson.tt}</div>
                  <p className="muted-copy mt-2 text-[0.84rem] leading-relaxed">{lesson.desc}</p>
                  <div className="mt-auto pt-5">
                    <span className="exam-badge border-[color-mix(in_srgb,var(--accent)_34%,transparent)] text-[0.66rem]">
                      {lesson.template === 'vocab_trainer' ? 'เลือกหมวดศัพท์ได้ในแท็บแฟลชการ์ด' : 'สรุปใหญ่ก่อนลุยบทแยก'}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {vocabTrainerEntry && (
        <section className="mt-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="section-kicker">Category Jump</div>
              <h2 className="display-title mt-1 text-2xl font-bold">เลือกหมวดศัพท์แล้วเข้า Trainer ตรง ๆ</h2>
            </div>
            <div className="exam-badge">Vocabulary Trainer</div>
          </div>

          <div className="exam-panel p-5">
            <div className="flex flex-wrap gap-2.5">
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
            <p className="muted-copy mt-3 text-[0.84rem] leading-[1.75]">
              กดหมวดที่ต้องการ ระบบจะเปิด `Vocabulary Trainer` พร้อมกรองคำศัพท์ให้เลยในแท็บแฟลชการ์ด
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
