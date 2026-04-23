import { useState } from 'react';

type TabId = 'strategy' | 'types' | 'practice' | 'vocab';

interface ReadingQuestion {
  text: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface AccentItem {
  accent: 'mint' | 'gold' | 'violet';
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'strategy', label: 'กลยุทธ์' },
  { id: 'types', label: 'ประเภทคำถาม' },
  { id: 'practice', label: 'แบบฝึกหัด' },
  { id: 'vocab', label: 'ศัพท์สำคัญ' },
];

const STRATEGY_STEPS = [
  {
    title: 'อ่านคำถามทุกข้อก่อน',
    detail: 'ยังไม่ต้องไล่อ่านตัวเลือก ให้รู้ก่อนว่าต้องหา “ข้อมูลแบบไหน” ใน passage',
    time: '~1 นาที',
  },
  {
    title: 'Skim เฉพาะต้นและท้ายย่อหน้า',
    detail: 'อ่านบรรทัดแรกกับบรรทัดท้ายของแต่ละย่อหน้าเพื่อจับโครงเรื่องและทิศทางของผู้เขียน',
    time: '~1 นาที',
  },
  {
    title: 'เก็บ Main Idea / Title ก่อน',
    detail: 'คำถามเมนไอเดียมักตอบได้เร็วสุดหลัง skim และช่วยล็อกกรอบให้ข้ออื่น ๆ',
    time: '~1 นาที',
  },
  {
    title: 'Detail ให้ scan หา keyword',
    detail: 'ไล่หาคำสำคัญจากคำถาม แล้วอ่านเฉพาะประโยครอบจุดที่เจอแทนการแปลทั้ง passage',
    time: '~3 นาที',
  },
  {
    title: 'Inference / Vocabulary ใช้บริบท',
    detail: 'อย่าพึ่งความรู้รอบตัวล้วน ๆ ต้องโยงกลับมาที่ข้อความหรือบริบทใกล้คำนั้นเสมอ',
    time: '~1 นาที',
  },
];

const TRAPS = [
  {
    title: 'Almost True Trap',
    detail: 'ช้อยส์ถูกเกือบหมด แต่มีคำผิดแค่ 1-2 คำ เช่น always, never, all ทำให้กลายเป็นข้อหลอกทันที',
  },
  {
    title: 'Synonym Swap',
    detail: 'เฉลยมักเปลี่ยนคำเดิมใน passage เป็น synonym อย่ามองหาคำที่สะกดเหมือนกัน 100%',
  },
  {
    title: 'Out of Scope',
    detail: 'ช้อยส์ดูสมเหตุสมผลแต่ text ไม่ได้พูดถึง ถือว่าผิด โดยเฉพาะข้อ inference',
  },
];

const QUESTION_TYPES: Array<
  AccentItem & {
    title: string;
    frequency: string;
    tip: string;
    sample: string;
  }
> = [
  {
    title: 'Main Idea / Title',
    frequency: 'ออกทุกปี',
    accent: 'violet',
    tip: 'มักซ่อนอยู่ที่ย่อหน้าแรกหรือประโยคสรุปท้าย ระวังตัวเลือกที่กว้างไปหรือแคบไป',
    sample: 'What is the passage mainly about? / The best title for this passage is...',
  },
  {
    title: 'Detail / Fact',
    frequency: '2-3 ข้อ',
    accent: 'mint',
    tip: 'หา keyword จากคำถามแล้ว scan ใน passage ตรง ๆ เฉลยมักแปลงคำเป็น synonym',
    sample: 'According to the passage... / Which of the following is stated...?',
  },
  {
    title: 'Inference / Implied',
    frequency: '1-2 ข้อ',
    accent: 'gold',
    tip: 'ต้องอ้างอิงกลับไปที่ข้อความได้เสมอ สิ่งที่ “น่าจะจริง” แต่ text ไม่รองรับยังถือว่าผิด',
    sample: 'It can be inferred that... / The author implies...',
  },
  {
    title: 'Vocabulary in Context',
    frequency: '1 ข้อ',
    accent: 'violet',
    tip: 'ดูประโยครอบข้าง ไม่ใช่ความหมายทั่วไปของคำ คำเดียวกันอาจแปลไม่เหมือนกันตามบริบท',
    sample: 'The word X in line Y is closest in meaning to...',
  },
  {
    title: "Author's Purpose / Tone",
    frequency: '1 ข้อ',
    accent: 'mint',
    tip: 'จับว่าผู้เขียนกำลังอธิบาย ชักชวน วิจารณ์ หรือวางโทนแบบเป็นกลาง',
    sample: "The author's purpose is to... / The tone of the passage is...",
  },
];

