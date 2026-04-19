import type { Topic } from "../../types";

export const series: Topic = {
  id: 'series',
  ico: '📐',
  title: 'อนุกรม',
  subtitle: 'Number Series',
  color: '#6C63FF',
  desc: '8 ประเภทอนุกรมที่ออกสอบบ่อยที่สุด พร้อมเทคนิคการมองแพทเทิร์นขั้นเทพ',
  tag: 'เริ่มที่นี่ก่อน →',
  tagStyle: 'background:rgba(108,99,255,.15);border:1px solid rgba(108,99,255,.3);color:#c3b1ff;',
  lessons: [
    {
      id: 'ar', ico: '➕', tt: 'อนุกรมเลขคณิต', sub: 'Arithmetic Sequence', diff: 1,
      desc: 'พจน์ถัดไปได้จากการ <strong>บวกหรือลบด้วยค่าคงที่ (d)</strong> เป็นพื้นฐานที่สุดของทุกอนุกรม',
      seq: [4, 7, 10, 13, 16, '?'], dlbl: '+3', ans: 19, vt: 'ar',
      def: 'อนุกรมที่<strong>ผลต่างระหว่างพจน์ติดกันมีค่าเท่ากันเสมอ</strong> เรียกว่า <span class="math">ผลต่างร่วม (d)</span>',
      rule: 'แต่ละก้าวบวก (หรือลบ) ด้วยตัวเลขเดิมทุกครั้ง',
      fm: 'd = พจน์ขวา − พจน์ซ้าย',
      tip: 'เห็นโจทย์ปุ๊บ → <strong>หาผลต่างระหว่างพจน์ติดกันทุกคู่ก่อนเป็นอันดับแรก</strong> ถ้าเท่ากันหมด = เลขคณิตชัวร์!',
      exs: [
        { q: '2, 7, 12, 17, __ = ?', seq: [2, 7, 12, 17, '?'], ops: ['+5', '+5', '+5', '+5'], ans: 22,
          steps: ['<span class="sn">①</span>หาผลต่าง: 7−2=5, 12−7=5, 17−12=5 → d=5', '<span class="sn">②</span>พจน์ถัดไป = 17+5 = <strong>22</strong>'] },
        { q: '60, 54, 48, 42, __ = ?', seq: [60, 54, 48, 42, '?'], ops: ['−6', '−6', '−6', '−6'], ans: 36,
          steps: ['<span class="sn">①</span>หาผลต่าง: 54−60=−6 → d=−6 (ลดลงทีละ 6)', '<span class="sn">②</span>พจน์ถัดไป = 42−6 = <strong>36</strong>'] },
      ],
    },
    {
      id: 'geo', ico: '✖️', tt: 'อนุกรมเรขาคณิต', sub: 'Geometric Sequence', diff: 2,
      desc: 'พจน์ถัดไปได้จากการ <strong>คูณหรือหารด้วยค่าคงที่ (r)</strong> สังเกตจากตัวเลขที่กระโดดก้าวกระโดดอย่างรวดเร็ว',
      seq: [2, 6, 18, 54, '?'], dlbl: '×3', ans: 162, vt: 'geo',
      def: 'อนุกรมที่<strong>อัตราส่วนระหว่างพจน์ติดกันเท่ากันเสมอ</strong> เรียกว่า <span class="math">อัตราส่วนร่วม (r)</span>',
      rule: 'แต่ละก้าวคูณ (หรือหาร) ด้วยตัวเลขเดิมทุกครั้ง',
      fm: 'r = พจน์ขวา ÷ พจน์ซ้าย',
      tip: 'ตัวเลขโตเร็วผิดปกติ (เช่น หลักสิบไปหลักร้อยในไม่กี่ตัว) → <strong>ให้ลองจับหารกันดู</strong> ถ้าได้เท่ากันทุกคู่ = เรขาคณิต!',
      exs: [
        { q: '3, 12, 48, 192, __ = ?', seq: [3, 12, 48, 192, '?'], ops: ['×4', '×4', '×4', '×4'], ans: 768,
          steps: ['<span class="sn">①</span>หาอัตราส่วน: 12÷3=4, 48÷12=4 → r=4', '<span class="sn">②</span>พจน์ถัดไป = 192×4 = <strong>768</strong>'] },
      ],
    },
    {
      id: 'dif', ico: '📊', tt: 'อนุกรมผลต่างหลายชั้น', sub: 'Multi-level Differences', diff: 3,
      desc: 'อนุกรมยอดฮิตในข้อสอบ ก.พ. ผลต่างชั้นแรกไม่เท่ากัน ต้องหาผลต่างลึกลงไปเรื่อยๆ จนกว่าจะเจอตัวเลขที่คงที่',
      seq: [2, 3, 5, 8, 12, '?'], dlbl: 'ตีแฉกหาผลต่าง', ans: 17, vt: 'svg_layer',
      svgConfig: {
        viewBox: '0 0 300 130',
        layers: [
          {
            id: 'row0', animation: 'slide-up', delayMs: 200,
            content: `
              <text x="30" y="20" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">2</text>
              <text x="70" y="20" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">3</text>
              <text x="110" y="20" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">5</text>
              <text x="150" y="20" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">8</text>
              <text x="190" y="20" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">12</text>
              <text x="230" y="20" fill="#FFD700" font-size="14" font-weight="bold" text-anchor="middle">?</text>
            `
          },
          {
            id: 'line1', animation: 'draw-line', delayMs: 800,
            content: `
              <path d="M 30 25 L 50 45 L 70 25" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M 70 25 L 90 45 L 110 25" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M 110 25 L 130 45 L 150 25" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M 150 25 L 170 45 L 190 25" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M 190 25 L 210 45 L 230 25" fill="none" stroke="#FFD700" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="4" />
            `
          },
          {
            id: 'row1', animation: 'pop', delayMs: 1400,
            content: `
              <rect x="40" y="48" width="20" height="16" rx="4" fill="rgba(108,99,255,0.2)" />
              <text x="50" y="60" fill="#c3b1ff" font-size="11" font-weight="bold" text-anchor="middle">+1</text>
              <rect x="80" y="48" width="20" height="16" rx="4" fill="rgba(108,99,255,0.2)" />
              <text x="90" y="60" fill="#c3b1ff" font-size="11" font-weight="bold" text-anchor="middle">+2</text>
              <rect x="120" y="48" width="20" height="16" rx="4" fill="rgba(108,99,255,0.2)" />
              <text x="130" y="60" fill="#c3b1ff" font-size="11" font-weight="bold" text-anchor="middle">+3</text>
              <rect x="160" y="48" width="20" height="16" rx="4" fill="rgba(108,99,255,0.2)" />
              <text x="170" y="60" fill="#c3b1ff" font-size="11" font-weight="bold" text-anchor="middle">+4</text>
            `
          },
          {
            id: 'line2', animation: 'draw-line', delayMs: 2000,
            content: `
              <path d="M 50 66 L 70 86 L 90 66" fill="none" stroke="rgba(108,99,255,0.4)" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M 90 66 L 110 86 L 130 66" fill="none" stroke="rgba(108,99,255,0.4)" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M 130 66 L 150 86 L 170 66" fill="none" stroke="rgba(108,99,255,0.4)" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M 170 66 L 190 86 L 210 66" fill="none" stroke="#FF6584" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="4" />
            `
          },
          {
            id: 'row2', animation: 'pop', delayMs: 2600,
            content: `
              <rect x="60" y="88" width="20" height="16" rx="4" fill="rgba(255,101,132,0.2)" />
              <text x="70" y="100" fill="#FF6584" font-size="11" font-weight="bold" text-anchor="middle">+1</text>
              <rect x="100" y="88" width="20" height="16" rx="4" fill="rgba(255,101,132,0.2)" />
              <text x="110" y="100" fill="#FF6584" font-size="11" font-weight="bold" text-anchor="middle">+1</text>
              <rect x="140" y="88" width="20" height="16" rx="4" fill="rgba(255,101,132,0.2)" />
              <text x="150" y="100" fill="#FF6584" font-size="11" font-weight="bold" text-anchor="middle">+1</text>
            `
          },
          {
            id: 'answer_flow', animation: 'pop', delayMs: 3400,
            content: `
              <rect x="180" y="88" width="20" height="16" rx="4" fill="rgba(255,101,132,0.4)" />
              <text x="190" y="100" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">+1</text>
              
              <rect x="200" y="48" width="20" height="16" rx="4" fill="rgba(108,99,255,0.4)" />
              <text x="210" y="60" fill="#FFF" font-size="11" font-weight="bold" text-anchor="middle">+5</text>
              
              <circle cx="230" cy="15" r="14" fill="#10b981" />
              <text x="230" y="20" fill="#FFF" font-size="14" font-weight="bold" text-anchor="middle">17</text>
            `
          }
        ]
      },
      def: 'เมื่อหาผลต่างชั้นที่ 1 แล้วตัวเลขยังไม่ซ้ำกัน ให้เอาตัวเลขชั้นที่ 1 มาหา <span class="math">ผลต่างชั้นที่ 2</span> หรือชั้นที่ 3 ต่อไปเรื่อยๆ',
      rule: 'ตีแฉกหาผลต่างลงไปเรื่อยๆ จนเจอแถวที่เลขเท่ากัน → ค่อยบวกย้อนกลับขึ้นมา',
      fm: 'ชั้น 1: Δ ของโจทย์ | ชั้น 2: Δ ของชั้น 1',
      tip: '<strong>เทคนิคตีแฉก:</strong> ในข้อสอบจริง ให้ทดโดยตีแฉกรูปตัว V ลงมาข้างล่าง ถ้าลงไปถึงชั้น 3 แล้วยังไม่เจอแพทเทิร์น ให้หยุด! อาจจะเป็นอนุกรมประเภทอื่น (เช่น สลับ หรือ สะสม)',
      exs: [
        { q: '1, 2, 4, 7, 11, 16, __ = ?', seq: [1, 2, 4, 7, 11, 16, '?'], ops: ['+1', '+2', '+3', '+4', '+5', '+6'], ans: 22,
          steps: ['<span class="sn">①</span>ชั้น 1: 1, 2, 3, 4, 5 → เห็นชัดเจนว่าเพิ่มทีละ 1', '<span class="sn">②</span>ตัวต่อไปของชั้น 1 คือ +6', '<span class="sn">③</span>บวกย้อนกลับ: 16+6 = <strong>22</strong>'] },
        { q: '2, 6, 14, 28, 50, __ = ?', seq: [2, 6, 14, 28, 50, '?'], ops: ['+4', '+8', '+14', '+22', '+32'], ans: 82,
          steps: ['<span class="sn">①</span>ชั้น 1: 4, 8, 14, 22 (ยังไม่คงที่)', '<span class="sn">②</span>ชั้น 2: 4, 6, 8 (เพิ่มทีละ 2)', '<span class="sn">③</span>ชั้น 3 (คงที่): +2 → ดันขึ้นชั้น 2: 8+2=10 → ดันขึ้นชั้น 1: 22+10=32', '<span class="sn">④</span>พจน์ถัดไป: 50+32 = <strong>82</strong>'] },
      ],
    },
    {
      id: 'sq_cb', ico: '🚀', tt: 'อนุกรมยกกำลัง', sub: 'Squares & Cubes', diff: 2,
      desc: 'ชุดตัวเลขที่เป็นผลลัพธ์ของการยกกำลังสอง (n²) หรือกำลังสาม (n³)',
      seq: [1, 4, 9, 16, 25, '?'], dlbl: 'n² หรือ n³', ans: 36, vt: 'sq',
      def: '<span class="math">กำลังสอง:</span> 1, 4, 9, 16, 25, 36... | <span class="math">กำลังสาม:</span> 1, 8, 27, 64, 125...',
      rule: 'ตัวเลขเกิดจากการเอาตำแหน่ง (1, 2, 3...) มายกกำลัง',
      fm: 'aₙ = n² หรือ aₙ = n³',
      tip: '<strong>ท่องจำตัวเลขเหล่านี้ให้ขึ้นใจ!</strong> 1, 4, 9, 16, 25, 36, 49 (กำลังสอง) และ 1, 8, 27, 64, 125 (กำลังสาม) ถ้าเห็นปุ๊บต้องตอบได้ทันที',
      exs: [
        { q: '1, 8, 27, 64, __ = ?', seq: [1, 8, 27, 64, '?'], ops: ['1³', '2³', '3³', '4³', '5³'], ans: 125,
          steps: ['<span class="sn">①</span>เห็น 8 และ 27 ให้นึกถึงกำลังสามทันที', '<span class="sn">②</span>แพทเทิร์นคือ 1³, 2³, 3³, 4³', '<span class="sn">③</span>พจน์ถัดไป = 5³ = <strong>125</strong>'] },
      ],
    },
    {
      id: 'prime', ico: '💎', tt: 'อนุกรมจำนวนเฉพาะ', sub: 'Prime Numbers', diff: 3,
      desc: 'ชุดตัวเลขจำนวนเฉพาะ (จำนวนที่หารด้วย 1 และตัวมันเองลงตัวเท่านั้น)',
      seq: [2, 3, 5, 7, 11, '?'], dlbl: 'เลขที่ไม่มีใครหารลง', ans: 13, vt: 'ar',
      def: 'จำนวนเฉพาะ 10 ตัวแรก: <span class="math">2, 3, 5, 7, 11, 13, 17, 19, 23, 29</span>',
      rule: 'เป็นตัวเลขเรียงกันตามลำดับของจำนวนเฉพาะ',
      fm: 'aₙ = จำนวนเฉพาะตัวที่ n',
      tip: '<strong>ระวังโดนหลอก!</strong> 1 ไม่ใช่จำนวนเฉพาะ และ 2 เป็นจำนวนเฉพาะตัวเดียวที่เป็นเลขคู่ หากอนุกรมเริ่มที่ 2, 3, 5, 7... ให้ฟันธงเลยว่าเป็นจำนวนเฉพาะ',
      exs: [
        { q: '5, 7, 11, 13, 17, __ = ?', seq: [5, 7, 11, 13, 17, '?'], ops: ['p3', 'p4', 'p5', 'p6', 'p7', 'p8'], ans: 19,
          steps: ['<span class="sn">①</span>ถ้าลองหาผลต่างจะได้ +2, +4, +2, +4... ซึ่งดูแปลกๆ', '<span class="sn">②</span>แต่เมื่อสังเกตดีๆ มันคือจำนวนเฉพาะเรียงกัน!', '<span class="sn">③</span>จำนวนเฉพาะตัวถัดจาก 17 คือ <strong>19</strong>'] },
      ],
    },
    {
      id: 'frac', ico: '➗', tt: 'อนุกรมเศษส่วน', sub: 'Fractional Series', diff: 3,
      desc: 'อนุกรมที่มาในรูป เศษ/ส่วน โดยเศษและส่วนมักจะมีแพทเทิร์นแยกขาดจากกัน',
      seq: ['1/2', '2/4', '3/8', '4/16', '?'], dlbl: 'แยกคิดบน-ล่าง', ans: '5/32', vt: 'ar',
      def: 'ต้องมองแยกเป็น 2 อนุกรมย่อย: <span class="math">อนุกรมตัวเศษ (ด้านบน)</span> และ <span class="math">อนุกรมตัวส่วน (ด้านล่าง)</span>',
      rule: 'หาความสัมพันธ์ของตัวเศษให้จบก่อน แล้วค่อยไปหาความสัมพันธ์ของตัวส่วน',
      fm: 'บน = แพทเทิร์น A | ล่าง = แพทเทิร์น B',
      tip: '<strong>แยกบน แยกล่าง!</strong> อย่าพยายามเอาเศษไปหารส่วนให้เป็นทศนิยม เพราะจะทำให้มองแพทเทิร์นไม่ออกเลย',
      exs: [
        { q: '1/2, 3/5, 5/8, 7/11, __ = ?', seq: ['1/2', '3/5', '5/8', '7/11', '?/?'], ops: ['+2/+3', '+2/+3', '+2/+3', '+2/+3'], ans: '9/14',
          steps: ['<span class="sn">①</span>มองตัวเศษ (บน): 1, 3, 5, 7 → เพิ่มทีละ 2 → ตัวต่อไปคือ <strong>9</strong>', '<span class="sn">②</span>มองตัวส่วน (ล่าง): 2, 5, 8, 11 → เพิ่มทีละ 3 → ตัวต่อไปคือ <strong>14</strong>', '<span class="sn">③</span>ประกอบร่าง: <strong>9/14</strong>'] },
      ],
    },
    {
      id: 'alt', ico: '🔀', tt: 'อนุกรมสลับ (ข้ามพจน์)', sub: 'Alternating Series', diff: 4,
      desc: 'มีอนุกรม 2 ชุด (หรือ 3 ชุด) ซ้อนทับกันอยู่ ให้ดูแบบ "ข้ามตัว" (สลับฟันปลา)',
      seq: [10, 1, 12, 3, 14, 5, '?'], dlbl: 'กระโดดข้าม', ans: 16, vt: 'ar',
      def: 'เมื่อตัวเลขเดี๋ยวเพิ่ม เดี๋ยดลด ไม่เป็นไปในทิศทางเดียวกัน <span class="math">ให้ลองโยงเส้นข้ามพจน์ (ตัวเว้นตัว)</span>',
      rule: 'ชุดที่ 1 อยู่ตำแหน่งคี่ (1, 3, 5...) | ชุดที่ 2 อยู่ตำแหน่งคู่ (2, 4, 6...)',
      fm: 'a₁, a₃, a₅ = ชุด A | a₂, a₄, a₆ = ชุด B',
      tip: '<strong>เมื่อไหร่ที่ควรข้ามตัว?</strong> เมื่ออนุกรมยาวผิดปกติ (มี 6-8 ตัวขึ้นไป) และตัวเลข "แกว่ง" เดี๋ยวขึ้นเดี๋ยวลง',
      exs: [
        { q: '10, 1, 12, 3, 14, 5, __ = ?', seq: [10, 1, 12, 3, 14, 5, '?'], ops: ['ข้าม', 'ข้าม', 'ข้าม', 'ข้าม', 'ข้าม', 'ข้าม'], ans: 16,
          steps: ['<span class="sn">①</span>ตัวเลขแกว่งมาก ลองจับคู่ตัวเว้นตัว', '<span class="sn">②</span>ชุดที่ 1 (ตัวคี่): 10, 12, 14, ... → +2', '<span class="sn">③</span>ชุดที่ 2 (ตัวคู่): 1, 3, 5, ... → +2', '<span class="sn">④</span>ตัวที่หายไปอยู่ตำแหน่งที่ 7 (ชุดคี่) → 14+2 = <strong>16</strong>'] },
      ],
    },
    {
      id: 'fib', ico: '🌀', tt: 'อนุกรมสะสม (ฟีโบนัชชี)', sub: 'Cumulative Series', diff: 4,
      desc: 'พจน์ปัจจุบัน เกิดจากการเอา "พจน์ก่อนหน้า" มารวมกัน (อาจรวม 2 ตัว หรือ 3 ตัว)',
      seq: [1, 1, 2, 3, 5, 8, '?'], dlbl: 'รวมตัวหน้า', ans: 13, vt: 'fib',
      def: 'อนุกรมที่ไม่สามารถหาผลต่างที่คงที่ได้ และไม่ได้สลับฟันปลา <span class="math">ให้ลองเอาเลขหน้ามาบวกกัน</span>',
      rule: 'พจน์ถัดไป = ผลรวมของพจน์ก่อนหน้า (สะสม 2 ตัว หรือ สะสม 3 ตัว)',
      fm: 'สะสม 2 ตัว: aₙ = aₙ₋₁ + aₙ₋₂',
      tip: '<strong>สูตรลับจับฟีโบนัชชี:</strong> ถ้าตัวเลข 2 ตัวแรก "ซ้ำกัน" (เช่น 1, 1, 2...) หรือ ตัวเลขค่อยๆ ใหญ่ขึ้นเรื่อยๆ แบบไม่มี d หรือ r ที่คงที่ ให้ลองบวกสะสมดู!',
      exs: [
        { q: '1, 1, 2, 3, 5, 8, __ = ?', seq: [1, 1, 2, 3, 5, 8, '?'], ops: ['', '', '=1+1', '=1+2', '=2+3', '=3+5'], ans: 13,
          steps: ['<span class="sn">①</span>เช็ค: 1+1=2, 1+2=3, 2+3=5, 3+5=8', '<span class="sn">②</span>ทุกตัวเกิดจาก 2 ตัวหน้าบวกกัน', '<span class="sn">③</span>พจน์ถัดไป = 5+8 = <strong>13</strong>'] },
        { q: '1, 2, 3, 6, 11, 20, __ = ?', seq: [1, 2, 3, 6, 11, 20, '?'], ops: ['', '', '', '=1+2+3', '=2+3+6', '=3+6+11'], ans: 37,
          steps: ['<span class="sn">①</span>ลองบวก 2 ตัวหน้าไม่ได้ผล (1+2=3 จริง แต่ 2+3 ไม่เท่ากับ 6)', '<span class="sn">②</span>ลองบวกสะสม 3 ตัว: 1+2+3 = 6 | 2+3+6 = 11 | 3+6+11 = 20', '<span class="sn">③</span>พจน์ถัดไป = 6+11+20 = <strong>37</strong>'] },
      ],
    },
  ],
  practice: [
    { q: '2, 5, 8, 11, __ = ?', seq: [2, 5, 8, 11, '?'], ans: 14,
      hint: 'หาผลต่างระหว่างพจน์ติดกัน (d)',
      sol: 'd = 3 ทุกคู่ → 11+3 = <span class="font-bold text-ok">14</span>' },
    { q: '3, 15, 75, 375, __ = ?', seq: [3, 15, 75, 375, '?'], ans: 1875,
      hint: 'ตัวเลขโตเร็วมาก ลองหาอัตราส่วน (r)',
      sol: 'r = 5 ทุกคู่ (คูณ 5) → 375×5 = <span class="font-bold text-ok">1875</span>' },
    { q: '2, 3, 6, 11, 18, __ = ?', seq: [2, 3, 6, 11, 18, '?'], ans: 27,
      hint: 'หาผลต่างชั้นที่ 1 แล้วหาผลต่างชั้นที่ 2',
      sol: 'ชั้น 1: 1, 3, 5, 7 → ชั้น 2: +2 คงที่ → ตัวถัดไปของชั้น 1 คือ +9 → 18+9 = <span class="font-bold text-ok">27</span>' },
    { q: '4, 9, 25, 49, __ = ?', seq: [4, 9, 25, 49, '?'], ans: 121,
      hint: 'นึกถึงเลขยกกำลังสอง และสังเกตฐานของมัน',
      sol: 'มันคือ 2², 3², 5², 7² (ฐานเป็นจำนวนเฉพาะ) → ถัดไปคือ 11² = <span class="font-bold text-ok">121</span>' },
    { q: '20, 2, 17, 4, 14, 6, __ = ?', seq: [20, 2, 17, 4, 14, 6, '?'], ans: 11,
      hint: 'ตัวเลขแกว่งมาก ให้มองแบบกระโดดข้าม (สลับ)',
      sol: 'ชุดคี่: 20, 17, 14... (ลดทีละ 3) → ถัดไป 14-3 = <span class="font-bold text-ok">11</span>' },
    { q: '3, 4, 7, 11, 18, __ = ?', seq: [3, 4, 7, 11, 18, '?'], ans: 29,
      hint: 'ลองเอาพจน์หน้ามาบวกกัน',
      sol: 'สะสม 2 ตัวหน้า: 3+4=7, 4+7=11, 7+11=18 → ถัดไป 11+18 = <span class="font-bold text-ok">29</span>' },
  ],
  exam: [
    { tp: 'เลขคณิต',   seq: [14, 21, 28, 35, '?'],      ans: 42,  opts: [38, 40, 42, 45],      expl: 'd=7 → 35+7=42',             tip: 'หาผลต่างชั้น 1 ก่อนเสมอ' },
    { tp: 'เรขาคณิต',  seq: [2, 8, 32, 128, '?'],       ans: 512, opts: [256, 384, 512, 640],  expl: 'r=4 → 128×4=512',           tip: 'โตเร็ว = คูณ' },
    { tp: 'ผลต่าง',    seq: [5, 6, 9, 14, 21, '?'],     ans: 30,  opts: [28, 30, 32, 35],      expl: 'Δ1: 1,3,5,7 → ถัดไป +9 → 21+9=30', tip: 'ถ้า Δ1 เป็นเลขคี่เรียงกัน ให้บวกตัวถัดไปได้เลย' },
    { tp: 'สะสม',      seq: [2, 2, 4, 6, 10, '?'],      ans: 16,  opts: [14, 16, 18, 20],      expl: 'ฟีโบนัชชี 6+10=16',           tip: 'เห็นเลข 2 ตัวแรกซ้ำกัน นึกถึงฟีโบนัชชี' },
    { tp: 'สลับ',      seq: [1, 10, 3, 9, 5, 8, '?'],   ans: 7,   opts: [6, 7, 8, 9],          expl: 'ชุดคี่: 1,3,5...(+2) → ถัดไป=7', tip: 'เลขแกว่ง ขึ้น-ลง ให้โยงข้ามตัว' },
    { tp: 'ยกกำลัง',   seq: [8, 27, 64, 125, '?'],      ans: 216, opts: [144, 169, 196, 216],  expl: '2³, 3³, 4³, 5³ → 6³=216',   tip: 'ท่องจำเลขชุด 8, 27, 64, 125 ให้แม่น' },
    { tp: 'จำนวนเฉพาะ', seq: [7, 11, 13, 17, '?'],      ans: 19,  opts: [19, 21, 23, 25],      expl: 'จำนวนเฉพาะเรียงลำดับ',       tip: 'ไม่มี d คงที่, ไม่ใช่ข้าม, ไม่ใช่บวกสะสม ให้เช็คจำนวนเฉพาะ' },
    { tp: 'เศษส่วน',    seq: ['1/3', '2/6', '3/11', '4/18', '?/?'], ans: '5/27', opts: ['5/25', '5/26', '5/27', '5/28'], expl: 'บน: 1,2,3,4→5 | ล่าง: +3,+5,+7→+9(18+9=27)', tip: 'แยกคิด บน และ ล่าง เด็ดขาด' },
    { tp: 'ผลต่าง',    seq: [0, 4, 18, 48, 100, '?'],   ans: 180, opts: [160, 172, 180, 192],  expl: 'Δ1: 4,14,30,52 | Δ2: 10,16,22 | Δ3: +6 → ดันขึ้น: 22+6=28 → 52+28=80 → 100+80=180', tip: 'ข้อสอบ ก.พ. ยากๆ มักจะมีผลต่างถึง 3 ชั้น' },
    { tp: 'สะสม 3 ตัว', seq: [1, 1, 2, 4, 7, 13, '?'],  ans: 24,  opts: [22, 24, 26, 28],      expl: 'สะสม 3 ตัว: 1+1+2=4 | 1+2+4=7 | 2+4+7=13 → 4+7+13=24', tip: 'สะสม 2 ตัวไม่ได้ ลองสะสม 3 ตัว' },
  ],
};
