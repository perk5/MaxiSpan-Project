
console.log("✅ Script loaded");

if (window.innerWidth < 990) {
  document.body.innerHTML = `
    <div style="color: white; background: black; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; font-size: 24px;">
      🚫 Please use a desktop or larger screen to view and use this timesheet.
    </div>
  `;
  throw new Error("Blocked on small screen");
}


let header = document.querySelector('header');
let logo = document.getElementById('logo')
let dropdown = document.querySelector('.dropdown')
let jobnum = document.querySelector('.job-num')
let monday = document.querySelector('.monday')
let tuesday = document.querySelector('.tuesday')
let wednesday = document.querySelector('.wednesday')
let thursday = document.querySelector('.thursday')
let friday = document.querySelector('.friday')
let comments = document.querySelector('.comments')
let total = document.querySelector('.total')
let download = document.getElementById('Download-spreadSheet')
let employeeName = document.getElementById('employeeName')


// Scrolling 
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('bg-white/70');
    logo.src = 'https://tinyurl.com/3p9c4s7e'
  } else {
    header.classList.remove('bg-white/70');
    logo.src = 'https://tinyurl.com/3ernewy8'
  }
});

//Dropdown Loop
for(let i = 0; i < 10; i++){
  dropdown.innerHTML += `<select id="dropdown${i}" class="bg-gray-700 cursor-pointer ml-[20px] text-white px-3 py-1 rounded-md">
            <option value="None">-- Please Select --</option>
            <option value="Drafting">Drafting</option>
            <option value="Checking">Checking</option>
            <option value="1st Drafting Corrections">1st Drafting Corrections</option>
            <option value="1st Checking Corrections">1st Checking Corrections</option>
            <option value="Subsequent Drafting Correction">Subsequent Drafting Correction</option>
            <option value="Subsequent Checking Correction">Subsequent Checking Correction</option>
            <option value="Machine Files">Machine Files</option>
            <option value="S/S Drafting">S/S Drafting</option>
            <option value="S/S Checking">S/S Checking</option>
            <option value="Amendments">Amendments</option>
            <option value="Site Extras">Site Extras</option>
            <option value="Training">Training</option>
            <option value="Admin">Admin</option>
            <option value="On Leave">On Leave</option>
        </select>`
}


// Job-Num Loop
for(let i = 0; i < 10; i++){
  jobnum.innerHTML += `<input placeholder="Job-Num" id="job${i}"  class="bg-gray-700 ml-[20px] text-white px-3 py-1 rounded-md" type="text">`  
}
// Monday Loop
for(let i = 0; i < 10; i++){
  monday.innerHTML += `<input placeholder="Hours" id="first${i}" class="bg-gray-700 text-center ml-[22px] text-white w-[80px] px-3 py-1 rounded-md" type="text">`  
}

// Tuesday Loop
for(let i = 0; i < 10; i++){
  tuesday.innerHTML += `<input placeholder="Hours" id="second${i}" class="bg-gray-700 text-center ml-[21px] text-white w-[80px] px-3 py-1 rounded-md" type="text">`  
}

// Wednesday Loop
for(let i = 0; i < 10; i++){
  wednesday.innerHTML += `<input placeholder="Hours" id="third${i}" class="bg-gray-700 text-center ml-[20px] text-white w-[80px] px-3 py-1 rounded-md" type="text">`  
}

// Thursday Loop
for(let i = 0; i < 10; i++){
  thursday.innerHTML += `<input placeholder="Hours" id="fourth${i}" class="bg-gray-700 text-center ml-[19px] text-white w-[80px] px-3 py-1 rounded-md" type="text">`  
}

// Friday Loop
for(let i = 0; i < 10; i++){
  friday.innerHTML += `<input placeholder="Hours" id="fifth${i}" class="bg-gray-700 text-center  ml-[18px] text-white w-[80px] px-3 py-1 rounded-md" type="text">`  
}

// Comments Loop
for(let i = 0; i < 10; i++){
  comments.innerHTML += `<input id="comments${i}" class="bg-gray-700  ml-[22px] h-[31px] text-white w-full px-3 py-1 rounded-md" type="text">`  
}

// Total Loop
for(let i = 0; i < 5; i++){
  total.innerHTML += `<input readonly="readonly" id="total${i}" value="${localStorage.getItem(`value${i}`) ? localStorage.getItem(`value${i}`) : 0}" class="totalnumber bg-gray-700 text-center w-[80px] h-[35px] text-center rounded-md">`  
}


// Local Storage for all inputs

let identity = ["dropdown", "job", "first", "second", "third", "fourth", "fifth", "comments"]

