import figlet from "figlet";
import { formatStyleOptions, StyleOptions } from "./utils/formatStyle";
// @ts-expect-error
import standard from "figlet/importable-fonts/Standard.js";

type ConsolePlayProps = {
  text: string;
  options?: Exclude<figlet.Options, "font"> & {
    consoleType?: "log" | "info" | "warn" | "error";
    wrapUnit?: string;
    styleOptions: StyleOptions;
    styleDebug?: boolean;
  };
};

figlet.parseFont("Standard", standard);
const isDark =
  globalThis !== undefined &&
  globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches;

const consolePlay = ({ text, options }: ConsolePlayProps) => {
  const {
    consoleType = "log",
    wrapUnit,
    styleOptions,
    styleDebug,
    ...rest
  } = options ?? {};
  console.log(formatStyleOptions(styleOptions, isDark));
  figlet.text(text, rest, (err, data) => {
    let target = data;
    if (wrapUnit) {
      const splited = data?.split("\n");
      const maxLen = splited?.reduce((accum, curr) => {
        return Math.max(
          accum,
          curr?.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g)?.length ?? 0
        );
      }, 0);
      const line = [...Array(maxLen)].map(() => wrapUnit).join("");
      target = [
        line,
        ...(splited?.map((s) => `${wrapUnit}${s}${wrapUnit}`) ?? []),
        line,
      ].join("\n");
    }
    if (err) {
      console.error("Something went wrong...");
      return;
    }
    const targetFunc = console[consoleType];
    const style = formatStyleOptions(styleOptions, isDark);
    if (styleDebug) {
      console.log("style is:", style);
    }
    targetFunc(`%c${target}`, style);
  });
};

export { consolePlay, ConsolePlayProps, StyleOptions };
