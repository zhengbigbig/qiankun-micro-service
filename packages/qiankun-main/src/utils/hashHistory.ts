import history from './history';

const hashHistory = (path: string) => {
    if (path.indexOf('#') > -1) {
        const url = path.split('#')[0];
        const hash = path.split('#')[1];
        if (location.pathname.indexOf(url) > -1) {
            window.location.hash = hash;
            return;
        }
        history.push(path);
    } else {
        history.push(path);
    }
};
export default hashHistory;
