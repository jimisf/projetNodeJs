module.exports = () =>  {

    const spawn = require('child_process').spawn;

    return { 

      // execution de gcc
    	gcc: (fileIn,fileOut) =>
    	{

    		var cmd = spawn('gcc', [fileIn,'-o',fileOut]);

    		cmd.stdout.on('data', (data) => {
  				console.log(`stdout: ${data}`);
			});

			cmd.stderr.on('data', (data) => {
  				console.log(`stderr: ${data}`);
			});

			cmd.on('close', (code) => {
  				console.log(`child process exited with code ${code}`);
			});

    	},

      // execution d'une commande inconnu
      generic: (processName,arguments) =>
      {
        var cmd;

        if( arguments.length == 0)  cmd = spawn(processName);
        else                        cmd = spawn(processName , arguments);

        cmd.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        cmd.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });

        cmd.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
      }

    };

}
