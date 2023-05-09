## ConsolePlay: A Fancy Console Output Library

ConsolePlay is a library that provides a way to output fancy and styled text in the browser console using Figlet fonts and custom style options.

## Quick Start

Install:
```
npm install console-play
```

Simple usage:

```ts
import { consolePlay } from "console-play";

consolePlay({
    text: "Hello, World!",
    options: {
        styleOptions: {
            color: "red",
        },
    },
});
```

In console:
<img src="https://user-images.githubusercontent.com/36734151/237031951-78ce243f-1703-4b01-b781-50c0282d4948.png">

### Features

- Output text using Figlet fonts (currently only Standard, but more Figlet fonts will be supported in the future).
- Custom styling options for the console output
- Dark mode support

## API
### consolePlay

| Property | Type | Required | Default | Description |
| -------- | ---- | -------- | ------- | ----------- |
| text | `string` | Yes | N/A | The text to be output in the console. |
| options | `ConsolePlayProps` | No | N/A | An object containing configuration options for the console output. |

### Option

| Property | Type | Required | Default | Description |
| -------- | ---- | -------- | ------- | ----------- |
| consoleType | `keyof typeof console` | No | "log" | The type of console output (e.g., log, error, warn, etc.). |
| wrapUnit | `string` | No | N/A | A string representing the character(s) to wrap around the text. this prop is alpha version. so it may not work. |
| styleOptions | `StyleOptions` | Yes | N/A | An object containing the style options for the console output. |
| styleDebug | `boolean` | No | `false` | A boolean flag to enable/disable style debugging.if `true` then console.log CSS style will be applied |

### Style Options

Style options is unfinished. So, it may not work except `color` and `backGroundColor`.

| Property | Type | Required | Default | Description |
| -------- | ---- | -------- | ------- | ----------- |
| imageUrl | `string` | Yes | N/A | URL of the image to be displayed as a background image. |
| color | `HasThemeStyle` | No | N/A | Text color. Can be a single color or an object with `light` and `dark` properties (can automatically switch between dark or light mode depending on the user's environment). |
| backgroundColor | `HasThemeStyle` | No | N/A | Background color. Can be a single color or an object with `light` and `dark` properties (can automatically switch between dark or light mode depending on the user's environment).|
| display | `"inline-block" \| "block" \| "flex" \| "grid"` | No | N/A | CSS display value. |
| padding | `FourDirectionStyle` | No | N/A | Padding around the text. Can be a single number or an object with `top`, `right`, `left`, and `bottom` properties. |
| margin | `FourDirectionStyle` | No | N/A | Margin around the text. Can be a single number or an object with `top`, `right`, `left`, and `bottom` properties. |
| boxShadow | `string` | No | N/A | CSS box-shadow value. such as box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);|

The `HasThemeStyle` type is defined as follows:

```typescript
type HasThemeStyle =
  | string
  | {
      light: string;
      dark: string;
    };
```

The `FourDirectionStyle` type is defined as follows:

```typescript
type FourDirectionStyle =
  | number
  | {
      top?: number;
      right?: number;
      left?: number;
      bottom?: number;
    };
```

For more information on `HasThemeStyle` and `FourDirectionStyle`, please refer to the original code provided.
## License
[MIT © skyt-a](./LICENSE)
