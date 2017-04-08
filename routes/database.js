
/**
 * Created by voltaic on 1/12/16.
 */
var mysql      = require('mysql');
var connection={};
var createConnection=function () {

    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'travels',
        password : 'pass1',
        database : 'travel'
    });
    return connection;
}

module.exports={
    checklogin : function (data ,cb) {
        var c1={};
        const conn = createConnection();
        conn.connect();

        conn.query("select * from admin where username="+"'"+data.user+"'" +"AND password="+"'"+data.pas+"'", function (err ,rows,fields) {
            if(err)
                throw err;

         //  console.log(rows[0].username);
          if(rows.length===0){
              c1={
                  user:'not'
              };
          }
           else if(rows[0].username===data.user) {
               c1 = {
                    user:rows[0].username,
                     pass:rows[0].pas
               }
           }

            cb(c1);
        });
        conn.end();
    },

  existingtour : function(cb){
        const conn = createConnection();
        conn.connect();
        var list=[];
        conn.query('select * from existingtour',function(err,rows){
            console.log(rows);
            for(var row=0;row<rows.length;row++){
            list.push({
              id:rows[0].id,
              place: rows[0].place,
              cost: rows[0].cost,
              trans: rows[0].transportation,
               best: rows[0].best

            });
            }
            cb(list);
        });
        conn.end();
    },
    addtour : function (data,cb) {
        var conn=createConnection();
        conn.connect();
        const queryString = "INSERT INTO existingtour VALUES (" +
            data.id + ", " +
            "'" + data.place + "'," +
            data.cost+ ","+
            "'" + data.transport + "'," +
            "'" + data.best +"'"+
            ");";
       console.log(queryString);
       conn.query(queryString,function(err,result){
           console.log(result);
          cb(result);
       });
       conn.end();
  }

};


//connection.end();

/*odule.exports = {

    fetchTodos: function (cb) {
        const conn = createConnection();
        conn.connect();
        let todolist = [];
        conn.query('SELECT * from todolist ORDER BY id DESC',
            function (err, rows, fields) {
                for (let row of rows) {
                    todolist.push({
                        id: row.id,
                        task: row.task,
                        done: (row.done == 0) ? false : true
                    })
                }
                cb(todolist);
            });

        conn.end();
    },

    addTodo: function ( todo, cb ) {
        const conn = createConnection();
        conn.connect();
        const queryString = "INSERT INTO todolist VALUES (" +
            todo.id + ", " +
            "'" + todo.task + "', " +
            todo.done +
            ");";
        conn.query(queryString, function (err, result) {
            cb(result);
        });
        conn.end();
    },



    updateTodo: function ( todoId, status ,  done ) {
        const conn = createConnection();
        conn.connect();

        conn.query('UPDATE todolist SET `done` = ' + status + ' WHERE `id` = ?' ,   todoId , function (err , result) {
            if(err)
                throw err;
            done(result);
        })
    }

*/