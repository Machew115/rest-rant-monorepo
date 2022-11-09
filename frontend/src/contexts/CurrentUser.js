import { createContext, useState, useEffect } from "react";


export const CurrentUser = createContext()

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            let response = fetch('http://localhost:5500/authentication/profile', {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                }
            })
            let user = (await response).json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider