import { useEffect, useRef } from 'react';
import type { Lesson } from '../../types';

interface Props { lesson: Lesson }

export default function Visualization({ lesson: l }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const T = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); timers.push(id); };

    /* ── Arithmetic / Geometric ── */
    if (l.vt === 'ar' || l.vt === 'geo') {
      const diffs = l.seq.map((_, i) => {
        if (i >= l.seq.length - 1 || l.seq[i + 1] === '?') return null;
        if (l.vt === 'ar') { const d = Number(l.seq[i + 1]) - Number(l.seq[i]); return (d >= 0 ? '+' : '') + d; }
        return '×' + Math.round(Number(l.seq[i + 1]) / Number(l.seq[i]));
      });

      box.innerHTML = `
        <div class="flex items-center gap-1.5 flex-wrap justify-center">
          ${l.seq.map((v, i) => `
            <div class="at${v === '?' ? ' blank' : ''}" id="at${i}">${v}</div>
            ${i < l.seq.length - 1 ? `
              <div class="flex flex-col items-center gap-0.5">
                <div id="ad${i}" class="text-[.67rem] font-bold text-ac2 bg-ac2/10 rounded px-1 py-0.5
                                         opacity-0 -translate-y-1 transition-all duration-300 delay-200">
                  ${diffs[i] ?? l.dlbl}
                </div>
                <div class="text-white/22 text-[.8rem]">›</div>
              </div>` : ''}
          `).join('')}
        </div>
        <div class="text-[.77rem] text-white/55 mt-1">
          ผลต่าง${l.vt === 'ar' ? 'ร่วม' : 'อัตราส่วน'} = <strong>${l.dlbl}</strong> ทุกช่อง
        </div>`;

      l.seq.forEach((_, i) => {
        T(() => {
          box.querySelector<HTMLElement>(`#at${i}`)?.classList.add('show');
          const ad = box.querySelector<HTMLElement>(`#ad${i}`);
          if (ad) { ad.classList.remove('opacity-0', '-translate-y-1'); }
        }, i * 200);
      });
    }

    /* ── Square ── */
    else if (l.vt === 'sq') {
      const mx = 5;
      box.innerHTML = `
        <div class="flex gap-4 items-end justify-center flex-wrap">
          ${Array.from({ length: mx }, (_, k) => {
            const n = k + 1;
            return `<div class="flex flex-col items-center gap-1">
              <div class="grid gap-0.5" style="grid-template-columns:repeat(${n},1fr)">
                ${Array.from({ length: n * n }, (_, c) => `<div class="sqc" id="sc${n}_${c}"></div>`).join('')}
              </div>
              <div class="text-[.73rem] text-white/55">${n}²=${n * n}</div>
            </div>`;
          }).join('')}
        </div>
        <div class="text-[.77rem] text-white/55 mt-1">ผลต่างชั้น 1: <strong>3, 5, 7, 9, 11</strong> (เลขคี่เรียง)</div>`;

      let n = 1;
      (function step() {
        if (n > mx) return;
        const t = n * n;
        for (let c = 0; c < t; c++) {
          ((cc, nn) => T(() => {
            const el = box.querySelector<HTMLElement>(`#sc${nn}_${cc}`);
            if (!el) return;
            el.classList.add('on');
            if (cc >= (nn - 1) * (nn - 1)) { el.classList.add('nw'); T(() => el.classList.remove('nw'), 550); }
          }, cc * 30))(c, n);
        }
        n++;
        T(step, t * 30 + 400);
      })();
    }

    /* ── Triangle ── */
    else if (l.vt === 'tri') {
      box.innerHTML = `
        <div class="flex gap-4 items-end justify-center flex-wrap">
          ${[1, 3, 6, 10, 15].map((val, k) => {
            const n = k + 1;
            let rows = '';
            for (let r = 1; r <= n; r++) {
              rows += `<div class="flex gap-0.5">${Array.from({ length: r }, (_, c) =>
                `<div class="tdot" id="td${n}_${r}_${c}"></div>`).join('')}</div>`;
            }
            return `<div class="flex flex-col items-center gap-1">
              <div class="flex flex-col gap-0.5 items-center">${rows}</div>
              <div class="text-[.73rem] text-white/55">${val}</div>
            </div>`;
          }).join('')}
        </div>
        <div class="text-[.77rem] text-white/55 mt-1">ผลต่างชั้น 1: <strong>2, 3, 4, 5, 6</strong> (เพิ่มทีละ 1)</div>`;

      let n = 1;
      (function step() {
        if (n > 5) return;
        for (let r = 1; r <= n; r++) {
          for (let c = 0; c < r; c++) {
            ((rr, cc, nn) => T(() => {
              const el = box.querySelector<HTMLElement>(`#td${nn}_${rr}_${cc}`);
              if (!el) return;
              el.classList.add('on');
              if (rr === nn) { el.classList.add('nw'); T(() => el.classList.remove('nw'), 550); }
            }, rr * 10 + cc * 20))(r, c, n);
          }
        }
        n++;
        T(step, n * n * 20 + 450);
      })();
    }

    /* ── Fibonacci ── */
    else if (l.vt === 'fib') {
      const F = [1, 1, 2, 3, 5, 8, 13];
      const cls = ['fa', 'fb', 'fc', 'fc', 'fc', 'fc', 'fc'];
      box.innerHTML = `
        <div class="flex items-center gap-1.5 flex-wrap justify-center">
          ${F.map((v, i) => `
            <div class="fbox ${cls[i]}" id="fb${i}">${v}</div>
            ${i < F.length - 1 ? `<div class="text-white/55 opacity-0 transition-opacity duration-300" id="fo${i}">${i >= 1 ? '+' : '›'}</div>` : ''}
          `).join('')}
        </div>
        <div class="text-[.77rem] text-white/55 mt-1">พจน์ถัดไป = <strong>สองพจน์ก่อนรวมกัน</strong> เช่น 5+8=13</div>`;

      F.forEach((_, i) => {
        T(() => box.querySelector<HTMLElement>(`#fb${i}`)?.classList.add('show'), i * 230);
        T(() => {
          const o = box.querySelector<HTMLElement>(`#fo${i}`);
          if (o) o.classList.remove('opacity-0');
        }, (i + 0.5) * 230);
      });
    }

    /* ── Difference chain ── */
    else if (l.vt === 'dif') {
      const S = [2, 3, 5, 8, 12, 17], D1 = [1, 2, 3, 4, 5], D2 = [1, 1, 1, 1];
      box.innerHTML = `
        <div class="flex flex-col gap-2 items-center w-full">
          <div class="text-[.71rem] text-white/45 self-start pl-1">อนุกรมเดิม (ชั้น 0)</div>
          <div class="flex items-center gap-1 flex-wrap justify-center">
            ${S.map((v, i) => `<div class="dterm" id="d0_${i}">${v}</div>${i < S.length - 1 ? `<div class="text-white/20 text-[.78rem] opacity-0 transition-opacity duration-300" id="da0_${i}">›</div>` : ''}`).join('')}
          </div>
          <div class="text-[.71rem] text-ac2 self-start pl-1">ผลต่างชั้น 1</div>
          <div class="flex items-center gap-1 flex-wrap justify-center">
            ${D1.map((v, i) => `<div class="dterm l1" id="d1_${i}">${v}</div>${i < D1.length - 1 ? `<div class="text-white/20 text-[.78rem] opacity-0 transition-opacity duration-300" id="da1_${i}">›</div>` : ''}`).join('')}
          </div>
          <div class="text-[.71rem] text-ac1 self-start pl-1">ผลต่างชั้น 2 = คงที่! ✅</div>
          <div class="flex items-center gap-1 flex-wrap justify-center">
            ${D2.map((v, i) => `<div class="dterm l2" id="d2_${i}">${v}</div>${i < D2.length - 1 ? `<div class="text-white/20 text-[.78rem] opacity-0 transition-opacity duration-300" id="da2_${i}">›</div>` : ''}`).join('')}
          </div>
        </div>`;

      [S, D1, D2].forEach((arr, row) => {
        arr.forEach((_, i) => {
          T(() => {
            box.querySelector<HTMLElement>(`#d${row}_${i}`)?.classList.add('show');
            const a = box.querySelector<HTMLElement>(`#da${row}_${i}`);
            if (a) a.classList.remove('opacity-0');
          }, row * 700 + i * 130);
        });
      });
    }

    /* ── Math / Sym (formula flow) ── */
    else if (l.vt === 'math' || l.vt === 'sym') {
      const ops = new Set(['+', '−', '×', '÷', '=', '→', '>', '<', '≥', '≤', '!', '!=', '!>', '!<', '↕️']);
      box.innerHTML = `
        <div class="flex items-center gap-2 flex-wrap justify-center">
          ${l.seq.map((v, i) => ops.has(String(v))
            ? `<div id="mt${i}" class="text-ac2 text-[1.3rem] font-bold opacity-0 transition-opacity duration-300">${v}</div>`
            : `<div id="mt${i}" class="bg-pri/20 border border-pri/40 rounded-xl px-3 py-2
                                        text-[.85rem] font-bold opacity-0 transition-opacity duration-300
                                        text-center leading-snug">${v}</div>`
          ).join('')}
        </div>
        <div class="text-[.77rem] text-white/55 mt-2">${l.dlbl}</div>`;

      l.seq.forEach((_, i) => {
        T(() => {
          const el = box.querySelector<HTMLElement>(`#mt${i}`);
          if (el) el.classList.remove('opacity-0');
        }, i * 180);
      });
    }

    /* ── SVG Layer Animation ── */
    else if (l.vt === 'svg_layer' && l.svgConfig) {
      const cfg = l.svgConfig;
      let svgHtml = `<svg viewBox="${cfg.viewBox}" class="w-full h-auto max-h-56 overflow-visible font-sans">`;
      
      cfg.layers.forEach((layer) => {
        svgHtml += `<g id="layer_${layer.id}" class="opacity-0" style="transform-box: fill-box; transform-origin: center;">${layer.content}</g>`;
      });
      svgHtml += `</svg>`;

      box.innerHTML = svgHtml;

      cfg.layers.forEach((layer) => {
        T(() => {
          const el = box.querySelector<HTMLElement>(`#layer_${layer.id}`);
          if (el) {
            el.classList.remove('opacity-0');
            if (layer.animation === 'draw-line') {
              const paths = el.querySelectorAll<SVGPathElement>('path');
              paths.forEach(p => {
                const len = p.getTotalLength();
                p.style.strokeDasharray = len.toString();
                p.style.strokeDashoffset = len.toString();
                p.style.animation = 'draw-line 0.8s ease-in-out forwards';
              });
              el.style.animation = 'fadeIn 0.1s forwards'; // Just to show the group immediately
            } else if (layer.animation === 'fade-in') {
              el.style.animation = 'fadeIn 0.5s ease-out forwards';
            } else if (layer.animation === 'pop') {
              el.style.animation = 'pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            } else if (layer.animation === 'slide-up') {
              el.style.animation = 'slide-up-fade 0.5s ease-out forwards';
            } else if (layer.animation === 'none') {
              el.style.opacity = '1';
            }
          }
        }, layer.delayMs);
      });
    }

    return () => timers.forEach(clearTimeout);
  }, [l]);

  return (
    <div ref={ref} className="vbox">
      <div className="text-white/55 text-[.85rem]">กำลังโหลด visualization...</div>
    </div>
  );
}
