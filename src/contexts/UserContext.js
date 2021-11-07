import { createContext, useState } from 'react';

const UserContext = createContext([{}, () => {}]);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Bob Example',
        auth: false,
        avatar: 'https://www.w3schools.com/w3images/avatar2.png',
        jwt: '',
        userType: '',
        font: 2,
        theme: 'material',
        notification: false,
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
