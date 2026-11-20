'use client';

import { useGSAP } from '@gsap/react';
import { gsap as npmGsap } from 'gsap';
import { ScrollTrigger as npmScrollTrigger } from 'gsap/ScrollTrigger';
import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// Use the browser's gsap & ScrollTrigger if available (from index.html) or fallback to npm
const gsap = (typeof window !== 'undefined' && (window as any).gsap) || npmGsap;
const ScrollTrigger = (typeof window !== 'undefined' && (window as any).ScrollTrigger) || npmScrollTrigger;

if (typeof window !== 'undefined') {
  try {
    gsap.registerPlugin(ScrollTrigger);
    npmGsap.registerPlugin(npmScrollTrigger);
  } catch (e) {}
}

function useMergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) return null;
    return (node: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = node;
        }
      });
    };
  }, [refs]);
}

function useResponsiveValue(baseValue: number, mobileValue: number) {
  const [value, setValue] = useState(baseValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setValue(window.innerWidth < 768 ? mobileValue : baseValue);
    };

    handleResize();

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [baseValue, mobileValue]);

  return value;
}

export interface RadialScrollGalleryProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: (hoveredIndex: number | null) => ReactNode[];
  scrollDuration?: number;
  visiblePercentage?: number;
  baseRadius?: number;
  mobileRadius?: number;
  startTrigger?: string;
  onItemSelect?: (index: number) => void;
  direction?: 'ltr' | 'rtl';
  disabled?: boolean;
}

export const RadialScrollGallery = forwardRef<
  HTMLDivElement,
  RadialScrollGalleryProps
