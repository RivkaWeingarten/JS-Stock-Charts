async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const newLocal = 'https://api.twelvedata.com/time_series?symbol=DIS,GME,BNTX,MSFT&interval=1day&apikey=ccf8fb3db6ac463e84b30b994fb20313';
    let fourStocks = await fetch(newLocal)
    // let result= fourStocks.json()
    //  console.log(result)


    // let GME = result.GME
    // let MSFT = result.MSFT
    // let DIS = result.DIS
    // let BNTX = result.BNTX

    // const stocks = [GME, MSFT, DIS, BNTX];
    // console.log(stocks)
    // Bonus Note: 
    // Another way to write the above lines would to refactor it as:
    // const {GME, MSFT, DIS, BTNX} = result 
    // This is an example of "destructuring" an object
    // "Destructuring" creates new variables from an object or an array



    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];

    stocks.forEach(stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }

    });
    // The way institutions do it is to find the closing price of each day not highest, but Well.

  


    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(value => value.meta.symbol),
            datasets: [{
                label: 'highest',
                data: stocks.map(value => getHighest(value)),
                backgroundColor: stocks.map(value=>getColor(value.meta.symbol)),
                borderColor: stocks.map(value=>getColor(value.meta.symbol)),
            }]
        
        }
    });

    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(value => value.meta.symbol),
            datasets: [{
                label: stocks.map(value=>value.meta.symbol),
                data: stocks.map(value => getAverage(value)),
                backgroundColor: stocks.map(value=>getColor(value.meta.symbol)),
                borderColor: stocks.map(value=>getColor(value.meta.symbol)),
            }]
        }
    });


    function getColor(stock) {
        if (stock === "GME") {
            return 'rgba(61, 161, 61, 0.7)'
        }
        if (stock === "MSFT") {
            return 'rgba(209, 4, 25, 0.7)'
        }
        if (stock === "DIS") {
            return 'rgba(18, 4, 209, 0.7)'
        }
        if (stock === "BNTX") {
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    function getHighest(stock) {

        let highest = 0
        let days = stock.values.map(value => parseFloat(value.high))
        days.forEach(dayValue => {
            if (dayValue >= highest) {
                highest = dayValue
            } else {
                highest = highest
            }

        })
        return highest
    }



    function getAverage(stock) {
       
        let sumAvg = 0
        avgdays = stock.values.map(value => parseFloat(value.high))
        avgdays.forEach(dailyAvg => {
            sumAvg = dailyAvg + sumAvg
          
        })
        averagePrice = sumAvg / avgdays.length
    return averagePrice
    }
    

}
main()
