

var generateRandomData = function() {
	var dataArray = [];
	for (var i=0; i<daysPerMonth; i++) {
		dataArray[i] = [];

		for (var c=0; c<categories; c++) {

			// Random number between 0 and 1
			dataArray[i][c] = getRandomArbitrary(0,1);

		}

	}
	return dataArray;

}

var generateRandomUserData = function() {

	var dataArray = [];
	for (var i=0; i<daysPerMonth; i++) {
		dataArray[i] = [];

		shoppedToday = getRandomInt(0,2);

		for (var c=0; c<categories; c++) {
	
			if (shoppedToday) {
				shoppedThisCategory = getRandomInt(0,2);
				if (shoppedThisCategory) {
					// Random number between 0 and 1
					dataArray[i][c] = getRandomArbitrary(0,1);
				} else {
					dataArray[i][c] = 0;
				}
			} else {
				dataArray[i][c] = 0;
			}
		}

	}

	return dataArray;
}

var randomData = generateRandomData();
var randomUserData = generateRandomUserData();

