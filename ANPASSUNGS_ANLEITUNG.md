# 📘 KlingenWerk Webshop: Schritt-für-Schritt Anpassungsanleitung („For Dummies“)

Willkommen zu Ihrer persönlichen Schritt-für-Schritt-Anleitung! Diese Anleitung ist so aufgebaut, dass Sie **auch ohne Programmier-Vorkenntnisse** jeden Text, jedes Bild, jedes Produkt, alle Preise und Ihre rechtlichen Impressumsdaten eigenständig und sicher im Code anpassen können – ohne dass die Website abstürzt.

---

## 🧭 Inhaltsverzeichnis
1. [Goldene Grundregeln: Was darf ich anfassen, was nicht?](#1-goldene-grundregeln)
2. [Wo trage ich meine echten Impressums- und Kontaktdaten ein?](#2-impressum--kontaktdaten)
3. [Wie ändere ich Produkte, Preise und Beschreibungen?](#3-produkte-preise--beschreibungen)
4. [Wie tausche ich Produktbilder gegen eigene Fotos aus?](#4-produktbilder-austauschen)
5. [Wie ändere ich Rabattcodes und Gutscheine (z.B. SCHAERFE10)?](#5-gutscheincodes-anpassen)
6. [Wie ändere ich die Freiversand-Grenze (z.B. von 50 € auf 75 €)?](#6-freiversand-grenze-anpassen)
7. [Wie bearbeite ich die 10 Blogbeiträge oder füge neue hinzu?](#7-blogbeiträge-bearbeiten)
8. [Wie passe ich Slogans, Texte und Shop-Namen an?](#8-slogans--texte-anpassen)
9. [Deployment auf GitHub & Render (Live-Schaltung)](#9-deployment-auf-github--render)

---

## 1. Goldene Grundregeln

Damit der Code immer fehlerfrei läuft:
* **Anführungszeichen nicht löschen:** Texte stehen immer in einfachen `'...'` oder doppelten `"..."` Anführungszeichen. Ändern Sie nur den Text *dazwischen*.
  * ✅ Richtig: `name: 'Mein Kochmesser Pro',`
  * ❌ Falsch: `name: Mein Kochmesser Pro,`
* **Kommas am Zeilenende beibehalten:** Listen-Einträge enden fast immer mit einem Komma `,`. Lassen Sie dieses Komma stehen.
* **Preise mit Punkt statt Komma:** Im Code schreibt man Dezimalzahlen immer mit einem Punkt (z.B. `89.00`, nicht `89,00`). Auf der Website wird es automatisch als `89,00 €` angezeigt!

---

## 2. Impressum & Kontaktdaten

### 📂 Datei: `src/data/legalTexts.ts`
Öffnen Sie diese Datei. Suchen Sie nach dem Bereich `impressum:` (ab ca. Zeile 10).

```typescript
// Suchen Sie diesen Bereich in src/data/legalTexts.ts:
impressum: {
  id: 'impressum',
  title: 'Impressum',
  shortDesc: 'Angaben gemäß § 5 TMG und § 18 Abs. 2 MStV',
  sections: [
    {
      title: 'Angaben gemäß § 5 TMG',
      content: [
        'KlingenWerk Manufaktur E-Commerce',
        'Inhaber: Max Mustermann',              // <-- HIER IHREN VOLLEN NAMEN EINTRAGEN
        'Musterstraße 12',                      // <-- HIER IHRE STRASSE & HAUSNUMMER
        '10115 Berlin',                         // <-- HIER PLZ UND ORT
        'Bundesrepublik Deutschland'
      ]
    },
    {
      title: 'Kontakt & Kundenservice',
      content: [
        'Telefon: +49 (0) 30 12345678',         // <-- HIER IHRE TELEFONNUMMER
        'E-Mail: service@ihre-domain.de',       // <-- HIER IHRE SHOP-EMAIL
        'Webseite: https://ihre-domain.de'
      ]
    },
    {
      title: 'Registereintrag & Umsatzsteuer-Identifikationsnummer',
      content: [
        'Registergericht: Amtsgericht Berlin-Charlottenburg', // <-- IHR AMTSGERICHT
        'Registernummer: HRB 123456 B',                       // <-- IHRE REGISTRATION (falls vorhanden)
        'Umsatzsteuer-Identifikationsnummer: DE 123456789'     // <-- IHRE UST-ID
      ]
    }
  ]
}
```

---

## 3. Produkte, Preise & Beschreibungen

### 📂 Datei: `src/data/products.ts`
In dieser Datei sind alle Messer und Zubehörartikel als Liste gespeichert. Jedes Produkt sieht so aus:

```typescript
{
  id: 'chef-damast-67',                            // Eindeutige ID (nur Kleinbuchstaben & Bindestrich)
  slug: 'meister-damast-kochmesser-20cm',          // Web-URL Name
  name: 'Meister-Kochmesser 67 Lagen Damast 20cm', // Titel des Messers
  subtitle: 'Japanischer VG-10 Kern · 61 HRC',      // Unterzeile
  category: 'kuechenmesser',                       // Kategorie: kuechenmesser | besteck | outdoor | trend | zubehoer
  categoryLabel: 'Küchenmesser',                   // Anzeigename der Kategorie
  price: 189.00,                                   // Aktueller Verkaufspreis (z.B. 189.00)
  originalPrice: 229.00,                           // Durchgestrichener Vorher-Preis (optional)
  inStock: true,                                   // true = auf Lager, false = ausverkauft
  stockCount: 4,                                   // Verfügbare Reststückzahl (Dringlichkeitsanzeige)
  isBestseller: true,                              // Zeigt das "Bestseller"-Badge an
  image: heroChefKnife,                            // Zugeordnetes Bild (siehe Schritt 4)
  description: 'Das Flaggschiff unserer Manufaktur...', // Kurzbeschreibung
  specs: {
    bladeSteel: 'VG-10 Damaszenerstahl (67 Lagen)',// Stahlart
    hardnessHRC: 61,                               // Härtegrad in Rockwell (HRC)
    bladeLengthCm: 20.5,                           // Klingenlänge in cm
    totalLengthCm: 33.5,                           // Gesamtlänge in cm
    bladeThicknessMm: 2.1,                         // Klingenstärke in mm
    handleMaterial: 'Kaukasischer Nussbaum',       // Griffmaterial
    grindType: 'Beidseitiger V-Schliff',           // Schliffart
    grindAngle: '15° je Seite',                    // Schleifwinkel
    weightG: 198,                                  // Gewicht in Gramm
    origin: 'Deutschland / Japan'                  // Herkunft
  }
}
```

* **Preis ändern:** Ändern Sie einfach die Zahl hinter `price: 189.00,` auf z.B. `price: 149.99,`.
* **Neues Produkt hinzufügen:** Kopieren Sie einen bestehenden Block von `{` bis `},`, fügen Sie ihn unten ein und vergeben Sie eine neue `id` (z.B. `id: 'mein-neues-messer-1'`).

---

## 4. Produktbilder austauschen

### Wo liegen die Bilder?
Alle Bilder liegen im Ordner: `src/assets/images/`

### Vorgehensweise:
1. Speichern Sie Ihr eigenes Messerfoto in den Ordner `src/assets/images/` (z.B. als `mein_messer.jpg`).
2. Öffnen Sie `src/data/products.ts`.
3. Fügen Sie ganz oben bei den `import`-Befehlen Ihr Bild hinzu:
   ```typescript
   import meinMesserFoto from '../assets/images/mein_messer.jpg';
   ```
4. Suchen Sie das gewünschte Produkt in der Liste und ändern Sie die Zeile `image:`:
   ```typescript
   image: meinMesserFoto,
   ```
5. Speichern – fertig! Das Bild wird sofort im Shop angezeigt.

---

## 5. Gutscheincodes anpassen

### 📂 Datei: `src/context/ShopContext.tsx`
Suchen Sie in dieser Datei nach der Funktion `applyCoupon`:

```typescript
// Suchen Sie ab ca. Zeile 160:
const applyCoupon = (code: string): boolean => {
  const clean = code.trim().toUpperCase();
  
  // Hier tragen Sie Ihren eigenen Code und Prozentsatz ein:
  if (clean === 'SCHAERFE10' || clean === 'MEINCODE20') {
    setCouponCode(clean);
    setDiscountPercentage(20); // <-- 20% Rabatt statt 10%
    showToast('20% Gutscheincode erfolgreich aktiviert!', 'success');
    return true;
  }
  // ...
};
```

---

## 6. Freiversand-Grenze anpassen

Standardmäßig ist der Versand ab **50,00 €** kostenfrei (darunter 4,90 €). Wenn Sie diese Schwelle ändern möchten:

### 📂 In `src/components/CartDrawer.tsx`:
```typescript
// Suchen Sie ca. Zeile 35:
const FREE_SHIPPING_THRESHOLD = 50.0; // Ändern auf z.B. 75.0
```

### 📂 In `src/components/CheckoutModal.tsx`:
```typescript
// Suchen Sie ca. Zeile 52:
const FREE_SHIPPING = cartSubtotal >= 50.0; // Ändern auf z.B. 75.0
```

---

## 7. Blogbeiträge bearbeiten

### 📂 Datei: `src/data/blogArticles.ts`
Jeder der 10 Artikel ist dort als Objekt strukturiert. Sie können:
* **Titel ändern:** `title: 'Ihr neuer Titel',`
* **Textabschnitte anpassen:** Im Array `paragraphs: ['Absatz 1...', 'Absatz 2...']`
* **Google SEO Keywords ändern:** `primaryKeywords: ['Damastmesser schärfen', 'Messer Test']`
* **Empfohlenes Produkt im Artikel ändern:** Ändern Sie `recommendedProductId:` auf die `id` des gewünschten Messers aus `products.ts`.

---

## 8. Slogans & Texte anpassen

* **Header-Logo & Markenname:** In `src/components/Header.tsx`
* **Hero-Hauptüberschrift & Unterzeile:** In `src/components/Hero.tsx`
* **Footer-Links & Copyright:** In `src/components/Footer.tsx`
* **Google Suchmaschinen-Titel & Meta-Tags:** In `index.html` (Zeile 6–10)

---

## 9. Deployment auf GitHub & Render

### Schritt 1: Zu GitHub hochladen
```bash
git add .
git commit -m "Anpassungen KlingenWerk Webshop"
git push origin main
```

### Schritt 2: Auf Render.com veröffentlichen (Kostenlos)
1. Besuchen Sie [Render.com](https://render.com) und loggen Sie sich ein.
2. Klicken Sie auf **New +** → **Static Site**.
3. Wählen Sie Ihr GitHub-Repository aus.
4. Tragen Sie folgende zwei Einstellungen ein:
   * **Build Command:** `npm run build`
   * **Publish Directory:** `dist`
5. Klicken Sie auf **Create Static Site**.
6. Fertig! Innerhalb von ca. 60 Sekunden ist Ihr Messer-Shop unter einer weltweiten HTTPS-Adresse live im Internet erreichbar.
