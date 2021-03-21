# Todo List

* FTP Transfer aufsetzen DONE
* Webservice fix auf jass.zhs.ch/service/.... (während Entwicklung und auch live) DONE
* Erste Tab Supervisor für Init, Reset und PlayName festlegen DONE
* Jass als "globale" Funktionsbibliothek DONE
* GET auf POST anpassen, da model sonst nur 2kByte gross sein darf. DONE
* Auswählen und anzeigen von Trumpf oder Obe/Une DONE
* Karten Wert hinzufügen und Automatisch Summe berechnen. DONE
* node espress dev server für loale test DONE
* Wis Dialog verbessern und Spiel Faktor berücksichtigen.
* Produktive PHP's begrenzen der "Model" Daten Size. Kleine Sicherheitsbeschränkung vor Missbrauch.

# Ideen
* Bedenkzeit eines Spielers aufzeichnen und in die Tabellen übertragen :-) Idee Laura, weil Eria so lange überlegt.
* Ablupfe ? Kommt das in den online Splienen vor?


# Mobil Phone
* Handy von Laura iPhone 8, kein Plus.

# Webservices

Nur existierende Spiel-Filenamen können verwendet werden. Neue Namen sind nicht möglich. Diese müssen am System existieren.

* ./services/getplay?tablename=a
* ./services/setplay POST JSON={tablename=a,model={JSON}}

# Server seitig 

Erstelle ein Objekt im memory, welches per webservice abgefragt wird mit dem Status des Servers.
* Startzeit
* letztes Spiel
* pro spiel wie viele lesen und schreibzugriffe (memory und file)
