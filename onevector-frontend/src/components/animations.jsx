// src/animations.js

// Row animation variant
export const tableRowVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

// Button hover and tap animation variant
export const buttonVariant = {
  hover: { scale: 1.1, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } }
};

// Modal visibility animation
export const modalVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};
