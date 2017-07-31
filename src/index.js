// Utils
import Loaded from './util/loaded';

// Directives
import Media from './directives/media';
import Ripple from './directives/ripple';
import ClickOutside from './directives/click-outside';
import Touch from './directives/touch';

// Components
import App from './components/app';
import Grid from './components/grid';
import Icon from './components/icon';
import Button from './components/button';
import Form from './components/form';
import Transitions from './components/transitions';
import Hr from './components/hr';
import Tabs from './components/tabs';
import Card from './components/card';
import Slider from './components/slider';

const Plugin = {
    // Directives
    Media,
    Ripple,
    ClickOutside,
    Touch,

    // Components
    App,
    Grid,
    Icon,
    Button,
    Form,
    Transitions,
    Hr,
    Tabs,
    Card,
    Slider
};

Plugin.install = (Vue, options) => {

    options = Object.assign({
        icon: {
            classFormat: 'mdi mdi-%',
            inContent: false
        }
    }, options);

    for (let c in Plugin) {
        if (c === 'install') {
            continue;
        }
        Vue.use(Plugin[c], options);
    }

    Vue.prototype.$ms = {
        loaded: Loaded,
        breakpoints: {
            xs: m => m > 0,
            sm: m => m > 600,
            md: m => m > 992,
            lg: m => m > 1200,
            xl: m => m > 1920
        }
    }
};

export default Plugin;
