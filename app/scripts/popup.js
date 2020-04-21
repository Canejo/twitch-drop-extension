(function(){

    const elAtivar = document.getElementById("chkAtivar")

    chrome.extension.sendRequest({get: true}, function (response) {
        console.log(response);
        if (response && response.state) {
            elAtivar.checked = true;
        }
    });

    function changeEvent(event) {
        chrome.runtime.sendMessage({
            changeState: true,
            state: event.target.checked
        });
    }
    
    elAtivar.addEventListener("change", changeEvent)

}());