>(
  (
    {
      children,
      scrollDuration = 2500,
      visiblePercentage = 45,
      baseRadius = 550,
      mobileRadius = 220,
      className = '',
      startTrigger = 'center center',
      onItemSelect,
      direction = 'ltr',
      disabled = false,
      style,
      ...rest
    },
    ref
  ) => {
    const pinRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLUListElement>(null);
    const childRef = useRef<HTMLLIElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    const mergedRef = useMergeRefs(ref, pinRef);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [childSize, setChildSize] = useState<{ w: number; h: number } | null>(
      null
    );
    const [isMounted, setIsMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    const currentRadius = useResponsiveValue(baseRadius, mobileRadius);
    const circleDiameter = currentRadius * 2;

    useEffect(() => {
      if (typeof window === 'undefined') return;
      const updateDesktop = () => setIsDesktop(window.innerWidth >= 768);
      updateDesktop();
      window.addEventListener('resize', updateDesktop);
      return () => window.removeEventListener('resize', updateDesktop);
    }, []);

    const { visibleDecimal, hiddenDecimal } = useMemo(() => {
      const clamped = Math.max(10, Math.min(100, visiblePercentage));
      const v = clamped / 100;
      return { visibleDecimal: v, hiddenDecimal: 1 - v };
    }, [visiblePercentage]);

    const childrenNodes = useMemo(
      () => React.Children.toArray(children(hoveredIndex)),
      [children, hoveredIndex]
    );
    const childrenCount = childrenNodes.length;

    useEffect(() => {
      setIsMounted(true);

      if (!childRef.current) return;

      const observer = new ResizeObserver((entries) => {
        let hasChanged = false;
        for (const entry of entries) {
          setChildSize({
            w: entry.contentRect.width,
            h: entry.contentRect.height,
          });
          hasChanged = true;
        }
        if (hasChanged) {
          ScrollTrigger.refresh();
        }
      });

      observer.observe(childRef.current);
      return () => observer.disconnect();
    }, [childrenCount]);

    // Pure ScrollSmoother-compatible scroll runway:
    // Reads getBoundingClientRect() every animation frame (works identically with
    // GSAP ScrollSmoother transforms AND native scroll), keeps the stage pixel-locked
    // in the viewport without position:fixed or React re-renders, and scrubs a full
    // 360° rotation across all videos before releasing to the next section.
    useEffect(() => {
      if (typeof window === 'undefined' || !isDesktop || disabled || childrenCount === 0) {
        return;
      }

      let rafId = 0;
      let currentProgress = 0;
      let lastCounterText = '';

      const tick = () => {
        const runway = pinRef.current;
        const stage = stageRef.current;
        const wheel = containerRef.current;

        if (runway && stage && wheel) {
          const rect = runway.getBoundingClientRect();
          const vh = window.innerHeight || 800;
          const travel = Math.max(1, rect.height - vh);

          // Lock stage to viewport top while scrolling through the runway
          const clampedOffset = Math.min(travel, Math.max(0, -rect.top));
          stage.style.transform = `translate3d(0, ${clampedOffset}px, 0)`;

          const targetProgress = clampedOffset / travel;
          // Subtle smoothing for buttery rotation
          currentProgress += (targetProgress - currentProgress) * 0.18;
          if (Math.abs(targetProgress - currentProgress) < 0.0005) {
            currentProgress = targetProgress;
          }

          const rot = (direction === 'rtl' ? 360 : -360) * currentProgress;
          wheel.style.transform = `translateX(-50%) rotate(${rot}deg)`;

          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${(currentProgress * 100).toFixed(1)}%`;
          }
          if (counterRef.current) {
            const idxNum = Math.min(
              childrenCount,
              Math.max(1, Math.round(currentProgress * (childrenCount - 1)) + 1)
            );
            const nextText = `${idxNum} / ${childrenCount}`;
            if (nextText !== lastCounterText) {
              counterRef.current.textContent = nextText;
              lastCounterText = nextText;
            }
          }
        }

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      // Refresh ScrollTrigger/ScrollSmoother once after runway height settles
      const refreshTimer = window.setTimeout(() => {
        try {
          const st = (window as any).ScrollTrigger;
          st && st.refresh();
        } catch (e) {}
      }, 300);

      return () => {
        cancelAnimationFrame(rafId);
        window.clearTimeout(refreshTimer);
      };
    }, [isDesktop, disabled, childrenCount, direction]);

    if (childrenCount === 0) return null;

    const scaleFactor = 1.25;
    const calculatedBuffer = childSize
      ? childSize.h * scaleFactor - childSize.h + 60
      : 150;

    const visibleAreaHeight = childSize
      ? circleDiameter * visibleDecimal + childSize.h / 2 + calculatedBuffer
      : circleDiameter * visibleDecimal + 200;

    return (
      <div
        ref={mergedRef}
        className={`radial-scroll-gallery-wrapper ${className}`}
        style={{
          width: '100%',
          position: 'relative',
          height: isDesktop ? `calc(100vh + ${scrollDuration}px)` : 'auto',
          ...style,
        }}
        {...rest}
      >
        <div
          ref={stageRef}
          style={{
            position: 'relative',
            width: '100%',
            height: isDesktop ? '100vh' : `${visibleAreaHeight}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            willChange: 'transform',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              height: `${visibleAreaHeight}px`,
              maskImage:
                'linear-gradient(to top, transparent 0%, black 35%, black 100%)',
              WebkitMaskImage:
                'linear-gradient(to top, transparent 0%, black 35%, black 100%)',
            }}
          >
            <ul
              ref={containerRef}
              className={`
                ${disabled ? 'opacity-50 pointer-events-none grayscale' : ''}
                ${isMounted ? 'opacity-100' : 'opacity-0'}
              `}
              dir={direction}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                willChange: 'transform',
                margin: 0,
                padding: 0,
                listStyle: 'none',
                transition: 'opacity 0.5s ease-out',
                width: `${circleDiameter}px`,
                height: `${circleDiameter}px`,
                bottom: `-${circleDiameter * hiddenDecimal}px`,
              }}
            >
            {childrenNodes.map((child, index) => {
              const angle = (index / childrenCount) * 2 * Math.PI;
              let x = currentRadius * Math.cos(angle);
              const y = currentRadius * Math.sin(angle);

              if (direction === 'rtl') {
                x = -x;
              }

              const rotationAngle = (angle * 180) / Math.PI;
              const isHovered = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;

              return (
                <li
                  key={index}
                  ref={index === 0 ? childRef : null}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    zIndex: isHovered ? 100 : 10,
                    transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${
                      rotationAngle + 90
                    }deg)`,
                  }}
                >
                  <div
                    role='button'
                    tabIndex={disabled ? -1 : 0}
                    onClick={() => !disabled && onItemSelect?.(index)}
                    onKeyDown={(e) => {
                      if (disabled) return;
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onItemSelect?.(index);
                      }
                    }}
                    onMouseEnter={() => !disabled && setHoveredIndex(index)}
                    onMouseLeave={() => !disabled && setHoveredIndex(null)}
                    onFocus={() => !disabled && setHoveredIndex(index)}
                    onBlur={() => !disabled && setHoveredIndex(null)}
                    style={{
                      display: 'block',
                      cursor: 'pointer',
                      outline: 'none',
                      textAlign: 'left',
                      borderRadius: '20px',
                      transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      willChange: 'transform',
                      transform: isHovered ? 'scale(1.15) translateY(-18px)' : 'scale(1)',
                      filter: isAnyHovered && !isHovered ? 'blur(2px) grayscale(35%)' : 'none',
                      opacity: isAnyHovered && !isHovered ? 0.45 : 1,
                    }}
                  >
                    {child}
                  </div>
                </li>
              );
            })}
            </ul>
          </div>
          {/* Crisp scroll progress bar outside maskImage so it never fades */}
          <div
            style={{
              position: 'absolute',
              bottom: '22px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 120,
              pointerEvents: 'none',
              backgroundColor: 'rgba(251, 246, 240, 0.88)',
              backdropFilter: 'blur(6px)',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(12, 73, 66, 0.14)',
            }}
          >
            <div
              style={{
                width: '160px',
                height: '4px',
                borderRadius: '999px',
                backgroundColor: 'rgba(12, 73, 66, 0.16)',
                overflow: 'hidden',
              }}
            >
              <div
                ref={progressBarRef}
                style={{
                  width: '0%',
                  height: '100%',
                  backgroundColor: '#E09E52',
                  borderRadius: '999px',
                }}
              />
            </div>
            <span
              ref={counterRef}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#0C4942',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              1 / {childrenCount}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

RadialScrollGallery.displayName = 'RadialScrollGallery';
