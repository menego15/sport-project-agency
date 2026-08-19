# Sport Project Agency

Sito web statico per Sport Project Agency &mdash; consulenza e rappresentanza sportiva nel basket.

Redesign moderno del sito originale, mantenendo pagine e struttura di navigazione, con un'estetica monocromatica (nero / bianco / grigio) e accenti oro.

## Struttura del progetto

```
.
├── index.html                      # Home
├── staff.html                      # Staff / Fabrizio Campanello
├── service.html                    # Servizi
├── assistiti.html                  # Lista Assistiti (download & condivisione)
├── css/
│   └── style.css                   # Design system
├── js/
│   └── main.js                     # Menu mobile, dropdown, filtri, animazioni
└── assets/
    └── logo.png                    # Logo aziendale
```

## Sviluppo locale

Il sito è statico (HTML/CSS/JS puro, nessuna build necessaria). Per avviarlo in locale:

```bash
npx serve .
```

## Contenuti placeholder

La sezione Assistiti (assistiti.html) prevede il download della lista assistiti in PDF ed Excel/CSV e la condivisione via WhatsApp: al momento i pulsanti di download sono segnaposto ("A breve") in attesa dei dati e della generazione dei file reali; la condivisione WhatsApp è già funzionante.
