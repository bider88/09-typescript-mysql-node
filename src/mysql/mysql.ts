import mysql from 'mysql';

export default class MySQL {

    private static _instance: MySQL;

    connection: mysql.Connection;
    connected: boolean = false;

    constructor() {
        console.log('Clase inicializada');

        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '123456',
            database : 'node_db'
          });
            

          this.connectDB();
    }

    public static get instance(): MySQL {
        return this._instance || ( this._instance = new this() );
    }

    static execQuery( query: string, callback: Function ) {
        this.instance.connection.query(query, ( err, results: Object[], fields ) => {
            if (err) {
                console.log('Error ', err);
                return callback( err );
            }
            if (results.length === 0) {
                callback( 'Zero result' );
            } else {
                callback( null, results );
            }
        })
    }

    private connectDB() {
        this.connection.connect( ( err: mysql.MysqlError ) => {
            if (err) {
                console.log(err.message);
                return
            }
        })

        this.connected = true;
        console.log('BD online');
    }

}