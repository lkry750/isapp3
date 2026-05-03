async function login(){
    var me = await osql.getMe();
    console.log(me);
    var sql = `
            insert into Users (id, fname, lname, role) values('${me.id}', '${me.fname}', '${me.lname}', 'student')
            on duplicate key update
            fname = '${me.fname}', 
            lname = '${me.lname}';
            `;
    await osql.connect(sql);

    document.getElementById('firstname').innerHTML = me.fname;
    document.getElementById('lastname').innerHTML = me.lname;
    console.log('ログイン完了！');
}