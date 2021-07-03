const currentUserState = localStorage.getItem('user');

if(currentUserState) {
    location.href = '/'
}