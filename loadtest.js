// function that executes a function (e.g. a request n Times), conditionally with a delay 1-30 ms
function runThisNTimes(functionToRun, nTimes, hasDelay = true, timeToExecuteTotalRequests) {
    let _currDelay = 0;

    [...Array(nTimes).keys()].map(() => {
        _currDelay += singleRequestDelay(nTimes, timeToExecuteTotalRequests);
        setTimeout(() => {
            functionToRun()
        }, hasDelay ? _currDelay : 0)
    })
}




function requestThisEndPoint(item) {
    console.log(item);
}

// function that calcs a random number between 1 and 30, as a delay
function randomDelay(maxDelay = 30) {
    return Math.floor(Math.random() * maxDelay) + 1;
}

// function to distribute single request delay based on total requests and the time that it takes to complete those requests
function singleRequestDelay(totalRequests, timeToExecuteTotalRequests) {
    let currentRequestAVGDelay = timeToExecuteTotalRequests / totalRequests ;
    console.log(totalRequests, timeToExecuteTotalRequests, currentRequestAVGDelay);

    //add or remove delay of request
    Math.floor(Math.random() * 2) === 0 ? currentRequestAVGDelay += randomDelay() : currentRequestAVGDelay -= randomDelay();

    return currentRequestAVGDelay;
}

// Returns a random integer from 0 to 9:


let array = [100, 20, 10, 20, 30,]

array.forEach((item, index) => {
    setTimeout(() => {
        runThisNTimes(() => requestThisEndPoint(item), item, true, 2000)
    }, 2000 * (index + 1)) // run n request every n times

})


