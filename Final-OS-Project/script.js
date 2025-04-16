document.getElementById("urlForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const url = document.getElementById("urlInput").value;
    const resultBox = document.getElementById("result");
    resultBox.textContent = "Checking...";
    
    fetch(`/check_url?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => {
            if (data.phishing) {
                resultBox.textContent = "⚠️ Phishing Detected!";
                resultBox.style.backgroundColor = "#ff4c4c";
                document.body.style.backgroundColor = "#ff4c4c"; // red background
                document.getElementById("result").classList.add("shake");
                new Audio('alert.mp3').play();
            } else {
                resultBox.textContent = "✅ Safe Site";
                resultBox.style.backgroundColor = "#4caf50";
                document.body.style.backgroundColor = "#4caf50"; // green background
            }
        });
});
