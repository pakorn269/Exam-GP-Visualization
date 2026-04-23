import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/topics';

export default function Home() {
  const navigate = useNavigate();
  const { setCurrentTopic } = useApp();
  const topics = Object.values(TOPICS);
  const lessonTotal = topics.reduce((sum, t) => sum + t.lessons.length, 0);
  const practiceTotal = topics.reduce((sum, t) => sum + t.practice.length, 0);
  const examTotal = topics.reduce((sum, t) => sum + t.exam.length, 0);

  function select(id: string) {
    setCurrentTopic(id);
    navigate(`/topic/${id}`);
  }

  return (
    <main className="page-shell">
      <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="exam-panel-warm relative overflow-hidden p-6 md:p-8">
          <div className="absolute right-5 top-5 hidden h-24 w-24 rotate-6 border border-[rgba(255,209,102,0.2)] md:block" />
          <div className="section-kicker">ก.พ. ป.ตรี · Exam desk</div>
          <h1 className="display-title mt-4 max-w-[680px] text-[2.45rem] font-bold leading-[1.05] text-gradient-hero md:text-[4rem]">
            สื่อการเรียนรู้ ก.พ.
          </h1>
          <p className="muted-copy mt-4 max-w-[560px] text-[1rem] leading-[1.85]">
            เลือกหมวดวิชาแล้วเข้าห้องเรียนแบบมีภาพจำ ฝึกโจทย์แบบเปิดเฉลย และปิดท้ายด้วยสนามสอบจับเวลาในเส้นทางเดียว
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="primary-action border-none cursor-pointer" onClick={() => select(topics[0].id)}>
              เริ่มจากหมวดแรก
            </button>
            <button className="ghost-action cursor-pointer" onClick={() => document.getElementById('topic-grid')?.scrollIntoView({ behavior: 'smooth' })}>
              ดูทุกหมวด
            </button>
          </div>
        </div>

        <aside className="exam-panel p-5">
          <div className="flex items-center justify-between gap-3 border-b border-[rgba(248,239,216,0.12)] pb-4">
            <div>
              <div className="section-kicker">Overview</div>
              <h2 className="display-title mt-1 text-2xl font-bold">แผงสรุปสนามสอบ</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[rgba(67,184,156,0.28)]
                            bg-[rgba(67,184,156,0.12)] text-2xl">
              🧭
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="stat-tile">
              <span className="stat-value">{topics.length}</span>
              <div className="stat-label">หมวดวิชา</div>
            </div>
            <div className="stat-tile">
              <span className="stat-value">{lessonTotal}</span>
              <div className="stat-label">บทเรียน</div>
            </div>
            <div className="stat-tile">
              <span className="stat-value">{practiceTotal}</span>
              <div className="stat-label">โจทย์ฝึก</div>
            </div>
            <div className="stat-tile">
              <span className="stat-value">{examTotal}</span>
              <div className="stat-label">ข้อสอบ</div>
            </div>
          </div>
          <div className="mt-4 grid gap-2 text-[0.82rem] text-[rgba(248,239,216,0.68)]">
            {['อ่านแก่นด้วย visualization', 'ฝึกแบบมีคำใบ้', 'สอบแบบจับเวลา'].map((item, i) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-[rgba(248,239,216,0.1)] bg-[rgba(248,239,216,0.035)] px-3 py-2">
                <span className="display-title text-[rgba(255,209,102,0.9)]">0{i + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section id="topic-grid" className="mt-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="section-kicker">Subject map</div>
            <h2 className="display-title mt-1 text-2xl font-bold">เลือกหมวดที่ต้องการลุย</h2>
          </div>
          <div className="exam-badge">เรียน · ฝึก · สอบ</div>
        </div>

        <div className="grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
          {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => select(t.id)}
            style={{ '--accent': t.color } as React.CSSProperties}
            className="exam-card group cursor-pointer p-4 text-left"
          >
            <div className="relative z-10 flex min-h-[176px] flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="topic-glyph">{t.ico}</div>
                <span className="exam-badge border-[color-mix(in_srgb,var(--accent)_34%,transparent)] text-[0.66rem]">
                  {t.tag}
                </span>
              </div>
              <div className="mt-4">
                <div className="text-[1.05rem] font-bold text-[var(--paper)]">{t.title}</div>
                <div className="muted-copy mt-1 text-[0.82rem] leading-relaxed">{t.desc}</div>
              </div>
              <div className="mt-auto grid grid-cols-3 gap-2 pt-4 text-center text-[0.72rem] text-[rgba(248,239,216,0.62)]">
                <span className="rounded-md bg-[rgba(248,239,216,0.055)] px-2 py-1">{t.lessons.length} บท</span>
                <span className="rounded-md bg-[rgba(248,239,216,0.055)] px-2 py-1">{t.practice.length} ฝึก</span>
                <span className="rounded-md bg-[rgba(248,239,216,0.055)] px-2 py-1">{t.exam.length} สอบ</span>
              </div>
            </div>
          </button>
          ))}
        </div>
      </section>
    </main>
  );
}
