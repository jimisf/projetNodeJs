function nameVersioning (fileName)
{
	this.root = fileName;
	this.version = -1;

	this.getName = function ()
	{
		return this.version+'-'+this.root;
	}

}