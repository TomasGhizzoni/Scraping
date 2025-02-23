# Web Scraping Tool - Documentazione

## 📌 Descrizione
Questo strumento di Web Scraping permette di estrarre informazioni da siti web, in particolare titoli, URL e date degli articoli. L'applicazione è costruita con un'architettura client-server, utilizzando **Flask** per il backend e **JavaScript vanilla** per il frontend.

---
## 🛠 Tecnologie Utilizzate
### Backend:
- Python 3.x
- Flask
- BeautifulSoup4
- Requests
- Flask-CORS

### Frontend:
- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts (Montserrat)

---
## ⚙️ Prerequisiti
- Python 3.x installato
- Pip (gestore pacchetti Python)
- Browser web moderno
- Connessione Internet

---
## 📥 Installazione
### 1️⃣ Configurazione dell'Ambiente
```bash
# Clonare il repository (se su GitHub) o creare una nuova directory
mkdir web-scraping-tool
cd web-scraping-tool

# Creare un ambiente virtuale (opzionale ma consigliato)
python -m venv venv

# Attivare l'ambiente virtuale
# Su Windows:
venv\Scripts\activate
# Su macOS/Linux:
source venv/bin/activate
```

### 2️⃣ Installare le Dipendenze
```
pip install flask flask-cors requests beautifulsoup4
```

---
## 📂 Struttura dei File
Assicurati che i file siano organizzati nel seguente modo:
```
web-scraping-tool/
│
app.py
index.html
styles.css
script.js
data.json  # verrà creato automaticamente
```

---
## 🚀 Configurazione e Utilizzo
### 1️⃣ Avviare il Server
```
python app.py
```
Il server Flask si avvierà su **http://127.0.0.1:5000**

### 2️⃣ Accedere all'Applicazione
- Apri **index.html** nel tuo browser web
- Oppure configura un server web locale per servire i file statici

### 3️⃣ Utilizzo dell'Applicazione
- Inserisci l'URL del sito web che desideri analizzare
- Clicca su **"Estrai Dati"**
- I risultati verranno visualizzati nella pagina
- Puoi:
  - Eliminare singole voci
  - Esportare i dati in formato **JSON**

---
## 🔍 Caratteristiche Principali
### 🎯 Backend (**app.py**)
✅ Gestione delle richieste HTTP  
✅ Web scraping con **BeautifulSoup4**  
✅ Estrazione di:
   - Titoli
   - URL 
✅ Archiviazione in file JSON  
✅ Gestione errori ed eccezioni  

### 🎨 Frontend
#### 📄 **HTML (index.html)**
✔️ Struttura semantica  
✔️ Integrazione con **Google Fonts**  
✔️ Form di input  
✔️ Area di visualizzazione risultati  

#### 🎨 **CSS (styles.css)**
✔️ Design **responsive**  
✔️ Tipografia **Montserrat**  
✔️ Stili modulari e riutilizzabili  
✔️ Effetti hover e transizioni  

#### ⚡ **JavaScript (script.js)**
✔️ Gestione **asincrona** delle richieste  
✔️ Manipolazione del **DOM**  
✔️ Archiviazione locale (**localStorage**)  
✔️ Gestione errori  
✔️ Funzionalità di **esportazione**  

---
## ⚡ Funzionalità
### 📊 **Estrazione Dati**
- ✅ Titoli degli articoli
- ✅ URL
- ✅ Date di pubblicazione

### 📁 **Gestione Dati**
- ✅ Archiviazione locale
- ✅ Eliminazione voci
- ✅ Persistenza dei dati

### 📤 **Esportazione**
- ✅ Formato **JSON**
- ✅ Download automatico

### 🎨 **Interfaccia Utente**
- ✅ Design **responsive**
- ✅ Feedback visivo
- ✅ Messaggi di errore
- ✅ Indicatori di caricamento

---
## 🚨 Gestione Errori
✅ **Validazione URL**  
✅ **Messaggi di errore descrittivi**  
✅ **Recupero da errori**  
✅ **Persistenza dei dati**  

---
## ⚠️ Limitazioni
- ❌ Elabora solo siti web che **permettono il web scraping**
- ❌ Richiede **connessione Internet**
- ❌ La struttura del sito **target** deve essere compatibile

---
## 🚀 Possibili Miglioramenti Futuri
✅ Supporto per **più formati di esportazione**  
✅ **Filtraggio** dei risultati  
✅ Opzioni di **personalizzazione**  
✅ **Autenticazione utenti**  
✅ **Database** per archiviazione persistente  

