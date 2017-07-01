// Directives
import Media from './directives/media';
import Ripple from './directives/ripple';

// Components
import App from './components/app/';
import Grid from './components/grid/';
import Container from './components/container/';
import Icon from './components/icon/';
import Button from './components/button/';
import Form from './components/form/';
import Transitions from './components/transitions';
import Hr from './components/hr';

const Plugin = {
    // Directives
    Media,
    Ripple,

    // Components
    App,
    Grid,
    Container,
    Icon,
    Button,
    Form,
    Transitions,
    Hr
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
};

export default Plugin;
