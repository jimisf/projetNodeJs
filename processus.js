module.exports = () =>  {

		const spawn = require('child_process').spawn;

		return { 

			// execution de gcc
			gcc: (fileIn,fileOut) =>
			{
				options = {cwd: undefined, env: process.env, shell: true};
				var cmd = spawn('gcc', [fileIn,'-o',fileOut], options);

				cmd.stdout.on('data', (data) => {
					console.log(`stdout: ${data}`);
        });

  			cmd.stderr.on('data', (data) => {
  					console.log(`stderr: ${data}`);
  			});

  			cmd.on('close', (code) => {
  					console.log(`child process exited with code ${code}`);
  			});
        
        cmd.on('error', (err) => {
          console.log('Failed to execute command gcc');
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
