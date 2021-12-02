// https://stackoverflow.com/questions/17642872/refresh-page-and-keep-scroll-position
// We did not reinvent the wheel on that one.

document.addEventListener("DOMContentLoaded", function () {
  const scrollpos = sessionStorage.getItem('scrollpos');
  if (scrollpos) {
      window.scrollTo(0, scrollpos);
      sessionStorage.removeItem('scrollpos');
  }
  
  window.addEventListener("beforeunload", function () {
    sessionStorage.setItem('scrollpos', window.scrollY)
  });
});