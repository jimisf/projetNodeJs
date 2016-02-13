module.exports = (command) =>  {

	var tableConversion = {
        'generic' : 0,
		'gcc' 	  : 1,
		'java' 	  : 2,
	}

    var commandSplit = command.split(" ");

    return { 

    // retourne l'id du processus à exectuer
    getProcessId: () => tableConversion[commandSplit[0]] == undefined ? 0 : tableConversion[commandSplit[0]],

    // retourne les fichiers in/out d'une compilation gcc basic
    gcc: () => { 
        if( commandSplit.length != 4     ) throw "Nombre d'argument incorrect";
    	if( commandSplit[1] == undefined ) throw "le fichier d'entrée est non spécifié";
    	if( commandSplit[3] == undefined ) throw "le fichier de sortie est non spécifié";

    	return {'fileIn':commandSplit[1] ,'fileOut':commandSplit[3] };
    },

    // retourne les arguments d'une commande non-identifié
    generic: () => {
        var clone = commandSplit.slice(0);
        var processName = clone.splice(0,1);
        return {'processName': processName[0], 'arguments':clone };
    }

    };

}
