// Core Story Logic
// These functions handle displaying the story with blanks and its answers. They now use the `selectedStoryTemplate` variable to know which story to render.

function generateStoryWithBlanks() {
	const optionsDiv = document.getElementById("options");
	const storyDiv = document.getElementById("storyWithBlanksOutput");
	const answersDiv = document.getElementById("storyAnswersOutput");
    const dialogDiv = document.getElementById("storyModal");

	// Get input values (or default them if empty)
	const boyName = document.getElementById("boyName").value || "Boy";
	const girlName = document.getElementById("girlName").value || "Girl";
	const thing = document.getElementById("thing").value || "a mysterious box";
	const pet = document.getElementById("pet").value || "a fluffy cat";

	// Store current inputs so they can be used for answers
	currentStoryInputs = { boyName, girlName, thing, pet };

	// Make sure a story template is selected
	if (!selectedStoryTemplate) {
		alert("Please select a story first!");
		openStoryModal(); // Re-open modal if no story is selected
		return;
	}

	// Generate and display the story with blanks
	const storyBlanksText = selectedStoryTemplate.getBlanks(
		boyName,
		girlName,
		thing,
		pet
	);

	// Hide inputs, show story blanks, hide answers
    dialogDiv.style.display = "none";
	optionsDiv.style.display = "none";
	storyDiv.style.display = "block";
	answersDiv.style.display = "none";
	document.getElementById("storyBlanksText").innerHTML = storyBlanksText;
}

function showAnswers() {
	const optionsDiv = document.getElementById("options");
	const storyDiv = document.getElementById("storyWithBlanksOutput");
	const answersDiv = document.getElementById("storyAnswersOutput");
    const dialogDiv = document.getElementById("storyModal");

	// Use the saved inputs from when 'generateStoryWithBlanks' was clicked
	const { boyName, girlName, thing, pet } = currentStoryInputs;

	if (!boyName || !selectedStoryTemplate) {
		alert("Please generate the story with blanks first!");
		return;
	}

	// For pet pronouns:
	// This is a simplified approach. The 'getAnswers' function in the template can decide how to use these.
	let petPronoun = "it";
	let petPossessive = "its";
	let petObjective = "it";

	const storyAnswersText = selectedStoryTemplate.getAnswers(
		boyName,
		girlName,
		thing,
		pet,
		petPronoun,
		petPossessive,
		petObjective
	);

	// Hide options and blanks, show answers
    dialogDiv.style.display = "none";
	optionsDiv.style.display = "none";
	storyDiv.style.display = "none";
	answersDiv.style.display = "block";
	document.getElementById("storyAnswersText").innerHTML = storyAnswersText;
}

function loadSelectedStoryFromDropdown() {
	const dropdown = document.getElementById("storyDropdown");
	const selectedStoryId = parseInt(dropdown.value); // Convert to number for comparison with storyTemplate.id

	// Find the story template that matches the selected ID
	const story = storyTemplates.find(
		(template) => template.id === selectedStoryId
	);

	if (story) {
		selectedStoryTemplate = story; // Set the global variable
		document.getElementById("storyDisplay").innerHTML = `
                        <h3>Selected Story: ${story.title}</h3>
                        <p>Fill in the blanks and generate your story!</p>
                    `;
		closeStoryModal(); // Close the modal after selection
		showOptions(); // Show the input fields for the selected story
	} else {
		// Handle case where no story is selected (e.g., the "-- Select a Story --" option)
		selectedStoryTemplate = null; // Clear selected template
		document.getElementById(
			"storyDisplay"
		).innerHTML = `<p>Please select a story from the dropdown.</p>`;
	}
}

function loadRandomStory() {
    const optionsDiv = document.getElementById("options");
	const storyDiv = document.getElementById("storyWithBlanksOutput");
	const answersDiv = document.getElementById("storyAnswersOutput");
    const dialogDiv = document.getElementById("storyModal");
	optionsDiv.style.display = "none";
	storyDiv.style.display = "none";
	answersDiv.style.display = "none";
    dialogDiv.style.display = "none";


	const randomIndex = Math.floor(Math.random() * storyTemplates.length);
	const story = storyTemplates[randomIndex];

	selectedStoryTemplate = story; // Set the global variable

	document.getElementById("storyDisplay").innerHTML = `
                    <h3>Random Story: ${story.title}</h3>
                    <p>Fill in the blanks and generate your story!</p>
                `;

	// Set the dropdown to the randomly selected story's ID for consistency
	document.getElementById("storyDropdown").value = story.id;
    
	closeStoryModal(); // Close the modal after selecting a random story

	showOptions(); // Show the input fields for the selected story
}

function openStoryModal() {
    const optionsDiv = document.getElementById("options");
	const storyDiv = document.getElementById("storyWithBlanksOutput");
	const answersDiv = document.getElementById("storyAnswersOutput");
	optionsDiv.style.display = "none";
	storyDiv.style.display = "none";
	answersDiv.style.display = "none";

	//const dialog = document.getElementById("storyModal");
	//dialog.showModal(); // Opens the dialog as a modal
    const dialogDiv = document.getElementById("storyModal");
    dialogDiv.style.display = "block";
    

	// Populate dropdown options dynamically
	const dropdown = document.getElementById("storyDropdown");
	// Clear existing options (except the default placeholder)
	dropdown.innerHTML = '<option value="">-- Select a Story --</option>';
	storyTemplates.forEach((template) => {
		const option = document.createElement("option");
		option.value = template.id;
		option.textContent = template.title;
		dropdown.appendChild(option);
	});

	// Optional: Pre-select the currently displayed story in the dropdown when the modal opens
	if (selectedStoryTemplate) {
		dropdown.value = selectedStoryTemplate.id;
	} else {
		dropdown.value = ""; // Reset if no story is selected
	}
}

function closeStoryModal() {
	//const dialog = document.getElementById("storyModal");
	//dialog.close(); // Closes the dialog
    const dialogDiv = document.getElementById("storyModal");
	dialogDiv.style.display = "none";

}

function showOptions() {
	const optionsDiv = document.getElementById("options");
	const storyDiv = document.getElementById("storyWithBlanksOutput");
	const answersDiv = document.getElementById("storyAnswersOutput");
    const dialogDiv = document.getElementById("storyModal");
    dialogDiv.style.display = "none";
	optionsDiv.style.display = "block";
	storyDiv.style.display = "none";
	answersDiv.style.display = "none";
}

// Initial setup when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	// You might want to initially display a placeholder or the inputs for story generation
	document.getElementById("storyDisplay").innerHTML =
		'<p>Click "Choose Story" to begin!</p>';
	showOptions(); // Ensure inputs are visible initially
});

// Assuming you have elements for `storyWithBlanksOutput` and `storyAnswersOutput`
// in your HTML that will contain `<p id="storyBlanksText"></p>` and `<p id="storyAnswersText"></p>` respectively.
