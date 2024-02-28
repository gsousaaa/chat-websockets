const socket = io();
const chatPage = document.getElementById('chat')
const chatArea = document.querySelector('.chatArea')
const textInput = document.getElementById('chatTextInput')


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
             ul.innerHTML += `<li class="m-txt"><span>${user}</span> ${msg}</li>`
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

textInput.addEventListener('keyup', (e) => {
    const username = sessionStorage.getItem('username');
    
    if(e.key === 'Enter') {
        let txt = textInput.value
    textInput.value = ''

    if(txt != '') {
        addMessage('msg', username, txt)
        socket.emit('send-msg', txt)
    }
    }
})

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

socket.on('show-msg', (data) => {
    addMessage('msg', data.username, data.message)
})

