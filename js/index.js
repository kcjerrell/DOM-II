document.addEventListener('scroll', updateBg);
updateBg();

function updateBg(event) {
		const html = document.querySelector('html');
		const x = html.scrollTop / html.clientHeight;
		const r = 230 + x * 15;
		const g = 245 - x * 15;
		const b = 240;

		document.querySelector('body').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// image swap on double-click
const images = document.querySelectorAll(".img-content img");
images.forEach((img) => {
	img.addEventListener('dblclick', swapImages);
});

function swapImages(event) {
	let swap = images[0].src;
	images[0].src = images[1].src;
	images[1].src = swap;
}

// hooking the event listeners for Sign Me Up!
const signUpButtons = Array.from(document.querySelectorAll('.destination .btn'));
signUpButtons.forEach(btn => {
	btn.addEventListener('click', signUpClick);
})

// I realize this is a contrived example for propagation, there's better ways to do this
// And yeah, I stole the modal dialog from today's guided project :)
// but I probably ran out of time to style it
addClickListenerToElement('.modal', closeModal);
addClickListenerToElement('.modal-dialog.input', stopProp);
addClickListenerToElement('.modal-dialog.signed-up', stopProp);

addClickListenerToElement("#submitButton", signUpSubmitClick);
addClickListenerToElement('#closeButton', closeModal);

function signUpClick(event) {
	showModal("input");
}

function signUpSubmitClick(event) {
	let email = document.querySelector("#emailInput").value;
	showModal("signed-up");
	document.querySelector('#emailspan').textContent = email;
}

// The modal dialog either has the e-mail input box, or a success message
// content is a string that specifies which
function showModal(content) {
	document.querySelector('.modal').classList.remove('off');

	// to keep the dialog fully modal, the keydown eventlistener is added and removed along with the dialog
	document.addEventListener('keydown', modalKeyDown);

	let input = document.querySelector('.modal .input');
	let signedUp = document.querySelector('.modal .signed-up');

	if (content === 'input') {
		input.classList.remove('off');
		signedUp.classList.add('off');
	}

	else if (content === 'signed-up') {
		signedUp.classList.remove('off');
		input.classList.add('off');
	}
}

function closeModal(event) {
	document.querySelector('.modal').classList.add('off');
	document.removeEventListener('keydown', modalKeyDown);
}

function modalKeyDown(event) {
	console.log("modal key event");
	if (event.key === "Escape")
		closeModal(event);
}

function stopProp(event) {
	event.stopPropagation();
}

/**
 *
 * @param {string} query the query selector argument
 * @param {function} callback the event handler callback
 */
function addClickListenerToElement(query, callback) {
	const button = document.querySelector(query);
	if (button === null)
		console.log(`"${query}" query found nothing and listener couldn't be added.`)
	else
		button.addEventListener('click', callback);
}