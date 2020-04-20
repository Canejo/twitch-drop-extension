(function() {

    const urlValorant = 'https://www.twitch.tv/directory/game/VALORANT';

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
    
    if (isTwitch()) {
        setInterval(function() {
            if (isChannel()) {
                if (!checkIfStreamOnline() || !valorant()) {
                    console.log('Is not valorant or not online');
                    goStreamValorant();
                } else {
                    console.log('Is valorant');
                }
            } else if (isValorantList()) {
                goToFirstChannel();
            }
        }, 10000);
    }
    
})();

