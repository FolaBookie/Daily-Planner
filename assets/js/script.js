$(document).ready(function () {
  // Display the current day at the top of the calender when a user opens the planner
  const today = dayjs();
  $("#currentDay").text(today.format("dddd[,] MMMM D"));
  // Present time blocks for standard business hours when the user scrolls down.
  const businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  function createTimeBlock(hour) {
    const timeBlockDiv = $("<div>");
    timeBlockDiv.attr("id", hour);
    timeBlockDiv.addClass("row time-block");

    const hourDiv = $("<div>");
    hourDiv.text(today.hour(hour).format("hA"));
    hourDiv.addClass("col-md-2 hour");

    const eventInput = $("<textarea>");
    eventInput.addClass("col-md-8 description");
    const events = JSON.parse(localStorage.getItem("events"));
    if (events) {
      const savedEvent = events[hour];
      if (savedEvent) {
        eventInput.val(savedEvent);
      }
    }

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
  function updateTimeBlock() {
    const currentHour = today.hour();
    const timeBlocks = $(".time-block");
    timeBlocks.each(function () {
      const currentBlock = $(this);
      const blockHour = parseInt(currentBlock.attr("id"));
      if (currentHour > blockHour) {
        currentBlock.removeClass("present").addClass("past");
      } else if (currentHour === blockHour) {
        currentBlock.removeClass("future").addClass("present");
      } else {
        currentBlock.addClass("future");
      }
    });
  }
  updateTimeBlock();
  setInterval(updateTimeBlock, 60000);

  $(".saveBtn").on("click", function () {
    const eventInput = $(this).prev().val();
    if (!eventInput) {
      return;
    }
    const blockHour = $(this).parent().attr("id");
    let events = JSON.parse(localStorage.getItem("events"));
    if (!events) {
      events = {};
    }
    events[blockHour] = eventInput;
    localStorage.setItem("events", JSON.stringify(events));
  });
});
