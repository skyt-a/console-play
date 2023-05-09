export const typedObjectKey = <T>(target: T): (keyof T)[] => {
  if (typeof target !== "object" || target === null) {
    throw new Error("not object!");
  }
  return Object.keys(target) as (keyof T)[];
};

export const isPropertyAccessible = (
  target: unknown
): target is { [key: string]: unknown } => {
  return typeof target === "object" && target !== null;
};
