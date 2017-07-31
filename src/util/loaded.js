function loaded(cb, i = 0) {
    if (i > 4) return;

    if (document.readyState === 'complete') {
        return setTimeout(cb, 0);
    }

    if (document.readyState === 'interactive') {
        return setTimeout(() => loaded(cb, i + 1), 150);
    }

    document.addEventListener('DOMContentLoaded', cb);
}

export default loaded;