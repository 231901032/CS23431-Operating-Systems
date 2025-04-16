document.addEventListener('DOMContentLoaded', function() {
    fetch('/log')
        .then(response => response.text())
        .then(data => {
            document.getElementById('log-content').textContent = data;
        });
});
