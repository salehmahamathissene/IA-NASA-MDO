type LovableErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type LovableEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: LovableErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __lovableEvents?: LovableEvents;
  }
}

// src/lib/lovable-error-reporting.ts
export function reportLovableError(error: Error | unknown, context?: Record<string, unknown>) {
  const message = error instanceof Error 
    ? `${error.name}: ${error.message}\n${error.stack || ''}` 
    : String(error);

  console.error('[Aeroscape AI]', message, context);

  // Sentry (will activate once configured)
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, { extra: context });
  }
}

export default reportLovableError;