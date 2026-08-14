// Type declarations for static imports used in the project
// Prevents TypeScript errors like "Cannot find module or type declarations for side-effect import of './globals.css'"

declare module '*.css';
declare module '*.scss';
declare module '*.sass';

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.avif';

declare module '*.svg' {
  const content: string;
  export default content;
}

// Ensure this file is treated as a module
export {};
