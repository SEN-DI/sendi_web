// 달력
const calendarHeader = document.getElementById("month-year");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const calendarTable = document.getElementById("calendar-table").getElementsByTagName("tbody")[0];

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function drawCalendar(month, year) {
    calendarTable.innerHTML = "";
    calendarHeader.textContent = `${year}.${month + 1}`;

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                cell.innerHTML = "";
            } else if (date > daysInMonth) {
                break;
            } else {
                const dateDiv = document.createElement("div");
                dateDiv.textContent = date;
                dateDiv.className = "dateDiv";
                cell.appendChild(dateDiv);
                cell.dataset.date = date; // Add data-date attribute to the cell
                date++;
            }
            row.appendChild(cell);
        }
        calendarTable.appendChild(row);
    }
}
drawCalendar(currentMonth, currentYear);

// favicon
const favicons = document.querySelectorAll(".favicon");

document.querySelectorAll(".favicon").forEach(favicon => {
  favicon.addEventListener("click", event => {
      const selectedDateCell = event.target.parentNode.parentNode.parentNode;
      const selectedDate = selectedDateCell.dataset.date;
      const date = new Date(currentYear, currentMonth, selectedDate).toISOString().slice(0, 10);
      const emotion = event.target.getAttribute("data-emotion");
      sendEmotion(date, emotion);
  });
});

const tiredImages = [
    "/static/images/stickers/griffindor1.png",
    "/static/images/stickers/griffindor2.png",
    "/static/images/stickers/griffindor3.png",
    "/static/images/stickers/griffindor4.png",
    "/static/images/stickers/griffindor5.png",
  ];
  
  const comfortableImages = [
    "/static/images/stickers/hufflepuff1.png",
    "/static/images/stickers/hufflepuff2.png",
    "/static/images/stickers/hufflepuff3.png",
    "/static/images/stickers/hufflepuff4.png",
    "/static/images/stickers/hufflepuff5.png",
  ];
  
  const happinessImages = [
    "/static/images/stickers/hogwart1.png",
    "/static/images/stickers/hogwart2.png",
    "/static/images/stickers/hogwart3.png",
    "/static/images/stickers/hogwart4.png",
    "/static/images/stickers/hogwart5.png",
  ];
  
  const sadImages = [
    "/static/images/stickers/ravenclaw1.png",
    "/static/images/stickers/ravenclaw2.png",
    "/static/images/stickers/ravenclaw3.png",
    "/static/images/stickers/ravenclaw4.png",
    "/static/images/stickers/ravenclaw5.png",
  ];

  const angryImages = [
    "/static/images/stickers/slytherin1.png",
    "/static/images/stickers/slytherin2.png",
    "/static/images/stickers/slytherin3.png",
    "/static/images/stickers/slytherin4.png",
    "/static/images/stickers/slytherin5.png",
  ]
  

function getRandomImage(images) {
    return images[Math.floor(Math.random() * images.length)];
  }
  
function updateCalendarWithImage(imageSrc, date) {
    const selectedDateCell = document.querySelector(`td[data-date="${date}"]`);
    if (selectedDateCell) {
      // remove the old image
      const existingImage = selectedDateCell.querySelector("img");
      if (existingImage) {
        selectedDateCell.removeChild(existingImage);
      }
  
      // add new image
      const image = document.createElement("img");
      image.src = imageSrc;
      image.width = 50; // set image width
      image.height = 50; // set image height
      image.style.position = "absolute"; // change the image position setting to 'absolute'
      image.style.zIndex = "1"; // change the zIndex so that the image appears above the date number
      image.style.marginTop = "-35px"; // Adjust the image and date intervals so that they overlap at the bottom
      image.style.marginLeft = "-20px"; // shift the image to the right so it overlaps the date
  
      const dateDiv = selectedDateCell.querySelector(".dateDiv");
      selectedDateCell.insertBefore(image, dateDiv.nextSibling);
    }
  }
  
  favicons.forEach((favicon) => {
    favicon.addEventListener("click", () => {
      const mood = favicon.querySelector("p").textContent;
      let randomImageSrc;
      switch (mood) {
        case "Tired":
          randomImageSrc = getRandomImage(tiredImages);
          break;
        case "Comfortable":
          randomImageSrc = getRandomImage(comfortableImages);
          break;
        case "Happiness":
          randomImageSrc = getRandomImage(happinessImages);
          break;
        case "Sad":
          randomImageSrc = getRandomImage(sadImages);
          break;
        case "Angry":
          randomImageSrc = getRandomImage(angryImages);
          break;
        default:
          break;
      }
      const today = new Date();
      const date = today.getDate();
      updateCalendarWithImage(randomImageSrc, date);
    });
  });

prevMonthButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // add this line to set firstDay
    drawCalendar(currentMonth, currentYear, firstDay);
    console.log("prev month clicked: ", currentMonth, currentYear);
});

nextMonthButton.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
  }
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // add this line to set firstDay
  drawCalendar(currentMonth, currentYear, firstDay);
  console.log("next month clicked: ", currentMonth, currentYear);
});

