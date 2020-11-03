const smoothScrollApp = {}

smoothScrollApp.init = (options) => {
    let {target, duration} = options;
    let $target = document.querySelector(target);
    let targetPosition = $target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime){
        if (!startTime) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

let section1 = document.querySelector('.section1');
section1.addEventListener('click', function (){
    smoothScroll('.section2', 2000);
})