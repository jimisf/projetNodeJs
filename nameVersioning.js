/* Fichier uniquement pour les tests /!\
** Reproduit le comportement de la fonction nameVersioning de server.js
*/
module.exports = (fileName) => {
	
	this.root = fileName;
	this.version = -1;

	return { 
		getName : () =>
		{
			return ++this.version+'-'+this.root;
		}
	}
}