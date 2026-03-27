const APPLICATION_DATABASE_NAME = '';//適宜適切なデータベース名に変更してください
osql.db = APPLICATION_DATABASE_NAME;//接続先を固定する際はここを変えてください．
const isapp = {
    getDatabaseName: function () {
        return APPLICATION_DATABASE_NAME;
    },

    openUserProfile: function (pathPrefix, userId) {
        let url = `${pathPrefix}/user/profile.html`;
        if (userId) {
            url += `?userId=${userId}`;
        }
        this.profileWindow = window.open(url, 'userProfile', 'width=600,height=600');
    },

    initUser: async function () {
        const me = await osql.getMe();
        if (me) {
            let user = null;
            const userResult = await osql.connect(`SELECT fname, lname FROM Users WHERE id = '${me.id}'`, false);
            if (userResult.objects.length > 0) {
                user = userResult.objects[0];
            } else {
                // User not in Users table, insert them
                const insertSql = `INSERT INTO Users (id, fname, lname, role) VALUES (
                    '${me.id}',
                    '${osql.escapeSingleQuote(me.fname)}',
                    '${osql.escapeSingleQuote(me.lname)}',
                    'user'
                )`;
                const insertResult = await osql.connect(insertSql, false);
                if (insertResult.status === 200) {
                    console.log("User inserted successfully into Users table.");
                    user = { fname: me.fname, lname: me.lname };
                } else {
                    console.error("Failed to insert user into Users table:", insertResult);
                    user = { fname: me.fname, lname: me.lname }; // Fallback to osql.getMe() info
                }
            }
            $('#username').text(`ようこそ${user.lname} ${user.fname}さん`);
        }
    }
};
