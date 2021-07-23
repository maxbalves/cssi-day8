const messagesRef = firebase.database().ref();
const messageInput = document.querySelector("#message");
const passcodeInput = document.querySelector("#passcode");

let SHA256_Hasher = new Hashes.SHA256;  // creating our sha256 hasher

const checkPassStrength = (pass) => {
    hasUpper = new RegExp('[A-Z]');
    hasNumber = new RegExp('[0-9]');
    return hasUpper.test(pass) && hasNumber.test(pass);
}

const submitMessages = () => {
    let m = messageInput.value;
    let p = passcodeInput.value;

    if(m.length > 140){
        alert(`Message is too big. You are limited to 140 characters.\nCurrent characters: ${m.length}`)
    } else if(checkPassStrength(p) == false) {
        alert(`Passcode not strong enough.\nMake sure it contains at least one capital letter and one number`)
    } else {
        // creating passcode hash
        p = SHA256_Hasher.hex(p);

        messagesRef.push({
            message: m,
            passcode: p
        });
        console.log("new message/passcode submitted");
        passcodeInput.value = "";
        messageInput.value = "";
    }
};