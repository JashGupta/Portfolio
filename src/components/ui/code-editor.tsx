"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type TokenType =
  | "keyword"
  | "string"
  | "type"
  | "function"
  | "property"
  | "tag"
  | "attribute"
  | "comment"
  | "number"
  | "plain";

type CodeToken = { type: TokenType; text: string };
type CodeLineData = { indent: number; tokens: CodeToken[] };
type TabId = "about" | "skills" | "projects";

// ─── Token colours (Material Theme Darker palette) ────────────────────────────

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword:   "text-[#c792ea]",
  string:    "text-[#c3e88d]",
  type:      "text-[#ffcb6b]",
  function:  "text-[#82aaff]",
  property:  "text-[#f07178]",
  tag:       "text-[#89ddff]",
  attribute: "text-[#ffcb6b]",
  comment:   "text-[#546e7a] italic",
  number:    "text-[#f78c6c]",
  plain:     "text-[#8b949e]",
};

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: "about",    label: "about.ts"    },
  { id: "skills",   label: "skills.ts"   },
  { id: "projects", label: "projects.ts" },
];

// ─── Code content ─────────────────────────────────────────────────────────────

const LINES: Record<TabId, CodeLineData[]> = {

  // ── about.ts ──────────────────────────────────────────────────────────────
  about: [
  { indent: 0, tokens: [{ type: "keyword", text: "const" }, { type: "plain", text: " about = {" }] },

  { indent: 1, tokens: [{ type: "property", text: "name" }, { type: "plain", text: ": " }, { type: "string", text: '"Jashan Gupta"' }, { type: "plain", text: "," }] },

  { indent: 1, tokens: [{ type: "property", text: "role" }, { type: "plain", text: ": " }, { type: "string", text: '"Full Stack Developer"' }, { type: "plain", text: "," }] },

  { indent: 1, tokens: [{ type: "property", text: "location" }, { type: "plain", text: ": " }, { type: "string", text: '"Haryana, India"' }, { type: "plain", text: "," }] },

  { indent: 1, tokens: [{ type: "property", text: "techStack" }, { type: "plain", text: ": [" }] },

  { indent: 2, tokens: [
    { type: "string", text: '"React"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"Next.js"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"TypeScript"' },
    { type: "plain", text: "," }
  ]},

  { indent: 2, tokens: [
    { type: "string", text: '"Node.js"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"Express"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"MongoDB"' },
    { type: "plain", text: "," }
  ]},

  { indent: 1, tokens: [{ type: "plain", text: "]," }] },

{
  indent: 1,
  tokens: [
    { type: "property", text: "currently" },
    { type: "plain", text: ": " },
    { type: "string", text: '"Building full-stack applications while crafting polished and user-focused interfaces."' },
    { type: "plain", text: "," }
  ]
},

  { indent: 0, tokens: [{ type: "plain", text: "};" }] },

  { indent: 0, tokens: [] },

  { indent: 0, tokens: [{ type: "comment", text: "// Open to Full Stack & Frontend opportunities." }] },
],

skills: [
  { indent: 0, tokens: [{ type: "keyword", text: "const" }, { type: "plain", text: " skills = {" }] },

  { indent: 1, tokens: [{ type: "property", text: "languages" }, { type: "plain", text: ": [" }] },
  { indent: 2, tokens: [
    { type: "string", text: '"JavaScript"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"TypeScript"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"Java"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"C++"' }
  ]},
  { indent: 1, tokens: [{ type: "plain", text: "]," }] },

  { indent: 1, tokens: [{ type: "property", text: "frontend" }, { type: "plain", text: ": [" }] },
  { indent: 2, tokens: [
    { type: "string", text: '"React"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"Next.js"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"Tailwind CSS"' }
  ]},
  { indent: 1, tokens: [{ type: "plain", text: "]," }] },

  { indent: 1, tokens: [{ type: "property", text: "backend" }, { type: "plain", text: ": [" }] },
  { indent: 2, tokens: [
    { type: "string", text: '"Node.js"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"Express.js"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"MongoDB"' }
  ]},
  { indent: 1, tokens: [{ type: "plain", text: "]," }] },

  { indent: 1, tokens: [{ type: "property", text: "tools" }, { type: "plain", text: ": [" }] },
  { indent: 2, tokens: [
    { type: "string", text: '"Git"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"GitHub"' },
    { type: "plain", text: ", " },
    { type: "string", text: '"Postman"' }
  ]},
  { indent: 1, tokens: [{ type: "plain", text: "]," }] },

  { indent: 0, tokens: [{ type: "plain", text: "};" }] },
  { indent: 0, tokens: [{ type: "keyword", text: "export default" }, { type: "plain", text: " skills;" }] },
],

// ── projects.ts ─────────────────────────────────────────────
projects: [
  { indent: 0, tokens: [{ type: "keyword", text: "const" }, { type: "plain", text: " projects = [" }] },

  { indent: 1, tokens: [{ type: "plain", text: "{" }] },
  { indent: 2, tokens: [{ type: "property", text: "title" }, { type: "plain", text: ": " }, { type: "string", text: '"ExplorX"' }, { type: "plain", text: "," }] },
  { indent: 2, tokens: [{ type: "property", text: "summary" }, { type: "plain", text: ": " }, { type: "string", text: '"Premium booking experience focused on motion design"' }, { type: "plain", text: "," }] },
  { indent: 2, tokens: [{ type: "property", text: "stack" }, { type: "plain", text: ": " }, { type: "string", text: '"React • TypeScript • Tailwind"' }] },
  { indent: 1, tokens: [{ type: "plain", text: "}," }] },

  { indent: 1, tokens: [{ type: "plain", text: "{" }] },
  { indent: 2, tokens: [{ type: "property", text: "title" }, { type: "plain", text: ": " }, { type: "string", text: '"AstroCRM"' }, { type: "plain", text: "," }] },
  { indent: 2, tokens: [{ type: "property", text: "summary" }, { type: "plain", text: ": " }, { type: "string", text: '"CRM for astrologers with dashboards & client management"' }, { type: "plain", text: "," }] },
  { indent: 2, tokens: [{ type: "property", text: "stack" }, { type: "plain", text: ": " }, { type: "string", text: '"React • Node.js • MongoDB"' }] },
  { indent: 1, tokens: [{ type: "plain", text: "}," }] },

  { indent: 0, tokens: [{ type: "plain", text: "];" }] },
  { indent: 0, tokens: [{ type: "keyword", text: "export default" }, { type: "plain", text: " projects;" }] },
],
};

// Lines to highlight per tab
const ACTIVE_LINES: Record<TabId, number[]> = {
  about:    [2, 3, 5, 11, 13],
  skills:   [3, 9, 14, 16, 17],
  projects: [4, 7, 11, 14, 18],
};

// ─── CodeLine ─────────────────────────────────────────────────────────────────

function CodeLine({
  lineNumber,
  indent,
  tokens,
  active,
  showCursor,
}: {
  lineNumber: number;
  indent: number;
  tokens: CodeToken[];
  active?: boolean;
  showCursor?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[1.5rem] items-center px-4 transition-colors duration-500 ${
        active ? "bg-white/[0.04]" : ""
      }`}
    >
      <span className="w-8 shrink-0 select-none text-right font-mono text-[11px] text-[#3d4450]">
        {lineNumber}
      </span>
      <code className="flex-1 pl-4 font-mono text-[12.5px] leading-[1.625rem]">
        {indent > 0 && (
          <span className="whitespace-pre">{"  ".repeat(indent)}</span>
        )}
        {tokens.map((token, i) => (
          <span key={i} className={TOKEN_COLORS[token.type]}>
            {token.text}
          </span>
        ))}
        {showCursor && (
          <motion.span
            aria-hidden
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.49, 0.5, 1] }}
            className="ml-px inline-block h-[1.05rem] w-px translate-y-px bg-[#82aaff]"
          />
        )}
      </code>
    </div>
  );
}

// ─── CodeEditor ───────────────────────────────────────────────────────────────

export function CodeEditor() {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<TabId>("about");
  const [activeLine, setActiveLine] = useState(ACTIVE_LINES.about[0]);

  // Reset active line & restart cycle when tab changes
  useEffect(() => {
    setActiveLine(ACTIVE_LINES[activeTab][0]);
    if (reducedMotion) return;
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % ACTIVE_LINES[activeTab].length;
      setActiveLine(ACTIVE_LINES[activeTab][index]);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeTab, reducedMotion]);

  const lines = LINES[activeTab];

  return (
    <motion.div

      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={reducedMotion ? false : { opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.section, ease: EASE.out }}
      className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0d0d0f] shadow-[0_0_0_1px_rgba(250,250,250,0.04),0_32px_64px_-16px_rgba(0,0,0,0.7)]"
    >
      {/* ── Title bar ── */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#141416] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="ml-2 truncate font-mono text-[11px] text-[#4d5566]">
          jashan-gupta — ~/portfolio/{activeTab}.ts
        </span>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex border-b border-white/[0.06] bg-[#111113]">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 font-mono text-[11px] transition-colors duration-200 ${
                isActive
                  ? "bg-[#0d0d0f] text-[#cdd6f4]"
                  : "text-[#4d5566] hover:text-[#8b949e]"
              }`}
            >
              {tab.label}
              {/* active tab top indicator */}
              {isActive && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-x-0 top-0 h-px bg-[#82aaff]"
                  transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
                />
              )}
              {/* active tab bottom border reset */}
              {isActive && (
                <span className="absolute inset-x-0 bottom-[-1px] h-px bg-[#0d0d0f]" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Code viewport ── */}
      <div className="relative h-[300px] overflow-y-auto sm:h-[400px] sm:overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={reducedMotion ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.25, 0, 0, 1] }}
            className="h-full"
          >
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -(lines.length > 18 ? 56 : 0), 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: EASE.inOut }}
              className="py-3"
            >
              {lines.map((line, index) => {
                const lineNumber = index + 1;
                return (
                  <CodeLine
                    key={lineNumber}
                    lineNumber={lineNumber}
                    indent={line.indent}
                    tokens={line.tokens}
                    active={!reducedMotion && lineNumber === activeLine}
                    showCursor={!reducedMotion && lineNumber === activeLine}
                  />
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Status bar ── */}
      <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#007acc]/90 px-4 py-1.5">
        <span className="font-mono text-[10px] text-white/80">
          TypeScript · {activeTab}.ts
        </span>
        <span className="font-mono text-[10px] text-white/50">
          Ln {activeLine}, Col 12
        </span>
      </div>
    </motion.div>
  );
}