document.addEventListener("DOMContentLoaded", () => {
	const themeToggle = document.getElementById("theme-toggle");
	const htmlElement = document.documentElement; // Get the <html> element

	// --- Function to apply theme ---
	function applyTheme(theme) {
		htmlElement.classList.remove("light-mode", "dark-mode"); // Remove existing theme classes
		if (theme === "dark") {
			htmlElement.classList.add("dark-mode");
		} else if (theme === "light") {
			htmlElement.classList.add("light-mode");
		}
		// If theme is 'system' or null/undefined, no class is added,
		// allowing CSS media query @prefers-color-scheme to take effect.

		// Update localStorage
		if (theme === "light" || theme === "dark") {
			localStorage.setItem("theme", theme);
		} else {
			localStorage.removeItem("theme");
		}

		// Update toggle button aria-label
		if (themeToggle) {
			// Check the *actual* state after applying classes/system pref
			const isDark =
				htmlElement.classList.contains("dark-mode") ||
				(!htmlElement.classList.contains("light-mode") &&
					window.matchMedia("(prefers-color-scheme: dark)").matches);
			themeToggle.setAttribute(
				"aria-label",
				isDark ? "Switch to light mode" : "Switch to dark mode"
			);
		}
	}

	// --- Initialize theme state (mostly for button ARIA, class set by inline script) ---
	if (themeToggle) {
		const isInitiallyDark =
			htmlElement.classList.contains("dark-mode") ||
			(!htmlElement.classList.contains("light-mode") &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);
		themeToggle.setAttribute(
			"aria-label",
			isInitiallyDark ? "Switch to light mode" : "Switch to dark mode"
		);
	}

	// --- Toggle Button Event Listener ---
	if (themeToggle) {
		themeToggle.addEventListener("click", () => {
			// Determine the *current* effective theme (check class first, then system)
			const isCurrentlyDark =
				htmlElement.classList.contains("dark-mode") ||
				(!htmlElement.classList.contains("light-mode") &&
					window.matchMedia("(prefers-color-scheme: dark)").matches);

			// Decide the *new* theme
			const newTheme = isCurrentlyDark ? "light" : "dark";

			// Apply the new theme
			applyTheme(newTheme);
		});
	}

	// --- Listen for system theme changes ---
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (e) => {
			// Only change if NO manual preference is stored
			if (!localStorage.getItem("theme")) {
				// applyTheme(e.matches ? 'dark' : 'light'); // This implicitly sets system preference
				// Better: Remove any potential class to let CSS media query rule
				htmlElement.classList.remove("light-mode", "dark-mode");
				// Update button ARIA after system change if needed
				if (themeToggle) {
					themeToggle.setAttribute(
						"aria-label",
						e.matches ? "Switch to light mode" : "Switch to dark mode"
					);
				}
			}
		});
}); // End DOMContentLoaded
