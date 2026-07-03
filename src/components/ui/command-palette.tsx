"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site";

type CommandItem = {
  id: string;
  label: string;
  action: () => void;
  shortcut?: string;
};
function createCommands(onClose: () => void): CommandItem[] {
  return [
    {
      id: "projects",
      label: "View Projects",
      action: () => {
        scrollToElement("project-1");
        onClose();
      },
      shortcut: "W",
    },
    {
      id: "contact",
      label: "Get in Touch",
      action: () => {
        window.location.href = `mailto:${siteConfig.email}`;
        onClose();
      },
      shortcut: "C",
    },
    {
      id: "github",
      label: "GitHub",
      action: () => {
        window.open(siteConfig.links.github, "_blank");
        onClose();
      },
      shortcut: "G",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      action: () => {
        window.open(siteConfig.links.linkedin, "_blank");
        onClose();
      },
      shortcut: "L",
    },
    {
  id: "resume",
  label: "Resume",
  action: () => {
    const link = document.createElement("a");
    link.href = siteConfig.links.resume;
    link.download = "Jashan_Gupta_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  },
  shortcut: "R",
},
  ];
}

function scrollToElement(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, close]);

  const commands = useMemo(() => createCommands(close), [close]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  const handleNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % commands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + commands.length) % commands.length,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        commands[selectedIndex].action();
      }
    },
    [isOpen, selectedIndex, commands],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleNavigation);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleNavigation);
    };
  }, [handleKeyDown, handleNavigation]);

  useEffect(() => {
    if (isOpen && !reducedMotion) {
      searchInputRef.current?.focus();
    }
  }, [isOpen, reducedMotion]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: DURATION.fast, ease: EASE.out }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              ref={panelRef}
              variants={reducedMotion ? undefined : panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: DURATION.section, ease: EASE.out }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/50"
            >
              <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  readOnly
                />
                <kbd className="hidden rounded border border-border-subtle bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[60vh] overflow-y-auto py-2">
                <div className="px-3 py-1.5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    Navigation
                  </p>
                </div>
                {commands.map((command, index) => (
                  <motion.button
                    key={command.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: index * 0.03,
                      duration: DURATION.fast,
                      ease: EASE.out,
                    }}
                    onClick={command.action}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                      selectedIndex === index
                        ? "bg-foreground/[0.04] text-foreground"
                        : "text-muted-foreground hover:bg-foreground/[0.02]",
                    )}
                  >
                    <span className="flex-1">{command.label}</span>
                    {command.shortcut && (
                      <kbd
                        className={cn(
                          "rounded border px-1.5 py-0.5 font-mono text-[10px]",
                          selectedIndex === index
                            ? "border-border bg-surface-elevated text-foreground"
                            : "border-border-subtle bg-surface-elevated text-muted-foreground",
                        )}
                      >
                        ⌘{command.shortcut}
                      </kbd>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border-subtle px-4 py-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <kbd className="rounded border border-border-subtle bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      ↑↓
                    </kbd>
                    <span className="text-[10px] text-muted-foreground">
                      to navigate
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="rounded border border-border-subtle bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      ↵
                    </kbd>
                    <span className="text-[10px] text-muted-foreground">
                      to select
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="rounded border border-border-subtle bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    esc
                  </kbd>
                  <span className="text-[10px] text-muted-foreground">
                    to close
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

CommandPalette.open = () => {
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true }),
  );
};
