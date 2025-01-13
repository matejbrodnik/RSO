
# Weather Planner

Aplikacija, ki uporabniku omogoča hranjenje lokacij in njihovo vremensko napoved preko Openmeteo API. Uporabnik si lahko ustvari račun in se prijavi v aplikacijo. Lokacije si izbere in shrani preko zemljevida.

##  Struktura

- /helm
Kuberentes konfiguracija aplikacije v obliki Helm Charts.

- /k8s
Kuberentes konfiguracija aplikacije v obliki yaml konfiguracijskih datotek. Niso več v uporabi (nadomeščene s helm).

- /rso
Frontend aplikacije

- /server
Backend aplikacije, razdeljen na 3 mikrostoritve:
	- /auth
	Avtentikacijska mikrostoritev
	- /geo
	Lokacijska mikrostoritev
	- /weather
	Vremenska mikrostoritev

## Postavitev okolja

### .env
Vse mikrostoritve imajo .env datoteke, ki hranijo okoljske spremenljivke za lokalno okolje. Seznam spremenljivk se nahaja v README datotekah mikrostoritev.

### Kubernetes secrets
Konfiguracija Kubernetes uporablja okoljske spremenljivke, definirane z uporabo skrivnosti:

```
dockerhub-secret
```
- docker-username (uporabniško ime Docker Hub)
- docker-password (geslo Docker Hub)
```
azure-sql-credentials
azure-sql-credentials2
```
- DB_HOST (naslov strežnika podatkovne baze)
- DB_NAME  (ime podatkovne baze)
- DB_USER  (prijavno ime podatkovne baze)
- DB_PASSWORD  (geslo podatkovne baze)



