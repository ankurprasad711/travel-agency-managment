
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
                     pass:rows[0].password
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
              id:rows[row].id,
              place: rows[row].place,
              cost: rows[row].cost,
              trans: rows[row].transportation,
               best: rows[row].best

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
  },

    adduser : function (data,cb) {
        var conn=createConnection();
        conn.connect();
        const queryString = "INSERT INTO user VALUES (" +
            "'" + data.username + "'," +
            "'" + data.password + "'," +
            "'" + data.name + "'," +
            "'" + data.gender + "'," +
            "'" + data.address + "'," +
            "'" + data.phone + "'," +
            "'" + data.email + "'" +
           // "'" + data.best +"'"+
            ");";
        console.log(queryString);
        conn.query(queryString,function(err,result){
            console.log(result);
            cb(result);
        });
        conn.end();
    },
    checkloginuser : function (data ,cb) {
        var c1={};
        const conn = createConnection();
        conn.connect();

        conn.query("select * from user where username="+"'"+data.user+"'" +"AND password="+"'"+data.pas+"'", function (err ,rows,fields) {
            if(err)
                throw err;

            console.log(rows);
            if(rows.length===0){
                c1={
                    user:'not'
                };
            }
            else if(rows[0].username===data.user) {
                c1 = {
                    user:rows[0].username,
                    pass:rows[0].password
                }
            }
  console.log(c1);
            cb(c1);
        });
        conn.end();
    },
    fetchbookings : function (data ,cb) {
        var c1=[];
        const conn = createConnection();
        conn.connect();

        conn.query("select * from bookings where username="+"'"+data.name+"'", function (err ,rows,fields) {
            if(err)
                throw err;

            console.log(rows);
            for(var row=0;row<rows.length;row++) {
                c1.push({
                    user: rows[row].username,
                    id: rows[row].id,
                    dob: rows[row].date_of_booking,
                    no: rows[row].no_of_adults,
                    doj: rows[row].date_of_journey

                });
            }
            cb(c1);
        });
        conn.end();
    },
    delete: function ( data,callback) {

        const conn = createConnection();
        conn.connect();

        conn.query('DELETE FROM bookings WHERE username='+'"'+data.user+ '"'+'and id='+'"'+data.id+'"', function (err , result) {
            if(err)
                throw err;

            callback(result);
        });

    },

    bookticket : function (data,cb) {
        var conn=createConnection();
        conn.connect();
        const queryString = "INSERT INTO ticket VALUES (" +
            "'" + data.user + "'," +
            "'" + data.pas + "'," +
            "'" + data.boarding + "'," +
            "'" + data.destination + "'," +
            "'" + data.type + "'," +
            "'" + data.dob + "'," +
            "'" + data.doj + "'," +
            "'" + data.id + "'" +
            // "'" + data.best +"'"+
            ");";
        console.log(queryString);
        conn.query(queryString,function(err,result){
            console.log(result);
            cb(result);
        });
        conn.end();
    },
    getticket : function (data ,cb) {
        var c1=[];
        const conn = createConnection();
        conn.connect();

        conn.query("select * from ticket where username="+"'"+data.name+"'", function (err ,rows,fields) {
            if(err)
                throw err;

            console.log(rows);
            for(var row=0;row<rows.length;row++) {
                c1.push({
                    id:rows[row].id,
                    boarding: rows[row].boarding,
                    type: rows[row].type,
                    dob: rows[row].dob,
                    no: rows[row].no,
                    doj: rows[row].doj,
                    destination: rows[row].destination

                });
            }
            cb(c1);
        });
        conn.end();
    },
    deleteticket : function ( data,callback) {

        const conn = createConnection();
        conn.connect();
 console.log('DELETE FROM ticket WHERE username='+'"'+data.user+ '"'+'and dob='+'"'+data.dob+'"');
        conn.query('DELETE FROM ticket WHERE username='+'"'+data.user+ '"'+'and id='+'"'+data.id+'"', function (err , result) {
            if(err)
                throw err;

            callback(result);
        });

    },
    bookings : function (data,cb) {
        var conn=createConnection();
        conn.connect();
        const queryString = "INSERT INTO bookings VALUES (" +
            "'" + data.user + "'," +
            "'" + data.id + "'," +
            //data.id + ", " +

          //  "'" + data.place + "'," +
            "'" + data.dob + "'," +
            "'" + data.pass + "'," +
            "'" + data.doj + "'," +
            "'" + data.cost +"'"+
            ");";
        console.log(queryString);
        conn.query(queryString,function(err,result){
            console.log(result);
            cb(result);
        });
        conn.end();
    },
    search : function (data ,cb) {
        var c1=[];
        const conn = createConnection();
        conn.connect();

        conn.query("select * from search where boarding="+"'"+data.b+"'"+"and destination="+"'"+data.d+"'", function (err ,rows,fields) {
            if(err)
                throw err;

            console.log(rows);
            for(var row=0;row<rows.length;row++) {
                c1.push({
                    b:rows[row].boarding,
                    d: rows[row].destination
                });
            }
            cb(c1);
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