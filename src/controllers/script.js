import LinkedList from "../models/LinkedList.js";

let list = new LinkedList();
const rute = "./controllers/bussines.json";
let timingData = {
    linkedListInsertion: 0,
    linkedListBubbleSort: 0,
    linkedListMergeSort: 0,
    linkedListRadixSort: 0,
    arrayInsertion: 0,
    arrayBubbleSort: 0,
    arrayMergeSort: 0,
    arrayRadixSort: 0
};

function measureTime(fn) {
    const start = performance.now();
    fn();
    return performance.now() - start;
}

fetch(rute)
.then(response => response.json())
.then(data => {
    let arrayData = [];

    timingData.linkedListInsertion = measureTime(() => {
        for (let i = 0; i < 100; i++) {
            list.add(data[i].name);
        }
    });

    timingData.linkedListBubbleSort = measureTime(() => list.bubbleSort());
    timingData.linkedListMergeSort = measureTime(() => list.mergeSort());
    timingData.linkedListRadixSort = measureTime(() => list.radixSort());

    timingData.arrayInsertion = measureTime(() => {
        for (let i = 0; i < 100; i++) {
            arrayData.push(data[i].name);
        }
    });

    timingData.arrayBubbleSort = measureTime(() => bubbleSort(arrayData));
    timingData.arrayMergeSort = measureTime(() => mergeSort(arrayData));
    timingData.arrayRadixSort = measureTime(() => radixSort(arrayData));

    console.log('Timing Data:', timingData); // Verifica que los datos sean correctos
    renderCharts(timingData);

}).catch(err => console.log('Error fetching data:', err));

function bubbleSort(array) {
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}

function mergeSort(array) {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, mid));
    const right = mergeSort(array.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [], lIndex = 0, rIndex = 0;
    while (lIndex < left.length && rIndex < right.length) {
        if (left[lIndex] < right[rIndex]) {
            result.push(left[lIndex]);
            lIndex++;
        } else {
            result.push(right[rIndex]);
            rIndex++;
        }
    }
    return result.concat(left.slice(lIndex)).concat(right.slice(rIndex));
}

function radixSort(array) {
    const maxNum = Math.max(...array);
    let digit = 1;
    while (digit <= maxNum) {
        let buckets = [...Array(10)].map(() => []);
        for (let num of array) {
            buckets[Math.floor(num / digit) % 10].push(num);
        }
        array = [].concat(...buckets);
        digit *= 10;
    }
    return array;
}

function renderCharts(timingData) {
    const ctx1 = document.getElementById('arrayVsLinkedListChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Array Insertion', 'LinkedList Insertion'],
            datasets: [{
                label: 'Tiempo (ms)',
                data: [
                    timingData.arrayInsertion,
                    timingData.linkedListInsertion
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Métodos de Inserción'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Tiempo (ms)'
                    }
                }
            }
        }
    });

    const ctx2 = document.getElementById('sortMethodsChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: [
                'Array Bubble Sort', 'LinkedList Bubble Sort',
                'Array Merge Sort', 'LinkedList Merge Sort',
                'Array Radix Sort', 'LinkedList Radix Sort'
            ],
            datasets: [{
                label: 'Tiempo (ms)',
                data: [
                    timingData.arrayBubbleSort,
                    timingData.linkedListBubbleSort,
                    timingData.arrayMergeSort,
                    timingData.linkedListMergeSort,
                    timingData.arrayRadixSort,
                    timingData.linkedListRadixSort
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)', 'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Métodos de Ordenación'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Tiempo (ms)'
                    }
                }
            }
        }
    });
}
