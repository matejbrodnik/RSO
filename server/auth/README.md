
# Mikrostoritev za avtentikacijo
Ta mikrostoritev je namenjena za upravljanje z uporabniki.

## Podatkovna baza
Mikrostoritev je povezana z Azure SQL podatkovno bazo, ki vsebuje tabelo *Users*, ki hrani uporabniška imena in gesla.

## API

### POST `/login`
Prejme zahtevek z uporabniškim imenom in geslom. Če v podatkovni bazi obstaja uporabnik z istim geslom, se vrne pozitiven odziv, sicer ga zavrne.

### POST `/register`
Prejme zahtevek z uporabniškim imenom in geslom in ga vstavi v podatkovno bazo, če ne obstaja uporabnik z enakim imenom.

## Preverjanje zdravja

###  GET `/health`
Vrne sporočilo s kodo 200.

###  GET `/ready`
Pošlje preprosto poizvedbo na podatkovno bazo. Če dobi odgovor, vrne sporočilo s kodo 200, sicer pa sporočilo s kodo 503.

## .env
PORT=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_NAME=