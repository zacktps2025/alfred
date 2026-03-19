// Alfred — Terminal Branding & 16-bit Wizard
// ASCII art, pixel wizard, colors, and box drawing for the premium install experience

import pc from "picocolors";

const V = (s: string) => pc.magenta(s);
const B = (s: string) => pc.blue(s);
const DIM = (s: string) => pc.dim(s);
const BOLD = (s: string) => pc.bold(s);
const GREEN = (s: string) => pc.green(s);
const YELLOW = (s: string) => pc.yellow(s);
const RED = (s: string) => pc.red(s);
const CYAN = (s: string) => pc.cyan(s);

// ─── 16-bit Pixel Wizard ─────────────────────────────────────

const WIZARD_IDLE = [
  `       ${V("*")}`,
  `      ${V("/ \\")}`,
  `     ${V("/   \\")}`,
  `    ${V("/_____\\")}`,
  `    ${B("|")} ${pc.white("o o")} ${B("|")}`,
  `    ${B("|")}  ${pc.white(">")}  ${B("|")}`,
  `    ${B("|")} ${pc.white("___")} ${B("|")}`,
  `   ${V("/|")}     ${V("|\\")}`,
  `  ${V("/_|")} ${CYAN("~*~")} ${V("|_\\")}`,
  `     ${V("|")}     ${V("|")}`,
  `     ${V("|")}     ${V("|")}`,
  `    ${V("/_\\")}   ${V("/_\\")}`,
];

const WIZARD_CAST = [
  `      ${YELLOW("*")}${V("*")}${CYAN("*")}`,
  `      ${V("/ \\")}`,
  `     ${V("/   \\")}`,
  `    ${V("/_____\\")}`,
  `    ${B("|")} ${pc.white("^ ^")} ${B("|")}`,
  `    ${B("|")}  ${pc.white("o")}  ${B("|")}`,
  `    ${B("|")} ${pc.white("___")} ${B("|")}`,
  `  ${YELLOW("*")}${V("/|")}     ${V("|\\")}${CYAN("*")}`,
  `  ${V("/_|")} ${YELLOW("~*~")} ${V("|_\\")}`,
  `     ${V("|")}     ${V("|")}`,
  `     ${V("|")}     ${V("|")}`,
  `    ${V("/_\\")}   ${V("/_\\")}`,
];

const WIZARD_HAPPY = [
  `       ${YELLOW("*")}`,
  `      ${V("/ \\")}`,
  `     ${V("/   \\")}`,
  `    ${V("/_____\\")}`,
  `    ${B("|")} ${pc.white("^ ^")} ${B("|")}`,
  `    ${B("|")}  ${pc.white("v")}  ${B("|")}`,
  `    ${B("|")} ${pc.white("\\-/")} ${B("|")}`,
  `   ${V("/|")}     ${V("|\\")}`,
  `  ${V("/_|")} ${GREEN("~*~")} ${V("|_\\")}`,
  `     ${V("|")}     ${V("|")}`,
  `     ${V("|")}     ${V("|")}`,
  `    ${V("/_\\")}   ${V("/_\\")}`,
];

export function getWizard(state: "idle" | "cast" | "happy" = "idle"): string {
  const frames = { idle: WIZARD_IDLE, cast: WIZARD_CAST, happy: WIZARD_HAPPY };
  return frames[state].join("\n");
}

// ─── Logo ─────────────────────────────────────────────────────

export const LOGO = `
${V("  ╔══════════════════════════════════════════════════════════╗")}
${V("  ║")}                                                          ${V("║")}
${V("  ║")}     ${BOLD(V("█████╗ ██╗     ███████╗██████╗ ███████╗██████╗"))}      ${V("║")}
${V("  ║")}    ${BOLD(V("██╔══██╗██║     ██╔════╝██╔══██╗██╔════╝██╔══██╗"))}     ${V("║")}
${V("  ║")}    ${BOLD(V("███████║██║     █████╗  ██████╔╝█████╗  ██║  ██║"))}     ${V("║")}
${V("  ║")}    ${BOLD(V("██╔══██║██║     ██╔══╝  ██╔══██╗██╔══╝  ██║  ██║"))}     ${V("║")}
${V("  ║")}    ${BOLD(V("██║  ██║███████╗██║     ██║  ██║███████╗██████╔╝"))}     ${V("║")}
${V("  ║")}    ${BOLD(V("╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═════╝"))}      ${V("║")}
${V("  ║")}                                                          ${V("║")}
${V("  ║")}        ${BOLD("The Agency Wizard — Now In Your Terminal")}          ${V("║")}
${V("  ║")}                                                          ${V("║")}
${V("  ╚══════════════════════════════════════════════════════════╝")}
`;

