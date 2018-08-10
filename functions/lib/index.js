"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const Equipos = db.collection('EQUIPO');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.AddEquipo = functions.https.onRequest((request, response) => {
    const descripcion = 'TEST2';
    return db.collection('EQUIPO').add({ descripcion: descripcion }).then((result) => {
        return response.json({ result: 'EQUIPO with ID: ' + result.id + ' added.' });
    });
});
exports.getEquipos = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const snapshot = yield Equipos.get();
        const results = [];
        snapshot.forEach(item => {
            const data = item.data();
            data.equipo_id = item.id;
            results.push(data);
        });
        res.send(results);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
//# sourceMappingURL=index.js.map