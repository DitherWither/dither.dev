---
title: I moved to eleventy
description: I switched from vanilla HTML to eleventy
date: 2025-11-27
tags: meta
---

For a while before this, my homepage was just plain HTML/CSS/JS, but I decided it'd be nice to be able to make blogs.

Now, while I could just copy and paste the base HTML template, I opted not to as that would be annoying to update, as well as potentially becoming annoying to work with.
At the same time, using a full blown JS framework is well more than overkill, when I just need templating and a few other simple features.

## My experience with eleventy

[Eleventy](https://www.11ty.dev/) seemed the perfect fit for the job, so that's what I picked.
I used their blog template from [this github repo](https://github.com/11ty/eleventy-base-blog) and modified it to fit my theme

It was relatively trivial to edit the template to be somewhat similar to the previous theme (It doesn't have to be 100% the same, now that it also houses a blog).

In general, I was impressed by the simplicity of using 11ty compared to even things like astro, which tries to do a lot more.
I would likely use it more for all my static webpage needs, as statically rendered react, which is what I used to use, is absurdly overkill for a lot of things.

## Updating the Accessibility Menu

Now that the site has multiple pages, I used what felt like the best option to me for persisting the settings: `localStorage`.

This does mean that the website initially renders with default settings, although this doesn't happen when clicking internal links (aka no flashes every button press).

You might be wondering "Why can't you just render it with the correct settings directly?".
Well, the answer is, there is no way to do that that I can think of, that doesn't involve server side rendering and storing settings in cookies.
As I specifically don't want to server render what is otherwise a static blog, this is the next best thing.

That being said, a lot of the code I wrote for this is clinically insane hand crafted spaghetti:

```js
themeToggle.addEventListener("click", () => {
	document.documentElement.classList.toggle("light");
	document.documentElement.classList.toggle("dark");
	const mode = localStorage.getItem("mode");
	localStorage.setItem("mode", mode == "dark" ? "light" : "dark");
	themeToggle.textContent = `${mode.charAt(0).toUpperCase()}${mode.slice(
		1
	)} Mode`;
});
contrastToggle.addEventListener("click", () => {
	document.documentElement.classList.toggle("high-contrast");
	const setting = localStorage.getItem("contrast");
	localStorage.setItem("contrast", setting == "high" ? "standard" : "high");
	contrastToggle.textContent = `${setting
		.charAt(0)
		.toUpperCase()}${setting.slice(1)} Contrast`;
});
crtToggle.addEventListener("click", () => {
	document.querySelector("body").classList.toggle("crt");
	const newSetting = localStorage.getItem("crt") == "yes" ? "no" : "yes";
	localStorage.setItem("crt", newSetting);
	crtToggle.textContent =
		newSetting == "yes" ? "Turn off CRT Effect" : "Turn on CRT Effect";
});
```

Mmm, yummy.

The main reason I'm not using media queries instead of js-classes for dark mode is,
doing that doesn't let you (to the best of my knowledge) change the mode at runtime.

Should I do a system where it picks up the media query by default, and overrides it if
the class exists? Most probably.

But that's something I'll do in the future. The original iteration of this script was
something I wrote as a one-off thing without thinking much about persisting the settings.

## Conclusion

Code written at 2AM is usually of subpar quality, and is the ideal time to do things like
this (Yes, I did the rewrite at 2AM, FML).
