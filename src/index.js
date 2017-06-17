import Layout from './components/layout';

const Plugin = {
  Layout
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