export const LOGO_SMALL = `
  ${BOLD(V("▄▀█ █░░ █▀▀ █▀█ █▀▀ █▀▄"))}
  ${BOLD(V("█▀█ █▄▄ █▀░ █▀▄ ██▄ █▄▀"))}
  ${DIM("The Agency Wizard — Your AI Brain")}
`;

// ─── Box drawing ──────────────────────────────────────────────

export function box(lines: string[], width = 48): string {
  const top = `  ${V("╭" + "─".repeat(width) + "╮")}`;
  const bottom = `  ${V("╰" + "─".repeat(width) + "╯")}`;
  const padded = lines.map((line) => {
    const stripped = line.replace(/\x1b\[[0-9;]*m/g, "");
    const padding = Math.max(0, width - 2 - stripped.length);
    return `  ${V("│")} ${line}${" ".repeat(padding)} ${V("│")}`;
  });
  return [top, ...padded, bottom].join("\n");
}

// ─── Status helpers ───────────────────────────────────────────

export function statusLine(label: string, status: "ok" | "warn" | "skip" | "coming"): string {
  const icons: Record<string, string> = {
    ok: GREEN("✓"),
    warn: YELLOW("!"),
    skip: DIM("○"),
    coming: B("~"),
  };
  return `${icons[status]} ${label}`;
}

export function sectionHeader(text: string): string {
  return `\n  ${BOLD(V(">>>"))} ${BOLD(text)}\n`;
}

export function success(text: string): string {
  return `  ${GREEN("+")} ${text}`;
}

export function warn(text: string): string {
  return `  ${YELLOW("!")} ${text}`;
}

export function info(text: string): string {
  return `  ${B("i")} ${text}`;
}

export function error(text: string): string {
  return `  ${RED("x")} ${text}`;
}

export function dim(text: string): string {
  return `  ${DIM(text)}`;
}

// ─── Wizard dialogue ──────────────────────────────────────────

export function wizardSays(text: string, state: "idle" | "cast" | "happy" = "idle"): string {
  const wizard = getWizard(state);
  const bubble = `  ${V(">")} ${BOLD(pc.white(text))}`;
  return `\n${wizard}\n\n${bubble}\n`;
}

export function wizardGreeting(): string {
  return wizardSays("Greetings, Digital Wizard. I am Alfred, your agency's AI brain.", "idle");
}

export function wizardSetupComplete(): string {
  return wizardSays("Your powers are configured. Go forth and conquer, wizard.", "happy");
}

export function wizardCasting(text: string): string {
  return wizardSays(text, "cast");
}

// ─── Animated loading bar ─────────────────────────────────────

export function loadingBar(label: string, progress: number, width = 30): string {
  const filled = Math.round(progress * width);
  const empty = width - filled;
  const bar = V("█".repeat(filled)) + DIM("░".repeat(empty));
  const pct = Math.round(progress * 100);
  return `  ${bar} ${DIM(`${pct}%`)} ${label}`;
}

// ─── Footer ───────────────────────────────────────────────────

export function footer(): string {
  return `\n  ${DIM("Alfred — The Open-Source Agency Brain")}
  ${DIM("Full dashboard:")} ${V("alfredify.com")}
`;
}

// ─── Spell cast animation frames (for loading states) ─────────

export const SPELL_FRAMES = [
  `  ${DIM(".")}`,
  `  ${V("*")}`,
  `  ${YELLOW("*")} ${V("*")}`,
  `  ${CYAN("*")} ${YELLOW("*")} ${V("*")}`,
  `  ${GREEN("*")} ${CYAN("*")} ${YELLOW("*")} ${V("*")}`,
  `    ${GREEN("*")} ${CYAN("*")} ${YELLOW("*")}`,
  `      ${GREEN("*")} ${CYAN("*")}`,
  `        ${GREEN("*")}`,
];
