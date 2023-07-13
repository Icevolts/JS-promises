let baseURL = 'http://numbersapi.com'
let favNum = 23

// 1
$.getJSON(`${baseURL}/${favNum}?json`).then(res => console.log(res));

// 2
let favNums = [23,14,48]
$.getJSON(`${baseURL}/${favNums}?json`).then(res => console.log(res));

// 3
Promise.all(Array.from({length: 4}, () => {return $.getJSON(`${baseURL}/${favNum}?json`).then(res => $('body').append(`<p>${res.text}</p>`));
}))