const PRACTICE_PASSAGE =
  'Remote work, once considered a privilege reserved for a select few, has become a mainstream phenomenon following the global disruptions of recent years. Companies worldwide have been forced to reevaluate traditional office-based structures, leading to a fundamental shift in how work is organized and performed. While many employees report higher levels of satisfaction due to increased flexibility and reduced commuting time, organizations face new challenges in maintaining team cohesion and company culture. Studies suggest that productivity among remote workers is generally comparable to and in some cases exceeds that of their office-based counterparts, though results vary considerably by industry and individual work style. However, the lack of clear boundaries between personal and professional life remains a significant concern, with many workers reporting difficulty in "switching off" even after working hours.';

const PRACTICE_QUESTIONS: ReadingQuestion[] = [
  {
    text: '1. What is the passage mainly about?',
    options: [
      'The reasons why companies prefer remote work over office work',
      'The widespread adoption and challenges of remote working',
      'How remote work increases employee productivity',
      'The negative effects of working from home on mental health',
    ],
    answer: 1,
    explanation:
      'Passage นี้พูดถึงภาพรวมของ remote work ทั้งการแพร่หลาย ผลดีต่อพนักงาน ความท้าทายขององค์กร และปัญหาเรื่องขอบเขตชีวิต ตัวเลือกอื่นจับแค่บางมุมเท่านั้น',
  },
  {
    text: '2. According to the passage, which of the following is TRUE about remote workers?',
    options: [
      'They always produce better results than office workers',
      'They often struggle to separate work from personal life',
      'They universally prefer remote work to office environments',
      'Their productivity has been proven to be lower than office workers',
    ],
    answer: 1,
    explanation:
      'ประโยคท้ายบอกชัดว่าหลายคนมีปัญหาในการ “switching off” หลังเลิกงาน จึงตรงกับตัวเลือก B ส่วนคำว่า always และ universally เป็นสัญญาณของข้อหลอก',
  },
  {
    text: "3. The word 'counterparts' is closest in meaning to:",
    options: ['supervisors', 'competitors', 'equivalents', 'colleagues in the same team'],
    answer: 2,
    explanation:
      'counterparts หมายถึง “ฝ่ายที่อยู่ในฐานะเทียบกัน” ในที่นี้คือ office-based workers ที่เอามาเทียบกับ remote workers ดังนั้น equivalents จึงใกล้ที่สุด',
  },
  {
    text: '4. It can be inferred from the passage that remote work:',
    options: [
      'will eventually replace all traditional office environments',
      'is not suitable for creative industries',
      'requires organizations to adapt their management approaches',
      'has been proven to improve work-life balance for all employees',
    ],
    answer: 2,
    explanation:
      'บทความบอกว่าองค์กรต้อง reevaluate โครงสร้างเดิมและเจอความท้าทายใหม่ ๆ จึงสรุปได้ว่าต้องปรับวิธีบริหาร ส่วนข้ออื่นเกินกว่าที่ text ระบุ',
  },
  {
    text: '5. The author\'s main purpose in writing this passage is to:',
    options: [
      'persuade companies to adopt remote work policies',
      'criticize employees who cannot manage remote work',
      'provide a balanced overview of remote work trends',
      'argue that remote work harms organizational culture',
    ],
    answer: 2,
    explanation:
      'ผู้เขียนวางทั้งด้านบวกและด้านลบแบบสมดุล จึงเป็น tone เชิง informative มากกว่าการชักชวนหรือโจมตีฝ่ายใดฝ่ายหนึ่ง',
  },
];

