
export interface SortStep {
  array: number[];
  comparing: [number, number] | null;
  swapping: [number, number] | null;
  sorted: number[];
  currentAction: string;
}

export type SortingAlgorithm = {
  name: string;
  execute: (array: number[]) => SortStep[];
  description: string[];
};

export const bubbleSort: SortingAlgorithm = {
  name: "Bubble Sort",
  description: [
    "Compare adjacent elements, swapping them if they are in the wrong order",
    "Repeat until no more swaps are needed",
    "The largest elements 'bubble' to the end with each pass"
  ],
  execute: (inputArray: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const array = [...inputArray];
    const n = array.length;
    let sorted: number[] = [];

    for (let i = 0; i < n; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing step
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swapping: null,
          sorted: [...sorted],
          currentAction: `Comparing adjacent elements in the array`
        });
        
        if (array[j] > array[j + 1]) {
          // Swapping step
          steps.push({
            array: [...array],
            comparing: null,
            swapping: [j, j + 1],
            sorted: [...sorted],
            currentAction: `Swapping elements if they are in the wrong order`
          });
          
          // Swap the elements
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;
          
          // Show the result after swapping
          steps.push({
            array: [...array],
            comparing: null,
            swapping: null,
            sorted: [...sorted],
            currentAction: `Moving to the next pair of elements`
          });
        }
      }
      
      // Mark the last element as sorted
      sorted = [...sorted, n - i - 1];
      
      // If no swaps were made in this pass, the array is already sorted
      if (!swapped) {
        // Mark all remaining elements as sorted
        for (let k = 0; k < n - i - 1; k++) {
          if (!sorted.includes(k)) {
            sorted.push(k);
          }
        }
        break;
      }
      
      // Completing a pass
      steps.push({
        array: [...array],
        comparing: null,
        swapping: null,
        sorted: [...sorted],
        currentAction: `Completing a pass through the array`
      });
    }
    
    return steps;
  }
};

export const selectionSort: SortingAlgorithm = {
  name: "Selection Sort",
  description: [
    "Find the minimum element in the unsorted portion",
    "Swap it with the first element in the unsorted portion",
    "Move the boundary of the sorted portion one element to the right"
  ],
  execute: (inputArray: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const array = [...inputArray];
    const n = array.length;
    let sorted: number[] = [];

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      
      // Find the minimum element
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...array],
          comparing: [minIndex, j],
          swapping: null,
          sorted: [...sorted],
          currentAction: `Finding the minimum element in the unsorted portion`
        });
        
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      
      // If the minimum is not the current element, swap
      if (minIndex !== i) {
        steps.push({
          array: [...array],
          comparing: null,
          swapping: [i, minIndex],
          sorted: [...sorted],
          currentAction: `Swapping the minimum element with the first element in the unsorted portion`
        });
        
        // Swap
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
      
      // Mark as sorted
      sorted.push(i);
      
      steps.push({
        array: [...array],
        comparing: null,
        swapping: null,
        sorted: [...sorted],
        currentAction: `Moving the boundary of the sorted portion one element to the right`
      });
    }
    
    // Mark the last element as sorted
    sorted.push(n - 1);
    steps.push({
      array: [...array],
      comparing: null,
      swapping: null,
      sorted: [...sorted],
      currentAction: `Sorting complete`
    });
    
    return steps;
  }
};

export const insertionSort: SortingAlgorithm = {
  name: "Insertion Sort",
  description: [
    "Iterate through the array, starting from the second element",
    "For each element, compare it with elements to its left",
    "Insert the element in the correct position in the sorted portion"
  ],
  execute: (inputArray: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const array = [...inputArray];
    const n = array.length;
    let sorted: number[] = [0]; // First element is initially sorted

    for (let i = 1; i < n; i++) {
      const current = array[i];
      let j = i - 1;
      
      steps.push({
        array: [...array],
        comparing: [i, j],
        swapping: null,
        sorted: [...sorted],
        currentAction: `Considering next element to insert into the sorted portion`
      });
      
      while (j >= 0 && array[j] > current) {
        steps.push({
          array: [...array],
          comparing: [j + 1, j],
          swapping: [j + 1, j],
          sorted: [...sorted],
          currentAction: `Moving elements to make space for insertion`
        });
        
        array[j + 1] = array[j];
        j--;
      }
      
      array[j + 1] = current;
      
      sorted.push(i);
      
      steps.push({
        array: [...array],
        comparing: null,
        swapping: null,
        sorted: [...sorted],
        currentAction: `Element inserted into correct position in the sorted portion`
      });
    }
    
    return steps;
  }
};

export const quickSort: SortingAlgorithm = {
  name: "Quick Sort",
  description: [
    "Select a 'pivot' element from the array",
    "Partition the array so elements less than the pivot are on the left, greater on the right",
    "Recursively apply the steps to the sub-arrays"
  ],
  execute: (inputArray: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const array = [...inputArray];
    const sorted: number[] = [];
    
    const quickSortRecursive = (arr: number[], low: number, high: number, fullArray: number[]) => {
      if (low < high) {
        // Partition the array and get the pivot index
        const pivotIndex = partition(arr, low, high, fullArray);
        
        // Mark pivot as sorted
        if (!sorted.includes(pivotIndex)) {
          sorted.push(pivotIndex);
        }
        
        // Recursively sort the sub-arrays
        quickSortRecursive(arr, low, pivotIndex - 1, fullArray);
        quickSortRecursive(arr, pivotIndex + 1, high, fullArray);
      } else if (low === high && !sorted.includes(low)) {
        // Single element is automatically sorted
        sorted.push(low);
      }
    };
    
    const partition = (arr: number[], low: number, high: number, fullArray: number[]): number => {
      // Use last element as pivot
      const pivot = arr[high];
      
      steps.push({
        array: [...fullArray],
        comparing: null,
        swapping: null,
        sorted: [...sorted],
        currentAction: `Selecting pivot element: ${pivot}`
      });
      
      let i = low - 1; // Index of smaller element
      
      for (let j = low; j < high; j++) {
        steps.push({
          array: [...fullArray],
          comparing: [j, high], // Compare current element with pivot
          swapping: null,
          sorted: [...sorted],
          currentAction: `Comparing element ${fullArray[j]} with pivot ${pivot}`
        });
        
        // If current element is smaller than the pivot
        if (arr[j] < pivot) {
          i++;
          
          steps.push({
            array: [...fullArray],
            comparing: null,
            swapping: [i, j],
            sorted: [...sorted],
            currentAction: `Moving smaller element ${fullArray[j]} to the left partition`
          });
          
          // Swap arr[i] and arr[j]
          [arr[i], arr[j]] = [arr[j], arr[i]];
          [fullArray[i + low], fullArray[j + low]] = [fullArray[j + low], fullArray[i + low]];
        }
      }
      
      // Swap arr[i+1] and arr[high] (put the pivot in its correct position)
      steps.push({
        array: [...fullArray],
        comparing: null,
        swapping: [i + 1, high],
        sorted: [...sorted],
        currentAction: `Placing pivot ${pivot} in its final position`
      });
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      [fullArray[i + 1 + low], fullArray[high + low]] = [fullArray[high + low], fullArray[i + 1 + low]];
      
      return i + 1;
    };
    
    // Start the quick sort
    quickSortRecursive(array, 0, array.length - 1, array);
    
    // Make sure all indices are marked as sorted at the end
    for (let i = 0; i < array.length; i++) {
      if (!sorted.includes(i)) {
        sorted.push(i);
      }
    }
    
    steps.push({
      array: [...array],
      comparing: null,
      swapping: null,
      sorted: [...sorted.sort((a, b) => a - b)],
      currentAction: `Sorting complete`
    });
    
    return steps;
  }
};

export const mergeSort: SortingAlgorithm = {
  name: "Merge Sort",
  description: [
    "Divide the array into two halves",
    "Recursively sort both halves",
    "Merge the sorted halves to produce the final sorted array"
  ],
  execute: (inputArray: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const array = [...inputArray];
    const sorted: number[] = [];
    
    const merge = (arr: number[], left: number, middle: number, right: number, fullArray: number[]) => {
      const n1 = middle - left + 1;
      const n2 = right - middle;
      
      // Create temporary arrays
      const L = new Array(n1);
      const R = new Array(n2);
      
      // Copy data to temporary arrays
      for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i];
      }
      for (let j = 0; j < n2; j++) {
        R[j] = arr[middle + 1 + j];
      }
      
      steps.push({
        array: [...fullArray],
        comparing: null,
        swapping: null,
        sorted: [...sorted],
        currentAction: `Dividing the array into subarrays for merging`
      });
      
      // Merge the temporary arrays back
      let i = 0; // Index of first subarray
      let j = 0; // Index of second subarray
      let k = left; // Index of merged array
      
      while (i < n1 && j < n2) {
        steps.push({
          array: [...fullArray],
          comparing: [left + i, middle + 1 + j],
          swapping: null,
          sorted: [...sorted],
          currentAction: `Comparing elements from left and right subarrays`
        });
        
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          fullArray[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          fullArray[k] = R[j];
          j++;
        }
        
        steps.push({
          array: [...fullArray],
          comparing: null,
          // Fix: Changed from [k] to [k, k] to match the expected type
          swapping: [k, k],
          sorted: [...sorted],
          currentAction: `Placing element in the correct position of the merged array`
        });
        
        k++;
      }
      
      // Copy remaining elements of L[] if any
      while (i < n1) {
        arr[k] = L[i];
        fullArray[k] = L[i];
        
        steps.push({
          array: [...fullArray],
          comparing: null,
          // Fix: Changed from [k] to [k, k] to match the expected type
          swapping: [k, k],
          sorted: [...sorted],
          currentAction: `Copying remaining elements from left subarray`
        });
        
        i++;
        k++;
      }
      
      // Copy remaining elements of R[] if any
      while (j < n2) {
        arr[k] = R[j];
        fullArray[k] = R[j];
        
        steps.push({
          array: [...fullArray],
          comparing: null,
          // Fix: Changed from [k] to [k, k] to match the expected type
          swapping: [k, k],
          sorted: [...sorted],
          currentAction: `Copying remaining elements from right subarray`
        });
        
        j++;
        k++;
      }
      
      // Mark the range as sorted
      for (let idx = left; idx <= right; idx++) {
        if (!sorted.includes(idx)) {
          sorted.push(idx);
        }
      }
    };
    
    const mergeSortRecursive = (arr: number[], left: number, right: number, fullArray: number[]) => {
      if (left < right) {
        // Find the middle point
        const middle = Math.floor((left + right) / 2);
        
        // Sort first and second halves
        mergeSortRecursive(arr, left, middle, fullArray);
        mergeSortRecursive(arr, middle + 1, right, fullArray);
        
        // Merge the sorted halves
        merge(arr, left, middle, right, fullArray);
      } else if (left === right) {
        // Single element is already sorted
        if (!sorted.includes(left)) {
          sorted.push(left);
        }
      }
    };
    
    // Start the merge sort
    mergeSortRecursive(array, 0, array.length - 1, array);
    
    // Final step showing the completely sorted array
    steps.push({
      array: [...array],
      comparing: null,
      swapping: null,
      sorted: [...sorted.sort((a, b) => a - b)],
      currentAction: `Sorting complete`
    });
    
    return steps;
  }
};

export const algorithms: SortingAlgorithm[] = [
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort
];
