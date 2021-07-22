const messagesRef = firebase.database().ref();
const messageInput = document.querySelector("#message");
const messageInput = document.querySelector("#passcode");

// Pushing an object (appends)
messagesRef.push({
    message: "This was made with JavaScript",
    passcode: "JavaScript",
});


// const submitMessages = () => {
//     let m;
//     let p;
//     messagesRef.push({
//         message: m,
//         passcode: p
//     });
// };