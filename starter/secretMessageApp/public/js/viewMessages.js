const resetButton = document.querySelector("#otherPasscode");  // button to try another pw
const messageText = document.querySelector("#message");  // h2 that holds the message
const passcodeInputForm = document.querySelector("#passcodeInputForm"); // pw form
const passcodeInputDiv = document.querySelector("#passcodeInputDiv"); // pw div
const passcodeInputText = document.querySelector("#passcode"); // pw text box
const cardMessage = document.querySelector('#cardMessage');  // card that contains message
const attemptsText = document.querySelector('#attempts'); // text of how many attempts left
const lockMessage = document.querySelector('#lockout-message'); // text of how many attempts left

let attempts = 5;

let SHA256_Hasher = new Hashes.SHA256;  // creating our sha256 hasher

const getMessages = () => {
    // Firebase object -> we grab database -> and then a reference to that database
    const messagesRef = firebase.database().ref();

    // snapshot contains the data in the value
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();  // JSON that contains all unique objects in database
        findMessage(data);
    });
};

const findMessage = (messages) => {
    const myPass = passcodeInputText.value;
    let found = false;
    for(let message in messages){  // for every `unique` in `data`
        const messageData = messages[message];  // messageData = unique element
        if(SHA256_Hasher.hex(myPass) == messageData.passcode){
            found = true;
            attempts = 5;
            renderMessage(messageData);
        }
    }
    if(!found){
        attempts -= 1;
        checkLockOut();
        alert(`Invalid passcode! Please try again...\nAttempts left: ${attempts}`);
    }
};

const renderMessage = (message) => {
    // Hide Input Form
    passcodeInputDiv.style.display = "none";
    // Show reset button
    resetButton.style.display = "block";
    // Render message as HTML
    cardMessage.style.display = "block";
    messageText.innerHTML = message.message;
};

const checkLockOut = () => {
    attemptsText.innerHTML = `Attempts: ${attempts}/5`;
    if(attempts <= 0){
        // Hide Input Form
        passcodeInputForm.style.display = "none";
        // Show Lockout Message
        lockMessage.style.display = "block";
        resetAttempts();
    }
};

const resetAttempts = () => {
    // resets attempts after 20 seconds
    setTimeout(function(){
        attempts = 5;
        passcodeInputForm.style.display = "block";
        attemptsText.innerHTML = `Attempts: ${attempts}/5`;
        lockMessage.style.display = "none";
    }, 20000);
};

resetButton.addEventListener("click", (e) => {
    resetButton.style.display = "none";
    // show form again
    passcodeInputDiv.style.display = "flex";
    messageText.innerHTML = ""; // clear message
    cardMessage.style.display = "none";
    passcodeInputText.value = ""; // clean pw input box
});