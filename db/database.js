const sqlite = require("sqlite-sync")
const path = require("path")

const connSqlite = {
    connect() {
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"));
    },

    disconnect() {
        sqlite.close();
    },

    select(sql) {
        this.connect();
        const resultado = sqlite.run(sql);
        this.disconnect();

        return resultado
    },

    insert(usertable, userbody) {
        this.connect()
        return sqlite.insert(usertable, userbody)
    },

    update(usertable, userbody, dict) {
        this.connect()
        return sqlite.update(usertable, userbody, dict)
    },

    delete(usertable, dict) {
        this.connect()
        return sqlite.delete(usertable, dict)
    }
}

module.exports = connSqlite