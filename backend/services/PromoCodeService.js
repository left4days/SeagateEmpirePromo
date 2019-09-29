const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.database();
const promoCodesRef = db.ref('promocodes');

class PromoCodeService {
    async checkPromoCode(code) {
        let result = [];

        await promoCodesRef.once('value', snap => {
            result = snap.val();
        });

        return result.includes(code);
    }
}

module.exports = PromoCodeService;
