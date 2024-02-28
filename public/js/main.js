const socket = io();

const loginPage = document.getElementById('loginPage')
const loginNameInput = document.getElementById('loginNameInput')
const joinChatButton = document.getElementById('joinChatButton')

joinChatButton.addEventListener('click', (e)=> {
    if(!loginNameInput.value) {
        return;
    }

    let username = loginNameInput.value
    sessionStorage.setItem('username', username)
   
    window.location.href= '/chat.html'
})

