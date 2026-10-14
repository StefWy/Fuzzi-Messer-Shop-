export interface LegalDocument {
  id: string;
  title: string;
  shortDesc: string;
  lastUpdated: string;
  sections: {
    title: string;
    content: string[];
    isWarning?: boolean;
  }[];
}

export const LEGAL_TEXTS: Record<string, LegalDocument> = {
  impressum: {
    id: 'impressum',
    title: 'Impressum',
    shortDesc: 'Angaben gemäß § 5 TMG und § 18 Abs. 2 MStV',
    lastUpdated: '14. Oktober 2026',
    sections: [
      {
        title: 'Angaben gemäß § 5 TMG (Händler-Platzhalter)',
        content: [
          'KlingenWerk Manufaktur E-Commerce',
          '[FIRMENNAME / INHABER VOR- UND NACHNAME NOCH VOM HÄNDLER EINZUTRAGEN]',
          '[STRASSE UND HAUSNUMMER NOCH EINZUTRAGEN]',
          '[PLZ UND ORT NOCH EINZUTRAGEN]',
          'Bundesrepublik Deutschland'
        ],
        isWarning: true
      },
      {
        title: 'Kontakt & Kundenservice',
        content: [
          'Telefon: [TELEFONNUMMER NOCH EINZUTRAGEN]',
          'E-Mail: service@klingenwerk-manufaktur.de (bzw. [HÄNDLER-EMAIL NOCH EINZUTRAGEN])',
          'Webseite: https://klingenwerk-manufaktur.de'
        ]
      },
      {
        title: 'Registereintrag & Umsatzsteuer-Identifikationsnummer',
        content: [
          'Eintragung im Handelsregister (falls zutreffend):',
          'Registergericht: [AMTSGERICHT NOCH EINZUTRAGEN]',
          'Registernummer: [HRB / HRA NUMMER NOCH EINZUTRAGEN]',
          'Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [DE XXXXXXXXX NOCH EINZUTRAGEN]'
        ]
      },
      {
        title: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
        content: [
          '[NAME DES INHALTLICH VERANTWORTLICHEN NOCH EINZUTRAGEN]',
          '[ANSCHRIFT DES VERANTWORTLICHEN NOCH EINZUTRAGEN]'
        ]
      },
      {
        title: 'EU-Streitschlichtung & Verbraucherstreitbeilegung',
        content: [
          'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.',
          'Unsere E-Mail-Adresse finden Sie oben im Impressum.',
          'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
        ]
      }
    ]
  },
  agb: {
    id: 'agb',
    title: 'Allgemeine Geschäftsbedingungen (AGB)',
    shortDesc: 'Vertragsbedingungen für den KlingenWerk Onlineshop inklusive weitreichendem Haftungsausschluss & Altersbeschränkung',
    lastUpdated: '14. Oktober 2026',
    sections: [
      {
        title: '§ 1 Geltungsbereich, Begriffsbestimmungen & Vertragspartner',
        content: [
          '(1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB“) gelten für alle Verträge über die Lieferung von Waren (insbesondere handgefertigte und serienmäßige Küchenmesser, Outdoormesser, Schnitzmesser, Schleifwerkzeuge und Zubehör), die ein Verbraucher oder Unternehmer (nachfolgend „Kunde“) mit der KlingenWerk Manufaktur (nachfolgend „Verkäufer“ oder „Händler“) über den Online-Shop abschließt.',
          '(2) Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB).',
          '(3) Abweichende, entgegenstehende oder ergänzende Bedingungen des Kunden werden nicht Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.'
        ]
      },
      {
        title: '§ 2 Altersbeschränkung & Jugendschutzgesetz (Messerverkauf ab 18)',
        content: [
          '(1) Der Verkauf und die Abgabe von Messern aller Kategorien (einschließlich Küchen-, Outdoor-, Schnitz- und Freizeitklingen) erfolgt ausschließlich an unbeschränkt geschäftsfähige Personen, die das 18. Lebensjahr vollendet haben.',
          '(2) Mit dem Absenden der Bestellung versichert der Kunde ausdrücklich, dass er mindestens 18 Jahre alt ist. Der Verkäufer behält sich vor, im Rahmen des Bestell- und Versandprozesses eine Altersüberprüfung (z.B. PostIdent, Altersprüfung bei Zustellung durch den Versanddienstleister) durchzuführen.',
          '(3) Falschangaben bezüglich des Alters führen zur Nichtigkeit des Vertrages und berechtigen den Verkäufer zur Geltendmachung von Schadensersatzansprüchen.'
        ],
        isWarning: true
      },
      {
        title: '§ 3 Vertragsschluss & Bestellvorgang',
        content: [
          '(1) Die Präsentation der Waren im Onlineshop stellt kein rechtlich bindendes Angebot, sondern eine unverbindliche Aufforderung zur Abgabe einer Bestellung dar.',
          '(2) Durch Anklicken des Buttons „Zahlungspflichtig bestellen“ im Abschluss-Checkout gibt der Kunde ein verbindliches Kaufangebot für die im Warenkorb enthaltenen Artikel ab.',
          '(3) Der Verkäufer bestätigt den Eingang der Bestellung unverzüglich per automatisierter E-Mail. Diese Bestätigung stellt die Annahme des Angebots dar.'
        ]
      },
      {
        title: '§ 4 Preise, Versandkosten & Zahlungsarten',
        content: [
          '(1) Alle angegebenen Preise verstehen sich als Endpreise in Euro inklusive der jeweils geltenden gesetzlichen Mehrwertsteuer.',
          '(2) Versandkosten werden im Checkout-Prozess transparent ausgewiesen. Ab einem Warenwert von 50,00 € erfolgt der Standardversand innerhalb Deutschlands kostenfrei.',
          '(3) Dem Kunden stehen die im Bestellprozess angegebenen Zahlungsmethoden (z.B. Kreditkarte, PayPal, Klarna Sofort/Rechnung, Apple Pay) zur Verfügung.'
        ]
      },
      {
        title: '§ 5 Beschaffenheit der Ware, Naturmaterialien & Toleranzen',
        content: [
          '(1) Bei handgefertigten Damastklingen, Holzgriffen (z.B. Olivenholz, Walnuss, Räuchereiche, Maserbirke) und Naturmaterialien wie Büffelhorn oder Leder handelt es sich um Naturprodukte. Abweichungen in Maserung, Farbton, Struktur sowie minimale Maßtoleranzen (±2%) sind herstellungsbedingt und stellen keinen Sachmangel dar.',
          '(2) Damastmusterungen entstehen durch das Schmieden und Falten und sind bei jedem Messer ein Unikat.'
        ]
      },
      {
        title: '§ 6 Eigentumsvorbehalt',
        content: [
          'Die gelieferte Ware bleibt bis zur vollständigen Bezahlung des Kaufpreises und aller damit verbundenen Forderungen im Eigentum des Verkäufers.'
        ]
      },
      {
        title: '§ 7 Bestimmungsgemäßer Gebrauch, Sicherheitswarnungen & Pflichten des Käufers',
        content: [
          '(1) Messer sind rasiermesserscharfe Schneidwerkzeuge mit erheblichem Verletzungs- und Schadenspotenzial. Der Kunde verpflichtet sich, die Klingen ausschließlich bestimmungsgemäß und mit größter Sorgfalt zu verwenden.',
          '(2) Küchen- und Damastmesser sind ausschließlich zum Schneiden von Lebensmitteln auf geeigneten Holz- oder Kunststoffbrettern bestimmt. Sie dürfen unter keinen Umständen zweckentfremdet werden (insbesondere kein Hebeln, Hacken von gefrorenem Gut, Zerteilen von Knochen, Öffnen von Dosen oder Schrauben).',
          '(3) Die Reinigung in der Geschirrspülmaschine ist ausdrücklich untersagt. Klingen sind unmittelbar nach Gebrauch von Hand zu spülen und zu trocknen.',
          '(4) Outdoor- und Bushcraftmesser sind für forst- und naturnahe Zwecke konstruiert; unkontrolliertes Werfen, schlagartige Querhebelbelastung oder unsachgemäßes Schlagen auf den Klingenbart führt zum Erlöschen jeglicher Garantieansprüche.'
        ],
        isWarning: true
      },
      {
        title: '§ 8 Weitreichende Haftungsbeschränkung & Haftungsausschluss des Händlers',
        content: [
          '(1) Soweit gesetzlich zulässig, schließt der Verkäufer jegliche Haftung für Schäden aus, die auf unsachgemäßen, fahrlässigen oder bestimmungswidrigen Gebrauch, fehlerhafte Handhabung, mangelhafte Pflege (z.B. Spülmaschinenbenutzung, unzureichender Rostschutz, feuchte Aufbewahrung) oder Zweckentfremdung der Klingen zurückzuführen sind.',
          '(2) Der Verkäufer haftet nicht für Personen-, Schnitt- oder Folgeschäden, die dem Kunden oder Dritten durch unvorsichtigen Umgang mit den Schneidwerkzeugen oder durch ungesicherte Lagerung (insbesondere Zugriff durch Minderjährige) entstehen.',
          '(3) Der Verkäufer übernimmt keinerlei Haftung für Klingenbeschädigungen, Klingenausbrüche oder Gefügeveränderungen, die durch fehlerhaftes, unqualifiziertes Nachschleifen (insbesondere durch maschinelle Heißschleifgeräte, ungeeignete Wetzstähle oder falsche Schleifwinkel) oder eigenmächtige Modifikationen verursacht wurden.',
          '(4) Für andere als durch Verletzung von Leben, Körper und Gesundheit entstehende Schäden haftet der Verkäufer nur, soweit diese auf vorsätzlichem oder grob fahrlässigem Handeln oder auf schuldhafter Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht) durch den Verkäufer oder dessen Erfüllungsgehilfen beruhen. Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.',
          '(5) Die Haftung nach dem Produkthaftungsgesetz bleibt von den vorstehenden Haftungsbeschränkungen unberührt.'
        ],
        isWarning: true
      },
      {
        title: '§ 9 Gesetzliche Gewährleistung & Manufaktur-Garantie',
        content: [
          '(1) Es gelten die gesetzlichen Gewährleistungsvorschriften mit einer Frist von zwei Jahren ab Ablieferung der Ware für Verbraucher.',
          '(2) Normaler Verschleiß, natürliche Klingenabstumpfung durch Gebrauch sowie Schäden durch Nichtbeachtung der Pflege- und Gebrauchshinweise unterliegen nicht der Sachmängelgewährleistung.',
          '(3) Eine etwaige vom Verkäufer gewährte freiwillige 100-Tage-Zufriedenheitsgarantie lässt die gesetzlichen Gewährleistungsrechte unberührt.'
        ]
      },
      {
        title: '§ 10 Schlussbestimmungen & Gerichtsstand',
        content: [
          '(1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Bei Verbrauchern gilt diese Rechtswahl nur, soweit nicht der gewährte Schutz durch zwingende Bestimmungen des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, entzogen wird.',
          '(2) Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand für alle Streitigkeiten der Sitz des Verkäufers.',
          '(3) Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt (salvatorische Klausel).'
        ]
      }
    ]
  },
  widerruf: {
    id: 'widerruf',
    title: 'Widerrufsbelehrung & Muster-Widerrufsformular',
    shortDesc: 'Gesetzliches 14-tägiges Widerrufsrecht für Verbraucher sowie erweiterte 100-Tage KlingenWerk Schärfegarantie',
    lastUpdated: '14. Oktober 2026',
    sections: [
      {
        title: 'Widerrufsrecht',
        content: [
          'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
          'Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen haben bzw. hat.',
          'Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder eine E-Mail an service@klingenwerk-manufaktur.de) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.',
          'Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.'
        ]
      },
      {
        title: 'Folgen des Widerrufs',
        content: [
          'Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.',
          'Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart.',
          'Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben.',
          'Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden. Wir tragen die Kosten der Rücksendung der Waren innerhalb Deutschlands.'
        ]
      },
      {
        title: 'Ausschluss- bzw. Erlöschensgründe des Widerrufsrechts',
        content: [
          'Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind (z.B. Messer mit individueller Namens- oder Logogravur).'
        ],
        isWarning: true
      },
      {
        title: 'Muster-Widerrufsformular',
        content: [
          '(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)',
          'An: KlingenWerk Manufaktur, [HÄNDLERADRESSE NOCH EINZUTRAGEN], E-Mail: service@klingenwerk-manufaktur.de',
          'Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):',
          'Bestellt am (*) / erhalten am (*): __________________',
          'Name des/der Verbraucher(s): ______________________',
          'Anschrift des/der Verbraucher(s): __________________',
          'Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): _________',
          'Datum: __________________',
          '(*) Unzutreffendes streichen.'
        ]
      }
    ]
  },
  datenschutz: {
    id: 'datenschutz',
    title: 'Datenschutzerklärung (DSGVO)',
    shortDesc: 'Transparente Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß Art. 13 & 14 DSGVO',
    lastUpdated: '14. Oktober 2026',
    sections: [
      {
        title: '1. Datenschutz auf einen Blick & Verantwortliche Stelle',
        content: [
          'Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO, BDSG) sowie dieser Datenschutzerklärung.',
          'Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:',
          'KlingenWerk Manufaktur E-Commerce',
          '[FIRMENNAME / INHABER VOR- UND NACHNAME NOCH VOM HÄNDLER EINZUTRAGEN]',
          '[ANSCHRIFT NOCH EINZUTRAGEN]',
          'E-Mail: datenschutz@klingenwerk-manufaktur.de'
        ]
      },
      {
        title: '2. Datenerfassung auf dieser Website',
        content: [
          'Beim Aufrufen unserer Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet (Server-Log-Files: Browsertyp, Betriebssystem, Referrer URL, Hostname, Uhrzeit der Serveranfrage, IP-Adresse). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO zur Gewährleistung eines reibungslosen Verbindungsaufbaus und der Systemsicherheit.',
          'Wir verwenden SSL- bzw. TLS-Verschlüsselung für alle Datenübertragungen im Onlineshop.'
        ]
      },
      {
        title: '3. Datenverarbeitung zur Vertrags- und Bestellabwicklung',
        content: [
          'Wir verarbeiten die von Ihnen im Bestellvorgang eingegebenen Daten (Vor- und Nachname, Lieferadresse, Rechnungsadresse, E-Mail-Adresse, Telefonnummer) zur Erfüllung des Kaufvertrags gemäß Art. 6 Abs. 1 lit. b DSGVO.',
          'Eine Weitergabe erfolgt ausschließlich an die mit der Lieferung beauftragten Versanddienstleister (z.B. DHL, DPD) sowie das mit der Zahlungsabwicklung beauftragte Kreditinstitut bzw. den ausgewählten Zahlungsdienstleister.'
        ]
      },
      {
        title: '4. Zahlungsdienstleister (PayPal, Stripe, Klarna)',
        content: [
          'Zur Abwicklung von Zahlungen binden wir externe Zahlungsdienstleister ein:',
          '• PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg',
          '• Klarna Bank AB (publ), Sveavägen 46, 111 34 Stockholm, Schweden',
          '• Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Dublin 2, Irland',
          'Die Übermittlung Ihrer Zahlungsdaten an diese Dienstleister erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO zur Zahlungsdurchführung.'
        ]
      },
      {
        title: '5. Ihre Rechte als betroffene Person',
        content: [
          'Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO), deren Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie das Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO).',
          'Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.'
        ]
      }
    ]
  },
  waffengesetz: {
    id: 'waffengesetz',
    title: 'Wichtiger Hinweis zum Waffenrecht (§ 42a WaffG)',
    shortDesc: 'Rechtlicher Leitfaden zum Führen von Messern im öffentlichen Raum in der Bundesrepublik Deutschland',
    lastUpdated: '14. Oktober 2026',
    sections: [
      {
        title: 'Gesetzliche Bestimmungen zum Führen von Messern in Deutschland',
        content: [
          'Gemäß § 42a des deutschen Waffengesetzes (WaffG) ist das Führen bestimmter Messer in der Öffentlichkeit gesetzlich beschränkt:',
          '1. Es ist verboten, Einhandmesser (Messer mit einhändig feststellbarer Klinge) oder feststehende Messer mit einer Klingenlänge von mehr als 12 Zentimetern in der Öffentlichkeit zu führen.',
          '2. Ein Verstoß gegen das Führungsverbot stellt eine Ordnungswidrigkeit dar und kann mit einem Bußgeld von bis zu 10.000 Euro sowie der Einziehung des Messers geahndet werden.'
        ],
        isWarning: true
      },
      {
        title: 'Ausnahmen: Das berechtigte Interesse',
        content: [
          'Das Verbot gilt nicht, sofern ein berechtigtes Interesse vorliegt (§ 42a Abs. 2 und 3 WaffG):',
          '• Für den Transport in einem verschlossenen Behältnis (z.B. verriegelter Rucksack, verschlossene Tasche, Messerkoffer).',
          '• Bei der Berufsausübung (z.B. Köche auf dem Weg zur Arbeitsstätte, Handwerker, Förster).',
          '• Zur Brauchtumspflege, bei der Jagd oder beim Sport (z.B. Angeln, Wandern, Bushcrafting im Wald, Camping).',
          'Bitte beachten Sie: KlingenWerk Koch- und Damastmesser sind reine Küchen- und Schneidwerkzeuge. Transportieren Sie Küchenmesser außerhalb des Hauses stets in einer geschlossenen Messertasche oder im Originalkarton.'
        ]
      },
      {
        title: 'Rechtskonformität unserer Outdoormesser',
        content: [
          'Unser Bestseller, das „KlingenWerk Outback Pro D2“, besitzt eine Klingenlänge von exakt 11,5 cm und unterliegt damit bei bestimmungsgemäßer Nutzung NICHT dem pauschalen Führungsverbot des § 42a WaffG für feststehende Klingen über 12 cm.',
          'Lokale Waffenverbotszonen (z.B. Bahnhöfe, Veranstaltungsorte, Innenstädte) können gesonderte Verbote vorsehen, die stets vorrangig zu beachten sind.'
        ]
      }
    ]
  }
};
