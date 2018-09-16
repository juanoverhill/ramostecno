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
const Turnos = db.collection('TURNO');
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
exports.getTurnosHoy = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const snapshot = yield Turnos.get();
    snapshot.forEach(item => {
        const data = item.data();
        const fechaHoy = new Date().toISOString().slice(0, 10);
        const fechaTurno = data.fecha_reparacion;
        console.log(fechaHoy);
        console.log(fechaTurno);
        if (fechaHoy === fechaTurno) {
            const msg = {
                to: data.email,
                from: 'juan.arias@csantacatalina.com.ar',
                subject: 'Hola',
                // text: `Hey ${toName}. You have a new follower!!! `,
                // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
                // custom templates
                templateId: 'd-6b08188256ff4655b1f1950b70d32f7f',
                personalizations: [
                    {
                        to: [{ email: data.email }],
                        dynamic_template_data: {
                            name: data.nombre_usuario,
                            dia: data.hora_reparacion,
                            fecha: data.fecha_reparacion
                            // and other custom properties here
                        }
                    }
                ]
            };
            return sgMail.send(msg)
                .then(() => res.status(200).send('email sent!'))
                .catch(err => res.status(400).send(err));
        }
        return res.status(200).send('No hay turnos hoy');
    });
}));
exports.getTurnosManiana = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const snapshot = yield Turnos.get();
    snapshot.forEach(item => {
        const data = item.data();
        const fechaHoy = new Date();
        const fechaManiana = new Date(fechaHoy.getTime() + (1000 * 60 * 60 * 24)).toISOString().slice(0, 10);
        const fechaTurno = data.fecha_reparacion;
        console.log(fechaHoy);
        console.log(fechaTurno);
        if (fechaManiana === fechaTurno) {
            const msg = {
                to: data.email,
                from: 'juan.arias@csantacatalina.com.ar',
                subject: 'Hola',
                // text: `Hey ${toName}. You have a new follower!!! `,
                // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
                // custom templates
                templateId: 'd-4028aa136a904859b6b60a3d4a21e5fc',
                personalizations: [
                    {
                        to: [{ email: data.email }],
                        dynamic_template_data: {
                            name: data.nombre_usuario,
                            dia: data.hora_reparacion,
                            fecha: data.fecha_reparacion
                            // and other custom properties here
                        }
                    }
                ]
            };
            return sgMail.send(msg)
                .then(() => res.status(200).send('email sent!'))
                .catch(err => res.status(400).send(err));
        }
        return res.status(200).send('No hay turnos hoy');
    });
}));
exports.httpEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const toName = req.body.toName;
        const toDia = req.body.dia;
        const toFecha = req.body.fecha;
        const toEmail = req.body.toEmail;
        const templateID = req.body.templateID;
        const msg = {
            to: toEmail,
            from: 'juan.arias@csantacatalina.com.ar',
            subject: 'Bienvenido',
            // text: `Hey ${toName}. You have a new follower!!! `,
            // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
            // custom templates
            templateId: templateID,
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