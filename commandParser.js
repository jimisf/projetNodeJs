module.exports = (command) =>  {

    var commandSplit = command.split(" ");

    return { 

    // retourne les arguments d'une commande non-identifié
    generic: () => {
        var clone = commandSplit.slice(0);
        var processName = clone.splice(0,1);
        return {'processName': processName[0], 'arguments':clone };
    }

    };

}
