'use client';

import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface NumberTickerProps extends ComponentPropsWithoutRef<'span'> {
    value: number;
    startValue?: number;
    direction?: 'up' | 'down';
    delay?: number;
    decimalPlaces?: number;
    prefix?: string;
}

export function NumberTicker({
    value,
    startValue = 0,
    direction = 'up',
    delay = 0,
    className,
    decimalPlaces = 0,
    prefix = "",
    ...props
}: NumberTickerProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === 'down' ? value : startValue);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: '0px' });

    // ✅ Ensure initial render (handles 0 or same values properly)
    useEffect(() => {
        if (ref.current) {
            ref.current.textContent = `${prefix}${Intl.NumberFormat('en-US', {
                minimumFractionDigits: decimalPlaces,
                maximumFractionDigits: decimalPlaces,
            }).format(value)}`;
        }
    }, [value, prefix, decimalPlaces]);

    // Animate when value changes and is in view
    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                motionValue.set(direction === 'down' ? startValue : value);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [motionValue, isInView, delay, value, direction, startValue]);

    // Sync spring value to DOM
    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Intl.NumberFormat('en-US', {
                    minimumFractionDigits: decimalPlaces,
                    maximumFractionDigits: decimalPlaces,
                }).format(Number(latest.toFixed(decimalPlaces)))}`;
            }
        });
        return unsubscribe;
    }, [springValue, decimalPlaces, prefix]);

    return (
        <span
            ref={ref}
            className={cn('inline-block tabular-nums tracking-wider text-black dark:text-white', className)}
            {...props}
        />
    );
}
