// Saját kivétel, amit akkor dobunk ha nem lehet láncot készíteni.
class NoChainError extends Error{
    constructor(message){
        super(message);
    }
}

module.exports = NoChainError;
