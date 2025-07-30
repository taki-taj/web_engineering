let steps = [];
let stepIndex = 0;

function initializeSearch() {
  const arrayInput = document.getElementById("arrayInput").value;
  const target = parseInt(document.getElementById("targetInput").value);
  const output = document.getElementById("output");

  const arr = arrayInput.split(',').map(Number).sort((a, b) => a - b);
  steps = [];
  stepIndex = 0;
  output.innerHTML = '';

  if (!arr.length || isNaN(target)) {
    output.innerHTML = "❌ Please enter a valid array and target.";
    return;
  }

  if (arr[0] === target) {
    steps.push(`✅ Found target at index 0`);
  } else {
    let i = 1;
    steps.push(`Checking arr[0] = ${arr[0]}`);
    while (i < arr.length && arr[i] <= target) {
      steps.push(`Checking arr[${i}] = ${arr[i]}`);
      i *= 2;
    }

    const left = Math.floor(i / 2);
    const right = Math.min(i, arr.length - 1);
    steps.push(`🔎 Binary search between index ${left} and ${right}`);

    let low = left, high = right;
    let found = false;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      steps.push(`Checking arr[${mid}] = ${arr[mid]}`);
      if (arr[mid] === target) {
        steps.push(`✅ Found target at index ${mid}`);
        found = true;
        break;
      } else if (arr[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    if (!found) {
      steps.push("❌ Target not found in array.");
    }
  }

  document.getElementById("nextButton").disabled = false;
  showStep();
}

function nextStep() {
  if (stepIndex < steps.length - 1) {
    stepIndex++;
    showStep();
  } else {
    document.getElementById("nextButton").disabled = true;
  }
}

function showStep() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  for (let i = 0; i <= stepIndex; i++) {
    if (i === stepIndex) {
      output.innerHTML += `<div style="font-weight: bold; color: #004488;">👉 ${steps[i]}</div>`;
    } else {
      output.innerHTML += `<div>${steps[i]}</div>`;
    }
  }
}
