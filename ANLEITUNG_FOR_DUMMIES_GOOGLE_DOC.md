# KLINGENWERK WEBSHOP — STEP-BY-STEP ANLEITUNG FÜR EINSTEIGER („FOR DUMMIES“)
> **Leitfaden zum nachträglichen Individualisieren von Texten, Bildern, Produkten & Rechtstexten**  
> *Format: Bereit zum 1:1 Kopieren in Google Docs / Word / Markdown-Viewer*

---

Herzlich willkommen zu Ihrer persönlichen Shop-Anleitung!  
Mit dieser Anleitung können Sie alle Texte, Bilder, Produkte, Preise, Rabattcodes und Impressumsdaten Ihres Webshops ganz einfach anpassen – auch wenn Sie noch nie zuvor programmiert haben.

### ⚠️ Wichtige Grundregeln („Damit nichts kaputtgeht“):
1. **Achten Sie auf Anführungszeichen:** Texte stehen immer in einfachen Anführungszeichen wie `'Mein Text'` oder doppelten wie `"Mein Text"`. Löschen Sie diese Anführungszeichen nicht.
2. **Achten Sie auf Kommas:** Am Ende von Zeilen in Listen steht meist ein Komma (`,`). Lassen Sie dieses Komma stehen.
3. **Nach jeder Änderung im Code:** Speichern Sie die Datei (`Strg + S` bzw. `Cmd + S`). Der Shop aktualisiert sich sofort.

---

