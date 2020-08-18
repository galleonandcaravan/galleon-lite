export const isTablet = () => {
  return (
    window.matchMedia('(min-width: 721px)').matches &&
    window.matchMedia('(max-width: 1023px)').matches
  );
};

export const isMobile = () => {
  return window.matchMedia('(max-width: 720px)').matches;
};

export const isDesktop = () => {
  return window.matchMedia('(min-width: 1024px)').matches;
};

export const isIOS = () => {
  return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
};
