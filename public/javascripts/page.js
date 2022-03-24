// Toggle element visibility
var toggle = function (elem) {
	elem.classList.toggle('is-visible');
};


document.addEventListener('click', function (event) {

	// Make sure clicked element is our toggle
	if (!event.target.classList.contains('toggle')) return;

	// Prevent default link behavior
	event.preventDefault();

	// Get the content
	var content = document.querySelector(event.target.getAttribute("trigger"));
	console.log(content)
	if (!content) return;

	// Toggle the content
	toggle(content);

}, false);
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

