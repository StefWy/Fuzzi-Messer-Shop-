# KlingenWerk Manufaktur | E-Commerce Webshop & Messer-Fachmagazin

Ein vollfunktionsfähiger, hochperformanter Premium-Webshop für handgeschmiedete Küchenmesser, robuste Bushcraft- & Outdoorklingen, Schnitz- und Hobbymesser sowie Schleifzubehör. Inklusive 10 suchmaschinenoptimierten Fachartikeln (je ~1500 Zeichen), interaktivem Messer-Berater, 4-stufigem Checkout und vollständigen deutschen Rechtstexten (Impressum, AGB, Widerrufsbelehrung, DSGVO, § 42a WaffG).

---

## 🚀 Features im Überblick

### 1. E-Commerce & Konvertierungs-Architektur
- **Katalog & Filterung**: Filtern nach Kategorie (Küchenmesser, Outdoor, Hobby, Zubehör), Klingenstahl (VG-10, D2, Carbonstahl O1, etc.) und Sortierung (Beliebtheit, Preis, Kundenbewertung).
- **Produktdetailseite (PDP)**: Ausführliche technische Datenblätter (Härtegrad HRC, Schleifwinkel, Klingenstärke, Klingenlänge, Griffmaterial), Kundenrezensionen und Bundle-Kauf mit 15% Rabatt („Häufig zusammen gekauft“).
- **Optionale Klingen-Lasergravur**: Personalisierte Wunschgravur direkt im Produkt konfigurierbar.
- **Interaktiver Messer-Berater (Quiz)**: 3-stufiger Fragebogen, der anhand von Verwendungszweck, Stahlpräferenz und Griffhaptik die optimale Klinge ermittelt.
- **Warenkorb & Gutscheine**:
  - Dynamischer Gratisversand-Balken (ab 50 € versandkostenfrei mit DHL GoGreen).
  - Rabattcode-Unterstützung (z.B. `SCHAERFE10` für 10% Willkommensrabatt).
- **Sicherer 4-stufiger Checkout**:
  1. Adress- und Kundendatenerfassung
  2. Versanddienstleister (DHL GoGreen / DPD Express)
  3. Zahlungsauswahl (PayPal, Kreditkarte, Klarna, Apple Pay)
  4. Rechtliche Bestätigung (AGB, Altersprüfung 18+) & verbindlicher Kaufabschluss
  - Abschlussseite mit generierter Bestellnummer und PDF-Rechnungsdruck.

### 2. SEO-Fachmagazin (10 Blogbeiträge à ~1500 Zeichen)
1. **Damastmesser Pflege & Schleiftechnik** (Wasserstein 1000/6000, 15° Winkel, Kamelienöl)
2. **Santoku vs. Europäisches Kochmesser** (Wiegeschnitt vs. Kappschnitt, Ergonomie)
3. **Rockwell-Härte (HRC) verstehen** (58 HRC vs. 62 HRC, Schnitthaltigkeit vs. Ausbruch)
4. **Bushcraft & Outdoormesser im Praxistest** (Full-Tang, D2-Stahl, § 42a WaffG Konformität)
5. **Wetzstahl vs. Schleifstein (Wassersteine)** (Aufrichten vs. Materialabtrag)
6. **Die 5 größten Fehler beim Messergebrauch in der Profiküche** (Schaben mit Klingenrücken, Schneidunterlagen)
7. **Japanische Messerarten im Überblick** (Nakiri, Gyuto, Yanagiba, Deba)
8. **Klingenstähle im Vergleich** (Carbonstahl, VG-10 Damast, D2, Solinger Edelstahl)
9. **Schnitz- & Hobbymesser für Anfänger** (Sloyd-Messer, Holzarten, Schnitztechniken)
10. **Sichere Aufbewahrung** (Magnetischer Messerblock Räuchereiche vs. Schublade)

Jeder Artikel enthält strukturierte Schema.org-Daten, Meta-Titel, Meta-Description, Fokus-Keywords, Kernaussagen-Boxen, Experten-Zitate und einen dezenten verkaufspsychologischen Impuls mit direkter Kaufempfehlung.

### 3. Rechtstexte & Maximale Händler-Haftungsbeschränkung
- **Impressum**: Gemäß § 5 TMG / § 18 MStV mit klar gekennzeichneten Platzhaltern `[BEISPIEL]` für die nachträgliche Ergänzung durch den Händler.
- **AGB**: Spezifisch für den Messerhandel, inklusive weitreichendem Haftungsausschluss (§ 8) für unsachgemäßen Gebrauch (z.B. Hebeln, Spülmaschinenbenutzung, Schnittverletzungen, unqualifiziertes Nachschleifen), Jugendschutz & Altersverifikation (Messerverkauf nur ab 18 Jahren).
- **Widerrufsbelehrung & Muster-Formular**: Nach deutschem Verbraucherrecht mit Frist und Ausschlusskriterien für personalisierte Gravuren.
- **Datenschutzerklärung (DSGVO)**: Vollständig nach Art. 13/14 DSGVO inklusive Hinweisen zu Hosting, Checkout und Zahlungsanbietern.
- **Waffenrecht (§ 42a WaffG)**: Praxis-Leitfaden zum Führen von Messern im öffentlichen Raum.
- **DSGVO Cookie-Banner**: Granulare Einwilligung (Nur essenzielle / Alle akzeptieren).

---

## 🛠️ Bereitstellung auf GitHub & Render

### Deployment auf Render

#### Option A: Als Static Site (Kostenlos & Ultra-Schnell)
1. Repository auf GitHub pushen.
2. In [Render Dashboard](https://dashboard.render.com/) auf **New +** → **Static Site** klicken.
3. GitHub-Repository auswählen.
4. Folgende Einstellungen hinterlegen:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Auf **Create Static Site** klicken.

#### Option B: Als Node.js Web Service (Full-Stack mit Express)
1. Auf **New +** → **Web Service** klicken.
2. Folgende Einstellungen hinterlegen:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start`
   - **Environment:** `Node`
3. Auf **Create Web Service** klicken.

---

## 💻 Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten (Port 3000)
npm run dev

# Produktions-Build erstellen
npm run build

# TypeScript-Typen validieren
npm run lint
```
