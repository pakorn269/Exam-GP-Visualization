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

  // Build question state whenever idx changes
  useEffect(() => {
    if (!examQ[idx]) return;
    setQState({ shuffled: shuffle(examQ[idx].opts), answered: false, selected: null });
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  // Timer
  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const handleAnswer = useCallback((val: string) => {
    if (!qState || qState.answered) return;
    const q = examQ[idx];
    let actualAnsText = String(q.ans);
    if (!q.opts.some(o => String(o) === String(q.ans))) {
      const i = Number(q.ans) - 1;
      if (i >= 0 && i < q.opts.length) actualAnsText = String(q.opts[i]);
    }
    const ok = val === actualAnsText;
    if (ok) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);
    setQState((prev) => prev ? { ...prev, answered: true, selected: val } : prev);
  }, [qState, examQ, idx]);

  function next() {
    if (idx + 1 >= examQ.length) {
      navigate(`/topic/${topicId}/result`, {
        state: { correct, wrong, total: examQ.length, elapsed: elapsed + (qState?.answered ? 0 : 0) },
      });
    } else {
      setIdx((i) => i + 1);
    }
  }

  if (!topic || !examQ.length || !qState) { if (!topic) navigate('/'); return null; }

  const q = examQ[idx];
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // Resolve the string text of the correct answer
  let actualAnsText = String(q.ans);
  if (!q.opts.some(o => String(o) === String(q.ans))) {
    const i = Number(q.ans) - 1;
    if (i >= 0 && i < q.opts.length) actualAnsText = String(q.opts[i]);
  }

  return (
    <main className="max-w-[860px] mx-auto px-4 py-8 pb-16 animate-fade-in">
      <button onClick={() => navigate(`/topic/${topicId}`)}
              className="text-white/55 text-[.82rem] cursor-pointer mb-1 hover:text-white
                         transition-colors flex items-center gap-1.5 bg-transparent border-none">
        ← {topic.title}
      </button>

      <div className="mb-4 mt-1">
        <h2 className="text-2xl font-bold mb-1">🎯 จำลองข้อสอบ</h2>
        <p className="text-[.88rem] text-white/55">{examQ.length} ข้อ · จับเวลา · ทำเหมือนสอบจริง (ไม่มีใบ้)</p>
      </div>

      {/* Progress bar */}
      <div className="bg-white/10 rounded-full h-2 mb-1.5 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-pri to-sec rounded-full transition-[width] duration-500"
             style={{ width: `${(idx / examQ.length) * 100}%` }} />
      </div>
      <div className="flex justify-between text-[.79rem] text-white/55 mb-5">
        <span>ข้อ {idx + 1}/{examQ.length} | ✅{correct} ❌{wrong}</span>
        <span>⏱ {fmt(elapsed)}</span>
      </div>

      {/* Question card */}
      <div className="bg-white/[0.07] border border-white/[0.12] rounded-[19px] p-6 animate-fade-in">
        <div className="inline-flex items-center gap-1 text-[.72rem] font-bold bg-pri/13 border border-pri/27
                        rounded-full px-3 py-0.5 text-[#c3b1ff] uppercase tracking-wide mb-3">
          {q.tp}
        </div>
        {q.tableHtml && (
          <div className="mb-3 rounded-xl overflow-hidden border border-white/[0.1] bg-white/[0.03] px-3 pt-2.5 pb-1"
               dangerouslySetInnerHTML={{ __html: q.tableHtml }} />
        )}
        {q.instr ? (
          /* Word-problem layout */
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 mb-5
                          text-[.93rem] leading-[1.8] whitespace-pre-wrap">
            {q.instr}
          </div>
        ) : (
          /* Sequence layout */
          <>
            <div className="text-[.98rem] font-medium mb-4">จงหาพจน์ที่หายไปในอนุกรมต่อไปนี้</div>
            <div className="flex flex-wrap gap-1.5 items-center justify-center my-3 mb-5">
              {q.seq.map((v, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-white/22">›</span>}
                  <div className={`rounded-[9px] w-[50px] h-[50px] flex items-center justify-center
                                  text-base font-bold border-[1.5px]
                                  ${v === '?' ? 'border-dashed border-white/26 bg-white/[0.03] text-white/28 animate-blink-border'
                                              : 'border-white/13 bg-white/[0.08]'}`}>
                    {v}
                  </div>
                </span>
              ))}
            </div>
          </>
        )}

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {qState.shuffled.map((v, i) => {
            const val = String(v);
            const isCorrect = val === actualAnsText;
            const isSelected = val === qState.selected;
            let cls = 'bg-white/[0.05] border-white/10 hover:-translate-y-0.5 hover:bg-pri/20 hover:border-pri';
            if (qState.answered) {
              if (isCorrect) cls = 'bg-ok/15 border-ok';
              else if (isSelected) cls = 'bg-err/15 border-err';
              else cls = 'bg-white/[0.05] border-white/10 opacity-50';
            }
            return (
              <button key={i} disabled={qState.answered}
                      onClick={() => handleAnswer(val)}
                      className={`border-[1.5px] rounded-xl p-3 font-sarabun text-[.93rem] font-medium
                                  flex items-center gap-2 transition-all duration-200 text-left
                                  disabled:cursor-default ${cls}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[.76rem]
                                 font-bold flex-shrink-0 transition-colors
                                 ${qState.answered && isCorrect ? 'bg-ok text-black'
                                 : qState.answered && isSelected ? 'bg-err text-white'
                                 : 'bg-white/10'}`}>
                  {LETTERS[i]}
                </div>
                <span>{String(v).replace(/^[1-4]\)\s*/, '')}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {qState.answered && (
          <div className="mt-4 animate-fade-in">
            <div className={`flex items-center gap-2.5 px-4 py-3 rounded-t-[11px]
              ${qState.selected === actualAnsText
                ? 'bg-ok/10 border border-ok/27' : 'bg-err/10 border border-err/27'}`}>
              <span className="text-2xl">{qState.selected === actualAnsText ? '🎉' : '😅'}</span>
              <div>
                <div className="text-[.92rem] font-semibold">
                  {qState.selected === actualAnsText ? 'ถูกต้อง! 🎉' : `ยังไม่ใช่ — คำตอบคือ ${actualAnsText.replace(/^[1-4]\)\s*/, '')}`}
                </div>
                <div className="text-[.74rem] text-white/55">
                  {qState.selected === actualAnsText ? 'ดูวิธีคิดด้านล่างเพื่อความแม่นยำ' : 'ทบทวนวิธีคิดได้ด้านล่าง'}
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
                <div className="bg-white/[0.04] border border-white/[0.07] border-t-0 px-4 py-3 text-[.88rem] leading-[1.6]">
                  <strong>💡 ประโยคที่สมบูรณ์:</strong>
                  <div className="mt-1.5 p-2.5 bg-black/20 rounded-lg text-white/90 font-medium italic border-l-[3px] border-ok/60">
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

            <div className="bg-white/[0.04] border border-white/[0.07] border-t-0 px-4 py-3 text-[.83rem] leading-[1.75] whitespace-pre-wrap">
              <strong>📐 วิธีคิด:</strong> {q.expl}
            </div>
            <div className="bg-ac2/[0.06] border border-ac2/17 border-t-0 rounded-b-[11px]
                            px-4 py-3 text-[.83rem] leading-[1.75]">
              🔮 <strong className="text-ac2">เทคนิค:</strong> {q.tip}
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      {qState.answered && (
        <button onClick={next}
                className="animate-fade-in w-full mt-3.5 py-3 bg-gradient-to-br from-pri to-sec
                           border-none rounded-xl text-white font-sarabun text-[.93rem] font-semibold
                           cursor-pointer transition-all hover:-translate-y-0.5
                           hover:shadow-[0_8px_22px_rgba(108,99,255,.45)]">
          {idx < examQ.length - 1 ? `ข้อถัดไป (${idx + 2}/${examQ.length}) →` : '🏆 ดูผลคะแนน'}
        </button>
      )}
    </main>
  );
}
