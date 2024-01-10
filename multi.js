this.onmessage = function () {
    let m = 1000000000;
    for (let i = 1; i < 100000000; i++){
        m -= i;
    }
    this.postMessage(m);
}