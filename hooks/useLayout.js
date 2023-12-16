import { MotionValue } from 'framer-motion';



import { create } from 'zustand';

const defaultState = {
  viewportRef: { current: null },
  scrollY: new MotionValue(),
  scrollYProgress: new MotionValue(),
  scrollDirection: undefined,
  isShowOverlay: false,
};

export const useLayout = create((set) => ({
  ...defaultState,
  setScrollDirection: (scrollDirection) => set({ scrollDirection }),
  setViewportRef: (viewportRef) => set({ viewportRef }),
  setScrollY: (scrollY) => set({ scrollY }),
  setScrollYProgress: (scrollYProgress) => set({ scrollYProgress }),
  setIsShowOverlay: (isShowOverlay) => set({ isShowOverlay }),
}));
