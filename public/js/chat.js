const socket = io();
const chatPage = document.getElementById('chat')
const chatArea = document.querySelector('.chatArea')


let userList = []

function renderUserList(users) {
    let ul = document.querySelector('.userList')
    ul.innerHTML = ''

    users.forEach(i => {
        ul.innerHTML += '<li>'+i+'</li>'
    })

    console.log(userList)
}

function addMessage(type, user, msg) {
    let ul = document.querySelector('.chatList')
   
    switch(type) {
        case 'status':
            ul.innerHTML += `<li class="m-status">${msg}</li>`
        break; 
        case 'msg': 
             ul.innerHTML += `<li class="m-status"><span>${user}</span> ${msg}</li>`
        break;
    }

}

window.addEventListener('load', () => {
    const username = sessionStorage.getItem('username');
    if (username) {
        document.title = `Chat (${username})`;
        socket.emit('join-request', username);
    }
});


socket.on('user-ok', (list) => {
    addMessage('status', null, 'Conectado!')

    userList = list
    renderUserList(userList)
})

socket.on('list-update', (data) => {
    if (data.joined) {
        addMessage('status', null, `${data.joined} entrou no chat`)
    }

    if (data.left) {
        addMessage('status', null, `${data.left} saiu no chat`)
    }

    userList = data.list
    renderUserList(userList)

})


