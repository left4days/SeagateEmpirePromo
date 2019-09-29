const PromoCodeService = require('../services/PromoCodeService');

const promoCodeService = new PromoCodeService();

async function checkPromoCode(req, res) {
    const { body } = req;
    const { promoCode = '' } = body;
    const isValidPromoCode = await promoCodeService.checkPromoCode(promoCode);

    res.json({ success: true, data: { isValidPromoCode } });
}

module.exports = {
    POST: [['/api/v1/promocode/check', checkPromoCode]],
};