identity.forEach((id) => {
  for(let i = 0; i < 10; i++){
  const mySelect = document.getElementById(`${id}${i}`)

  mySelect.addEventListener('change', (event) => {
    const selectedOptionValue = event.target.value
    
    localStorage.setItem(`${id}${i}`, selectedOptionValue)  
  })

  if(localStorage.getItem(`${id}${i}`)){
    mySelect.value = localStorage.getItem(`${id}${i}`)
  }
}
})

// Employee Name to LocalStorage
employeeName.addEventListener('change', (event) => {

  const newName = event.target.value

  localStorage.setItem('newName', newName)

})

if(localStorage.getItem('newName')){
  employeeName.value = localStorage.getItem('newName')
}


// Calculating Total

let days = [monday, tuesday, wednesday, thursday, friday]

days.forEach((day) => {
  day.addEventListener('change', () => {
    weeklist = ['first', 'second', 'third', 'fourth', 'fifth']
    weeklist.forEach((weekDay, index) => {
      let total = 0
      let values = "value"
      for (let i = 0; i < 10; i++){
        let one = document.getElementById(`${weekDay}${i}`)
        total = total + one.value * 1 
        // localStorage.setItem(`${weekDay}${i}`, total * 1)
      }
      localStorage.setItem(`${values}${index}`, total * 1)
      document.getElementById(`total${index}`).value = total
      
  })
})
})


// Generating Date

const input = document.getElementById("weekEndingInput");
const container = document.getElementById("weekDaysContainer");

if(localStorage.getItem('newDate')){
  input.value = localStorage.getItem('newDate')
  let selectedDate = new Date(input.value);
  
  const day = selectedDate.getDay()

  let firstDay = day === 0 ? 6 : day - 1

  // Start of the week (Monday)
  const weekStart = new Date(selectedDate);
  weekStart.setDate(selectedDate.getDate() - firstDay); // Move back to Monday

  // Clear previous entries
  container.innerHTML = "";

  // Generate 5 days
  for (let i = 0; i < 5; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);

    const span = document.createElement("span");
    span.textContent = day.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit"
    }); // e.g., Mon 01 Jul
    span.className = `date date${i} bg-gray-700 text-white text-center py-1 rounded-md w-[80px]`;

    container.appendChild(span);
  }
}else{
  for (let i = 0; i < 5; i++) {
    const span = document.createElement("span");
    span.className = `date date${i} bg-gray-700 text-white text-center py-1 rounded-md w-[80px]`;
    container.appendChild(span);
  }
}

input.addEventListener("change", () => {
  let selectedDate = new Date(input.value);
  localStorage.setItem('newDate', input.value)
  if (isNaN(selectedDate)) return;

  const day = selectedDate.getDay()

  let firstDay = day === 0 ? 6 : day - 1

  // Start of the week (Monday)
  const weekStart = new Date(selectedDate);
  weekStart.setDate(selectedDate.getDate() - firstDay); // Move back to Monday

  // Clear previous entries
  container.innerHTML = "";

  // Generate 5 days
  for (let i = 0; i < 5; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);

    const span = document.createElement("span");
    span.textContent = day.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit"
    }); // e.g., Mon 01 Jul
    span.className = `date date${i} bg-gray-700 text-white text-center py-1 rounded-md w-[80px]`;

    container.appendChild(span);
  }
});


// Download Excel-Sheet

download.addEventListener('click', () => {

  const dateTexts = Array.from(document.querySelectorAll('.date')).map((el) => {
    return el.textContent
  })

  const total = Array.from(document.querySelectorAll('.totalnumber')).map((el) => {
    console.log(el.value)
    return el.value
  })

  let rows = Array.from({ length: 10 }, () => []);

  identity.forEach((element) => {
      for(let i = 0; i < 10; i++){
        let value = document.getElementById(`${element}${i}`).value
        rows[i].push(value)
      }
  })
  // Collect data
  const data = [
    [
      employeeName.value
    ],
    [  
      "TASKS",
      "JOB NUMBER",
       ...dateTexts,
       "COMMENTS"
    ], // headers
    rows[0],
    rows[1],
    rows[2],
    rows[3],
    rows[4],
    rows[5],
    rows[6],
    rows[7],
    rows[8],
    rows[9],
    [

    ],
    [
      "TOTAL",
      "",
      ...total
    ]
  ];


  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Optional: Add bold to header row
  // ws["A1"].s = { font: { bold: true } };
  // ws["B1"].s = { font: { bold: true } };
  // ws["C1"].s = { font: { bold: true } };

  // Create workbook and add the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Form Data");

  // Enable styles support (only works in pro/advanced builds or using third-party packers)
  XLSX.writeFileSync(wb, "form_data.xlsx");
  
  setTimeout(() => {
    localStorage.clear();
    location.reload()
  }, 200);
})

