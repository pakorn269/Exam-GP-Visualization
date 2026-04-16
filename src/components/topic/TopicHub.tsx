import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/topics';

const modes = [
  { ico: '📚', label: 'บทเรียน',  path: 'lessons',  color: '#6C63FF', tagColor: 'rgba(108,99,255,.15)', tagBorder: 'rgba(108,99,255,.3)', tagText: '#c3b1ff', tag: 'แนะนำเริ่มต้น' },
  { ico: '✏️', label: 'ฝึกโจทย์', path: 'practice', color: '#43B89C', tagColor: 'rgba(67,184,156,.15)',  tagBorder: 'rgba(67,184,156,.3)',  tagText: '#43B89C', tag: 'มีคำใบ้ + เฉลย' },
  { ico: '🎯', label: 'จำลองสอบ', path: 'exam',     color: '#FF6584', tagColor: 'rgba(255,101,132,.15)', tagBorder: 'rgba(255,101,132,.3)', tagText: '#FF6584', tag: 'เหมาะหลังเรียนครบ' },
];

export default function TopicHub() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { setCurrentTopic } = useApp();

  const topic = topicId ? TOPICS[topicId] : null;

  useEffect(() => {
    if (topicId && TOPICS[topicId]) setCurrentTopic(topicId);
    else navigate('/');
  }, [topicId, navigate, setCurrentTopic]);

  if (!topic) return null;

  return (
    <main className="max-w-[860px] mx-auto px-4 py-8 pb-16 animate-fade-in">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/')}
        className="text-white/55 text-[.82rem] cursor-pointer mb-1 hover:text-white
                   transition-colors flex items-center gap-1.5 bg-transparent border-none"
      >
        ← เลือกหมวดวิชา
      </button>

      {/* Hero */}
      <div className="text-center py-5 pb-6">
        <span className="inline-block rounded-full px-3.5 py-1 text-[.75rem] font-bold tracking-wide uppercase
                         bg-pri/20 border border-pri/40 text-[#c3b1ff]">
          {topic.subtitle}
        </span>
        <h1 className="text-gradient-hero text-[clamp(2rem,6vw,3.2rem)] font-bold leading-tight my-3">
          {topic.ico}<br />{topic.title}
        </h1>
        <p className="text-white/55 text-[.93rem] max-w-[460px] mx-auto mb-8 leading-relaxed">
          {topic.desc}
        </p>
      </div>

      {/* Mode cards */}
      <div className="grid gap-3.5 max-w-[760px] mx-auto"
           style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {modes.map((m) => {
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
              className="bg-white/[0.07] border border-white/[0.12] rounded-[20px] p-6 text-center
                         cursor-pointer transition-all duration-300 relative overflow-hidden group
                         hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,.3)]
                         hover:border-pri/35 text-left"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: `linear-gradient(135deg,${m.color}1a,transparent)` }} />
              <div className="text-[2.6rem] mb-2.5">{m.ico}</div>
              <div className="text-base font-bold mb-1 text-white">{m.label}</div>
              <div className="text-[.8rem] text-white/55 leading-relaxed">{desc}</div>
              <div className="inline-block mt-3 px-2.5 py-0.5 text-[.7rem] rounded-full font-bold"
                   style={{ background: m.tagColor, border: `1px solid ${m.tagBorder}`, color: m.tagText }}>
                {m.tag}
              </div>
            </button>
          );
        })}
      </div>
    </main>
  );
}
