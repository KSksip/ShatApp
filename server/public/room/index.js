const socket = new WebSocket('/websocket/room')

const nicknameEl = document.getElementById('nicknameDisplay')
const sendBtn = document.getElementById('sendBtn')
const messageInput = document.getElementById('messageInput')
const chatField = document.getElementById('chatField')
const clearChatBtn =document.getElementById('clearChatBtn')

let nickname = localStorage.getItem('nickname')
let messageLog = { messages: [] }

if(localStorage.getItem('messageLog')){
    messageLog = localStorage.getItem('messageLog')
    messageLog = JSON.parse(messageLog)
    console.log(messageLog)

    for(let message of messageLog.messages){
        message = JSON.parse(message)
        console.log(message)
        renderMessage(message)
    }
}

nicknameEl.innerText = nickname

socket.onopen = (event) => {
    console.log(socket)
}

socket.onmessage = async (event) => {
    let message = event.data

    if(await event.data.text()){
        message = await event.data.text()

        saveMessage(message)

        message = JSON.parse(message)
        renderMessage(message)
    }
}

console.log('rans')

clearChatBtn.addEventListener('click', clearChat)
sendBtn.addEventListener('click', sendMessage)

messageInput.addEventListener('keyup', (event) => {
    if(event.key == 'Enter'){
        sendMessage()
    }
})

function sanitizeHTML(str) {
    if(str){
        return str.replace(/[^\w. ]/gi, function (c) {
            return '&#' + c.charCodeAt(0) + ';';
        });
        
    }
};

function clearChat(){
    localStorage.setItem('messageLog', '')
    chatField.innerHTML = ""
}

function sendMessage(){
    const message = {
        nickname: nickname,
        timeStamp: String(new Date),
        data: messageInput.value
    }
    messageInput.value = ""
    renderMessage(message)
    const data = JSON.stringify(message)
    saveMessage(data)
    socket.send(data)
}

function saveMessage(message){
    console.log(message)
    messageLog.messages.push(message)
    console.log(messageLog)
    localStorage.setItem('messageLog', JSON.stringify(messageLog))
}


function renderMessage(message){
    chatField.innerHTML += `
        <div class="flex-h" style="gap: 0.7rem;">
            <h4>${sanitizeHTML(message.nickname)}</h4>
            <p> • </p>
            <span>${sanitizeHTML(message.timeStamp)}</span>
        </div>
    
        <div style="padding: 0 0 0.5rem 0.5rem; ">
            <p>${sanitizeHTML(message.data)}</p>
        </div>
        <hr>
    `
    chatField.scrollTop = chatField.scrollHeight
}