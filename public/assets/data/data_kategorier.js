// Denne funktion returnerer et JSON array indholdende kategorier.
// Den bruges udelukkende til at holde eksemplet simpelt
// og uafhængigt af API'er, databaser, osv.

function statisk_kategorier_data() {
    return [
        { "type_id": 1, "type_navn": "CD Afspillere" },
        { "type_id": 2, "type_navn": "DVD Afspillere" },
        { "type_id": 3, "type_navn": "Record Playere" },
        { "type_id": 4, "type_navn": "Speakere" }
    ];
}
