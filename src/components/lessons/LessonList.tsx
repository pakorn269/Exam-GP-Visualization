import { useNavigate, useParams } from 'react-router-dom';
import { TOPICS } from '../../data/topics';

export default function LessonList() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const topic = topicId ? TOPICS[topicId] : null;

  if (!topic) { navigate('/'); return null; }

  return (
    <main className="max-w-[860px] mx-auto px-4 py-8 pb-16 animate-fade-in">
      <button onClick={() => navigate(`/topic/${topicId}`)}
              className="text-white/55 text-[.82rem] cursor-pointer mb-1 hover:text-white
                         transition-colors flex items-center gap-1.5 bg-transparent border-none">
        ← {topic.title}
      </button>

      <div className="mb-5 mt-1">
        <h2 className="text-2xl font-bold mb-1">📚 บทเรียน</h2>
        <p className="text-[.88rem] text-white/55">เลือกประเภทที่ต้องการเรียน — แนะนำเรียนตามลำดับ</p>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-1">
        {topic.lessons.map((l, i) => (
          <button
            key={l.id}
            onClick={() => navigate(`/topic/${topicId}/lessons/${i}`)}
            className="bg-white/[0.07] border border-white/[0.12] border-l-4 border-l-transparent
                       rounded-[18px] p-5 cursor-pointer transition-all duration-[.25s] text-left
                       hover:translate-x-1 hover:border-l-pri hover:shadow-[0_8px_26px_rgba(0,0,0,.25)]"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[1.9rem]">{l.ico}</span>
              <div>
                <div className="text-[.98rem] font-bold">{l.tt}</div>
                <div className="text-[.72rem] text-white/55">{l.sub}</div>
              </div>
            </div>
            <div className="text-[.84rem] text-white/75 leading-relaxed mb-2"
                 dangerouslySetInnerHTML={{ __html: l.desc }} />
            <div className="flex gap-1">
              {[1, 2, 3].map((d) => (
                <div key={d}
                     className={`w-2 h-2 rounded-full ${d <= l.diff ? 'bg-ac2' : 'bg-white/15'}`} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