## Inhaltsverzeichnis
1. [Wo liegen die Dateien? (Schnelle Orientierung)](#1-wo-liegen-die-dateien)
2. [Impressum, Anschrift & Kontaktdaten anpassen](#2-impressum-anschrift--kontaktdaten-anpassen)
3. [AGB, Haftungsausschluss & Widerrufsbelehrung](#3-agb-haftungsausschluss--widerrufsbelehrung)
4. [Eigene Bilder einfügen (Messer, Banner, Fotos)](#4-eigene-bilder-einfügen)
5. [Produkte bearbeiten, hinzufügen oder löschen](#5-produkte-bearbeiten-hinzufügen-oder-löschen)
6. [Preise, Rabatte & Freiversand-Grenzen ändern](#6-preise-rabatte--freiversand-grenzen-ändern)
7. [Blog-Artikel anpassen & neue Beiträge schreiben](#7-blog-artikel-anpassen--neue-beiträge-schreiben)
8. [Farben, Schriften & Hintergrund anpassen](#8-farben-schriften--hintergrund-anpassen)
9. [Deployment auf GitHub & Render.com (In 3 Minuten online)](#9-deployment-auf-github--rendercom)
10. [Checkliste vor dem ersten echten Verkauf](#10-checkliste-vor-dem-ersten-echten-verkauf)

---

## 1. Wo liegen die Dateien?
Sie müssen für 95% aller Anpassungen nur 3–4 Dateien kennen:

* **Rechtstexte & Impressum:**  
  📁 `src/data/legalTexts.ts`
* **Alle Messer, Zubehör & Preise:**  
  📁 `src/data/products.ts`
* **Die 10 Blog-Fachartikel:**  
  📁 `src/data/blogArticles.ts`
* **Gutscheincodes & Rabattlogik:**  
  📁 `src/context/ShopContext.tsx`
* **Eigene Bilder ablegen unter:**  
  📁 `src/assets/images/`

---

## 2. Impressum, Anschrift & Kontaktdaten anpassen
Aktuell sind im Impressum Platzhalter (`[Musterstraße]`, `[Max Mustermann]`) hinterlegt.

1. **Öffnen Sie:** `src/data/legalTexts.ts`
2. **Suchen Sie nach:** `impressum: {` (ab ca. Zeile 10)
3. **Ersetzen Sie die Zeilen wie folgt:**

```typescript
    {
      title: 'Angaben gemäß § 5 TMG',
      content: [
        'KlingenWerk Manufaktur E-Commerce',
        'Inhaber: Markus Schmidt',
        'Hauptstraße 48',
        '42651 Solingen',
        'Deutschland'
      ]
    },
    {
      title: 'Kontakt & Kundenservice',
      content: [
        'Telefon: +49 (0) 212 987654',
        'E-Mail: info@klingenwerk-shop.de',
        'Webseite: https://klingenwerk-shop.de'
      ]
    },
```

> **Tipp (Registergericht & USt-IdNr.):**  
> Scrollen Sie in derselben Datei ein paar Zeilen weiter. Dort finden Sie `'Umsatzsteuer-Identifikationsnummer: [DE999999999]'`. Tragen Sie dort Ihre echte Nummer ein (oder löschen Sie die Zeile, falls Sie Kleinunternehmer nach § 19 UStG sind).

---

## 3. AGB, Haftungsausschluss & Widerrufsbelehrung
Die Rechtstexte in `src/data/legalTexts.ts` sind bereits fachgerecht nach deutschem Recht formuliert und enthalten den **maximalen Haftungsausschluss** für den Händler:
* **Haftungsausschluss bei unsachgemäßem Gebrauch** (z. B. Hebeln mit feinen Schneidkanten)
* **Haftungsausschluss bei fehlerhaftem Nachschleifen** durch den Kunden
* **Haftungsausschluss bei eigenmächtigen Modifikationen**
* **Altersprüfung** (Verkauf nur an Personen ab 18 Jahren)
* **Waffenrechtlicher Hinweis** zu § 42a WaffG
* **Widerrufsausschluss** bei personalisierter Klingen-Lasergravur (§ 312g Abs. 2 Nr. 1 BGB)

---

## 4. Eigene Bilder einfügen
1. **Bild vorbereiten:**  
   Format `.jpg` oder `.webp`, ca. 1200 x 900 Pixel (unter 500 KB für schnelle Ladezeit). Dateiname ohne Umlaute: z.B. `mein_santoku.jpg`.
2. **Bild ablegen:**  
   Kopieren Sie das Bild in den Ordner `src/assets/images/mein_santoku.jpg`.
3. **Bild im Code importieren:**  
   In `src/data/products.ts` ganz oben eine Zeile ergänzen:
   ```typescript
   import meinNeuesBild from '../assets/images/mein_santoku.jpg';
   ```
4. **Dem Produkt zuweisen:**  
   Beim entsprechenden Produkt die Zeile ändern:
   ```typescript
   image: meinNeuesBild,
   ```

---

## 5. Produkte bearbeiten, hinzufügen oder löschen
In `src/data/products.ts` finden Sie die vollständige Produktliste:

```typescript
  {
    id: 'chef-damast-67-walnut',
    name: 'Meister-Kochmesser 67 Lagen Damast',
    subtitle: 'Japanischer VG-10 Stahlkern · Ovale Walnussholz-Zwinge',
    category: 'kuechenmesser',
    subcategoryLabel: 'Kochmesser',
    price: 189.00,
    originalPrice: 229.00,
    rating: 4.95,
    reviewCount: 48,
    stockCount: 4,
    isBestseller: true,
    isNew: false,
    image: heroChefKnife,
    description: 'Das Flaggschiff für anspruchsvolle Gourmets und Profiköche...',
    features: [
      '67 Lagen rostfreier Damaszener-Stahl mit VG-10 Hochleistungskern',
      'Härtegrad 61-62 Rockwell für exzeptionelle Schnitthaltigkeit',
      'Traditioneller beidseitiger 15°-Meisterschliff (Honbazuke)'
    ],
    specs: {
      bladeSteel: 'VG-10 Damaststahl (67 Lagen)',
      hardnessHRC: 61,
      bladeLengthCm: 20.5,
      totalLengthCm: 33.5,
      bladeThicknessMm: 2.2,
      handleMaterial: 'Stabilisiertes Walnussholz & Büffelhorn',
      weightGrams: 215,
      grindType: '15° V-Schliff (Honbazuke Handabzug)',
      origin: 'Seki, Japan / Endfinish Solingen'
    }
  },
```

* **Preis ändern:** `price: 149.00,` (Immer Dezimalpunkt statt Komma!)
* **Knappheitsanzeige:** Bei `stockCount: 3,` zeigt der Shop automatisch den dringlichen Hinweis *„Nur noch 3 Stück vorrätig!“* an.
* **Neues Produkt:** Kopieren Sie einen Block von `{` bis `},`, fügen Sie ihn ans Ende der Liste ein und ändern Sie `id: 'neue-id'`.

---

## 6. Preise, Rabatte & Freiversand-Grenzen
* **Gutscheincode anpassen (`src/context/ShopContext.tsx`):**  
  Suchen Sie nach `applyCoupon`. Ändern Sie `SCHAERFE10` oder die Zahl `10` auf Ihren Wunschwert (z.B. `15` für 15%).
* **Freiversand-Schwelle (Standard: 50 €):**  
  In `src/components/CartDrawer.tsx` (Zeile ca. 35) und `src/components/CheckoutModal.tsx` (Zeile ca. 54) den Wert `50.0` auf z.B. `70.0` anpassen.

---

## 7. Blog-Artikel anpassen (10 Artikel mit je ~1500 Zeichen)
In `src/data/blogArticles.ts` finden Sie alle 10 Fachartikel mit SEO-Metadaten, Google SERP Vorschauen, Keywords und Conversion-Hooks.  
Texte können einfach zwischen den Anführungszeichen `'Hier Ihr Text'` geändert werden.

---

## 8. Farben & Hintergrund
* **Hintergrund:** In `src/index.css` bei `body` ist die augenschonende Leinen-Creme `#faf9f5` hinterlegt.
* **Buttons:** In Tailwind CSS steuert `bg-amber-600` den warmen Schmiede-Bernsteinton.

---

## 9. Deployment auf GitHub & Render.com (In 3 Minuten online)
1. Code auf ein neues GitHub-Repository laden.
2. Auf [Render.com](https://render.com) einloggen → **New +** → **Static Site**.
3. Ihr GitHub-Repository auswählen.
4. Einstellungen eintragen:
   * **Build Command:** `npm run build`
   * **Publish Directory:** `dist`
5. Auf **Create Static Site** klicken.
✅ Ihre Website ist in ca. 60 Sekunden weltweit online unter HTTPS erreichbar!

---

## 10. Checkliste vor dem ersten Verkauf
- [ ] Impressum mit echten Kontaktdaten versehen
- [ ] Preise und Beschreibungen geprüft
- [ ] Testkauf im Warenkorb & Checkout durchgeführt
- [ ] Eigene Domain auf Render hinterlegt
