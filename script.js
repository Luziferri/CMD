const input = document.querySelector('.terminal__input');
const output = document.querySelector('.terminal__output');
const pages = document.querySelectorAll('.page');

let currentPage = 'home';


input.setAttribute("placeholder", "Type your command here...");
input.addEventListener('focus', function() {
  if (this.value === this.placeholder) {
    this.value = '';
  }
});

input.addEventListener('blur', function() {
  if (this.value === '') {
    this.value = this.placeholder;
  }
});




input.addEventListener('keyup', function(e) {
	if (e.keyCode === 13) {
		const command = input.value.trim().toLowerCase();

		switch(command) {
			case 'cd help':
				output.innerHTML = '';
				if (currentPage !== 'home') {
					typeMessage('cd help', input, true);
					setTimeout(() => typeMessage('Available commands: cd... home, projects, contact', output), 2000);
				} else {
					typeMessage('Available commands: cd... home, projects, contact', output);
				}
				break;
			case 'cd home':
				typeMessage('Home | cd help for more commands', output, true);
				changePage('home');
				break;
			case 'cd projects':
				typeMessage('Projects | cd help for more commands', output, true);
				changePage('projects');
				break;
			case 'cd contact':
				typeMessage('Contact | cd help for more commands', output, true);
				changePage('contact');
				break;
			default:
				output.innerHTML = '';
				const errorMessage = 'Bruh... Invalid command. Type "cd help" to see the available commands.';
				typeMessage(errorMessage, output, currentPage !== 'home');
				const popup = document.createElement('div');
				popup.classList.add('error-popup');
				popup.innerHTML = 
          `
					<div class="error-popup__header">
						<h2 class="error-popup__title">...</h2>
						<button class="error-popup__close-btn">&times;</button>
					</div>
					<div class="error-popup__content">
						<p class="error-popup__text">Syntax Error!</p>
					</div>
				`;
				document.body.appendChild(popup);
				const popupTop = Math.floor(Math.random() * window.innerHeight);
				const popupLeft = Math.floor(Math.random() * window.innerWidth);
				popup.style.top = `${popupTop}px`;
				popup.style.left = `${popupLeft}px`;
				document.body.appendChild(popup);
				setTimeout(() => {
					popup.remove();
				}, 3000);

				const closeButton = popup.querySelector('.error-popup__close-btn');
				closeButton.addEventListener('click', () => {
					popup.remove();
				});
		
				input.disabled = false;
				input.focus();
				break;
		}

		input.value = '';
	}
});





function typeMessage(message, outputElement, rewriting = false) {
  const delay = 50;
  let i = 0;
  const cursorElement = document.createElement('span');
  cursorElement.innerText = '▮';
  outputElement.appendChild(cursorElement);

  // Disable the input element
  const inputElement = outputElement.previousElementSibling;
  inputElement.disabled = true;

  if (rewriting) {
    // Animate the text removal
    let currentText = outputElement.innerText;
    let removeIntervalId = setInterval(() => {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        outputElement.innerText = currentText;
      } else {
        clearInterval(removeIntervalId);
        // Start typing the new message after the text removal animation is complete
        setTimeout(() => typeMessage(message, outputElement, false), 500);
      }
    }, delay);
  } else {
    const intervalId = setInterval(() => {
      if (i < message.length) {
        const currentText = outputElement.innerText;
        outputElement.innerText = currentText.slice(0, -1) + message.charAt(i) + cursorElement.innerText;
        i++;
      } else {
        clearInterval(intervalId);
        cursorElement.remove();
        inputElement.disabled = false;
        inputElement.focus();
      }
    }, delay);

    // Animate the cursor (fake cursor )
    window.setInterval(() => cursorElement.innerText = cursorElement.innerText === '▮' ? '▯' : '▮', 450);
  }
}



function changePage(newPage) {
	if (newPage !== currentPage) {
		document.querySelector(`#${currentPage}`).classList.remove('active');
		document.querySelector(`#${newPage}`).classList.add('active');
		currentPage = newPage;

		// Get the brand name element
		const brandName = document.querySelector('.header__brand-name');

		// Update the brand name based on the current page
		switch (currentPage) {
			 case 'home':
            brandName.innerHTML = '<<span class="red-text">SrLuzifer</span><span class="green-bar">/</span>Card<span class="green-bar">/</span>home<span class="green-bar">></span>';
            break;
        case 'projects':
            brandName.innerHTML = '<span class="red-text">SrLuzifer</span><span class="green-bar">/</span>Card<span class="green-bar">/</span>projects<span class="green-bar">></span>';
            break;
        case 'contact':
            brandName.innerHTML = '<span class="red-text">SrLuzifer</span><span class="green-bar">/</span>Card<span class="green-bar">/</span>contact<span class="green-bar">></span>';
            break;
        default:
            brandName.innerHTML = '<span class="red-text">SrLuzifer</span><span class="green-bar">/</span>Card';
		}
	}
}

const currentPageId = document.querySelector('.page.active').id;

// Get the brand name element
const brandName = document.querySelector('.header__brand-name');

// Update the brand name based on the current page
switch (currentPageId) {
 case 'home':
            brandName.innerHTML = '<span class="red-text">SrLuzifer</span><span class="green-bar">/</span>Card<span class="green-bar">/</span>home<span class="green-bar">></span>';
            break;
        case 'projects':
            brandName.innerHTML = '<span class="red-text">SrLuzifer</span><span class="green-bar">/</span>Card<span class="green-bar">/</span>projects<span class="green-bar"></span>';
            break;
        case 'contact':
            brandName.innerHTML = '<<span class="red-text">SrLuzifer</span><span class="green-bar">/</span>Card<span class="green-bar">/</span>contact>';
            break;
        default:
            brandName.innerHTML = '<span class="red-text">SrLuzifer</span><span class="green-bar">/</span>Card';
}
//Loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});
