const fixedClass = 'ms--affix';

const affix = (e, el, data) => {
    const offsetTop = window.pageYOffset - 16.5;
    if (offsetTop <= data.top) {
        if (el.classList.contains(fixedClass)) {
            el.style.top = data.originTop !== undefined ? data.originTop : '';
            el.style.left = data.originLeft !== undefined ? data.originLeft : '';

            el.classList.remove(fixedClass);
        }
    } else {
        if (!el.classList.contains(fixedClass)) {
            el.style.top = '';
            el.style.left = data.left;

            el.classList.add(fixedClass);
        }
    }
}

function directive(el, binding) {
    const rect = el.getBoundingClientRect();

    const data = {
        rect,
        top: rect['top'] + window.pageYOffset,
        left: rect['left'] + 'px',
        originTop: el.style.hasOwnProperty('top') ? el.style.top : undefined,
        originLeft: el.style.hasOwnProperty('left') ? el.style.left : undefined
    }

    // init
    if (rect['top'] <= 0) {
        el.classList.add(fixedClass);
        el.style.left = data.left;
    }

    window.addEventListener('scroll', e => affix(e, el, data), false);
}

function unbind (el, binding) {
    window.removeEventListener('scroll', affix, false);
}

export default function install(Vue) {
    Vue.directive('affix', {
        bind: (el, binding) => Vue.nextTick(() => directive(el, binding)),
        unbind: unbind
    })
}