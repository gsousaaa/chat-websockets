const socket = io();
const chatPage = document.getElementById('chat')
const chatArea = document.querySelector('.chatArea')
const textInput = document.getElementById('chatTextInput')

let userList = []
let username = sessionStorage.getItem('username');
let isConnected = false

function renderUserList(users) {
    let ul = document.querySelector('.userList')
    ul.innerHTML = '<span>Usuários conectados:</span>'

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
            if(username == user) {
                ul.innerHTML += `<li class="m-txt"><span class="me">${user}</span> ${msg}</li>`
            } else {
                ul.innerHTML += `<li class="m-txt"><span>${user}</span> ${msg}</li>`
            }
            
        break;
    }
   
    ul.scrollTop = ul.scrollHeight
}

window.addEventListener('load', () => {
    if (username) {
        document.title = `Chat (${username})`;
        socket.emit('join-request', username);
    }
});

textInput.addEventListener('keyup', (e) => {
    if( isConnected && e.key === 'Enter') {
        let txt = textInput.value
    textInput.value = ''

        if(txt != '') {
            socket.emit('send-msg', txt)
        }
    }
})

socket.on('user-ok', (list) => {
    isConnected = true
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

socket.on('show-msg', (data) => {
    addMessage('msg', data.username, data.message)
})

socket.on('disconnect', () => {
    addMessage('status', null, 'Você foi desconectado!')
    userList = []
    renderUserList(userList)
    isConnected = false
})

socket.on('connect_error', () => {
    addMessage('status', null, 'Tentando reconectar...')
})

// join-request para reconexão
if (isConnected) {
    socket.on('connect', () => {
        if(username !== '') {
            socket.emit('join-request', username)
        }
    })
}

