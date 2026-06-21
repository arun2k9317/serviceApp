'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface CounterProps {
  value: number;
  suffix?: string;
}

export default function Counter({ value, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  
  // Spring animation options for smooth counter physics
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });
  
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-IN').format(
          Math.floor(latest)
        ) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>0{suffix}</span>;
}
