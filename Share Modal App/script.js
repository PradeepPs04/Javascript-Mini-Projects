full_scr = document.querySelector('.full-scr')
share_container = document.querySelector('.share');

let openShare = () => {
    share_container.classList.add('share-show');
    full_scr.classList.add('full-scr-show');
    // console.log('adding');
}

let closeShare = () => {
    share_container.classList.remove('share-show');
    full_scr.classList.remove('full-scr-show');
    // console.log('removing');
}