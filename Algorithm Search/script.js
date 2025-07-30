// Global state for algorithms
let array = []; // Empty array initially
let linearSteps = 0, expSteps = 0, selectionSteps = 0, quickSteps = 0, bstSteps = 0;
let quickArray = [], bstTree = null;
let currentAlgorithm = null;

// Get HTML elements
const nextButton = document.getElementById('next-button');
const resultDiv = document.getElementById('result');
const algorithmContainer = document.getElementById('array-container');

// Function to generate a random array
function generateRandomArray(size = 7, maxValue = 10) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * maxValue) + 1); // Random number between 1 and maxValue
    }
    return arr;
}

// Function to display the array
function displayArray(arr) {
    algorithmContainer.innerHTML = '';
    arr.forEach(value => {
        const div = document.createElement('div');
        div.classList.add('array-element');
        div.textContent = value;
        algorithmContainer.appendChild(div);
    });
}

// Handle algorithm selection
document.getElementById('algorithm-select').addEventListener('change', function() {
    const selectedAlgorithm = this.value;
    currentAlgorithm = selectedAlgorithm;
    resultDiv.textContent = '';
    nextButton.disabled = false;

    // Reset algorithm-specific variables
    linearSteps = 0;
    expSteps = 0;
    selectionSteps = 0;
    quickSteps = 0;
    bstSteps = 0;

    // Generate random array and display it
    array = generateRandomArray();
    displayArray(array);
    document.getElementById('search-value').value = '';
    nextButton.disabled = false;
});

// Handle the "Start Search" button click
document.getElementById('start-search').addEventListener('click', function() {
    const targetValue = parseInt(document.getElementById('search-value').value, 10);
    if (isNaN(targetValue)) {
        resultDiv.textContent = "Please enter a valid number.";
        return;
    }
    resultDiv.textContent = ''; // Clear previous results
    nextButton.disabled = false; // Enable next button

    // Start the selected algorithm with the target value
    switch (currentAlgorithm) {
        case 'linear-search':
            linearSteps = 0;
            break;
        case 'exponential-search':
            expSteps = 0;
            break;
        case 'selection-sort':
            selectionSteps = 0;
            break;
        case 'quick-sort':
            quickSteps = 0;
            break;
        case 'binary-search-tree':
            bstSteps = 0;
            bstTree = null; // Reset BST
            break;
    }
});

// Handle the "Next" button click
nextButton.addEventListener('click', function() {
    const targetValue = parseInt(document.getElementById('search-value').value, 10);
    switch (currentAlgorithm) {
        case 'linear-search':
            linearSearch(targetValue);
            break;
        case 'exponential-search':
            exponentialSearch(targetValue);
            break;
        case 'selection-sort':
            selectionSort();
            break;
        case 'quick-sort':
            quickSortStep();
            break;
        case 'binary-search-tree':
            bstStep(targetValue);
            break;
    }
});

// Linear Search Algorithm
function linearSearch(target) {
    const elements = document.querySelectorAll('.array-element');
    if (linearSteps < array.length) {
        elements[linearSteps].classList.add('highlight');
        if (array[linearSteps] === target) {
            resultDiv.textContent = `Found ${target} at index ${linearSteps}`;
            nextButton.disabled = true;
        }
        linearSteps++;
    } else {
        resultDiv.textContent = `${target} not found in the array`;
        nextButton.disabled = true;
    }
}

// Exponential Search Algorithm
function exponentialSearch(target) {
    let i = 1;
    const elements = document.querySelectorAll('.array-element');
    if (i < array.length && array[i] <= target) {
        elements[i].classList.add('highlight');
        i *= 2;
        expSteps++;
    } else {
        binarySearch(target, Math.floor(i / 2), Math.min(i, array.length - 1));
        expSteps = 0;
    }
}

// Binary Search helper for Exponential Search
function binarySearch(target, low, high) {
    const elements = document.querySelectorAll('.array-element');
    let mid;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        elements[mid].classList.add('highlight');
        if (array[mid] === target) {
            resultDiv.textContent = `Found ${target} at index ${mid}`;
            break;
        } else if (array[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    if (low > high) {
        resultDiv.textContent = `${target} not found`;
    }
}

// Selection Sort Algorithm
function selectionSort() {
    const arr = [...array];
    if (selectionSteps < arr.length) {
        let minIndex = selectionSteps;
        for (let j = selectionSteps + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        [arr[selectionSteps], arr[minIndex]] = [arr[minIndex], arr[selectionSteps]];
        displayArray(arr);
        selectionSteps++;
    } else {
        resultDiv.textContent = `Sorted Array: ${arr}`;
        nextButton.disabled = true;
    }
}

// Quick Sort Algorithm
function quickSortStep() {
    const arr = [...quickArray];
    const low = 0, high = arr.length - 1;
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        displayArray(arr);
        quickSteps++;
    } else {
        resultDiv.textContent = `Sorted Array: ${arr}`;
        nextButton.disabled = true;
    }
}

// Quick Sort Partition helper
function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Binary Search Tree insertion
function insertBST(root, value) {
    if (!root) return { value, left: null, right: null };
    if (value < root.value) root.left = insertBST(root.left, value);
    else root.right = insertBST(root.right, value);
    return root;
}

// Render Binary Search Tree
function renderBST(root, container, x = 250, y = 20, spacing = 100) {
    if (!root) return;
    const node = document.createElement('div');
    node.classList.add('bst-node');
    node.textContent = root.value;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    container.appendChild(node);
    if (root.left) renderBST(root.left, container, x - spacing, y + 50, spacing / 2);
    if (root.right) renderBST(root.right, container, x + spacing, y + 50, spacing / 2);
}

// Binary Search Tree Step
function bstStep(target) {
    bstTree = insertBST(bstTree, target);
    document.getElementById('bst-container').innerHTML = '';
    renderBST(bstTree, document.getElementById('bst-container'));
    bstSteps++;
}
