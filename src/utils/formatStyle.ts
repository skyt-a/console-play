import {
  checkFourDirection,
  checkFourDirectionHandler,
  checkTheme,
  checkThemeHandler,
} from "./check";
import { typedObjectKey } from "./type";

export type HasThemeStyle =
  | string
  | {
      light: string;
      dark: string;
    };
export type FourDirectionStyle =
  | number
  | {
      top?: number;
      right?: number;
      left?: number;
      bottom?: number;
    };

export type StyleOptions = {
  imageUrl: string;
  color?: HasThemeStyle;
  backgroundColor?: HasThemeStyle;
  display?: "inline-block" | "block" | "flex" | "grid";
  padding?: FourDirectionStyle;
  margin?: FourDirectionStyle;
  boxShadow?: string;
};

const handleFourDirection =
  (mode: "margin" | "padding") => (target: FourDirectionStyle | undefined) => {
    if (!target) {
      return "";
    }
    if (typeof target === "number") {
      return `${target}px`;
    }
    const targetKeys = typedObjectKey(target);
    return targetKeys.reduce((accum, key) => {
      if (
        ["top", "right", "bottom", "left"].includes(key) &&
        Boolean(target[key])
      ) {
        accum += `${mode}-${key}: ${target[key]}px;`;
      }
      return accum;
    }, "");
  };

const handleTheme =
  (mode: "color" | "background-color") =>
  (target: HasThemeStyle | undefined, isDark: boolean) => {
    if (!target) {
      return "";
    }
    if (typeof target === "string") {
      return `${mode}: ${target};`;
    }
    return `${mode}: ${isDark ? target.dark : target.light};`;
  };

const styleKeyToProps: Record<
  keyof StyleOptions,
  | string
  | {
      readonly handleFourDirection: (
        target: FourDirectionStyle | undefined
      ) => string;
    }
  | {
      readonly handleTheme: (
        target: HasThemeStyle | undefined,
        isDark: boolean
      ) => string;
    }
> = {
  imageUrl: "background-image",
  color: { handleTheme: handleTheme("color") },
  backgroundColor: { handleTheme: handleTheme("background-color") },
  display: "display",
  padding: {
    handleFourDirection: handleFourDirection("padding"),
  },
  margin: {
    handleFourDirection: handleFourDirection("margin"),
  },
  boxShadow: "box-shadow",
} as const;

export const formatStyleOptions = (
  styleOptions?: StyleOptions,
  isDark?: boolean
) => {
  if (!styleOptions) {
    return "";
  }
  return (Object.keys(styleOptions) as (keyof StyleOptions)[]).reduce(
    (acc, key) => {
      const value = styleOptions[key];
      const mapKey = styleKeyToProps[key];
      if (typeof mapKey === "string") {
        acc += `${mapKey}: ${value};`;
      } else if (
        checkFourDirection(value) &&
        checkFourDirectionHandler(mapKey)
      ) {
        acc += mapKey.handleFourDirection(value);
      } else if (checkTheme(value) && checkThemeHandler(mapKey)) {
        acc += mapKey.handleTheme(value, Boolean(isDark));
      } else if (key === "imageUrl") {
        acc += `${mapKey}: url(${value});`;
      }
      return acc;
    },
    ""
  );
};
