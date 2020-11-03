import {animationObj} from './animation';

const smoothScrollApp = {}

smoothScrollApp.init = (options = {}, element) => {
    const {target, duration, animationType = ''} = options;
    if (target === undefined && element.getAttribute("href") === '') return
    const $target = document.querySelector(target || element.getAttribute("href"));
    const $animationType = animationType || element.dataset.scrollanimation || 'easeInOutQuad';

    const $duration = duration || element.dataset.scrollduration || '1000';
    const targetPosition = $target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = animationObj[$animationType](timeElapsed, startPosition, distance, $duration);
        window.scrollTo(0, run);
        if (timeElapsed < $duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

smoothScrollApp.start = (options, smoothElements) => {
    const appInit = () => {
        smoothScrollApp.init(options, event.target)
    }

    const listenerDefault = (element, event) => {
        element.addEventListener('click', (event) => {
            if (event.target.dataset.scroll === 'true') {
                appInit()
            }
        })
    }

    const listener = (element, event) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            appInit()
        })
    }

    if (smoothElements) {
        [].slice.call(document.querySelectorAll(smoothElements)).forEach(smoothElement => {
            listener(smoothElement, event);
        })
    } else {
        listenerDefault(document, event);
    }

}

smoothScrollApp.start({
    duration: '3000',
    animationType: 'easeOutQuint'
}, '.smoothTest')