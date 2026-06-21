'use client';

import React from 'react';

// Polyfill React.useEffectEvent if it's missing (common in Next.js 15 pre-compiled React 19 RC runtime)
if (typeof window !== 'undefined' && typeof (React as any).useEffectEvent === 'undefined') {
  (React as any).useEffectEvent = function useEffectEvent<T extends Function>(callback: T): T {
    const ref = React.useRef<T>(callback);
    
    // Update ref in insertion phase to prevent stale closures
    React.useInsertionEffect(() => {
      ref.current = callback;
    });
    
    // Return stable callback that routes calls to the latest ref
    return React.useCallback((...args: any[]) => {
      return ref.current(...args);
    }, []) as any;
  };
}

export default function ReactPolyfill() {
  return null;
}
