export const attachFormListeners = (selector, event, handler) => {
  const forms = document.querySelectorAll(selector);
  forms.forEach((form) => {
    form.removeEventListener(event, handler);
    form.addEventListener(event, handler);
  });
};