const VOCABULARY = [
  { word: 'fundamental', meaning: 'พื้นฐาน, สำคัญมาก', example: 'a fundamental shift in society' },
  { word: 'cohesion', meaning: 'ความเกาะกลุ่ม, ความสามัคคี', example: 'team cohesion suffered' },
  { word: 'comparable', meaning: 'เทียบเคียงได้, พอ ๆ กัน', example: 'comparable results' },
  { word: 'phenomenon', meaning: 'ปรากฏการณ์', example: 'a widespread phenomenon' },
  { word: 'disruption', meaning: 'การรบกวน, การเปลี่ยนสภาพแบบฉับพลัน', example: 'global disruptions' },
  { word: 'mainstream', meaning: 'กระแสหลัก', example: 'become mainstream' },
  { word: 'considerably', meaning: 'อย่างมาก, มากพอสมควร', example: 'results vary considerably' },
  { word: 'reevaluate', meaning: 'ประเมินใหม่', example: 'reevaluate their strategy' },
];

const TRANSITIONS: Array<
  AccentItem & {
    title: string;
    words: string;
  }
> = [
  {
    title: 'เพิ่มเติม (Addition)',
    words: 'furthermore, moreover, in addition, additionally, also',
    accent: 'mint',
  },
  {
    title: 'ขัดแย้ง (Contrast)',
    words: 'however, nevertheless, on the other hand, despite, although',
    accent: 'gold',
  },
  {
    title: 'ผลลัพธ์ (Result)',
    words: 'therefore, consequently, as a result, thus, hence',
    accent: 'violet',
  },
  {
    title: 'ยกตัวอย่าง (Example)',
    words: 'for instance, for example, such as, including, namely',
    accent: 'mint',
  },
  {
    title: 'สรุป (Conclusion)',
    words: 'in conclusion, to summarize, overall, in short, ultimately',
    accent: 'gold',
  },
];

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

function accentClass(accent: 'mint' | 'gold' | 'violet') {
  if (accent === 'mint') {
    return 'border-[rgba(67,184,156,0.3)] bg-[rgba(67,184,156,0.1)] text-[var(--mint)]';
  }

  if (accent === 'gold') {
    return 'border-[rgba(255,209,102,0.3)] bg-[rgba(255,209,102,0.1)] text-[var(--gold)]';
  }

  return 'border-[rgba(122,108,255,0.34)] bg-[rgba(122,108,255,0.14)] text-[var(--violet)]';
}

function buildFeedback(correct: number, answered: number) {
  if (!answered) return 'เลือกคำตอบสักข้อก่อน แล้วค่อยกดตรวจทั้งชุด';
  if (correct >= 4) return 'เยี่ยมมาก Reading ชุดนี้แน่นแล้ว ลองจับ passage ที่ยาวขึ้นต่อได้เลย';
  if (correct >= 3) return 'ดีมาก เหลือเก็บรายละเอียดพวก inference กับ synonym trap อีกนิดเดียว';
  if (correct >= 2) return 'มาถูกทางแล้ว ลองย้อนดูแท็บกลยุทธ์แล้วทำชุดเดิมซ้ำอีกหนึ่งรอบ';
  return 'ยังไม่เป็นไร กลับไปล็อกวิธีอ่านก่อน แล้วค่อยไล่โจทย์ใหม่ทีละประเภทจะช่วยมาก';
}

