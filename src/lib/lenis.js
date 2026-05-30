// Module-level holder for the single Lenis instance, so UI outside the Lenis
// React subtree (e.g. the section nav) can drive scrollTo without prop-drilling.
let instance = null;

export const setLenis = (l) => (instance = l);
export const getLenis = () => instance;

// Jump to a normalized progress (0..1) around the loop.
export const scrollToProgress = (p, opts = {}) => {
  if (!instance) return;
  instance.scrollTo(p * instance.limit, { duration: 1.4, ...opts });
};
