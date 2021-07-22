const messagesRef = firebase.database().ref();
const messageInput = document.querySelector("#message");
const passcodeInput = document.querySelector("#passcode");

const submitMessages = () => {
    let m = messageInput.value;
    let p = passcodeInput.value;

    if(m.length > 140){
        alert(`Message is too big. You are limited to 140 characters.\nCurrent characters: ${m.length}`)
    } else {
        messagesRef.push({
            message: m,
            passcode: p
        });
        console.log("new message/passcode submitted");
        passcodeInput.value = "";
        messageInput.value = "";
    }
};