
var stompClient = null;

function connect(){
    let socket = new SockJS("/server1")
    stompClient = Stomp.over(socket)

    stompClient.connect({}, function(frame){
        console.log("connected with frame"+frame);

        $("#name-form").addClass("d-none");

        $("#chat-room").removeClass("d-none");

        //Subscribe
        stompClient.subscribe("/topic/return-to", function(response){
            showMessage(JSON.parse(response.body))
        })

    })
}

function sendMessage(){

    let jsonObj = {
        sender: localStorage.getItem("sender"),
        content: $("#message-value").val()
    }
    console.log(jsonObj)
    console.log("\n\n&&&&&&&&&&&&&&&&&&&&&&&&&&\n\n")

    stompClient.send("/app/message",{},JSON.stringify(jsonObj))

}

function showMessage(message){

    console.log(message)
    console.log("\n\n&&&&&&&&&&&&&&&&&&&&&&&&&&\n\n")


    $("#message-container-table").append(`<tr><td><b>${message.sender} : </b> ${message.content}</td></tr>`)
}

$(document).ready( e=>{

    $("#login").click( e=>{

        let name = $("#name-value").val()
        localStorage.setItem("sender", name);
        $("#name-title").html(`Welcome <b>${name}</b>`)
        connect()
    })

    $("#send-btn").click( e=>{
        sendMessage()
    })


})