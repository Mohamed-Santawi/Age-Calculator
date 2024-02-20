// Start input
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelectorAll(".input"),
    imageCalc = document.getElementById("image"),
    dayInput = document.getElementById("day"),
    monthInput = document.getElementById("month"),
    yearInput = document.getElementById("year"),
    yearsCalc = document.querySelector(".years-calc"),
    monthsCalc = document.querySelector(".months-calc"),
    daysCalc = document.querySelector(".days-calc"),
    fullMonths = [1, 3, 5, 7, 8, 10, 12],
    feb = 2,
    daysError = [29, 30, 31];
  // Calculate Days And Months
  function updateDaysAndMonths() {
    const daysInMonth = getDaysInMonth(parseInt(monthInput.value)),
      daysRemaining = daysInMonth - parseInt(dayInput.value);
    daysCalc.previousElementSibling.textContent =
      daysRemaining < 10 ? "0" + daysRemaining : daysRemaining;
    const monthsRemaining = 12 - parseInt(monthInput.value);
    monthsCalc.previousElementSibling.textContent =
      monthsRemaining < 10 ? "0" + monthsRemaining : monthsRemaining;
  }
  function getDaysInMonth(month) {
    if (month === feb) {
      const years = parseInt(yearInput.value);
      if ((years % 4 === 0 && years % 100 != 0) || years % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
    } else if (fullMonths.includes(month)) {
      return 31;
    } else {
      return 30;
    }
  }
  // Calculate Years
  function updateYears() {
    const currentYear = new Date().getFullYear();
    const yearsRemaining = currentYear - parseInt(yearInput.value);
    yearsCalc.previousElementSibling.textContent =
      yearsRemaining < 10 ? "0" + yearsRemaining : yearsRemaining;
  }
  // Handle Input invalid

  function handleInputValidation(
    input,
    min,
    max,
    errorMessage,
    requiredMessage
  ) {
    if (input.value.trim() === "") {
      input.nextElementSibling.style.display = "block";
      input.style.border = "2px solid hsl(0, 100%, 85%)";
      input.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
      input.nextElementSibling.innerHTML = requiredMessage;
      input.placeholder = "";
      return false;
    } else if (
      (input.id === "day" &&
        parseInt(input.value) === 31 &&
        !fullMonths.includes(parseInt(monthInput.value))) ||
      (input.id === "month" &&
        parseInt(dayInput.value) === 31 &&
        !fullMonths.includes(parseInt(input.value)))
    ) {
      // Display error message for day input
      input.nextElementSibling.style.display = "block";
      input.style.border = "2px solid hsl(0, 100%, 85%)";
      input.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
      input.nextElementSibling.innerHTML = "Must be a valid day";
      input.placeholder = "";
      // Display error message for month input
      monthInput.nextElementSibling.style.display = "block";
      monthInput.style.border = "2px solid hsl(0, 100%, 85%)";
      monthInput.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
      monthInput.nextElementSibling.innerHTML = "Must be a valid month";
      monthInput.placeholder = "";
      return false;
    } else if (
      input.id === "day" &&
      daysError.includes(parseInt(input.value)) &&
      parseInt(monthInput.value) === 2
    ) {
      const years = parseInt(yearInput.value),
        isLeapYear = (years % 4 === 0 && years % 100 != 0) || years % 400 === 0;
      if (parseInt(input.value) === 29) {
        if (isLeapYear) {
          input.nextElementSibling.style.display = "none";
          input.style.border = "1px solid #dedede";
          input.previousElementSibling.style.color = "hsl(0, 1%, 44%)";
          return true;
        } else {
          input.nextElementSibling.style.display = "block";
          input.style.border = "2px solid hsl(0, 100%, 85%)";
          input.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
          input.nextElementSibling.innerHTML = "This is not a leap year";
          input.placeholder = "";
          return false;
        }
      } else if (parseInt(input.value) < 1 || parseInt(input.value) > 28) {
        input.nextElementSibling.style.display = "block";
        input.style.border = "2px solid hsl(0, 100%, 85%)";
        input.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
        input.nextElementSibling.innerHTML = errorMessage;
        input.placeholder = "";
        return false;
      }
    } else if (input.value < min || input.value > max) {
      input.nextElementSibling.style.display = "block";
      input.style.border = "2px solid hsl(0, 100%, 85%)";
      input.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
      input.nextElementSibling.innerHTML = errorMessage;
      input.placeholder = "";
      return false;
    } else {
      input.nextElementSibling.style.display = "none";
      input.style.border = "1px solid #dedede";
      input.previousElementSibling.style.color = "hsl(0, 1%, 44%)";
      input.getAttribute("placeholder");
      return true;
    }
  }
  // Validation
  function validation() {
    const currentYear = new Date().getFullYear();
    let isValid = true;
    isValid &= handleInputValidation(
      dayInput,
      1,
      31,
      "Must be a valid day",
      "This field is required"
    );
    isValid &= handleInputValidation(
      monthInput,
      1,
      12,
      "Must be a valid month",
      "This field is required"
    );
    isValid &= handleInputValidation(
      yearInput,
      0,
      currentYear,
      "Must be in the past",
      "This field is required"
    );
    return isValid;
  }
  // Handle Blur
  function handleBlurEvent() {
    if (!validation()) {
      return;
    }
  }
  // Calculation Function OnClick
  function calculate() {
    if (!validation()) {
      return;
    }
    updateDaysAndMonths();
    updateYears();
  }
  // Event Listeners
  imageCalc.addEventListener("click", calculate);
  dayInput.addEventListener("blur", handleBlurEvent);
  monthInput.addEventListener("blur", handleBlurEvent);
  yearInput.addEventListener("blur", handleBlurEvent);
  // Handle Focus
  input.forEach((item) => {
    item.addEventListener("focus", () => {
      item.placeholder = "";
    });
  });
});
// End input

