import axios from 'axios';

export const logInCallback = (res, history, setUser, data) => {
    const token = res.headers.get('x-auth-token');
    localStorage.setItem('jwt', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(data));
    console.log(data);
    setUser({ ...data, jwt: token, auth: true, theme: 'material' });
    //if (res.status === 200) history.push(`/${data.userType}`);
    // const userId = '615ed6cccf465b99b60dbf3b';
    axios.put(`http://localhost:5000/groups/6173b8281e3416e90891a71a`, {
        user: data.id,
        action: 'login',
    });
    if (res.status === 200 && data.userType === 'teacher') {
        history.push('/dash');
    } else if (res.status === 200 && data.userType === 'student') {
        history.push('/calendar');
    } else {
        history.push('/');
    }
};

export const updateLoggedInStatus = async () => {
    // const userId = '615ed6cccf465b99b60dbf3b';
    // axios.put(
    //     `http://localhost:5000/groups/6172ab71162a0c83fde43f65/${userId}`
    // );
};
export const signUpCallback = (res, history) => {
    if (res.status === 200) history.push('/');
};
