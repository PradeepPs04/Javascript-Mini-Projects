let minus_btn = document.querySelector('#minus'); // getting minus button
let plus_btn = document.querySelector('#plus'); // getting plus button
let cnt = document.querySelector('#counter');   // getting counter where we will display the count
let total_count = 0;    // to store total count

function updateCounter() {
    cnt.innerText = total_count;
}

plus_btn.addEventListener('click', ()=> {
    total_count++;
    // console.log(total_count);
    updateCounter();
});

minus_btn.addEventListener('click', ()=> {
    total_count--;
    // console.log(total_count);
    updateCounter();
});