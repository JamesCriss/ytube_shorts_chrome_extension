// Function to hide elements with title "Shorts"
function hideShorts() {
    chrome.storage.sync.get("toggleHideState", function (data) {
        if (data.toggleHideState) {
            console.log("Hiding Shorts...");
            document.querySelectorAll('[title="Shorts"], .style-scope.ytd-rich-shelf-renderer, .style-scope ytd-reel-shelf-renderer, [tab-title="Shorts"]').forEach(element => {
                element.style.display = 'none';
            });
        } else {
            console.log("Showing Shorts...");
            document.querySelectorAll('[title="Shorts"], .style-scope.ytd-rich-shelf-renderer, .style-scope ytd-reel-shelf-renderer, [tab-title="Shorts"]').forEach(element => {
                element.style.display = ''; 
            });
        }
    });
}

//Initialization
document.addEventListener("DOMContentLoaded", function () {
    const toggleHide = document.getElementById("toggleHide");

    if (toggleHide) {
        chrome.storage.sync.get("toggleHideState", function (data) {
            toggleHide.checked = data.toggleHideState || false;
        });
        toggleHide.addEventListener("change", function () {
            chrome.storage.sync.set({ toggleHideState: toggleHide.checked }, () => {
                hideShorts(); 
            });
        });
    }
    hideShorts();
});


//function for MuationObserver to only execute hideShorts once per 100ms 
let isRunning = false;
const callback = (mutationList, observer) => {
    function myFunction() {
        if (isRunning) return; 
    
        isRunning = true; 
    
        hideShorts
    
        setTimeout(() => {
            isRunning = false;
        }, 100);
    }
  };


const observer = new MutationObserver(callback);
observer.observe(document.body, { childList: true, subtree: true });
setInterval(hideShorts, 3000);
