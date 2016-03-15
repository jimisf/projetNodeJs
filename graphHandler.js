module.exports = (json) => {

	var nbUsed = 0;
	var nbAssoc = 0;
	var nbRelation = 0;
	return {

	// gère les ajouts de relation
	addRelation : {

		used : (activityName , entityName ) => {
		
			json.used["used?"+nbUsed] = {
				"prov:activity"	: activityName,
				"prov:entity"	: entityName,
			};
			nbUsed++;
		},

		wasGeneratedBy : (activityName , entityName ) => {
		
			json.wasGeneratedBy["gen?"+nbRelation] = {
				"prov:entity"	: entityName,
				"prov:activity"	: activityName,
			};
			nbRelation++;
		},

		wasAssociatedWith : (activityName , agentName ) => {
		
			json.wasAssociatedWith["assoc?"+nbAssoc] = {
				"prov:activity"	: activityName,
				"prov:agent"	: agentName,
			};
			nbAssoc++;
		},
	},

	// ajout d'une activity
	addActivity : (activityName) => {

		if( json.activity[activityName] == undefined) 
			json.activity[activityName] = {};
	},

	// ajout d'une entity
	addEntity : (entityName) => {

		if( json.entity[entityName] == undefined) 
			json.entity[entityName] = {};
	},

	// ajout d'une agent
	addAgent : (agentName) => {
	
		if( json.agent[agentName] == undefined) 
			json.agent[agentName] = {};
	},

	};

}