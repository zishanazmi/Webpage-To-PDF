document.getElementById('convert').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;

        const startTime = Date.now(); // Start the timer
        let countdownMilliseconds = 5000; // Set countdown duration in milliseconds

        // Start the countdown
        const countdownInterval = setInterval(() => {
            const seconds = Math.floor(countdownMilliseconds / 1000);
            const milliseconds = countdownMilliseconds % 1000;
            document.getElementById('countdown').innerText = 
                `Time until conversion: ${seconds}.${milliseconds.toString().padStart(3, '0')} seconds`;
            countdownMilliseconds -= 100; // Decrease by 100 ms

            if (countdownMilliseconds < 0) {
                clearInterval(countdownInterval);
                document.getElementById('countdown').innerText = "Starting conversion...";
            }
        }, 100); // Update every 100 milliseconds

        // Inject jsPDF script
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['libs/jspdf.umd.min.js']
        }, () => {
            // Inject html2pdf script
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['libs/html2pdf.bundle.min.js']
            }, () => {
                // Inject and execute content.js script
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['content.js']
                }, () => {
                    const endTime = Date.now();
                    const elapsed = ((endTime - startTime) / 1000).toFixed(2);
                    document.getElementById('timer').innerText = `PDF downloaded in ${elapsed} seconds.`;
                    clearInterval(countdownInterval); // Stop the countdown
                });
            });
        });
    });
});
