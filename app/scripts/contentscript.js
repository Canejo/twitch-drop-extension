(function() {

    const urlValorant = 'https://www.twitch.tv/directory/game/VALORANT';
    let searching;

    function isChannel() {
        return document.querySelector('[data-a-target="video-player"] .tw-pd-l-1') ? true : false;
    }
    
    function checkIfStreamOnline() {
        const text = document.querySelector('[data-a-target="video-player"] .tw-pd-l-1').innerText;
        return text === "AO VIVO" || text === "LIVE";
    }
    
    function valorant() {
        return document.querySelector('[data-a-target="stream-game-link"]').innerText === "VALORANT";
    }
    
    function goStreamValorant() {
        window.location = urlValorant;
    }

    function isValorantList() {
        return window.location.href === urlValorant;
    }

    function goToFirstChannel() {
        const url = document.querySelector('[data-target="directory-first-item"] a').href;
        window.location = url;
    }
    
    function isTwitch() {
        return window.location.hostname === "www.twitch.tv";
    }

    function checkIfError() {
        const player = document.querySelector('.content-overlay-gate__content');
        return player && player.innerHTML.indexOf('Erro') > -1;
    }

    function searchingTwitch() {
        if (isChannel()) {
            if (checkIfError()) {
                chrome.runtime.sendMessage({refresh: true});
            } else {
                if (!checkIfStreamOnline() || !valorant()) {
                    console.log('Is not valorant or not online');
                    goStreamValorant();
                } else {
                    console.log('Is valorant');
                }
            }
        } else if (isValorantList()) {
            goToFirstChannel();
        }
    }
    console.log("[twitch-drop] > Init");
    chrome.runtime.sendMessage({init: true});

    chrome.runtime.onMessage.addListener(function(request, sender) {
        if (request.searching) {
            console.log("[twitch-drop] > searching...");
            if (isTwitch()) {
                searching = setInterval(function() {
                    searchingTwitch();
                }, 10000);
            }
        } else if (searching) {
            console.log("[twitch-drop] > stop searching");
            clearInterval(searching);
        }
    });
    
})();

