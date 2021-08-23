export const authHeader =()=> {
    // return authorization header with jwt token
    const currentUser = localStorage.getItem('token');
    if (currentUser) {
        return { Authorization:`Bearer ${currentUser}` };
    } else {
        return {};
    }
}