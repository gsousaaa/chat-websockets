const socket = io();
const chatPage = document.getElementById('chat')
const chatArea = document.querySelector('.chatArea')
const chatList = document.querySelector('.chatList')

let userList = []

function renderUserList(users) {
    let ul = document.querySelector('.userList')
    ul.innerHTML = ''

    users.forEach(i => {
        ul.innerHTML += '<li>'+i+'</li>'
    })

    console.log(userList)
}

window.addEventListener('load', () => {
     const username = localStorage.getItem('username')
     document.title = `Chat (${username})`
     socket.emit('join-request', username)
})

socket.on('user-on', (list) => {
    userList = list
    renderUserList(userList)
})


