import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/topics';

export default function Home() {
  const navigate = useNavigate();
  const { setCurrentTopic } = useApp();

  function select(id: string) {
    setCurrentTopic(id);
    navigate(`/topic/${id}`);
  }

  return (
    <main className="max-w-[860px] mx-auto px-4 py-8 pb-16">
      {/* Hero */}
      <div className="text-center py-9 pb-7">
        <span className="inline-block rounded-full px-3.5 py-1 text-[.75rem] font-bold tracking-wide uppercase
                         bg-pri/20 border border-pri/40 text-[#c3b1ff]">
          ก.พ. ป.ตรี
        </span>
        <h1 className="text-gradient-hero text-[clamp(2rem,6vw,3.2rem)] font-bold leading-tight my-3">
          สื่อการเรียนรู้ ก.พ.
        </h1>
        <p className="text-white/55 text-[.93rem] max-w-[460px] mx-auto mb-8 leading-relaxed">
          เลือกหมวดวิชาที่ต้องการ — เรียน · ฝึก · สอบ ครบในที่เดียว
        </p>
      </div>

      {/* Topic cards */}
      <div className="grid gap-3.5 max-w-[760px] mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {Object.values(TOPICS).map((t) => (
          <button
            key={t.id}
            onClick={() => select(t.id)}
            className="bg-white/[0.07] border border-white/[0.12] rounded-[20px] p-6 text-center
                       cursor-pointer transition-all duration-300 relative overflow-hidden group
                       hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,.3)]
                       hover:border-pri/35 text-left"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(135deg,${t.color}1a,transparent)` }} />
            <div className="text-[2.6rem] mb-2.5">{t.ico}</div>
            <div className="text-base font-bold mb-1 text-white">{t.title}</div>
            <div className="text-[.8rem] text-white/55 leading-relaxed">{t.desc}</div>
            <div className="inline-block mt-3 px-2.5 py-0.5 text-[.7rem] rounded-full font-bold"
              style={parseStyle(t.tagStyle)}>
              {t.tag}
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}

/** Convert "key:val;key:val" string to React CSSProperties */
function parseStyle(s: string): React.CSSProperties {
  return Object.fromEntries(
    s.split(';').filter(Boolean).map((pair) => {
      const [k, ...v] = pair.split(':');
      const key = k.trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      return [key, v.join(':').trim()];
    }),
  );
}
