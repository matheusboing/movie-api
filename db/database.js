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

    insert(table, data) {
        this.connect()
        return sqlite.insert(table, data)
    },

    update(table, data, where) {
        this.connect()
        return sqlite.update(table, data, where)
    },

    delete(table, where) {
        this.connect()
        return sqlite.delete(table, where)
    },

    selectFirst(sql) {
        let result = this.select(sql)
        return result[0]         
    }
}

module.exports = connSqlite