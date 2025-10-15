/**
 * TypeScript types for SVGL API responses
 */

export type ThemeOptions = {
  dark: string;
  light: string;
};

export interface SVG {
  id: number;
  title: string;
  category: string | string[];
  route: string | ThemeOptions;
  url: string;
  wordmark?: string | ThemeOptions;
  brandUrl?: string;
}

export interface Category {
  category: string;
  total: number;
}

export interface SvglApiError {
  error: string;
  message: string;
}
