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
        const resultado = sqlite.insert(table, data)
        this.disconnect()
        return resultado
    },

    update(table, data, where) {
        this.connect()
        const resultado = sqlite.update(table, data, where)
        this.disconnect()
        return resultado
    },

    delete(table, where) {
        this.connect()
        const resultado = sqlite.delete(table, where)
        this.disconnect()
        return resultado
    },

    selectFirst(sql) {
        let result = this.select(sql)
        return result[0]         
    }
}

module.exports = connSqlite