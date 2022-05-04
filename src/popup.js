window.onload = async function() {
    document.querySelector("#closeBtn").addEventListener("click", terminate);

    let url = 'http://localhost:1592/CheckGHPlusSession';
    let response = await fetch(url, {mode: "no-cors"});
    document.querySelector("#status").innerHTML = "Couldn't connect to the client."
    if (response.status == 0) {
        document.querySelector("#status").innerHTML = "Client is running."
        document.querySelector("#terminateContainer").style.display = "block";
    }

}

function terminate(){
    fetch('http://localhost:1592/KillGHPlusSession', {mode: "no-cors"});
    document.querySelector("#status").innerHTML = "Couldn't connect to the client."
    document.querySelector("#terminateContainer").style.display = "none";
}