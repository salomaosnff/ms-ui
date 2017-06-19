const mediaClass = ($el, device, classes) => {

    const devices = ['xs', 'sm', 'md', 'lg', 'xl'];

    if (!device) {
        return;
    }

    device = device.split(/([\s|,])/g)
        .filter((dev) => devices.indexOf(dev) >= 0)
        .map((dev) => `ms-${dev}-`);

    classes.forEach((className) => {

        devices.forEach((dev) => {
            dev = `ms-${dev}-`;
            $el.classList.remove(dev + className);
        });

        device.forEach((dev) => $el.classList.add(dev + className));

    });
};

export default function install(Vue) {
    Vue.directive('media', {
        bind(el, bind) {
            const classes = Object.keys(bind.modifiers);

            mediaClass(el, bind.value, classes);
        },
        update(el, bind) {
            const classes = Object.keys(bind.modifiers);

            mediaClass(el, bind.value, classes);
        }
    });
}
