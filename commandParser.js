module.exports = (command) =>  {

    var commandSplit = command.split(" ");

    return { 

    // retourne le nom du processus à exectuer
    getProcessName: () => commandSplit[0],
    gcc: () => { /*parse gcc comand */},
    };

}
