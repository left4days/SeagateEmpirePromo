const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.database();
const clicksRef = db.ref('server/saving-data/fireblog/clicks');

function sortByClicks(a, b) {
    const { clicks: aClicks } = a;
    const { clicks: bClicks } = b;
    if (aClicks > bClicks) {
        return -1;
    }

    if (aClicks < bClicks) {
        return 1;
    }

    return 0;
}

class ClickService {
    constructor() {
        this.clicks = 0;
    }

    async getUserClicksById(uid) {
        let result = 0;

        await clicksRef.child(uid).once('value', snap => {
            const clicks = snap.val();

            if (!isNaN(parseInt(clicks)) && clicks > 0) {
                result = clicks;
                return;
            }

            clicksRef.update({ [uid]: 0 }).then(() => {
                result = 0;
            });
        });

        return result;
    }

    async getAllUsersClicks() {
        let result = 0;

        await clicksRef.once('value', snap => {
            result = snap.val();
        });

        return result;
    }

    async updateUserClicks(userId, count) {
        let confirmedCount = await this.getUserClicksById(userId);
        confirmedCount += count;

        if (isNaN(count) || isNaN(confirmedCount)) {
            return {
                success: false,
                errorMessage: 'implementData is wrong',
                meta: { count: isNaN(count), confirmedCount: isNaN(confirmedCount) },
            };
        }

        try {
            await clicksRef.update({
                [userId]: confirmedCount,
            });
        } catch (err) {
            console.log('ERROR DB UPDATE CLICKS FOR', userId);
            console.log(err);

            return { confirmedCount: confirmedCount - count };
        }

        return { confirmedCount };
    }

    async getTopClickers(limit) {
        let res = [];
        try {
            await clicksRef.once('value', snapshot => {
                res = Object.entries(snapshot.val())
                    .map(([uid, clicks]) => {
                        return {
                            uid,
                            clicks,
                        };
                    })
                    .sort(sortByClicks)
                    .slice(0, +limit);
            });
        } catch (err) {
            console.log('ERROR DB GET TOP CLICKERS');
            console.log(err);

            return [];
        }

        return res;
    }

    async getAllUsersAndCkicks() {
        const res = { clicks: 0, users: 0 };

        try {
            await clicksRef.once('value', snapshot => {
                res.users = Object.keys(snapshot.val()).length;
                res.clicks = Object.values(snapshot.val()).reduce((accum, value) => (accum += value), 0);
            });
        } catch (err) {
            console.log('ERROR DB GET TOP CLICKERS');
            console.log(err);

            return res;
        }

        return res;
    }
}

module.exports = ClickService;
