var tickers = JSON.parse(localStorage.getItem('tickers')) || [];
var lastPrices = {};
var counter = 15;
var charts = {}; // Objeto para almacenar los gráficos

// Función para refrescar los datos
function startUpdateCycle() {
    updatePrices();
    setInterval(function() {
        counter--;
        $('#counter').text(counter);
        if (counter <= 0) {
            updatePrices();
            counter = 15;
        }
    }, 1000);
}

$(document).ready(function() {
    tickers.forEach(function(T) {
        addTickerToGrid(T);
    });

    updatePrices();
    $('#add-ticker-form').submit(function(e) {
        e.preventDefault();
        var newTicker = $('#new-ticker').val().toUpperCase();
        if (!tickers.includes(newTicker)) {
            tickers.push(newTicker);
            localStorage.setItem('tickers', JSON.stringify(tickers));
            addTickerToGrid(newTicker);
        }
        $('#new-ticker').val('');
        updatePrices();
    });

    $('#tickers-grid').on('click', '.remove-btn', function() {
        var tickerToRemove = $(this).data('ticker');
        tickers = tickers.filter(t => t !== tickerToRemove);
        localStorage.setItem('tickers', JSON.stringify(tickers));
        $(`#${tickerToRemove}`).remove();
        if (charts[tickerToRemove]) {
            charts[tickerToRemove].destroy(); // Elimina el gráfico si el ticker es eliminado
            delete charts[tickerToRemove];
        }
    });

    startUpdateCycle();
});

function addTickerToGrid(ticker) {
    $(`#${ticker}`).remove();
    $('#tickers-grid').append(
        `<div id="${ticker}" class="stock-box">
            <div class="stock-info">
                <h2>${ticker}</h2>
                <p id="${ticker}-op"></p>
                <p id="${ticker}-price"></p>
                <p id="${ticker}-var"></p>
                <p id="${ticker}-pct"></p>
                <button class="remove-btn" data-ticker="${ticker}">Eliminar</button>
            </div>
            <div class="chart-container">
                <canvas id="${ticker}-chart" width="600" height="150"></canvas>
            </div>
        </div>`
    );

    // Inicializa el gráfico para el nuevo ticker
    charts[ticker] = new Chart(document.getElementById(`${ticker}-chart`).getContext('2d'), {
        type: 'line',
        data: {
            labels: [], // Mantén la lista de etiquetas vacía al principio
            datasets: [{
                label: 'Precio de la Acción',
                data: [], // Mantén la lista de datos vacía al principio
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    },
                    title: {
                        display: true,
                        text: 'Tiempo'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Precio'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(2); // Formatea los ticks como valores monetarios
                        }
                    }
                }
            }
        }
    });
}

function updateChart(ticker, data) {
    var chart = charts[ticker];
    if (chart) {
        // Actualiza los datos del gráfico existente
        chart.data.labels.push(new Date());
        chart.data.datasets[0].data.push(data.currentPrice);
        
        // Ajusta los límites del eje Y automáticamente
        const allPrices = chart.data.datasets[0].data;
        const minPrice = Math.min(...allPrices) - 1;
        const maxPrice = Math.max(...allPrices) + 1;

        chart.options.scales.y.suggestedMin = minPrice;
        chart.options.scales.y.suggestedMax = maxPrice;
        
        // Ajusta el tamaño del paso en los ticks del eje Y
        chart.options.scales.y.ticks.stepSize = (maxPrice - minPrice) / 100; // Ajusta este número para obtener el intervalo deseado

        
        // Actualiza el gráfico con los nuevos datos
        chart.update();
    } else {
        console.error(`No se encontró el gráfico para el ticker: ${ticker}`);
    }
}

function updatePrices() {
    tickers.forEach(function(ticker) {
        $.ajax({
            url: '/get_stock_data',
            type: 'POST',
            data: JSON.stringify({'ticker': ticker}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data) {
                console.log('Datos recibidos:', data); // Añadir esto para depurar
                var changePercent = ((data.currentPrice - data.openPrice) / data.openPrice) * 100;
                var variation = data.currentPrice - data.openPrice;
                var colorClass;
                if (changePercent <= -2) {
                    colorClass = 'dark-red';
                } else if (changePercent < 0) {
                    colorClass = 'red';
                } else if (changePercent == 0) {
                    colorClass = 'gray';
                } else if (changePercent <= 2) {
                    colorClass = 'green';
                } else {
                    colorClass = 'dark-green';
                }

                $(`#${ticker}-price`).html(`Actual: <span class="${colorClass}">$${data.currentPrice.toFixed(2)}</span>`);
                $(`#${ticker}-pct`).html(`Relativo: <span class="${colorClass}">${changePercent.toFixed(2)}%</span>`);
                $(`#${ticker}-op`).html(`Apertura: <span class="${colorClass}">$${data.openPrice.toFixed(2)}</span>`);
                $(`#${ticker}-var`).html(`Absoluto: <span class="${colorClass}">$${variation.toFixed(2)}</span>`);

                $(`#${ticker}-price`).removeClass('dark-red red gray green dark-green').addClass(colorClass);
                $(`#${ticker}-pct`).removeClass('dark-red red gray green dark-green').addClass(colorClass);
                $(`#${ticker}-op`).removeClass('dark-red red gray green dark-green').addClass(colorClass);
                $(`#${ticker}-var`).removeClass('dark-red red gray green dark-green').addClass(colorClass);

                var flashClass;
                if (lastPrices[ticker] > data.currentPrice) {
                    flashClass = 'red-flash';
                } else if (lastPrices[ticker] < data.currentPrice) {
                    flashClass = 'green-flash';
                } else {
                    flashClass = 'gray-flash';
                }
                lastPrices[ticker] = data.currentPrice;

                $(`#${ticker}`).addClass(flashClass);
                setTimeout(function() {
                    $(`#${ticker}`).removeClass(flashClass);
                }, 1000);

                updateChart(ticker, data); // Actualiza el gráfico con los datos
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error al obtener datos para el ticker: ', ticker);
            }
        });
    });
}
