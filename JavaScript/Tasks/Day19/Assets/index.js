const thisFunction = (callback) => {
    callback();
};

thisFunction(() => {
    console.log("Hello");
});





const promiseFunction = new Promise((resolve, reject) => {

    let success = true;

    if (success) {
        resolve("Task completed");
    } else {
        reject("Task failed");
    }

});



const newPromise = new Promise((resolve, reject) => {
    resolve("Success");
});

newPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Promise completed");
    });





const getData = async () => {
    const data = await fetch("https://www.linkedin.com/mynetwork/grow/");

    console.log(data);
};





fetch("api")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });