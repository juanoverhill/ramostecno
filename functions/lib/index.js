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
const sgMail = require("@sendgrid/mail");
admin.initializeApp();
const db = admin.firestore();
const Equipos = db.collection('EQUIPO');
// const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const SENDGRID_API_KEY = functions.config().sendgrid.key;
const cors = require('cors')({ origin: true });
sgMail.setApiKey(SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
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
exports.httpEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const toName = req.body.toName;
        const toDia = req.body.dia;
        const toFecha = req.body.fecha;
        const toEmail = req.body.toEmail;
        const msg = {
            to: toEmail,
            from: 'juan.arias@csantacatalina.com.ar',
            subject: 'Bienvenido',
            // text: `Hey ${toName}. You have a new follower!!! `,
            // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
            // custom templates
            templateId: 'd-47b68a6dc0a1409eba235610e806d017',
            personalizations: [
                {
                    to: [{ email: toEmail }],
                    dynamic_template_data: {
                        name: toName,
                        dia: toDia,
                        fecha: toFecha
                        // and other custom properties here
                    }
                }
            ]
        };
        return sgMail.send(msg)
            .then(() => res.status(200).send('email sent!'))
            .catch(err => res.status(400).send(err));
    });
});
//# sourceMappingURL=index.js.map