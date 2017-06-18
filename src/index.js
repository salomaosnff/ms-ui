import Grid from './components/grid/';
import Container from './components/container/';

const Plugin = {
    Grid,
    Container
};

Plugin.install = (Vue) => {
    for (let c in Plugin) {
        if (c === 'install') {
            continue;
        }
        Vue.use(Plugin[c]);
    }
};

export default Plugin;
