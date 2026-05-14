"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const ASCII_3HX = `  ____  _   _ __  __
 |__ / | | | |\\ \\/ /
  |_ \\ | |_| | >  <
 |___/ |_| |_|/_/\\_\\`;

type BootLine = { t: string; d: number; prompt?: boolean };

const BOOT_LINES: BootLine[] = [
  { t: "[  ok  ] mounting /dev/identity ...", d: 110 },
  { t: "[  ok  ] establishing secure channel ...", d: 130 },
  { t: "[  ok  ] decrypting payload (rsa-4096) ...", d: 160 },
  { t: "[  ok  ] loading profile: 3hx@3hx.me", d: 130 },
  { t: "[  ok  ] handshake complete.", d: 100 },
  { t: "", d: 60 },
  { t: "> whoami", d: 180, prompt: true },
];

function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const FONT = 14;
    let w = 0;
    let h = 0;
    let drops: number[] = [];
    const setup = () => {
      w = cv.width = window.innerWidth * dpr;
      h = cv.height = window.innerHeight * dpr;
      cv.style.width = window.innerWidth + "px";
      cv.style.height = window.innerHeight + "px";
      const cols = Math.floor(w / (FONT * dpr));
      drops = Array.from(
        { length: cols },
        () => (Math.random() * -h) / (FONT * dpr),
      );
    };
    setup();
    const chars =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ0123456789<>/\\#$%&@*+=".split("");
    let raf = 0;
    const tick = () => {
      ctx.fillStyle = "rgba(4,8,10,0.08)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${FONT * dpr}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[(Math.random() * chars.length) | 0];
        const x = i * FONT * dpr;
        const y = drops[i] * FONT * dpr;
        ctx.fillStyle = Math.random() < 0.018 ? "#7df9ff" : "#26606b";
        ctx.fillText(ch, x, y);
        drops[i] = y > h && Math.random() > 0.975 ? 0 : drops[i] + 1;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-65"
    />
  );
}

function GlitchText({ children }: { children: string }) {
  return (
    <span
      data-text={children}
      className="relative inline-block
        before:content-[attr(data-text)] before:absolute before:inset-0 before:pointer-events-none before:text-term-glitch-a before:[mix-blend-mode:screen] before:[clip-path:polygon(0_0,100%_0,100%_45%,0_45%)] before:animate-glitch-a
        after:content-[attr(data-text)] after:absolute after:inset-0 after:pointer-events-none after:text-term-glitch-b after:[mix-blend-mode:screen] after:[clip-path:polygon(0_55%,100%_55%,100%_100%,0_100%)] after:animate-glitch-b"
    >
      {children}
    </span>
  );
}

type SocialProps = {
  href: string;
  label: string;
  handle: string;
  icon: ReactNode;
  copyValue?: string;
};

function SocialLink({ href, label, handle, icon, copyValue }: SocialProps) {
  const [copied, setCopied] = useState(false);
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (copyValue) {
      e.preventDefault();
      navigator.clipboard?.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  };
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative grid grid-cols-[36px_1fr_auto] items-center gap-3.5 px-3.5 py-2.5 border border-term/20 rounded-md bg-black/25 text-term transition duration-150 hover:border-term/65 hover:bg-term/10 hover:translate-x-0.5"
    >
      <span className="grid place-items-center size-9 rounded-sm bg-term/10 text-term">
        {icon}
      </span>
      <span className="flex flex-col gap-px min-w-0">
        <span className="text-[10.5px] tracking-[0.14em] uppercase text-term/55">
          {label}
        </span>
        <span className="text-sm text-term [text-shadow:0_0_6px_rgba(125,249,255,0.45)] overflow-hidden text-ellipsis whitespace-nowrap">
          {copied ? "copied ✓" : handle}
        </span>
      </span>
      <span className="text-base text-term/60 transition duration-150 group-hover:translate-x-1 group-hover:text-term">
        →
      </span>
    </a>
  );
}

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const DiscordIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M19.5 5.5A16.5 16.5 0 0 0 15.5 4l-.3.6a13 13 0 0 0-6.4 0L8.5 4a16.5 16.5 0 0 0-4 1.5C2.2 9.4 1.5 13.1 1.9 16.8a16.7 16.7 0 0 0 5 2.5l.9-1.4a10.7 10.7 0 0 1-1.7-.8l.4-.3a11.8 11.8 0 0 0 10.9 0l.4.3a10.7 10.7 0 0 1-1.7.8l.9 1.4a16.7 16.7 0 0 0 5-2.5c.5-4.3-.4-8-2.5-11.3Z" />
    <circle cx="9" cy="13" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

const GitHubIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
  </svg>
);

const MailIcon = () => (
  <svg {...ICON_PROPS}>
    <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export default function Home() {
  const [step, setStep] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [revealStep, setRevealStep] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    if (step > BOOT_LINES.length) {
      setBootDone(true);
      return;
    }
    const cur = BOOT_LINES[step - 1];
    const delay =
      step === 0 ? 220 : (cur ? cur.d : 0) + Math.random() * 50;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (!bootDone) return;
    const steps = [0, 200, 360, 540, 720, 900];
    const timers = steps.map((d, i) =>
      setTimeout(() => setRevealStep(i + 1), d),
    );
    return () => timers.forEach(clearTimeout);
  }, [bootDone]);

  const show = (i: number) => revealStep >= i;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MatrixRain />

      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,transparent_35%,rgba(0,0,0,0.55)_75%,#000_100%)]" />

      <div
        aria-hidden
        className="fixed inset-0 z-[2] pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="fixed inset-0 z-[3] pointer-events-none mix-blend-overlay bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_3px)]" />

      <main className="relative z-[5] min-h-screen w-full max-w-[720px] mx-auto px-6 py-[6vh] flex flex-col justify-center gap-[18px] max-[540px]:px-3.5 max-[540px]:py-[4vh]">
        <div className="relative rounded-[10px] bg-[rgba(4,8,10,0.78)] border border-term/20 backdrop-blur-sm overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_30px_80px_rgba(0,0,0,0.6),0_0_60px_-10px_rgba(125,249,255,0.45)]">
          <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-term/15 bg-white/[0.02] text-[11px] text-term/55">
            <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.5)] shrink-0" />
            <span className="size-2.5 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.5)] shrink-0" />
            <span className="size-2.5 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.5)] shrink-0" />
            <span className="ml-2 opacity-70 max-[540px]:hidden">
              3hx@3hx.me — ~/profile — zsh
            </span>
            <span className="ml-auto opacity-45 tabular-nums">{date}</span>
          </div>

          <div className="px-6 pt-[22px] pb-[26px] text-sm leading-[1.55] text-term [text-shadow:0_0_8px_rgba(125,249,255,0.45)] min-h-[360px] max-[540px]:px-4 max-[540px]:pt-[18px] max-[540px]:pb-[22px] max-[540px]:text-[13px] max-[540px]:min-h-[320px]">
            <div className="mb-3">
              {BOOT_LINES.slice(0, step).map((l, i) => (
                <div
                  key={i}
                  className={`whitespace-pre opacity-0 animate-fade-in ${
                    l.prompt ? "text-term mt-1.5" : "text-term/80"
                  }`}
                >
                  {l.t || " "}
                </div>
              ))}
            </div>

            {bootDone && (
              <div className="flex flex-col gap-[14px]">
                <pre
                  className={`my-1 font-mono text-[11px] leading-[1.2] text-term [text-shadow:0_0_10px_rgba(125,249,255,0.45)] transition-all duration-[360ms] ease-out max-[540px]:text-[9px] ${
                    show(1)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
                >
                  {ASCII_3HX}
                </pre>

                <div
                  className={`flex items-center gap-2.5 mt-1.5 transition-all duration-[240ms] ${
                    show(2)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
                >
                  <span className="text-term/70">$</span>
                  <span className="text-term/85">cat ./identity.json</span>
                </div>

                <div
                  className={`mt-0.5 px-4 py-3.5 border border-dashed border-term/30 rounded-md bg-term/[0.02] grid grid-cols-[max-content_1fr] gap-y-1.5 gap-x-[18px] transition-all duration-[280ms] ${
                    show(3)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
                >
                  <span className="text-term/45 lowercase after:content-[':']">
                    user
                  </span>
                  <span className="text-term font-medium">
                    <GlitchText>3hx</GlitchText>
                  </span>
                  <span className="text-term/45 lowercase after:content-[':']">
                    role
                  </span>
                  <span className="text-term font-medium">Developer</span>
                  <span className="text-term/45 lowercase after:content-[':']">
                    host
                  </span>
                  <span className="text-term font-medium">3hx.me</span>
                  <span className="text-term/45 lowercase after:content-[':']">
                    status
                  </span>
                  <span className="inline-flex items-center gap-2 text-term font-medium">
                    <span className="size-2 rounded-full bg-term shadow-[0_0_8px_var(--color-term),0_0_16px_var(--color-term)] animate-pulse-dot" />
                    online
                  </span>
                </div>

                <div
                  className={`flex items-center gap-2.5 mt-[18px] transition-all duration-[240ms] ${
                    show(4)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
                >
                  <span className="text-term/70">$</span>
                  <span className="text-term/85">./connect --channels</span>
                </div>

                <div
                  className={`grid gap-2 mt-0.5 transition-all duration-[320ms] ${
                    show(5)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
                >
                  <SocialLink
                    icon={<DiscordIcon />}
                    label="discord"
                    handle="@solononforever_"
                    href="https://discord.com/users/1421273569198997595"
                  />
                  <SocialLink
                    icon={<GitHubIcon />}
                    label="github"
                    handle="/3hx"
                    href="https://github.com/3hx"
                  />
                  <SocialLink
                    icon={<MailIcon />}
                    label="email"
                    handle="dev@3hx.me"
                    href="mailto:dev@3hx.me"
                    copyValue="dev@3hx.me"
                  />
                </div>

                <div
                  className={`flex items-center gap-2 mt-3.5 transition-opacity duration-[240ms] ${
                    show(6) ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-term/70">$</span>
                  <span className="text-term/85">_</span>
                  <span className="inline-block w-2 h-4 bg-term shadow-[0_0_8px_rgba(125,249,255,0.45)] -mb-1 animate-blink" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-[11px] text-term/40 tracking-[0.04em]">
          <span className="hidden pointer-fine:inline">
            press{" "}
            <kbd className="font-mono px-1.5 py-px border border-term/30 rounded-sm bg-black/40 text-term text-[10px]">
              ⇥
            </kbd>{" "}
            to focus ·{" "}
          </span>
          this site has no analytics
        </div>
      </main>
    </div>
  );
}
