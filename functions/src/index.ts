import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';


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
export const getEquipos = functions.https.onRequest(async (req,res)=>{    
try{
    const snapshot = await Equipos.get();
    const results = [];
    snapshot.forEach(item => {
        const data = item.data();
        data.equipo_id = item.id;
        results.push(data);
    })
    res.send(results);
}
catch(err){
    res.status(500).send(err);
}
})

exports.getTurnosHoy = functions.https.onRequest(async (req,res)=>{    
    try{
        const templateID = req.body.templateID;

        const snapshot = await Turnos.get();
        const results = [];
        snapshot.forEach(item => {
            const data = item.data();
            const fechaHoy = new Date().toISOString().slice(0,10);
            const fechaTurno = data.fecha_reparacion;
           
            console.log(fechaHoy);
            console.log(fechaTurno);

            const endpoint = 'https://us-central1-calidad-csc.cloudfunctions.net/httpEmail';

            const datos = {
                toEmail: data.email,
                toName: data.nombre_usuario,
                dia: data.hora_reparacion,
                fecha: data.fecha_reparacion,
                templateID: 'd-6b08188256ff4655b1f1950b70d32f7f',
              };

            if(fechaHoy === fechaTurno) {
                this.http.post(endpoint, datos).subscribe();
            }
           
        })

        res.status(200).send('email sent!')
    }
    catch(err){
        res.status(500).send(err);
    }
});

exports.getTurnosManiana = functions.https.onRequest(async (req,res)=>{    
    try{
        const templateID = req.body.templateID;

        const snapshot = await Turnos.get();
        const results = [];
        snapshot.forEach(item => {
            const data = item.data();
            const fechaHoy = new Date();
            const fechaManiana = new Date(fechaHoy.getTime() + (1000 * 60 * 60 * 24)).toISOString().slice(0,10);
            const fechaTurno = data.fecha_reparacion;
           
            console.log(fechaHoy);
            console.log(fechaTurno);

            const endpoint = 'https://us-central1-calidad-csc.cloudfunctions.net/httpEmail';

            const datos = {
                toEmail: data.email,
                toName: data.nombre_usuario,
                dia: data.hora_reparacion,
                fecha: data.fecha_reparacion,
                templateID: 'd-4028aa136a904859b6b60a3d4a21e5fc',
              };

            if(fechaManiana === fechaTurno) {
                this.http.post(endpoint, datos).subscribe();
            }
           
        })

        res.status(200).send('email sent!')
    }
    catch(err){
        res.status(500).send(err);
    }
});
 

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
                to: [{ email: toEmail}],
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
            .catch(err => res.status(400).send(err)) 

    });
});
