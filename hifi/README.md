# HiFi Dokumentation

## Resurser

### GET /produkter

Resursen representerer alle produkter i kartoteket.
Resursen er formateret på følgende måde:

```JSON
[{
    "navn": "harbeth_p3es2",
    "producent": "harbeth",
    "kategori": "højtaler",
    "billede": "harbeth_p3es2.jpg",
    "varenr": 801,
    "pris": 1385.95,
    "beskrivelse": {
        "tekst": "Rigtig god lyd til prisen...",
    }
},]
```

### GET /produkter/\<varenummer>

Resursen repræsenterer et enkelt produkt i kartoteket.
Resursen er formateret på følgende måde:

```JSON
{
    "navn": "harbeth_p3es2",
    "producent": "harbeth",
    "kategori": "højtaler",
    "billede": "harbeth_p3es2.jpg",
    "varenr": 801,
    "pris": 1385.95,
    "beskrivelse": {
        "tekst": "Rigtig god lyd til prisen...",
    }
},
```
