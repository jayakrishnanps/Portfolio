import React, { useEffect, useRef } from 'react';

const HeroName: React.FC = () => {
  const name = 'Jayakrishnan PS';
  const chars = name.split('');
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const mainFont =
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    const scrambleFonts = [
      'Georgia, "Times New Roman", Times, serif',
      '"Courier New", Courier, "Lucida Console", monospace',
      '"Arial Black", "Helvetica Black", Arial, sans-serif',
      'Impact, Haettenschweiler, "Arial Black", sans-serif',
      'Verdana, Geneva, Tahoma, sans-serif',
      '"Trebuchet MS", "Lucida Sans", sans-serif',
    ];

    const START_PAUSE = 620;
    const FULL_SCRAMBLE_MS = 2350;
    const CYCLE_MS = 195;
    const SETTLE_STEP_MS = 105;

    let scrambleIntervalId: number | undefined;
    let settleTimerId: number | undefined;
    const settled = new Set<number>();

    const startTimeoutId = window.setTimeout(() => {
      scrambleIntervalId = window.setInterval(() => {
        chars.forEach((_, i) => {
          if (settled.has(i)) return;
          const font = scrambleFonts[Math.floor(Math.random() * scrambleFonts.length)];
          const span = letterRefs.current[i];
          if (span) {
            span.style.fontFamily = font;
          }
        });
      }, CYCLE_MS);

      window.setTimeout(() => {
        let current = 0;

        const settleStep = () => {
          if (current >= chars.length) {
            if (scrambleIntervalId !== undefined) {
              window.clearInterval(scrambleIntervalId);
            }
            letterRefs.current.forEach((span) => {
              if (span) {
                span.style.fontFamily = mainFont;
              }
            });
            return;
          }

          const span = letterRefs.current[current];
          if (span) {
            span.style.fontFamily = mainFont;
            span.classList.add('settled');
          }
          settled.add(current);
          current += 1;

          settleTimerId = window.setTimeout(settleStep, SETTLE_STEP_MS);
        };

        settleStep();
      }, FULL_SCRAMBLE_MS);
    }, START_PAUSE);

    return () => {
      window.clearTimeout(startTimeoutId);
      if (scrambleIntervalId !== undefined) window.clearInterval(scrambleIntervalId);
      if (settleTimerId !== undefined) window.clearTimeout(settleTimerId);
    };
  }, []);

  const mainFont =
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  return (
    <h1 className="hero-name tracking-[-3.75px] md:tracking-[-5px] leading-[0.86] text-[clamp(2.4rem,8.4vw,5.4rem)]">
      {chars.map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            letterRefs.current[index] = el;
          }}
          style={{ fontFamily: mainFont }}
          className="hero-letter"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
};

export default HeroName;
