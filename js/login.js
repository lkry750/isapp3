async function login(){
    var me = await osql.getMe();
    var sql = `
            insert into Users (id, fname, lname, role) values('${me.id}', '${me.fname}', '${me.lname}', 'student')
            on duplicate key update
            fname = '${me.fname}', 
            lname = '${me.lname}';
            `;
    await osql.connect(sql);
    console.log(me.id + "がログインしています");

    document.getElementById('firstname').innerHTML = me.fname;
    document.getElementById('lastname').innerHTML = me.lname;
}

function logout() {
    osql.logout();
}

var schoolip = "100.70";