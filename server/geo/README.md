
# Mikrostoritev za lokacijo
Ta mikrostoritev je namenjena za upravljanje z lokacijami.

## Podatkovna baza
Mikrostoritev je povezana z Azure SQL podatkovno bazo, ki vsebuje tabelo *Locations*, ki hrani koordinate lokacij in kateremu uporabniku pripadajo.

## API

### POST `/location`
Prejme zahtevek z uporabniško identiteto, latitudo in longitudo ter ustvari nov zapis v tabeli *Locations*.

### POST `/locationlist`
Prejme zahtevek z uporabniško identiteto. Vrne vse lokacije, ki temu uporabniku pripadajo.

## Preverjanje zdravja

###  GET `/health`
Vrne sporočilo s kodo 200.

###  GET `/ready`
Pošlje preprosto poizvedbo na podatkovno bazo. Če dobi odgovor, vrne sporočilo s kodo 200, sicer pa sporočilo s kodo 503.
