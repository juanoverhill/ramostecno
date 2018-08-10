import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';



admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const Equipos = db.collection('EQUIPO');


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
