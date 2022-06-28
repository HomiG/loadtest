const axios = require('axios');
// function that executes 'function' (e.g. a requester n-Times).  ?randomized delay 1-30 ms
function runThisNTimes(functionToRun, nTimes, hasDelay = true, timeToExecuteTotalRequests) {
    let _currDelay = 0;
    [...Array(nTimes).keys()].map((el, index) => {
        _currDelay += singleRequestDelay(nTimes, timeToExecuteTotalRequests);
        setTimeout(() => {
            console.log({ hasSent: index, mustSend: nTimes });
            functionToRun()
        }, hasDelay ? _currDelay : 0)
    })
}



// function that sends get request to link
async function requestThisEndPoint(link) {
    let resp = await axios.get(link)
    // console.log(resp.data);
}

// function to calculate single request delay based on total requests and the time that it takes to complete those requests.
// aim is requests to be distributed harmonically in their time range.
function singleRequestDelay(totalRequests, timeToExecuteTotalRequests) {
    let currentRequestAVGDelay = timeToExecuteTotalRequests / totalRequests;
    console.log({ totalRequests, timeToExecuteTotalRequests, currentRequestAVGDelay });

    //add or remove delay of request
    Math.floor(Math.random() * 2) === 0 ? currentRequestAVGDelay += randomDelay(1) : currentRequestAVGDelay -= randomDelay(1);

    return currentRequestAVGDelay;
}

// function that calcs a random number between 1 and 30, as a delay.
// aim is each request to have an extra/less randomized delay time
function randomDelay(maxDelay = 30) {
    return Math.floor(Math.random() * maxDelay) + 1;
}




function simulation({ samplingRateMs, requestPerSamplingRateMsARRAY, endpoint }) {
    let array = requestPerSamplingRateMsARRAY
    let count = 0;
    array.forEach((item, index) => {
        setTimeout(() => {
            count = count + 1;
            runThisNTimes(() => requestThisEndPoint(endpoint), item, true, samplingRateMs);
            console.log({ count },);
        }, samplingRateMs * (index)) // run Nth request every n times

    })

}

// # of requests per range-time-unit
const myArr = [
    10,
    20,
    10,
    121,
    144,
    155,
    88,
    124,
    200,
    300,
    190,
    600,
    20,
    10,
    100,
    92,
    89
]

// simulation({ samplingRateMs: 15000, requestPerSamplingRateMsARRAY: myArr, endpoint: 'http://localhost:8000/mockl' })


const endpoints = ['http://localhost:8000/mockl', 'http://localhost:8000/mock2'];

function multipleEndpointLoadTest({ endpoints, simulationFunction }) {
    endpoints.forEach(endpoint => {
        simulationFunction({ samplingRateMs: 15000, requestPerSamplingRateMsARRAY: myArr, endpoint: endpoint })
    })
}

multipleEndpointLoadTest({ endpoints: endpoints, simulationFunction: simulation })
