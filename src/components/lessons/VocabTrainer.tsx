import { useEffect, useMemo, useState } from 'react';

type TrainerTab = 'flash' | 'quiz' | 'list';
type CategoryId = 'all' | 'work' | 'change' | 'desc' | 'think';

interface VocabItem {
  word: string;
  pos: string;
  meaning: string;
  category: Exclude<CategoryId, 'all'>;
  hint: string;
  exampleHtml: string;
  tip: string;
}

interface QuizQuestion {
  item: VocabItem;
  options: string[];
}

interface Props {
  preferredCategory?: CategoryId;
}

const CATEGORY_LABELS: Record<CategoryId, string> = {
  all: 'ทั้งหมด',
  work: 'การทำงาน',
  change: 'การเปลี่ยนแปลง',
  desc: 'คุณลักษณะ',
  think: 'การคิด',
};

const CATEGORY_COLORS: Record<Exclude<CategoryId, 'all'>, string> = {
  work: '#7ab8ff',
  change: '#9de05e',
  desc: '#ff7cab',
  think: '#ffca6d',
};

const VOCABULARY: VocabItem[] = [
  { word: 'allocate', pos: 'v.', meaning: 'จัดสรร', category: 'work', hint: 'allo + cate = แบ่งให้', exampleHtml: 'The government <em>allocates</em> budget to each department.', tip: "จำง่าย: 'allo' เหมือน 'allow' = อนุญาตให้มีทรัพยากร" },
  { word: 'facilitate', pos: 'v.', meaning: 'อำนวยความสะดวก', category: 'work', hint: 'facil = easy (ง่าย)', exampleHtml: 'Technology <em>facilitates</em> communication between agencies.', tip: 'รากศัพท์ facilis (ละติน) = ง่าย → ทำให้ง่ายขึ้น' },
  { word: 'implement', pos: 'v.', meaning: 'ดำเนินการ / นำไปใช้', category: 'work', hint: 'implement = เอาไปใส่จริง ๆ', exampleHtml: 'The policy was <em>implemented</em> last year.', tip: "ต่างจาก 'plan' — implement = ลงมือทำแล้ว" },
  { word: 'monitor', pos: 'v./n.', meaning: 'ตรวจสอบ / ติดตาม', category: 'work', hint: 'มองดูอยู่ตลอดเวลา', exampleHtml: 'Officials <em>monitor</em> the project\'s progress.', tip: 'เหมือนจอ monitor — คอยดูอยู่' },
  { word: 'negotiate', pos: 'v.', meaning: 'เจรจาต่อรอง', category: 'work', hint: 'nego + tiate = ต่อรองกัน', exampleHtml: 'Both parties <em>negotiate</em> the terms of the agreement.', tip: 'Negotiation ที่ ก.พ. ชอบออก = สถานการณ์ทางการ' },
  { word: 'evaluate', pos: 'v.', meaning: 'ประเมิน', category: 'work', hint: 'e + value = หาค่า', exampleHtml: 'The committee will <em>evaluate</em> all applications.', tip: "มี 'value' อยู่ข้างใน = หาว่ามีคุณค่าแค่ไหน" },
  { word: 'propose', pos: 'v.', meaning: 'เสนอ / เสนอแนะ', category: 'work', hint: 'pro + pose = ยื่นออกไปข้างหน้า', exampleHtml: 'She <em>proposed</em> a new system for tracking expenses.', tip: "Propose ≠ impose (บังคับ) — อย่าสับสน" },
  { word: 'priority', pos: 'n.', meaning: 'ลำดับความสำคัญ', category: 'work', hint: 'prior = ก่อน, สำคัญกว่า', exampleHtml: 'Public health is the government\'s top <em>priority</em>.', tip: 'prior = before → priority = สิ่งที่ต้องทำก่อน' },
  { word: 'deteriorate', pos: 'v.', meaning: 'เสื่อมโทรม / แย่ลง', category: 'change', hint: 'de = ลง + terior = เลวลง', exampleHtml: 'The condition of old bridges continues to <em>deteriorate</em>.', tip: "ขึ้นต้น de- มักหมายถึง 'ลง/แย่ลง'" },
  { word: 'diminish', pos: 'v.', meaning: 'ลดลง / ด้อยค่า', category: 'change', hint: 'di + minish = ทำให้เล็กลง', exampleHtml: 'Investment in rural areas has <em>diminished</em> significantly.', tip: 'mini อยู่ข้างใน = เล็กลง, น้อยลง' },
  { word: 'enhance', pos: 'v.', meaning: 'เพิ่มพูน / ปรับปรุง', category: 'change', hint: 'en + hance = ทำให้สูงขึ้น', exampleHtml: 'Training programs <em>enhance</em> employee performance.', tip: 'ตรงข้ามกับ diminish — enhance = ดีขึ้น' },
  { word: 'fluctuate', pos: 'v.', meaning: 'ผันผวน / ขึ้น ๆ ลง ๆ', category: 'change', hint: 'fluctu = คลื่น (wave)', exampleHtml: 'Prices <em>fluctuate</em> depending on supply and demand.', tip: 'นึกภาพคลื่นทะเลขึ้น ๆ ลง ๆ = fluctuate' },
  { word: 'generate', pos: 'v.', meaning: 'ก่อให้เกิด / สร้าง', category: 'change', hint: 'gen = เกิด (genesis)', exampleHtml: 'Renewable energy <em>generates</em> less pollution.', tip: "genesis, gene, generate — รากเดียวกัน = 'เกิด'" },
  { word: 'modify', pos: 'v.', meaning: 'ปรับเปลี่ยน', category: 'change', hint: 'modi + fy = ทำให้เปลี่ยนรูป', exampleHtml: 'The plan was <em>modified</em> to meet new requirements.', tip: "คล้าย 'mode' = รูปแบบ — เปลี่ยนรูปแบบ" },
  { word: 'promote', pos: 'v.', meaning: 'ส่งเสริม / โปรโมท', category: 'change', hint: 'pro + mote = ผลักดันออกไปข้างหน้า', exampleHtml: 'The campaign <em>promotes</em> healthy lifestyle habits.', tip: "promote ≠ แค่เลื่อนตำแหน่ง — ออกสอบหมายถึง 'ส่งเสริม'" },
  { word: 'eliminate', pos: 'v.', meaning: 'กำจัด / ตัดออก', category: 'change', hint: 'e + limin = กวาดออกจากเส้น', exampleHtml: 'We need to <em>eliminate</em> unnecessary steps in the process.', tip: 'elimination round ในกีฬา = ตัดออก = eliminate' },
  { word: 'adequate', pos: 'adj.', meaning: 'เพียงพอ / พอเหมาะ', category: 'desc', hint: 'ad + equate = ทำให้เท่าเทียม', exampleHtml: 'The funding was not <em>adequate</em> to complete the project.', tip: "ใกล้เคียง sufficient แต่ adequate = 'พอใช้ได้' ไม่ถึงกับเกิน" },
  { word: 'ambiguous', pos: 'adj.', meaning: 'กำกวม / ไม่ชัดเจน', category: 'desc', hint: 'ambi = สองทาง', exampleHtml: 'The instructions were <em>ambiguous</em> and confusing.', tip: 'ambi = both/two → สองความหมาย = กำกวม' },
  { word: 'controversial', pos: 'adj.', meaning: 'ก่อให้เกิดข้อโต้แย้ง', category: 'desc', hint: 'contro + vers = หันสวนทาง', exampleHtml: 'The new law is highly <em>controversial</em>.', tip: 'controversy ที่ออกข่าวบ่อย = ถกเถียงกันมาก' },
  { word: 'elaborate', pos: 'adj./v.', meaning: 'ละเอียด / อธิบายเพิ่มเติม', category: 'desc', hint: 'e + labor = ทำงานอย่างประณีต', exampleHtml: 'Please <em>elaborate</em> on your proposal.', tip: "มี 'labor' อยู่ข้างใน = ทำงานมาก = ละเอียด" },
  { word: 'excessive', pos: 'adj.', meaning: 'มากเกินไป / เกินขอบเขต', category: 'desc', hint: 'ex + ceed = เกินออกไป', exampleHtml: '<em>Excessive</em> spending led to budget shortfalls.', tip: 'exceed, excess, excessive — ตระกูลเดียวกัน = เกิน' },
  { word: 'fundamental', pos: 'adj.', meaning: 'พื้นฐาน / สำคัญมาก', category: 'desc', hint: 'fund = ฐานราก (foundation)', exampleHtml: 'Education is a <em>fundamental</em> right.', tip: 'foundation, fund, fundamental — รากศัพท์เดียว = ฐาน' },
  { word: 'inevitable', pos: 'adj.', meaning: 'หลีกเลี่ยงไม่ได้', category: 'desc', hint: 'in + evit = ไม่อาจหนีได้', exampleHtml: 'Change is <em>inevitable</em> in any organization.', tip: 'in- (ไม่) + evitable (หลีกเลี่ยงได้) = หลีกไม่ได้' },
  { word: 'prevalent', pos: 'adj.', meaning: 'แพร่หลาย / พบบ่อย', category: 'desc', hint: 'prev + al = มีชัยชนะทั่วไป', exampleHtml: 'Corruption is still <em>prevalent</em> in some sectors.', tip: 'prevail (มีชัย) → prevalent = มีอยู่ทั่วไป' },
  { word: 'sufficient', pos: 'adj.', meaning: 'เพียงพอ (ครบถ้วน)', category: 'desc', hint: 'suf + ficient = ทำจนพอ', exampleHtml: 'Is the evidence <em>sufficient</em> to make a decision?', tip: 'sufficient > adequate ในด้านปริมาณ' },
  { word: 'voluntary', pos: 'adj.', meaning: 'โดยสมัครใจ', category: 'desc', hint: 'volunt = ใจสมัคร', exampleHtml: 'Participation in the survey is <em>voluntary</em>.', tip: 'volunteer (อาสาสมัคร) = ตระกูลเดียวกัน' },
  { word: 'sustainable', pos: 'adj.', meaning: 'ยั่งยืน / ทำต่อได้', category: 'desc', hint: 'sustain + able = รักษาไว้ได้ต่อเนื่อง', exampleHtml: 'Sustainable development balances economic growth and environment.', tip: 'SDGs ที่เราได้ยินบ่อย = Sustainable Development Goals' },
  { word: 'anticipate', pos: 'v.', meaning: 'คาดการณ์ / คาดหมาย', category: 'think', hint: 'anti = ก่อน + cipate = จับ', exampleHtml: 'We <em>anticipate</em> delays due to the storm.', tip: 'anti = ล่วงหน้า → จับเหตุการณ์ล่วงหน้า' },
  { word: 'comprehend', pos: 'v.', meaning: 'เข้าใจ / ซึมซาบ', category: 'think', hint: 'com + prehend = จับให้หมด', exampleHtml: 'Students must <em>comprehend</em> the main idea of each passage.', tip: 'comprehensive = ครอบคลุม — ตระกูลเดียวกัน' },
  { word: 'estimate', pos: 'v./n.', meaning: 'ประมาณการ', category: 'think', hint: 'estim = ตีราคา', exampleHtml: 'Experts <em>estimate</em> the cost at 10 million baht.', tip: "estimate (v) ≠ exact — เป็นการ 'เดาอย่างมีเหตุผล'" },
  { word: 'imply', pos: 'v.', meaning: 'บอกเป็นนัย / นัยยะ', category: 'think', hint: 'im + ply = พับซ่อนอยู่ข้างใน', exampleHtml: 'Her silence <em>implies</em> that she disagrees.', tip: 'imply ≠ infer — imply = ผู้พูดบอกนัย, infer = ผู้ฟังสรุป' },
  { word: 'maintain', pos: 'v.', meaning: 'รักษา / คงไว้', category: 'think', hint: 'main + tain = ถือไว้ด้วยมือหลัก', exampleHtml: 'It is important to <em>maintain</em> accurate records.', tip: 'maintenance (การบำรุงรักษา) — ตระกูลเดียว' },
  { word: 'obtain', pos: 'v.', meaning: 'ได้รับ / ได้มา', category: 'think', hint: 'ob + tain = เข้าถึงและจับ', exampleHtml: 'You must <em>obtain</em> a permit before starting construction.', tip: 'obtain = ได้มาอย่างเป็นทางการ ≠ get (ทั่วไป)' },
  { word: 'perspective', pos: 'n.', meaning: 'มุมมอง', category: 'think', hint: 'per + spect = มองผ่านมุมหนึ่ง', exampleHtml: 'Consider this issue from a different <em>perspective</em>.', tip: 'spectacle, inspect, perspective — spect = มอง' },
  { word: 'relevant', pos: 'adj.', meaning: 'เกี่ยวข้อง / สอดคล้อง', category: 'think', hint: 'relev = ยกขึ้นมาเชื่อมโยง', exampleHtml: 'Please provide only <em>relevant</em> information.', tip: 'ตรงข้าม irrelevant — ข้อสอบชอบถาม relevant vs irrelevant' },
  { word: 'resolve', pos: 'v.', meaning: 'แก้ไข / คลี่คลาย', category: 'think', hint: 're + solve = แก้ซ้ำจนสำเร็จ', exampleHtml: 'The conflict was finally <em>resolved</em> through mediation.', tip: 'solution, solve, resolve — ตระกูลเดียวกัน = แก้ปัญหา' },
  { word: 'substitute', pos: 'v./n.', meaning: 'แทนที่ / ตัวแทน', category: 'think', hint: 'sub + stitute = ตั้งไว้แทน', exampleHtml: 'You can <em>substitute</em> honey for sugar in this recipe.', tip: 'sub = ใต้/แทน → substitute = วางแทนที่' },
  { word: 'obstacle', pos: 'n.', meaning: 'อุปสรรค', category: 'think', hint: 'ob + stacle = ยืนขวางหน้า', exampleHtml: 'Language barriers can be an <em>obstacle</em> to communication.', tip: 'obstruct (ขวาง) = ตระกูลเดียวกัน' },
  { word: 'consequence', pos: 'n.', meaning: 'ผลที่ตามมา', category: 'think', hint: 'con + sequent = ตามมาพร้อมกัน', exampleHtml: 'Failure to comply may have serious <em>consequences</em>.', tip: 'sequence (ลำดับ) → consequence = สิ่งที่ตามมาในลำดับถัดไป' },
  { word: 'acknowledge', pos: 'v.', meaning: 'ยอมรับ / รับทราบ', category: 'think', hint: 'ac + knowledge = รับเอาความรู้', exampleHtml: 'The report <em>acknowledges</em> the limitations of the study.', tip: 'acknowledge ≠ agree — แค่รับทราบ ไม่ได้แปลว่าเห็นด้วย' },
];

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function buildQuizQuestions() {
  return shuffle(VOCABULARY)
    .slice(0, 10)
    .map((item) => {
      const distractors = shuffle(
        VOCABULARY.filter((candidate) => candidate.word !== item.word).map((candidate) => candidate.meaning),
      ).slice(0, 3);

      return {
        item,
        options: shuffle([item.meaning, ...distractors]),
      } satisfies QuizQuestion;
    });
}

