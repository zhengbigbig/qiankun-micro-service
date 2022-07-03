import history from './history';
const navigate = {
    redirectToLogin: () => {
        history.push('/login');
        history.go(0);
    },
    redirectToHome: () => {
        history.push('/app');
    },
};
export default navigate;