// Input Blur
// input.forEach((item) => {
//   const placeholder = item.getAttribute("placeholder");
//   if (!item.value) {
//     item.placeholder = placeholder;
//   } else {
//     item.placeholder = "";
//   }
// });

// else if (input.id === "day") {
//   if (
//     daysError.includes(parseInt(input.value)) &&
//     parseInt(monthInput.value) === 2
//   ) {
//     const years = parseInt(yearInput.value),
//       isLeapYear =
//         (years % 4 === 0 && years % 100 != 0) || years % 400 === 0;
//     if (parseInt(input.value) === 29) {
//       if (isLeapYear) {
//         input.nextElementSibling.style.display = "none";
//         input.style.border = "1px solid #dedede";
//         input.previousElementSibling.style.color = "hsl(0, 1%, 44%)";
//         return true;
//       } else {
//         input.nextElementSibling.style.display = "block";
//         input.style.border = "2px solid hsl(0, 100%, 85%)";
//         input.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
//         input.nextElementSibling.innerHTML = "This is not a leap year";
//         input.placeholder = "";
//         return false;
//       }
//     } else if (
//       parseInt(input.value) < 1 || parseInt(input.value) > 28
//     ) {
//       input.nextElementSibling.style.display = "block";
//       input.style.border = "2px solid hsl(0, 100%, 85%)";
//       input.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
//       input.nextElementSibling.innerHTML = errorMessage;
//       input.placeholder = "";
//       return false;
//     }
//   } else if (
//     parseInt(input.value) === 31 &&
//     !fullMonths.includes(parseInt(monthInput.value))
//   ) {
//     // Display error message in both day input and month input
//     input.nextElementSibling.style.display = "block";
//     input.style.border = "2px solid hsl(0, 100%, 85%)";
//     dayInput.style.border = "2px solid hsl(0, 100%, 85%)";
//     input.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
//     dayInput.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
//     input.nextElementSibling.innerHTML = errorMessage;
//     dayInput.nextElementSibling.innerHTML = "Must be a valid day ";
//     input.placeholder = "";
//     return false;
//   }
// } else if (input.id === "month" && !fullMonths.includes(parseInt(input.value))) {
//   if (parseInt(dayInput.value) === 31) {
//     // Display error message in both month input and day input
//     console.log(dayInput.nextElementSibling);
//     input.nextElementSibling.style.display = "block";
//     input.style.border = "2px solid hsl(0, 100%, 85%)";
//     dayInput.style.border = "2px solid hsl(0, 100%, 85%)";
//     input.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
//     dayInput.previousElementSibling.style.color = "hsl(0, 100%, 72%)";
//     input.nextElementSibling.innerHTML = errorMessage;
//     dayInput.nextElementSibling.innerHTML = "Must be a valid day ";
//     input.placeholder = "";
//     return false;
//   }
// }
