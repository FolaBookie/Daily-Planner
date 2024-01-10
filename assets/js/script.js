// Display the current day at the top of the calender when a user opens the planner
const today = dayjs();
$("#currentDay").text(today.format("dddd[,] MMMM D"));
// Present time blocks for standard business hours when the user scrolls down.
const businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
function createTimeBlock(hour) {
  const timeBlockDiv = $("<div>");
  timeBlockDiv.attr("id", hour);
  timeBlockDiv.addClass("row time-block");

  const hourDiv = $("<div>");
  hourDiv.text(today.hour(hour).format("hA"));
  hourDiv.addClass("col-md-2 hour");

  const eventInput = $("<textarea>");
  eventInput.addClass("col-md-8 description");

  const saveBtn = $("<button>");
  const saveIcon = $("<i>");
  saveIcon.addClass("fa fa-save");
  saveBtn.addClass("btn col-md-2 saveBtn");
  saveBtn.append(saveIcon);

  timeBlockDiv.append(hourDiv, eventInput, saveBtn);
  $(".container").append(timeBlockDiv);
}

businessHours.forEach(createTimeBlock);
// gets current hour

// Color-code each time block based on past, present, and future when the time block is viewed.

// Allow a user to enter an event when they click a time block

// Save the event in local storage when the save button is clicked in that time block.

// Persist events between refreshes of a page
