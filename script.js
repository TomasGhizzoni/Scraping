const API_BASE_URL = 'http://127.0.0.1:5000';
let currentData = [];

function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

function showError(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = message;
    errorContainer.style.display = message ? 'block' : 'none';
}

async function scrapeData() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();

    if (!url) {
        showError('Inserisci un URL valido');
        return;
    }

    showError('');
    showLoading(true);

    try {
        const response = await fetch(`${API_BASE_URL}/scrape`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Errore durante l estrazione dei dati');
        }

        currentData = data;
        localStorage.setItem('scrapedData', JSON.stringify(data));
        updateList(data);
    } catch (error) {
        console.error('Error:', error);
        showError(`Error: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

function updateList(data) {
    const listContainer = document.getElementById('articlesList');
    listContainer.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
        listContainer.innerHTML = '<li class="article-item">Nessun articolo trovato</li>';
        return;
    }

    data.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'article-item';
        listItem.innerHTML = `
            <div class="article-content">
                <h3>${item.title}</h3>
                <p class="article-url">URL: <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.url}</a></p>
            </div>
            <button class="delete-btn" onclick="deleteItem(${index})">Eliminare</button>
        `;
        listContainer.appendChild(listItem);
    });
}

function deleteItem(index) {
    if (confirm('Sei sicuro di voler eliminare questo elemento?')) {
        currentData.splice(index, 1);
        localStorage.setItem('scrapedData', JSON.stringify(currentData));
        updateList(currentData);
    }
}

async function exportData() {
    try {
        const response = await fetch(`${API_BASE_URL}/export/json`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Errore durante l esportazione dei dati');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'scraped_data.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

    } catch (error) {
        console.error('Errore di esportazione:', error);
        showError(`Errore di esportazione: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('scrapedData');
    if (savedData) {
        try {
            currentData = JSON.parse(savedData);
            updateList(currentData);
        } catch (error) {
            console.error('Errore durante il caricamento dei dati salvati:', error);
            localStorage.removeItem('scrapedData');
        }
    }
});