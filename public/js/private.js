const currentUserState = localStorage.getItem('user');

if(!currentUserState) {
    location.href = '/auth/login'
}