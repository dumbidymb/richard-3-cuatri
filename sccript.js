window.onload = function() {
    var canvas = document.getElementById('sortingChart');
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(550, 350);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(50, 50);
    ctx.stroke();

    var data = {
        bubbleSort: [10, 20, 30, 40, 60, 80, 100, 150, 200],
        quickSort: [5, 15, 20, 30, 40, 50, 70, 90, 110],
        mergeSort: [2, 10, 15, 25, 35, 45, 55, 70, 80]
    };

    var colors = {
        bubbleSort: 'red',
        quickSort: 'green',
        mergeSort: 'blue'
    };

    Object.keys(data).forEach(function(key) {
        ctx.beginPath();
        ctx.moveTo(50, 350 - data[key][0]);
        data[key].forEach(function(value, index) {
            ctx.lineTo(50 + index * 60, 350 - value);
        });
        ctx.strokeStyle = colors[key];
        ctx.stroke();
    });
};
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