function scoreMessage(percent: number) {
  if (percent >= 80) return 'เยี่ยมมาก พร้อมสอบจริงแล้ว';
  if (percent >= 60) return 'ดีเลย ทบทวนคำที่ยังสับสนอีกนิดแล้วกลับมาซ้ำได้เลย';
  return 'วนแฟลชการ์ดอีกรอบก่อน แล้วค่อยกลับมาลอง quiz ใหม่';
}

export default function VocabTrainer({ preferredCategory = 'all' }: Props) {
  const [activeTab, setActiveTab] = useState<TrainerTab>('flash');
  const [activeCategory, setActiveCategory] = useState<CategoryId>(preferredCategory);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => buildQuizQuestions());
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const filteredWords = useMemo(() => {
    if (activeCategory === 'all') return VOCABULARY;
    return VOCABULARY.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const currentCard = filteredWords[cardIndex] ?? filteredWords[0];
  const flashProgress = filteredWords.length ? ((cardIndex + 1) / filteredWords.length) * 100 : 0;
  const currentQuiz = quizQuestions[quizIndex] ?? null;
  const quizFinished = quizIndex >= quizQuestions.length;
  const percent = quizQuestions.length ? Math.round((quizScore / quizQuestions.length) * 100) : 0;

  useEffect(() => {
    setActiveTab('flash');
    setActiveCategory(preferredCategory);
    setCardIndex(0);
    setFlipped(false);
  }, [preferredCategory]);

  function changeCategory(category: CategoryId) {
    setActiveCategory(category);
    setCardIndex(0);
    setFlipped(false);
  }

  function goToNextCard() {
    setCardIndex((prev) => (prev + 1) % filteredWords.length);
    setFlipped(false);
  }

  function goToPrevCard() {
    setCardIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
    setFlipped(false);
  }

  function openWord(word: string) {
    const index = VOCABULARY.findIndex((item) => item.word === word);
    if (index < 0) return;

    setActiveCategory('all');
    setCardIndex(index);
    setFlipped(false);
    setActiveTab('flash');
  }

  function answerQuiz(option: string) {
    if (!currentQuiz || selectedOption) return;

    setSelectedOption(option);
    if (option === currentQuiz.item.meaning) {
      setQuizScore((prev) => prev + 1);
    }
  }

  function goToNextQuestion() {
    setQuizIndex((prev) => prev + 1);
    setSelectedOption(null);
  }

  function resetQuiz() {
    setQuizQuestions(buildQuizQuestions());
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
  }

  return (
    <div className="grid gap-4">
      <section className="exam-panel-warm relative overflow-hidden p-5 md:p-6">
        <div className="absolute right-4 top-4 hidden h-24 w-24 rotate-6 border border-[rgba(122,184,255,0.22)] md:block" />
        <div className="flex flex-wrap gap-2">
          <span className="exam-badge border-[rgba(122,184,255,0.3)] bg-[rgba(122,184,255,0.12)]">Vocabulary</span>
          <span className="exam-badge border-[rgba(67,184,156,0.3)] bg-[rgba(67,184,156,0.12)]">40 คำหลัก</span>
          <span className="exam-badge border-[rgba(255,209,102,0.3)] bg-[rgba(255,209,102,0.12)]">Flashcards + Quiz</span>
        </div>
        <div className="section-kicker mt-4">Word bank</div>
        <p className="muted-copy mt-3 max-w-[720px] text-[0.96rem] leading-[1.85]">
          ชุดฝึกศัพท์สำหรับอังกฤษ ก.พ. ที่รวมคำออกบ่อยพร้อมรากศัพท์ ตัวอย่างประโยค และแบบทดสอบ 10 ข้อ
          เพื่อเปลี่ยนไฟล์ trainer เดิมให้กลายเป็นบทเรียนจริงบนเว็บไซต์หลัก
        </p>
      </section>

      <section className="exam-panel p-2.5">
        <div className="grid gap-2 md:grid-cols-3">
          {[
            { id: 'flash', label: 'แฟลชการ์ด' },
            { id: 'quiz', label: 'แบบทดสอบ' },
            { id: 'list', label: 'รายการคำศัพท์' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TrainerTab)}
                className={`rounded-[8px] px-4 py-3 text-[0.88rem] font-bold transition-all ${
                  active
                    ? 'border border-[rgba(122,184,255,0.42)] bg-[rgba(122,184,255,0.14)] text-[var(--paper)]'
                    : 'border border-[rgba(248,239,216,0.1)] bg-[rgba(248,239,216,0.04)] text-[var(--muted)] hover:border-[rgba(248,239,216,0.2)] hover:text-[var(--paper)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {activeTab === 'flash' && currentCard && (
        <div className="grid gap-4">
          <section className="exam-panel p-5">
            <div className="section-kicker">เลือกหมวดศัพท์</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(Object.keys(CATEGORY_LABELS) as CategoryId[]).map((category) => {
                const active = activeCategory === category;
                const count =
                  category === 'all'
                    ? VOCABULARY.length
                    : VOCABULARY.filter((item) => item.category === category).length;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => changeCategory(category)}
                    className={`rounded-full border px-4 py-2 text-[0.82rem] font-semibold transition-all ${
                      active
                        ? 'border-[rgba(67,184,156,0.38)] bg-[rgba(67,184,156,0.14)] text-[var(--paper)]'
                        : 'border-[rgba(248,239,216,0.12)] bg-[rgba(248,239,216,0.04)] text-[var(--muted)] hover:text-[var(--paper)]'
                    }`}
                  >
                    {CATEGORY_LABELS[category]} · {count}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="exam-panel p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="section-kicker">ความคืบหน้า</div>
                <div className="mt-2 text-[0.92rem] font-semibold text-[var(--paper)]">
                  คำที่ {cardIndex + 1} / {filteredWords.length}
                </div>
              </div>
              <div className="exam-badge border-[rgba(122,184,255,0.24)] bg-[rgba(122,184,255,0.08)]">
                แตะการ์ดเพื่อพลิกดูคำแปล
              </div>
            </div>
            <div className="progress-track mt-4">
              <div className="progress-fill" style={{ width: `${flashProgress}%`, background: '#7ab8ff' }} />
            </div>

            <div className="mt-5" style={{ perspective: '1200px' }}>
              <button
                type="button"
                onClick={() => setFlipped((prev) => !prev)}
                className="w-full cursor-pointer rounded-[8px] border-none bg-transparent p-0 text-left"
              >
                <div
                  className="relative h-[280px] transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  <div
                    className="exam-card absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="exam-badge border-[rgba(122,184,255,0.28)] bg-[rgba(122,184,255,0.08)]">
                      {currentCard.pos}
                    </div>
                    <div className="display-title mt-5 text-[2.4rem] font-bold text-[var(--paper)] md:text-[3rem]">
                      {currentCard.word}
                    </div>
                    <div className="mt-4 rounded-full border border-[rgba(122,184,255,0.3)] bg-[rgba(122,184,255,0.12)] px-4 py-2 text-[0.84rem] text-[rgba(248,239,216,0.88)]">
                      {currentCard.hint}
                    </div>
                  </div>

                  <div
                    className="exam-card absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background:
                        'linear-gradient(180deg, rgba(122,184,255,0.15), rgba(248,239,216,0.05)), rgba(18,24,18,0.88)',
                    }}
                  >
                    <div className="display-title text-[1.9rem] font-bold text-[var(--paper)] md:text-[2.2rem]">
                      {currentCard.meaning}
                    </div>
                    <div
                      className="mt-4 max-w-[520px] text-[0.9rem] leading-[1.8] text-[rgba(248,239,216,0.82)]"
                      dangerouslySetInnerHTML={{ __html: currentCard.exampleHtml }}
                    />
                    <div className="mt-4 rounded-[8px] border border-[rgba(67,184,156,0.28)] bg-[rgba(67,184,156,0.12)] px-4 py-3 text-[0.82rem] leading-[1.7] text-[rgba(248,239,216,0.88)]">
                      {currentCard.tip}
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-5 flex justify-center gap-2.5">
              <button type="button" onClick={goToPrevCard} className="ghost-action cursor-pointer">
                ← ก่อนหน้า
              </button>
              <button type="button" onClick={goToNextCard} className="primary-action cursor-pointer border-none">
                ถัดไป →
              </button>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'quiz' && (
        <section className="grid gap-4">
          {!quizFinished && currentQuiz && (
            <article className="exam-panel p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="section-kicker">Quiz mode</div>
                  <div className="mt-2 text-[0.95rem] font-semibold text-[var(--paper)]">
                    ข้อ {quizIndex + 1} / {quizQuestions.length}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="stat-tile min-h-0 px-3 py-2">
                    <span className="stat-value text-xl">{quizScore}</span>
                    <div className="stat-label mt-1">คะแนน</div>
                  </div>
                  <div className="stat-tile min-h-0 px-3 py-2">
                    <span className="stat-value text-xl">
                      {quizQuestions.length ? Math.round((quizIndex / quizQuestions.length) * 100) : 0}%
                    </span>
                    <div className="stat-label mt-1">คืบหน้า</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[8px] border border-[rgba(248,239,216,0.1)] bg-[rgba(248,239,216,0.04)] px-4 py-4">
                <div className="display-title text-[1.6rem] font-bold text-[var(--paper)]">
                  “{currentQuiz.item.word}”
                </div>
                <div className="mt-2 text-[0.82rem] text-[var(--muted)]">{currentQuiz.item.pos}</div>
                <div
                  className="mt-4 text-[0.9rem] leading-[1.8] text-[rgba(248,239,216,0.84)]"
                  dangerouslySetInnerHTML={{ __html: currentQuiz.item.exampleHtml }}
                />
              </div>

              <div className="mt-5 grid gap-2.5 md:grid-cols-2">
                {currentQuiz.options.map((option) => {
                  const isCorrect = option === currentQuiz.item.meaning;
                  const isSelected = selectedOption === option;

                  let optionClass =
                    'border-[rgba(248,239,216,0.12)] bg-[rgba(248,239,216,0.04)] text-[rgba(248,239,216,0.88)]';

                  if (selectedOption && isCorrect) {
                    optionClass =
                      'border-[rgba(67,184,156,0.42)] bg-[rgba(67,184,156,0.14)] text-[var(--paper)]';
                  } else if (selectedOption && isSelected) {
                    optionClass =
                      'border-[rgba(255,107,90,0.42)] bg-[rgba(255,107,90,0.14)] text-[var(--paper)]';
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={Boolean(selectedOption)}
                      onClick={() => answerQuiz(option)}
                      className={`rounded-[8px] border px-4 py-4 text-left text-[0.9rem] font-semibold transition-all ${
                        selectedOption ? 'cursor-default' : 'cursor-pointer hover:border-[rgba(248,239,216,0.22)]'
                      } ${optionClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {selectedOption && (
                <div className="mt-4 grid gap-3">
                  <div
                    className={`rounded-[8px] border px-4 py-4 text-[0.88rem] leading-[1.75] ${
                      selectedOption === currentQuiz.item.meaning
                        ? 'border-[rgba(67,184,156,0.34)] bg-[rgba(67,184,156,0.12)]'
                        : 'border-[rgba(255,107,90,0.34)] bg-[rgba(255,107,90,0.12)]'
                    }`}
                  >
                    <div className="font-bold text-[var(--paper)]">
                      {selectedOption === currentQuiz.item.meaning
                        ? 'ถูกต้อง'
                        : `คำตอบที่ถูกคือ ${currentQuiz.item.meaning}`}
                    </div>
                    <p className="mt-1 text-[var(--muted)]">{currentQuiz.item.tip}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={goToNextQuestion}
                      className="primary-action cursor-pointer border-none"
                    >
                      {quizIndex + 1 < quizQuestions.length ? 'ข้อถัดไป →' : 'ดูผลคะแนน'}
                    </button>
                  </div>
                </div>
              )}
            </article>
          )}

          {quizFinished && (
            <div className="grid gap-4">
              <section className="exam-panel p-6 text-center">
                <div className="display-title text-[3.6rem] font-bold text-[var(--paper)]">
                  {quizScore}/{quizQuestions.length}
                </div>
                <div className="mt-2 text-[1rem] text-[var(--muted)]">{percent}% ถูกต้อง</div>
                <p className="mt-4 text-[0.95rem] leading-[1.8] text-[rgba(248,239,216,0.88)]">
                  {scoreMessage(percent)}
                </p>
                <div className="mt-5 flex justify-center">
                  <button type="button" onClick={resetQuiz} className="primary-action cursor-pointer border-none">
                    ทำใหม่อีกรอบ ↺
                  </button>
                </div>
              </section>

              <section className="grid gap-3">
                <article className="exam-card p-5">
                  <div className="section-kicker">ทริค 1</div>
                  <p className="mt-3 text-[0.9rem] leading-[1.75] text-[rgba(248,239,216,0.88)]">
                    อ่านรากศัพท์ก่อน ไม่ต้องจำทุกคำ รู้ว่า <strong className="text-[var(--gold)]">de-</strong>{' '}
                    มักสื่อว่าลดลง, <strong className="text-[var(--gold)]">in-</strong> มักแปลว่าไม่หรือเข้าไป,
                    <strong className="text-[var(--gold)]">pro-</strong> มักสื่อการผลักไปข้างหน้า
                  </p>
                </article>

                <article className="exam-card p-5">
                  <div className="section-kicker">ทริค 2</div>
                  <p className="mt-3 text-[0.9rem] leading-[1.75] text-[rgba(248,239,216,0.88)]">
                    ตัดตัวเลือกด้วย part of speech ถ้าช่องว่างตามหลัง <strong className="text-[var(--gold)]">to</strong>{' '}
                    มักต้องเป็น verb ช่อง 1 ถ้าอยู่หน้าคำนามโดยตรงมักต้องเป็น adjective
                  </p>
                </article>

                <article className="exam-card p-5">
                  <div className="section-kicker">ทริค 3</div>
                  <p className="mt-3 text-[0.9rem] leading-[1.75] text-[rgba(248,239,216,0.88)]">
                    จับ tone ของประโยค ถ้าเจอ not, lack, without หรือบริบทเชิงลบ คำตอบก็มักโน้มไปทางคำที่มีความหมายเชิงลบด้วย
                  </p>
                </article>
              </section>
            </div>
          )}
        </section>
      )}

      {activeTab === 'list' && (
        <div className="grid gap-4">
          <section className="exam-panel p-5">
            <div className="section-kicker">Legend</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {(Object.entries(CATEGORY_COLORS) as Array<[Exclude<CategoryId, 'all'>, string]>).map(
                ([category, color]) => (
                  <div key={category} className="exam-badge">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {CATEGORY_LABELS[category]}
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {VOCABULARY.map((item) => (
              <button
                key={item.word}
                type="button"
                onClick={() => openWord(item.word)}
                className="exam-card cursor-pointer p-4 text-left"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                    />
                    <span className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                      {CATEGORY_LABELS[item.category]}
                    </span>
                  </div>
                  <div className="display-title mt-3 text-[1.05rem] font-bold text-[var(--paper)]">
                    {item.word}
                  </div>
                  <div className="mt-1 text-[0.82rem] text-[var(--muted)]">{item.meaning}</div>
                </div>
              </button>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
