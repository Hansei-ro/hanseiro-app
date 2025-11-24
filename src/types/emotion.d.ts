import '@emotion/react';
import { Theme as MyTheme } from '../shared/theme';

declare module '@emotion/react' {
  export interface Theme extends MyTheme {}
}
