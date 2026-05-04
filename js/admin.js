async function admin(){
    var me = await osql.getMe();
    var id = me.id;
    var sql = `select role from Users where id = '${id}';`;
    var object = await osql.connect(sql);
    if (object[0].role != 'teacher'){
      location.href = "index.html";
    }
    console.log("あなたには権限があります");
}