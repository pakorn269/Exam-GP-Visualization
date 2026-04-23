import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TOPICS } from '../../data/topics';
import type { ExamQuestion } from '../../types';

interface QState {
  shuffled: (number | string)[];
  answered: boolean;
  selected: string | null;
}

const LETTERS = ['A', 'B', 'C', 'D'];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function resolveAnswer(q: ExamQuestion) {
  let actualAnsText = String(q.ans);
  if (!q.opts.some(o => String(o) === String(q.ans))) {
    const i = Number(q.ans) - 1;
    if (i >= 0 && i < q.opts.length) actualAnsText = String(q.opts[i]);
  }
  return actualAnsText;
}

export default function Exam() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const topic = topicId ? TOPICS[topicId] : null;

  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [qState, setQState] = useState<QState | null>(null);

  const examQ: ExamQuestion[] = topic?.exam ?? [];

  if (!topic) { navigate('/'); return null; }

  if (!examQ.length) {
    return (
      <main className="page-shell-narrow">
        <button onClick={() => navigate(`/topic/${topicId}`)}
                className="ghost-action mb-4 cursor-pointer bg-transparent">
          ← {topic.title}
        </button>

        <section className="exam-panel p-6 text-center">
          <div className="section-kicker">Timed room</div>
          <h2 className="display-title mt-2 text-3xl font-bold">ยังไม่มีข้อสอบจำลองสำหรับหมวดนี้</h2>
          <p className="muted-copy mt-3 text-[0.92rem] leading-[1.8]">
            ตอนนี้หมวดนี้ถูกออกแบบให้เริ่มจากบทเรียนก่อน เมื่อพร้อมแล้วค่อยต่อยอดด้วยแบบฝึกหรือข้อสอบในภายหลัง
          </p>
          <div className="mt-5 flex justify-center">
            <button onClick={() => navigate(`/topic/${topicId}/lessons`)}
                    className="primary-action border-none cursor-pointer">
              กลับไปบทเรียน →
            </button>
          </div>
        </section>
      </main>
    );
  }

  useEffect(() => {
    if (!examQ[idx]) return;
    setQState({ shuffled: shuffle(examQ[idx].opts), answered: false, selected: null });
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const handleAnswer = useCallback((val: string) => {
    if (!qState || qState.answered) return;
    const q = examQ[idx];
    const actualAnsText = resolveAnswer(q);
    const ok = val === actualAnsText;
    if (ok) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);
    setQState((prev) => prev ? { ...prev, answered: true, selected: val } : prev);
  }, [qState, examQ, idx]);

  function next() {
    if (idx + 1 >= examQ.length) {
      navigate(`/topic/${topicId}/result`, {
        state: { correct, wrong, total: examQ.length, elapsed },
      });
    } else {
      setIdx((i) => i + 1);
    }
  }

  if (!qState) { return null; }

  const q = examQ[idx];
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const actualAnsText = resolveAnswer(q);
  const progress = ((idx + 1) / examQ.length) * 100;

  return (
    <main className="page-shell-narrow">
      <button onClick={() => navigate(`/topic/${topicId}`)}
              className="ghost-action mb-4 cursor-pointer bg-transparent">
        ← {topic.title}
      </button>

      <header className="exam-panel mb-4 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="section-kicker">Timed room</div>
            <h2 className="display-title mt-1 text-3xl font-bold">🎯 จำลองข้อสอบ</h2>
            <p className="muted-copy mt-2 text-[.9rem]">{examQ.length} ข้อ · จับเวลา · ทำเหมือนสอบจริง (ไม่มีใบ้)</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="stat-tile min-h-0 px-3 py-2">
              <span className="stat-value text-xl">✅{correct}</span>
              <div className="stat-label mt-1">ถูก</div>
            </div>
            <div className="stat-tile min-h-0 px-3 py-2">
              <span className="stat-value text-xl">✕{wrong}</span>
              <div className="stat-label mt-1">ผิด</div>
            </div>
            <div className="stat-tile min-h-0 px-3 py-2">
              <span className="stat-value text-xl">{fmt(elapsed)}</span>
              <div className="stat-label mt-1">เวลา</div>
            </div>
          </div>
        </div>
        <div className="progress-track mt-5">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-[.78rem] font-semibold text-[rgba(248,239,216,0.58)]">
          <span>ข้อ {idx + 1}/{examQ.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </header>

      <section className="exam-panel p-5 md:p-6 animate-fade-in">
        <div className="exam-badge mb-4">{q.tp}</div>

        {q.tableHtml && (
          <div className="content-table mb-4 overflow-hidden border border-[rgba(248,239,216,0.1)] bg-[rgba(248,239,216,0.03)] px-3 pt-2.5 pb-1"
               dangerouslySetInnerHTML={{ __html: q.tableHtml }} />
        )}

        {q.instr ? (
          <div className="border-l-4 border-[rgba(255,209,102,0.72)] bg-[rgba(255,209,102,0.06)] px-4 py-3.5 mb-5
                          text-[.94rem] leading-[1.85] whitespace-pre-wrap">
            {q.instr}
          </div>
        ) : (
          <>
            <div className="mb-4 text-[.98rem] font-semibold">จงหาพจน์ที่หายไปในอนุกรมต่อไปนี้</div>
            <div className="flex flex-wrap gap-1.5 items-center justify-center my-3 mb-5">
              {q.seq.map((v, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-[rgba(248,239,216,0.28)]">›</span>}
                  <span className={`seq-token ${v === '?' ? 'is-blank animate-blink-border' : ''}`}>
                    {v}
                  </span>
                </span>
              ))}
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {qState.shuffled.map((v, i) => {
            const val = String(v);
            const isCorrect = val === actualAnsText;
            const isSelected = val === qState.selected;
            let cls = 'answer-option cursor-pointer';
            if (qState.answered) {
              if (isCorrect) cls += ' border-ok bg-ok/15';
              else if (isSelected) cls += ' border-err bg-err/15';
              else cls += ' opacity-55';
            }

            return (
              <button key={i} disabled={qState.answered}
                      onClick={() => handleAnswer(val)}
                      className={`${cls} disabled:cursor-default`}>
                <span className={`answer-letter
                  ${qState.answered && isCorrect ? 'bg-ok text-[#101410]'
                    : qState.answered && isSelected ? 'bg-err text-white'
                    : ''}`}>
                  {LETTERS[i]}
                </span>
                <span>{String(v).replace(/^[1-4]\)\s*/, '')}</span>
              </button>
            );
          })}
        </div>

        {qState.answered && (
          <div className="mt-4 animate-fade-in">
            <div className={`border-l-4 px-4 py-3
              ${qState.selected === actualAnsText
                ? 'border-ok bg-ok/10' : 'border-err bg-err/10'}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{qState.selected === actualAnsText ? '🎉' : '😅'}</span>
                <div>
                  <div className="text-[.94rem] font-bold">
                    {qState.selected === actualAnsText ? 'ถูกต้อง! 🎉' : `ยังไม่ใช่ — คำตอบคือ ${actualAnsText.replace(/^[1-4]\)\s*/, '')}`}
                  </div>
                  <div className="muted-copy mt-1 text-[.76rem]">
                    {qState.selected === actualAnsText ? 'ดูวิธีคิดด้านล่างเพื่อความแม่นยำ' : 'ทบทวนวิธีคิดได้ด้านล่าง'}
                  </div>
                </div>
              </div>
            </div>

            {(() => {
              if (!q.instr) return null;
              const lines = q.instr.split('\n');
              const blankRegex = /_{3,}/;
              const lineWithBlank = lines.find(l => blankRegex.test(l));
              if (!lineWithBlank) return null;

              const cleanAnsText = String(actualAnsText).replace(/^[1-4]\)\s*/, '');
              const parts = lineWithBlank.split(blankRegex);

              return (
                <div className="border-x border-[rgba(248,239,216,0.07)] bg-[rgba(248,239,216,0.035)] px-4 py-3 text-[.88rem] leading-[1.7]">
                  <strong>💡 ประโยคที่สมบูรณ์:</strong>
                  <div className="mt-2 border-l-4 border-ok/70 bg-black/20 p-3 text-white/90 font-medium italic">
                    {parts.map((part, i) => (
                      <span key={i}>
                        {part}
                        {i < parts.length - 1 && (
                          <span className="text-ok font-bold underline decoration-ok underline-offset-[3px] mx-1">
                            {cleanAnsText}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="border-x border-t border-[rgba(248,239,216,0.07)] bg-[rgba(248,239,216,0.035)] px-4 py-3 text-[.84rem] leading-[1.8] whitespace-pre-wrap">
              <strong>📐 วิธีคิด:</strong> {q.expl}
            </div>
            <div className="border border-[rgba(255,209,102,0.14)] bg-[rgba(255,209,102,0.06)]
                            px-4 py-3 text-[.84rem] leading-[1.8]">
              🔮 <strong className="text-[var(--gold)]">เทคนิค:</strong> {q.tip}
            </div>
          </div>
        )}
      </section>

      {qState.answered && (
        <button onClick={next}
                className="primary-action mt-3.5 w-full border-none cursor-pointer">
          {idx < examQ.length - 1 ? `ข้อถัดไป (${idx + 2}/${examQ.length}) →` : '🏆 ดูผลคะแนน'}
        </button>
      )}
    </main>
  );
}
