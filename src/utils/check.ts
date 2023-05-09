import { FourDirectionStyle, HasThemeStyle } from "./formatStyle";
import { isPropertyAccessible } from "./type";

export const checkFourDirection = (
  target: unknown
): target is FourDirectionStyle => {
  if (typeof target === "number") {
    return true;
  }
  return (
    isPropertyAccessible(target) &&
    (Boolean(target.top) ||
      Boolean(target.right) ||
      Boolean(target.bottom) ||
      Boolean(target.left))
  );
};

export const checkFourDirectionHandler = (
  target: unknown
): target is {
  readonly handleFourDirection: (
    target: FourDirectionStyle | undefined
  ) => string;
} => {
  return isPropertyAccessible(target) && Boolean(target.handleFourDirection);
};

export const checkTheme = (target: unknown): target is HasThemeStyle => {
  if (typeof target === "string") {
    return true;
  }
  return (
    isPropertyAccessible(target) &&
    Boolean(target.dark) &&
    Boolean(target.light)
  );
};

export const checkThemeHandler = (
  target: unknown
): target is {
  readonly handleTheme: (
    target: HasThemeStyle | undefined,
    isDark: boolean
  ) => string;
} => {
  return isPropertyAccessible(target) && Boolean(target.handleTheme);
};
