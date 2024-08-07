export default (callback: () => void) => {
  document.readyState !== "loading" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};