module.exports = (command) =>  {

	var tableConversion = {
		'gcc' 	: 1,
		'java' 	: 2,
	}

    var commandSplit = command.split(" ");

    return { 

    // retourne l'id du processus à exectuer
    getProcessId: () => tableConversion[commandSplit[0]],

    // retourne les fichiers in/out d'une compilation gcc basic
    gcc: () => { 

    	if( commandSplit[1] == undefined ) throw "le fichier d'entrée est non spécifié";
    	if( commandSplit[3] == undefined ) throw "le fichier de sortie est non spécifié";

    	return {'fileIn':commandSplit[1] ,'fileOut':commandSplit[3] }
    },

    };

}
