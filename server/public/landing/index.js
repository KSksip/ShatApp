const enterBtn = document.getElementById('enterBtn')
const nicknameEl = document.getElementById('nickname')

console.log('a')

enterBtn.addEventListener('click', () => {
    console.log('ran')
    localStorage.setItem('nickname', nicknameEl.value)
    window.location.replace('/room/')
})