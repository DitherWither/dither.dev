const themeToggle = document.getElementById("theme-toggle");
const contrastToggle = document.getElementById("increase-contrast");
const crtToggle = document.getElementById("toggle-crt");

themeToggle.addEventListener("click", () => {
	document.documentElement.classList.toggle("light");
	document.documentElement.classList.toggle("dark");
	const newMode = localStorage.getItem("mode") == "dark" ? "light" : "dark";
	localStorage.setItem("mode", newMode);
	themeToggle.textContent = `${newMode == "dark" ? "Light" : "Dark"} Mode`;
});
contrastToggle.addEventListener("click", () => {
	document.documentElement.classList.toggle("high-contrast");
	const newSetting =
		localStorage.getItem("contrast") == "high" ? "standard" : "high";
	localStorage.setItem("contrast", newSetting);
	contrastToggle.textContent = `${
		newSetting == "high" ? "Standard" : "High"
	} Contrast`;
});
crtToggle.addEventListener("click", () => {
	document.querySelector("body").classList.toggle("crt");
	const newSetting = localStorage.getItem("crt") == "yes" ? "no" : "yes";
	localStorage.setItem("crt", newSetting);
	crtToggle.textContent =
		newSetting == "yes" ? "Turn off CRT Effect" : "Turn on CRT Effect";
});

document.getElementById("sans").addEventListener("click", () => {
	document.documentElement.classList.remove("serif", "mono", "dyslexic");
	document.documentElement.classList.add("sans");
	localStorage.setItem("font", "sans");
});

document.getElementById("serif").addEventListener("click", () => {
	document.documentElement.classList.remove("sans", "mono", "dyslexic");
	document.documentElement.classList.add("serif");
	localStorage.setItem("font", "serif");
});

document.getElementById("mono").addEventListener("click", () => {
	document.documentElement.classList.remove("sans", "serif", "dyslexic");
	document.documentElement.classList.add("mono");
	localStorage.setItem("font", "mono");
});

document.getElementById("dyslexic").addEventListener("click", () => {
	document.documentElement.classList.remove("sans", "serif", "mono");
	document.documentElement.classList.add("dyslexic");
	localStorage.setItem("font", "dyslexic");
});

const a11yPanel = document.querySelector(".a11y-panel");
const showA11y = document.querySelector("#open-a11y");
const closeA11y = document.querySelector("#close-a11y");

showA11y.addEventListener("click", () => {
	a11yPanel.hidden = false;
	showA11y.hidden = true;
	showA11y.classList.remove("shown");
	localStorage.setItem("show-panel", "yes");
});

closeA11y.addEventListener("click", () => {
	a11yPanel.hidden = true;
	showA11y.hidden = false;
	showA11y.classList.add("shown");
	localStorage.setItem("show-panel", "no");
});

const firstVisit = localStorage.getItem("hasVisited") == null;
console.log("test");

if (firstVisit) {
	localStorage.setItem("hasVisited", "yes");
	localStorage.setItem("contrast", "standard");
	localStorage.setItem("crt", "yes");
	localStorage.setItem("show-panel", "yes");
	localStorage.setItem("font", "sans");
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		document.documentElement.classList.add("dark");
		document.documentElement.classList.remove("light");
		localStorage.setItem("mode", "dark");
	} else {
		document.documentElement.classList.add("light");
		document.documentElement.classList.remove("dark");
		localStorage.setItem("mode", "light");
	}

	// We don't include this in the html, so that users without JS don't get it
	// (they cant disable it and would be kinda annoying)
	document.querySelector("body").classList.add("crt");
} else {
	const mode = localStorage.getItem("mode");
	const contrast = localStorage.getItem("contrast");
	const isCrt = localStorage.getItem("crt");
	const showPanel = localStorage.getItem("show-panel");
	const font = localStorage.getItem("font");

	if (mode != "dark") {
		document.documentElement.classList.add("light");
		document.documentElement.classList.remove("dark");
		themeToggle.textContent = "Dark Mode";
	} else {
		document.documentElement.classList.add("dark");
		document.documentElement.classList.remove("light");
		themeToggle.innerHTML = "Light Mode";
	}

	if (showPanel == "no") {
		a11yPanel.hidden = true;
		showA11y.hidden = false;
		showA11y.classList.add("shown");
	}

	if (contrast == "high") {
		document.documentElement.classList.add("high-contrast");
		contrastToggle.textContent = "Standard Contrast";
	}

	if (isCrt == "yes") {
		document.querySelector("body").classList.add("crt");
		crtToggle.textContent = "Turn off CRT Effect";
	}

	// set the font
	const availableFonts = ["sans", "serif", "mono", "dyslexic"];
	const otherFonts = availableFonts.filter((e) => e != font);
	document.documentElement.classList.remove(...otherFonts);
	document.documentElement.classList.add(font);
}