export default function ReadingMasterclass() {
  const [activeTab, setActiveTab] = useState<TabId>('strategy');
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number | null>>(
    PRACTICE_QUESTIONS.map(() => null),
  );
  const [checkedAnswers, setCheckedAnswers] = useState<boolean[]>(
    PRACTICE_QUESTIONS.map(() => false),
  );

  const answeredCount = checkedAnswers.filter(Boolean).length;
  const correctCount = checkedAnswers.reduce((count, checked, index) => {
    if (!checked) return count;
    return count + (selectedAnswers[index] === PRACTICE_QUESTIONS[index].answer ? 1 : 0);
  }, 0);
  const unansweredCount = PRACTICE_QUESTIONS.length - answeredCount;
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
  const showScore = checkedAnswers.some(Boolean);

  function handleSelect(questionIndex: number, optionIndex: number) {
    if (checkedAnswers[questionIndex]) return;

    setSelectedAnswers((prev) =>
      prev.map((answer, index) => (index === questionIndex ? optionIndex : answer)),
    );
  }

  function handleCheckAll() {
    setCheckedAnswers((prev) =>
      prev.map((checked, index) => checked || selectedAnswers[index] !== null),
    );
  }

  function handleResetAll() {
    setSelectedAnswers(PRACTICE_QUESTIONS.map(() => null));
    setCheckedAnswers(PRACTICE_QUESTIONS.map(() => false));
  }

  return (
    <div className="grid gap-4">
      <section className="exam-panel-warm relative overflow-hidden p-5 md:p-6">
        <div className="absolute right-4 top-4 hidden h-24 w-24 rotate-6 border border-[rgba(122,108,255,0.24)] md:block" />
        <div className="flex flex-wrap gap-2">
          <span className="exam-badge border-[rgba(122,108,255,0.3)] bg-[rgba(122,108,255,0.12)]">ภาษาอังกฤษ</span>
          <span className="exam-badge border-[rgba(67,184,156,0.3)] bg-[rgba(67,184,156,0.12)]">Reading</span>
          <span className="exam-badge border-[rgba(255,209,102,0.3)] bg-[rgba(255,209,102,0.12)]">5 ข้อ / 10 คะแนน</span>
        </div>
        <div className="section-kicker mt-4">Masterclass flow</div>
        <p className="muted-copy mt-3 max-w-[700px] text-[0.96rem] leading-[1.85]">
          รวมทริคอ่านเร็ว ประเภทคำถามที่ออกบ่อย แบบฝึกหัดพร้อมเฉลย และคลังศัพท์สำคัญจากชุด
          Reading Masterclass เพื่อนำไปใช้บนเว็บหลักได้ทันที
        </p>
      </section>

      <section className="exam-panel p-2.5">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={active}
                className={`rounded-[8px] px-4 py-2.5 text-[0.86rem] font-bold transition-all ${
                  active
                    ? 'border border-[rgba(122,108,255,0.42)] bg-[rgba(122,108,255,0.16)] text-[var(--paper)]'
                    : 'border border-[rgba(248,239,216,0.1)] bg-[rgba(248,239,216,0.04)] text-[var(--muted)] hover:border-[rgba(248,239,216,0.2)] hover:text-[var(--paper)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {activeTab === 'strategy' && (
        <div className="grid gap-4">
          <section className="exam-panel p-5">
            <div className="section-kicker">ทริคลับประจำชุดนี้</div>
            <div className="mt-3 rounded-[8px] border border-[rgba(122,108,255,0.3)] bg-[rgba(122,108,255,0.12)] px-4 py-4">
              <div className="display-title text-[1.05rem] font-bold text-[var(--paper)]">
                SQRR Method
              </div>
              <p className="mt-2 text-[0.92rem] leading-[1.8] text-[rgba(248,239,216,0.88)]">
                <strong className="text-[var(--violet)]">S</strong>can คำถามก่อน{' '}
                <span className="text-[rgba(248,239,216,0.35)]">→</span>{' '}
                <strong className="text-[var(--violet)]">Q</strong>uestion ถามอะไร{' '}
                <span className="text-[rgba(248,239,216,0.35)]">→</span>{' '}
                <strong className="text-[var(--violet)]">R</strong>ead เฉพาะส่วน{' '}
                <span className="text-[rgba(248,239,216,0.35)]">→</span>{' '}
                <strong className="text-[var(--violet)]">R</strong>echeck ก่อนตอบ
              </p>
              <p className="mt-2 text-[0.84rem] text-[rgba(248,239,216,0.72)]">
                อ่านคำถามก่อนอ่าน passage ช่วยประหยัดเวลาได้ประมาณ 30-40 วินาทีต่อชุด
              </p>
            </div>
          </section>

          <section className="exam-panel p-5">
            <div className="section-kicker">ขั้นตอน 5 ข้อในเวลา 7 นาที</div>
            <div className="mt-4 grid gap-3">
              {STRATEGY_STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="grid gap-3 rounded-[8px] border border-[rgba(248,239,216,0.08)] bg-[rgba(248,239,216,0.04)] px-4 py-4 md:grid-cols-[40px_1fr_auto]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(122,108,255,0.18)] font-bold text-[var(--paper)]">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--paper)]">{step.title}</div>
                    <p className="mt-1 text-[0.86rem] leading-[1.7] text-[var(--muted)]">
                      {step.detail}
                    </p>
                  </div>
                  <div className="exam-badge h-fit border-[rgba(255,209,102,0.26)] bg-[rgba(255,209,102,0.08)]">
                    {step.time}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="exam-panel p-5">
            <div className="section-kicker">กับดักที่ออกสอบบ่อย</div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {TRAPS.map((trap) => (
                <article key={trap.title} className="exam-card p-4">
                  <div className="relative z-10">
                    <div className="display-title text-[1rem] font-bold text-[var(--paper)]">
                      {trap.title}
                    </div>
                    <p className="muted-copy mt-2 text-[0.84rem] leading-[1.75]">
                      {trap.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'types' && (
        <section className="grid gap-3">
          {QUESTION_TYPES.map((type) => (
            <article key={type.title} className="exam-card p-5">
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[0.78rem] font-bold ${accentClass(type.accent)}`}
                  >
                    {type.title}
                  </span>
                  <span className="text-[0.78rem] font-semibold text-[var(--muted)]">
                    {type.frequency}
                  </span>
                </div>
                <p className="mt-3 text-[0.9rem] leading-[1.8] text-[rgba(248,239,216,0.88)]">
                  {type.tip}
                </p>
                <div className="mt-3 rounded-[8px] border border-[rgba(248,239,216,0.08)] bg-[rgba(248,239,216,0.04)] px-4 py-3 text-[0.82rem] text-[var(--muted)]">
                  ตัวอย่างคำถาม: <span className="text-[rgba(248,239,216,0.9)]">{type.sample}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {activeTab === 'practice' && (
        <div className="grid gap-4">
          <section className="exam-panel p-5">
            <div className="section-kicker">Passage 1</div>
            <div className="mt-4 rounded-[8px] border border-[rgba(248,239,216,0.1)] bg-[rgba(248,239,216,0.05)] px-4 py-4 text-[0.92rem] leading-[1.95] text-[rgba(248,239,216,0.9)]">
              {PRACTICE_PASSAGE.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                <span key={sentence} className="inline">
                  <span className="mr-1 text-[0.74rem] font-bold text-[var(--gold)]">
                    ({index + 1})
                  </span>
                  {sentence}{' '}
                </span>
              ))}
            </div>
          </section>

          <section className="exam-panel p-5">
            <div className="section-kicker">ลองทำก่อนดูเฉลย</div>
            <div className="mt-4 grid gap-5">
              {PRACTICE_QUESTIONS.map((question, questionIndex) => (
                <article
                  key={question.text}
                  className="border-b border-[rgba(248,239,216,0.08)] pb-5 last:border-b-0 last:pb-0"
                >
                  <div className="text-[0.95rem] font-semibold leading-[1.75] text-[var(--paper)]">
                    {question.text}
                  </div>
                  <div className="mt-3 grid gap-2">
                    {question.options.map((option, optionIndex) => {
                      const selected = selectedAnswers[questionIndex] === optionIndex;
                      const checked = checkedAnswers[questionIndex];
                      const correct = question.answer === optionIndex;

                      let optionClass =
                        'border-[rgba(248,239,216,0.12)] bg-[rgba(248,239,216,0.04)] text-[rgba(248,239,216,0.88)]';

                      if (checked && correct) {
                        optionClass =
                          'border-[rgba(67,184,156,0.45)] bg-[rgba(67,184,156,0.14)] text-[var(--paper)]';
                      } else if (checked && selected) {
                        optionClass =
                          'border-[rgba(255,107,90,0.45)] bg-[rgba(255,107,90,0.14)] text-[var(--paper)]';
                      } else if (selected) {
                        optionClass =
                          'border-[rgba(122,108,255,0.45)] bg-[rgba(122,108,255,0.16)] text-[var(--paper)]';
                      }

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={checked}
                          onClick={() => handleSelect(questionIndex, optionIndex)}
                          className={`flex items-start gap-3 rounded-[8px] border px-4 py-3 text-left text-[0.88rem] leading-[1.65] transition-all ${
                            checked ? 'cursor-default' : 'cursor-pointer hover:border-[rgba(248,239,216,0.24)]'
                          } ${optionClass}`}
                        >
                          <span className="display-title mt-0.5 text-[0.9rem] font-bold text-[var(--gold)]">
                            {OPTION_LETTERS[optionIndex]}
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {checkedAnswers[questionIndex] && (
                    <div
                      className={`mt-3 rounded-[8px] border px-4 py-3 text-[0.84rem] leading-[1.75] ${
                        selectedAnswers[questionIndex] === question.answer
                          ? 'border-[rgba(67,184,156,0.34)] bg-[rgba(67,184,156,0.12)]'
                          : 'border-[rgba(255,107,90,0.34)] bg-[rgba(255,107,90,0.12)]'
                      }`}
                    >
                      <div className="font-bold text-[var(--paper)]">
                        {selectedAnswers[questionIndex] === question.answer
                          ? 'ถูกต้อง'
                          : `เฉลยคือ ${OPTION_LETTERS[question.answer]}`}
                      </div>
                      <p className="mt-1 text-[var(--muted)]">{question.explanation}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleCheckAll}
                className="primary-action cursor-pointer border-none"
              >
                ตรวจคำตอบทั้งหมด
              </button>
              <button type="button" onClick={handleResetAll} className="ghost-action cursor-pointer">
                เริ่มใหม่
              </button>
            </div>

            {showScore && (
              <div className="mt-5 grid gap-3">
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="stat-tile min-h-0">
                    <span className="stat-value">
                      {correctCount}/{answeredCount}
                    </span>
                    <div className="stat-label">ข้อที่ถูก</div>
                  </div>
                  <div className="stat-tile min-h-0">
                    <span className="stat-value">{accuracy}%</span>
                    <div className="stat-label">ความแม่นยำ</div>
                  </div>
                  <div className="stat-tile min-h-0">
                    <span className="stat-value">
                      {unansweredCount ? `${unansweredCount} ข้อ` : 'ครบ'}
                    </span>
                    <div className="stat-label">ยังไม่ได้ตรวจ</div>
                  </div>
                </div>

                <div className="rounded-[8px] border border-[rgba(255,209,102,0.16)] bg-[rgba(255,209,102,0.06)] px-4 py-4 text-[0.9rem] leading-[1.75] text-[rgba(248,239,216,0.88)]">
                  {buildFeedback(correctCount, answeredCount)}
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {activeTab === 'vocab' && (
        <div className="grid gap-4">
          <section className="exam-panel p-5">
            <div className="section-kicker">ทริคจำศัพท์</div>
            <div className="mt-3 rounded-[8px] border border-[rgba(122,108,255,0.24)] bg-[rgba(122,108,255,0.1)] px-4 py-4">
              <div className="font-semibold text-[var(--paper)]">
                จำเป็นกลุ่มตาม “หน้าที่ในประโยค”
              </div>
              <p className="muted-copy mt-2 text-[0.88rem] leading-[1.75]">
                แทนที่จะท่องทีละคำ ให้จำว่าคำนั้นเป็น signal แบบไหน เช่น คำเชื่อมเพิ่มข้อมูล คำเชื่อมขัดแย้ง
                หรือคำบอกผลลัพธ์ จะช่วยเดาความหมายในโจทย์ vocabulary ได้เร็วขึ้น
              </p>
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-2">
            {VOCABULARY.map((item) => (
              <article key={item.word} className="exam-card p-4">
                <div className="relative z-10">
                  <div className="display-title text-[1rem] font-bold text-[var(--paper)]">
                    {item.word}
                  </div>
                  <div className="mt-1 text-[0.84rem] text-[var(--muted)]">{item.meaning}</div>
                  <div className="mt-3 rounded-[8px] bg-[rgba(248,239,216,0.04)] px-3 py-2 text-[0.8rem] italic text-[rgba(248,239,216,0.72)]">
                    {item.example}
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="exam-panel p-5">
            <div className="section-kicker">Transition Words</div>
            <div className="mt-4 grid gap-3">
              {TRANSITIONS.map((group) => (
                <article key={group.title} className="exam-card p-4">
                  <div className="relative z-10">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[0.78rem] font-bold ${accentClass(group.accent)}`}
                    >
                      {group.title}
                    </span>
                    <p className="mt-3 text-[0.86rem] leading-[1.75] text-[var(--muted)]">
                      {group.words}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
