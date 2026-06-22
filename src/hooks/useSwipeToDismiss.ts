import { useEffect, useRef, useState } from 'react';

interface UseSwipeToDismissProps {
  onDismiss: () => void;
  threshold?: number;
}

export function useSwipeToDismiss({ onDismiss, threshold = 100 }: UseSwipeToDismissProps) {
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      setStartY(e.touches[0].clientY);
      setCurrentY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY === null) return;
      setCurrentY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (startY === null || currentY === null) return;
      const diff = currentY - startY;
      
      if (diff > threshold) {
        onDismiss();
      }
      
      setStartY(null);
      setCurrentY(null);
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onDismiss, threshold, startY, currentY]);

  return { elementRef };
}