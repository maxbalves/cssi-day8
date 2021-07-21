const getMessages = () => {
    // Firebase object -> we grab database -> and then a reference to that database
    const messagesRef = firebase.database().ref();

    // snapshot contains the data in the value
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        findMessage(data);
    });
};

const findMessage = (messages) => {
    const myPass = document.querySelector("#passcode").value;
    
    for(let message in messages){
        const messageData = messages[key];
        console.log(message);
        if(myPass == messageData.passcode){
            renderMessage(message);
        }
    }
};

const renderMessage = (message) => {
    // Hide Input Form

    // Render message as HTML

};

getMessages();