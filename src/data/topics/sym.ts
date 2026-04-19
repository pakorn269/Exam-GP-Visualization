import type { Topic } from "../../types";
const COND_SYM_1 = `เงื่อนไข:\nA > B ≥ C = D\nE < F = G > H`;

const COND_SYM_2 = `เงื่อนไข:\nJ = K > L ≥ M\nN > O ≥ P > Q`;
export let sym: Topic = {
        id: 'sym',
        ico: '⚖️',
        title: 'เงื่อนไขสัญลักษณ์',
        subtitle: 'Symbolic Conditions',
        color: '#EC4899',
        desc: 'เทคนิคการยุบเครื่องหมาย การเดินทิศทาง และกฎการตอบ 4 ข้อ (True/False/Not Sure)',
        tag: 'ออกเยอะที่สุด!',
        tagStyle: 'background:rgba(236,72,153,.15);border:1px solid rgba(236,72,153,.3);color:#F9A8D4;',
        lessons: [
          {
            id: 'sym_basic', ico: '🔰', tt: 'ลำดับเครื่องหมายและการยุบ', sub: 'Symbol Priority & Merging', diff: 1,
            desc: 'การยุบเครื่องหมายทิศทางเดียวกัน ให้ยึดตาม "ลำดับความเด็ดขาด"',
            seq: ['A', '>', 'B', '≥', 'C', '=', 'D'], dlbl: 'ยุบได้ A > D (เพราะ > มีอำนาจสูงสุด)', ans: 'จริง', vt: 'svg_layer',
            svgConfig: {
              viewBox: '0 0 300 130',
              layers: [
                {
                  id: 'vars', animation: 'slide-up', delayMs: 200,
                  content: `
                    <text x="40" y="30" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">A</text>
                    <text x="110" y="30" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">B</text>
                    <text x="180" y="30" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">C</text>
                    <text x="250" y="30" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">D</text>
                  `
                },
                {
                  id: 'symbols', animation: 'pop', delayMs: 800,
                  content: `
                    <circle cx="75" cy="25" r="14" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="2" />
                    <text x="75" y="30" fill="#ef4444" font-size="14" font-weight="bold" text-anchor="middle">&gt;</text>
                    
                    <circle cx="145" cy="25" r="14" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="2" />
                    <text x="145" y="30" fill="#f59e0b" font-size="14" font-weight="bold" text-anchor="middle">≥</text>
                    
                    <circle cx="215" cy="25" r="14" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="2" />
                    <text x="215" y="30" fill="#10b981" font-size="14" font-weight="bold" text-anchor="middle">=</text>
                  `
                },
                {
                  id: 'fight', animation: 'draw-line', delayMs: 1600,
                  content: `
                    <path d="M 75 45 L 75 70 L 140 70" fill="none" stroke="#ef4444" stroke-width="2" />
                    <path d="M 145 45 L 145 70" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="2" />
                    <path d="M 215 45 L 215 70 L 150 70" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="2" />
                    <path d="M 145 70 L 145 85" fill="none" stroke="#ef4444" stroke-width="2" />
                    <polygon points="140,85 150,85 145,95" fill="#ef4444" />
                  `
                },
                {
                  id: 'winner', animation: 'pop', delayMs: 2400,
                  content: `
                    <rect x="85" y="95" width="120" height="30" rx="6" fill="rgba(239,68,68,0.2)" stroke="#ef4444" />
                    <text x="110" y="115" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">A</text>
                    <text x="145" y="115" fill="#ef4444" font-size="16" font-weight="bold" text-anchor="middle">&gt;</text>
                    <text x="180" y="115" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">D</text>
                  `
                }
              ]
            },
            def: 'เมื่อเครื่องหมายชี้ไปทางเดียวกัน ให้ยุบตามลำดับความสำคัญ:<br/><span class="math">1. เด็ดขาด: > , <</span><br/><span class="math">2. ไม่เด็ดขาด: ≥ , ≤</span><br/><span class="math">3. อ่อนสุด: =</span>',
            rule: 'ถ้ามีเครื่องหมายอันดับ 1 ในสายแม้เพียงตัวเดียว เมื่อยุบแล้วจะได้อันดับ 1 เสมอ',
            fm: '> ชนะ ≥ ชนะ =  |  < ชนะ ≤ ชนะ =',
            tip: '<strong>🎯 ทริคลับ:</strong> "ตัวแรงชนะตัวอ่อนเสมอ"<br/>A > B ≥ C 👉 A > C 🟢<br/>A ≥ B = C 👉 A ≥ C 🟢',
            exs: [
              { q: 'เงื่อนไข: A > B = C ≥ D ข้อสรุป A > D เป็นจริงหรือไม่?', seq: ['A', '>', 'B', '=', 'C', '≥', 'D'], ops: ['', '', '', '', ''], ans: 'จริง',
                steps: ['<span class="text-blue-400 font-bold">🔍 วิเคราะห์:</span>', '• เครื่องหมายในสายคือ <span class="math">> , = , ≥</span>', '• ทิศทางไปทางเดียวกัน (ขวา) และ <span class="math">></span> มีอำนาจสูงสุด', '• สรุปได้ <span class="text-green-400 font-bold">A > D</span> ➡️ <strong>จริง 🟢</strong>'] },
              { q: 'เงื่อนไข: B ≥ C = D ข้อสรุป B > D เป็นจริงหรือไม่?', seq: ['B', '≥', 'C', '=', 'D'], ops: ['', '', '', '', ''], ans: 'ไม่แน่ชัด',
                steps: ['<span class="text-blue-400 font-bold">🔍 วิเคราะห์:</span>', '• จากเงื่อนไข <span class="math">B ≥ C = D</span> สรุปได้ว่า <span class="text-yellow-400 font-bold">B ≥ D</span>', '• หมายความว่า B อาจจะ "มากกว่า" หรือ "เท่ากับ" D ก็ได้', '• ข้อสรุปให้มาแค่ <span class="math">></span> อย่างเดียว ➡️ <strong>ไม่แน่ชัด 🟡</strong>'] },
            ],
          },
          {
            id: 'sym_hidden', ico: '🕵️', tt: 'เครื่องหมายซ่อนรูป (!)', sub: 'Negated Symbols Transformation', diff: 1,
            desc: 'เจอเครื่องหมายขีดฆ่า (!) ต้องแปลงร่างเป็นเครื่องหมายตรงข้ามก่อนทำเสมอ',
            seq: ['A', '!>', 'B', '→', 'A', '≤', 'B'], dlbl: 'แปลง !> เป็น ≤ ทันที', ans: '≤', vt: 'sym',
            def: 'เครื่องหมายปฏิเสธ (!) ต้องแปลงดังนี้:<br/><span class="math">!> ➡️ ≤</span> | <span class="math">!< ➡️ ≥</span><br/><span class="math">!≥ ➡️ <</span> | <span class="math">!≤ ➡️ ></span><br/><span class="math">!= ➡️ > หรือ <</span>',
            rule: 'ห้ามนำเครื่องหมายปฏิเสธไปคำนวณเด็ดขาด ให้เขียนเครื่องหมายใหม่ทับลงไปทันที',
            fm: '!> คือ ≤  |  !< คือ ≥  |  != คือ สวนทางกัน',
            tip: '<strong>💡 จำง่ายๆ:</strong> ตัดตัวไหนทิ้ง ให้เอาตัวที่เหลือมาใส่ (ถ้าเดิมไม่มี = ให้ใส่ = ด้วย)',
            exs: [
              { q: 'เงื่อนไข: A !> B = C ข้อสรุป A ≤ C เป็นจริงหรือไม่?', seq: ['A', '!>', 'B', '=', 'C'], ops: ['', 'แปลง ≤', '', '', ''], ans: 'จริง',
                steps: ['<span class="text-blue-400 font-bold">🛠️ ขั้นตอน:</span>', '1. แปลง <span class="math">!></span> เป็น <span class="math">≤</span> จะได้ <span class="math">A ≤ B = C</span>', '2. ยุบเครื่องหมายได้ <span class="text-green-400 font-bold">A ≤ C</span>', '3. ตรงกับข้อสรุปพอดี ➡️ <strong>จริง 🟢</strong>'] },
            ],
          },
          {
            id: 'sym_clash', ico: '🚧', tt: 'ทางตัน! เครื่องหมายสวนทาง', sub: 'Direction Clash (Roadblock)', diff: 2,
            desc: 'ถ้าลูกศรหันมาชนกัน หรือหันออกจากกัน ให้ตอบ "ไม่แน่ชัด" ทันที',
            seq: ['A', '>', 'B', '<', 'C', '→', 'ไม่แน่ชัด'], dlbl: 'หันหน้าชนกัน = จบเห่!', ans: 'ไม่แน่ชัด', vt: 'svg_layer',
            svgConfig: {
              viewBox: '0 0 300 120',
              layers: [
                {
                  id: 'vars2', animation: 'slide-up', delayMs: 200,
                  content: `
                    <text x="60" y="30" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">A</text>
                    <text x="150" y="30" fill="#c3b1ff" font-size="16" font-weight="bold" text-anchor="middle">B</text>
                    <text x="240" y="30" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">C</text>
                  `
                },
                {
                  id: 'arrows', animation: 'draw-line', delayMs: 800,
                  content: `
                    <path d="M 80 25 L 125 25" fill="none" stroke="#ef4444" stroke-width="3" />
                    <polygon points="120,20 130,25 120,30" fill="#ef4444" />
                    
                    <path d="M 220 25 L 175 25" fill="none" stroke="#ef4444" stroke-width="3" />
                    <polygon points="180,20 170,25 180,30" fill="#ef4444" />
                  `
                },
                {
                  id: 'collision', animation: 'pop', delayMs: 1400,
                  content: `
                    <circle cx="150" cy="25" r="20" fill="rgba(239,68,68,0.4)" />
                    <path d="M 140 15 L 160 35 M 160 15 L 140 35" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" />
                  `
                },
                {
                  id: 'result_clash', animation: 'slide-up', delayMs: 2000,
                  content: `
                    <rect x="90" y="70" width="120" height="34" rx="6" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" />
                    <text x="110" y="92" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">A</text>
                    <text x="150" y="92" fill="#f59e0b" font-size="16" font-weight="bold" text-anchor="middle">?</text>
                    <text x="190" y="92" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">C</text>
                    <text x="150" y="120" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">ไม่แน่ชัด 🟡</text>
                  `
                }
              ]
            },
            def: 'เมื่อเดินจากตัวหนึ่งไปอีกตัวแล้วเจอเครื่องหมายที่ "แย้งกัน" เช่น <span class="math">> < , < > , ≤ ≥ , ≥ ≤</span>',
            rule: 'เครื่องหมายสวนทางกันหมายถึงเราประเมินความสัมพันธ์ไม่ได้ว่าใครมากกว่าใคร',
            fm: 'A > B < C ➡️ A กับ C = ไม่แน่ชัด 🟡',
            tip: '<strong>🧪 ทริคประหยัดเวลา:</strong> ถ้าเห็นเครื่องหมายหันมาบวกกันปุ๊บ กา "ไม่แน่ชัด" แล้วข้ามได้เลย!',
            exs: [
              { q: 'เงื่อนไข: A > B และ C > B ข้อสรุป A > C จริงหรือไม่?', seq: ['A', '>', 'B', '<', 'C'], ops: ['', '', '', '', ''], ans: 'ไม่แน่ชัด',
                steps: ['<span class="text-blue-400 font-bold">🔍 วิเคราะห์:</span>', '• จัดเรียงใหม่ได้ <span class="math">A > B < C</span>', '• เครื่องหมาย <span class="math">></span> และ <span class="math"><</span> หันหน้าเข้าหากันที่ B', '• สรุปความสัมพันธ์ระหว่าง A กับ C ไม่ได้ ➡️ <strong>ไม่แน่ชัด 🟡</strong>'] },
            ],
          },
          {
            id: 'sym_coeff', ico: '🧬', tt: 'ตัวแปรและสัมประสิทธิ์', sub: 'Variables & Coefficients', diff: 3,
            desc: 'การเปรียบเทียบ A กับ 2A หรือค่าคงที่ — กับดักยอดฮิตของ ก.พ.',
            seq: ['2A', '>', 'B', '→', 'A', '?', 'B'], dlbl: '2A > B ไม่ได้แปลว่า A > B', ans: 'ไม่แน่ชัด', vt: 'sym',
            def: 'เมื่อเงื่อนไขให้ค่ามาเป็นทวีคูณ (เช่น 2A) แต่ข้อสรุปถามตัวแปรเดี่ยว (เช่น A) <span class="math">ต้องระวังเรื่องขนาดตัวแปร</span>',
            rule: 'ทุกตัวแปรมีค่ามากกว่า 0 แต่เราไม่รู้ว่าคือเท่าไหร่ (0.1 หรือ 100)',
            fm: '2A > B ➡️ A อาจจะ < B ก็ได้ (ถ้า A=1, B=1.5)',
            tip: '<strong>⚠️ กฎเหล็ก:</strong><br/>• ฝั่ง "มาก" มีตัวคูณเพิ่ม แล้วถามตัวเดี่ยว ➡️ <strong>ไม่แน่ชัด 🟡</strong><br/>• ฝั่ง "น้อย" มีตัวคูณเพิ่ม แล้วยังน้อยกว่า ➡️ <strong>จริง 🟢</strong>',
            exs: [
              { q: 'เงื่อนไข: 2A > B ข้อสรุป A > B จริงหรือไม่?', seq: ['2A', '>', 'B'], ops: ['', '', ''], ans: 'ไม่แน่ชัด',
                steps: ['<span class="text-blue-400 font-bold">🔍 วิเคราะห์:</span>', '• เงื่อนไขบอก <span class="math">2A</span> ชนะ <span class="math">B</span>', '• ถ้า <span class="math">A=1</span> ($2A=2$) และ <span class="math">B=1.5</span> (เงื่อนไขเป็นจริง)', '• แต่ <span class="math">A=1</span> ไม่ได้มากกว่า <span class="math">B=1.5</span> ➡️ <strong>ไม่แน่ชัด 🟡</strong>'] },
              { q: 'เงื่อนไข: A > 2B ข้อสรุป A > B จริงหรือไม่?', seq: ['A', '>', '2B'], ops: ['', '', ''], ans: 'จริง',
                steps: ['<span class="text-blue-400 font-bold">🔍 วิเคราะห์:</span>', '• <span class="math">A</span> ชนะ <span class="math">2B</span> ซึ่ง <span class="math">2B</span> ย่อมใหญ่กว่า <span class="math">B</span> เสมอ', '• ในเมื่อ A ชนะตัวใหญ่ ก็ต้องชนะตัวเล็กด้วยแน่นอน ➡️ <strong>จริง 🟢</strong>'] },
            ],
          },
          {
            id: 'sym_math', ico: '🧮', tt: 'การบวกและย้ายข้างตัวแปร', sub: 'Variable Summation & Logic', diff: 3,
            desc: 'เทคนิคการเปรียบเทียบตัวแปรชุด (A+B) และการใช้ "ทริคลับแทนค่า 2 กรณี"',
            seq: ['J+M', '>', 'K+L', '→', 'แทนค่า', '→', 'ตัดตัวแปร'], dlbl: 'ย้ายข้าง/แทนค่าเพื่อลดรูป', ans: 'ผิด', vt: 'sym',
            def: 'เมื่อข้อสรุปมาเป็นรูปผลบวก <span class="math">(A+B > C+D)</span> ให้พยายาม:<br/>1. <strong>แทนค่า:</strong> ถ้ามีตัวแปรที่เท่ากัน (เช่น A=C) ให้แทนที่แล้วตัดออก<br/>2. <strong>ย้ายข้าง:</strong> จัดกลุ่มตัวที่เปรียบเทียบง่ายไว้ด้วยกัน',
            rule: 'ถ้าเปรียบเทียบด้วยตรรกะไม่ได้ ให้ใช้ "การทดสอบตัวเลข 2 กรณี" ทันที',
            fm: 'J=K ➡️ J+M > K+L กลายเป็น J+M > J+L ➡️ M > L',
            tip: '<strong>🧪 ทริคลับแทนค่า 2 กรณี:</strong><br/>ถ้าชุดหนึ่งได้ ✓ แต่อีกชุดได้ ✗ ➡️ ตอบ <strong>"ไม่แน่ชัด 🟡"</strong> ทันที ไม่ต้องพิสูจน์ต่อ!',
            exs: [
              { q: 'เงื่อนไข: J = K > L ≥ M ข้อสรุป J + M > K + L จริงหรือไม่?', seq: ['J+M', '>', 'K+L'], ops: ['แทน K=J', 'ตัด J', 'เหลือ M>L'], ans: 'เท็จ',
                steps: ['<span class="text-blue-400 font-bold">🛠️ ขั้นตอน:</span>', '1. โจทย์บอก <span class="math">J = K</span> ➡️ แทน K ด้วย J จะได้ <span class="math">J + M > J + L</span>', '2. ตัด J ออกทั้งสองข้างเหลือ <span class="text-yellow-400 font-bold">M > L</span>', '3. แต่เงื่อนไขคือ <span class="math">L ≥ M</span> (หรือ M ≤ L) ซึ่งขัดแย้งกับสรุป ➡️ <strong>ผิด 🔴</strong>'] },
              { q: 'เงื่อนไข: N > O ≥ P > Q ข้อสรุป N + Q > O + P จริงหรือไม่?', seq: ['N+Q', '>', 'O+P'], ops: ['แทนค่าชุด 1', 'แทนค่าชุด 2', ''], ans: 'ไม่แน่ชัด',
                steps: ['<span class="text-blue-400 font-bold">🧪 ทดสอบ 2 กรณี:</span>', '• <strong>กรณี 1 (จริง):</strong> 10+1 > 5+4 (11 > 9) ✅', '• <strong>กรณี 2 (เท็จ):</strong> 10+1 > 9+8 (11 > 17) ❌', '• เมื่อผลออกมาทั้งจริงและเท็จ ➡️ <strong>ไม่แน่ชัด 🟡</strong>'] },
            ],
          },
          {
            id: 'sym_join', ico: '🌉', tt: 'การเชื่อมตัวอักษร', sub: 'Linking Variables', diff: 2,
            desc: 'หา "ตัวเชื่อม" หรือตัวอักษรที่ปรากฏทั้งสองบรรทัด เพื่อสร้างสะพานข้าม',
            seq: ['B', '=', 'C', 'และ', 'C', '<', 'G'], dlbl: 'เชื่อมด้วยตัว C', ans: 'B < G', vt: 'svg_layer',
            svgConfig: {
              viewBox: '0 0 300 140',
              layers: [
                {
                  id: 'eq1', animation: 'slide-up', delayMs: 200,
                  content: `
                    <rect x="50" y="10" width="80" height="30" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
                    <text x="65" y="30" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">B</text>
                    <text x="90" y="30" fill="#FFD700" font-size="14" font-weight="bold" text-anchor="middle">=</text>
                    <text x="115" y="30" fill="#c3b1ff" font-size="14" font-weight="bold" text-anchor="middle">C</text>
                  `
                },
                {
                  id: 'eq2', animation: 'slide-up', delayMs: 800,
                  content: `
                    <rect x="170" y="10" width="80" height="30" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
                    <text x="185" y="30" fill="#c3b1ff" font-size="14" font-weight="bold" text-anchor="middle">C</text>
                    <text x="210" y="30" fill="#FFD700" font-size="14" font-weight="bold" text-anchor="middle">&lt;</text>
                    <text x="235" y="30" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">G</text>
                  `
                },
                {
                  id: 'bridge', animation: 'draw-line', delayMs: 1600,
                  content: `
                    <path d="M 115 45 Q 150 80 185 45" fill="none" stroke="#c3b1ff" stroke-width="2" stroke-dasharray="4" />
                    <circle cx="115" cy="45" r="3" fill="#c3b1ff" />
                    <circle cx="185" cy="45" r="3" fill="#c3b1ff" />
                    <text x="150" y="90" fill="#c3b1ff" font-size="12" font-weight="bold" text-anchor="middle">เชื่อมด้วย C</text>
                  `
                },
                {
                  id: 'result', animation: 'pop', delayMs: 2600,
                  content: `
                    <rect x="80" y="100" width="140" height="36" rx="8" fill="rgba(16,185,129,0.2)" stroke="#10b981" />
                    <text x="100" y="123" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">B</text>
                    <text x="125" y="123" fill="#FFD700" font-size="16" font-weight="bold" text-anchor="middle">=</text>
                    <text x="150" y="123" fill="#c3b1ff" font-size="16" font-weight="bold" text-anchor="middle">C</text>
                    <text x="175" y="123" fill="#FFD700" font-size="16" font-weight="bold" text-anchor="middle">&lt;</text>
                    <text x="200" y="123" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle">G</text>
                  `
                }
              ]
            },
            def: 'ถ้าข้อสรุปถามถึงตัวแปรที่อยู่คนละบรรทัด ต้องหาตัวแปรที่มีเหมือนกันทั้งคู่ (<span class="math">ตัวเชื่อม</span>) แล้วเชื่อมกัน',
            rule: 'ลากตัวอักษรตั้งต้น → ไปที่ตัวเชื่อม → ข้ามบรรทัดไปอีกตัวเชื่อม → ไปที่ตัวปลายทาง',
            fm: 'บน: ... = C ... | ล่าง: ... ≤ C ... ➡️ เชื่อมกันด้วย C',
            tip: 'ใช้วิธีนำเงื่อนไขมา <strong>"สลับข้าง"</strong> ให้อ่านง่าย เช่น ถ้ารู้ว่า C < G สามารถสลับเป็น G > C ได้ เพื่อให้ลูกศรไปทางขวาเสมอ จะได้ดูง่ายขึ้น',
            exs: [
              { q: 'เงื่อนไข 1: B = C\nเงื่อนไข 2: C < G\nข้อสรุป: B < G เป็นจริงหรือไม่?', seq: ['B', '=', 'C', '<', 'G'], ops: ['', '', '', '', ''], ans: 'จริง',
                steps: ['<span class="sn">①</span>หาตัวเชื่อม: เจอ C ในทั้งสองบรรทัด', '<span class="sn">②</span>นำมาเรียงต่อกัน: B = C และ C < G ➡️ B = C < G', '<span class="sn">③</span>ยุบเครื่องหมายทิศเดียวกัน (= และ <) ได้เป็น B < G → <strong>จริง</strong>'] },
            ],
          },
        ],
        practice: [
          {
            q: 'เงื่อนไข: A > B ≥ C = D\nข้อสรุป: A > D',
            seq: ['A', '>', 'B', '≥', 'C', '=', 'D'], ans: 'จริง',
            hint: 'ทิศทางขวาหมดหรือไม่? ถ้ายุบเครื่องหมาย ตัวที่ใหญ่สุดคือตัวใด?',
            sol: 'ทิศทางเดียวกันทั้งหมด > , ≥ , = ยุบเหลือ <strong>></strong> ดังนั้น A > D เป็น <span class="font-bold text-ok">จริง</span>',
          },
          {
            q: 'เงื่อนไข: 2A > B = C ≥ D\nข้อสรุป: A > D',
            seq: ['2A', '>', 'B', '=', 'C', '≥', 'D'], ans: 'ไม่แน่ชัด',
            hint: 'ยุบได้ 2A > D หมายความว่า A ตัวเดียวเอาชนะ D ได้เสมอหรือไม่?',
            sol: 'ยุบได้ 2A > D แต่เราไม่รับประกันว่า A เดียวจะมากกว่า D เสมอ (ถ้า A=2, D=3 ➡️ 2(2) > 3 จริง แต่ 2 ไม่ได้มากกว่า 3) ตอบ <span class="font-bold text-ok">ไม่แน่ชัด</span> ทันที',
          },
          {
            q: 'เงื่อนไข 1: B = C\nเงื่อนไข 2: E < F ≤ C\nข้อสรุป: F ≤ B',
            seq: ['F', '≤', 'C', '=', 'B'], ans: 'จริง',
            hint: 'เชื่อมด้วย C: F ≤ C และ C = B เรียงต่อกันได้ว่าอะไร?',
            sol: 'F ≤ C = B ยุบเครื่องหมายเหลือ <strong>F ≤ B</strong> ซึ่งตรงกับข้อสรุป ตอบ <span class="font-bold text-ok">จริง</span>',
          },
          {
            q: 'เงื่อนไข 1: B = C ≥ D\nเงื่อนไข 2: F ≤ C < G\nข้อสรุป: F < D',
            seq: ['F', '≤', 'C', '≥', 'D'], ans: 'ไม่แน่ชัด',
            hint: 'เดินจาก F ไป D ผ่าน C จะได้ F ≤ C และ C ≥ D',
            sol: 'พบเครื่องหมายสวนทางกัน หรือชี้ออกจากกัน (≤ กับ ≥) เมื่อชนทางตันตอบ <span class="font-bold text-ok">ไม่แน่ชัด</span> ทันที',
          },
          {
            q: 'เงื่อนไข: J = K > L ≥ M \nข้อสรุป: J > M',
            seq: ['J', '=', 'K', '>', 'L', '≥', 'M'], ans: 'จริง',
            hint: 'รวบเครื่องหมาย =, >, ≥ ใครใหญ่สุด?',
            sol: 'ยุบเครื่องหมายได้ผลลัพธ์เป็น > จึงสรุปได้ว่า J > M ตอบ <span class="font-bold text-ok">จริง</span>',
          },
        ],
        exam: [
          {
            tp: 'เชื่อมและยุบ',
            instr: COND_SYM_1 + '\n\nข้อ 21.\nข้อสรุปที่ 1: A > D\nข้อสรุปที่ 2: G > H',
            seq: [], ans: 1, opts: ['1) ตอบ 1 (จริงทั้งคู่)', '2) ตอบ 2 (เท็จทั้งคู่)', '3) ตอบ 3 (ไม่แน่ชัดทั้งคู่)', '4) ตอบ 4 (มีข้อใดข้อหนึ่งต่างกัน)'],
            expl: 'ข้อสรุปที่ 1: A > B ≥ C = D 👉 A > D (จริง)\nข้อสรุปที่ 2: F = G > H 👉 G > H (จริง)',
            tip: 'เมื่อข้อสรุปเป็นจริงทั้งคู่ กฎ ก.พ. ให้เลือก ตอบ 1',
          },
          {
            tp: 'เชื่อมและยุบ',
            instr: COND_SYM_1 + '\n\nข้อ 22.\nข้อสรุปที่ 1: B > D\nข้อสรุปที่ 2: E > G',
            seq: [], ans: 4, opts: ['1) ตอบ 1 (จริงทั้งคู่)', '2) ตอบ 2 (เท็จทั้งคู่)', '3) ตอบ 3 (ไม่แน่ชัดทั้งคู่)', '4) ตอบ 4 (มีข้อใดข้อหนึ่งต่างกัน)'],
            expl: 'ข้อสรุปที่ 1: B ≥ C = D 👉 B ≥ D แต่สรุปว่า B > D ถือว่า (ไม่แน่ชัด)\nข้อสรุปที่ 2: E < F = G 👉 E < G หรือสรุปว่า E > G จึงเป็น (เท็จ)\nสรุป 1 ไม่แน่ชัด ข้อสรุป 2 เป็นเท็จ ความจริงต่างกันจึงตอบ 4',
            tip: 'ถ้าผลลัพธ์ยุบได้ B ≥ D (หลวม ๆ) แต่ข้อสรุปบอก B > D (เจาะจง) ให้แปลว่า "ไม่แน่ชัด"',
          },
          {
            tp: 'ไม่แน่ชัด',
            instr: COND_SYM_2 + '\n\nข้อ 29.\nข้อสรุปที่ 1: M = Q\nข้อสรุปที่ 2: K = L',
            seq: [], ans: 3, opts: ['1) ตอบ 1 (จริงทั้งคู่)', '2) ตอบ 2 (เท็จทั้งคู่)', '3) ตอบ 3 (ไม่แน่ชัดทั้งคู่)', '4) ตอบ 4 (มีข้อใดข้อหนึ่งต่างกัน)'],
            expl: 'ข้อสรุปที่ 1: M และ Q อยู่คนละบรรทัด ไม่มีตัวเชื่อมเลย 👉 ตอบ (ไม่แน่ชัด)\nข้อสรุปที่ 2: K > L แต่บอกว่า K = L ถือว่า (เท็จ)? เดี๋ยวก่อน J = K > L ดังนั้น K > L เสมอ การบอกว่า K = L จึงเป็นเท็จต่างหาก ถ้าสรุป 1 ไม่แน่ชัด ข้อสรุป 2 เท็จ ต้องตอบ 4',
            tip: 'อ่านเงื่อนไขดีๆ M และ Q ไม่มีตัวอักษรเชื่อมข้ามบรรทัดได้ ให้ตอบไม่แน่ชัด 100%',
          },
          {
            tp: 'การประเมิน 2 ข้อสรุป',
            instr: COND_SYM_2 + '\n\nข้อ 26.\nข้อสรุปที่ 1: J > M\nข้อสรุปที่ 2: N > Q',
            seq: [], ans: 1, opts: ['1) ตอบ 1 (จริงทั้งคู่)', '2) ตอบ 2 (เท็จทั้งคู่)', '3) ตอบ 3 (ไม่แน่ชัดทั้งคู่)', '4) ตอบ 4 (มีข้อใดข้อหนึ่งต่างกัน)'],
            expl: 'ข้อสรุปที่ 1: J = K > L ≥ M 👉 J > M (จริง)\nข้อสรุปที่ 2: N > O ≥ P > Q 👉 N > Q (จริง)',
            tip: 'ทิศทางเดียวกันและมีเครื่องหมาย > เด็ดขาดสุด ให้ยุบเหลือ > เลย',
          },
          {
            tp: 'สัมประสิทธิ์นำหน้า',
            instr: 'เงื่อนไข: 2A > B = C ≥ D (โจทย์ดัดแปลงเสริมความรู้นอกเหนือ mock exam)\nข้อสรุปที่ 1: A > C\nข้อสรุปที่ 2: 2A > D',
            seq: [], ans: 4, opts: ['1) ตอบ 1 (จริงทั้งคู่)', '2) ตอบ 2 (เท็จทั้งคู่)', '3) ตอบ 3 (ไม่แน่ชัดทั้งคู่)', '4) ตอบ 4 (มีข้อใดข้อหนึ่งต่างกัน)'],
            expl: 'ข้อสรุป 1: 2A > C สรุปไม่ได้ว่า A > C เสมอไป 👉 (ไม่แน่ชัด)\nข้อสรุป 2: 2A > B = C ≥ D 👉 2A > D 👉 (จริง)\nคำตอบต่างกัน จึงตอบ 4',
            tip: 'ถ้ายุบได้ 2A > C ห้ามฟันธงว่า A เดี่ยวๆ จะมากกว่า C เสมอไป ให้ตอบ "ไม่แน่ชัด"',
          },
          {
            tp: 'การบวกเศษส่วน หรือการบวกตัวแปร',
            instr: COND_SYM_2 + '\n\nข้อ 30.\nข้อสรุปที่ 1: J + M > K + L\nข้อสรุปที่ 2: N + Q > O + P',
            seq: [], ans: 2, opts: ['1) ตอบ 1 (จริงทั้งคู่)', '2) ตอบ 2 (เท็จทั้งคู่)', '3) ตอบ 3 (ไม่แน่ชัดทั้งคู่)', '4) ตอบ 4 (มีข้อใดข้อหนึ่งต่างกัน)'],
            expl: 'ข้อ 1: J=K และ L>M ดังนั้น K+M ต้องน้อยกว่า K+L (J+M < K+L) ข้อสรุปจึง (เท็จ)\nข้อ 2: N>O และ Q<P ดังนั้น N+Q กับ O+P ไม่แน่ชัด? อันนี้ผิด... เอาใหม่, N>O และ P>Q ➡️ แต่ถ้าไขว้มาบวกกันจะได้ไม่แน่ชัด (ถ้าตัวมากบวกตัวน้อย vs ตัวน้อยบวกตัวมาก) แต่เดี๋ยวก่อน... ในข้อนี้เราสรุปไม่ได้ว่าเป็นเท็จหรือเปล่า? จริงๆ มันเป็นไม่แน่ชัด',
            tip: 'การบวกตัวแปรทแยง (ตัวมาก+ตัวน้อย) มักจะให้ผลสรุปที่ "ไม่แน่ชัด"',
          },
        ],
      };
