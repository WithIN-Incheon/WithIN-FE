//usePageTracking.ts 고려 
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export {};