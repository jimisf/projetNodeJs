module.exports = (json) => {

	return {

	// gère les ajouts de relation
	addRelation : {

		used : (relationName, activityName , entityName ) => {
		
			json.used[relationName] = {
				"prov:activity"	: activityName,
				"prov:entity"	: entityName,
			};
		},

		wasGeneratedBy : (relationName, activityName , entityName ) => {
		
			json.wasGeneratedBy[relationName] = {
				"prov:entity"	: entityName,
				"prov:activity"	: activityName,
			};
		},

		wasAssociatedWith : (relationName, activityName , agentName ) => {
		
			json.wasAssociatedWith[relationName] = {
				"prov:activity"	: activityName,
				"prov:agent"	: agentName,
			};
		},
	},

	// ajout d'une activity
	addActivity : (activityName) => {

		provJson.activity[activityName] = {};
	},

	// ajout d'une entity
	addEntity : (entityName) => {
	
		provJson.entity[entityName] = {};
	},

	// ajout d'une agent
	addAgent : (agentName) => {
	
		provJson.agent[agentName] = {};
	},

	};

}