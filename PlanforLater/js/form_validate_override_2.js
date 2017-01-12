var use_data8 = true;

var validation_override = {
	'number_of_debts': {
		'type': 'number',
		'min_value': 1,
		'error': 'Sorry, you must have 1 or more creditors to qualify.'
	},
	'repay_per_month': {
		'type': 'number',
		'min_value': 50,
		'error': 'Sorry, you must be able to pay £50 or more per month.'
	},
};
