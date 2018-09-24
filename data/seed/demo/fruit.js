'use strict';

// Demo fruit details
exports.seed = async database => {

	// Insert demo users
	await database('users').insert([
		{
			id: 'm8b2xsek4',
			s3o_username: 'rowan.manning',
			is_admin: false
		}
	]);

	// Insert demo fruit
	await database('fruit').insert([
		{
			id: 'BC3Ah1Caj',
			creator_id: 'm8b2xsek4',
			name: 'Apple',
			alt_names: JSON.stringify([]),
			description: 'A basic fruit',
			image_url: null
		},
		{
			id: 'XJZMsw5qp',
			creator_id: 'm8b2xsek4',
			name: 'Banana',
			alt_names: JSON.stringify(['Long Yellow Boi']),
			description: 'A yellow basic fruit',
			image_url: null
		},
		{
			id: 'EMLidlz_R',
			creator_id: 'm8b2xsek4',
			name: 'Kiwi',
			alt_names: JSON.stringify(['Ikwi']),
			description: 'A furry fruit',
			image_url: null
		}
	]);

	// Insert demo ratings
	await database('fruit_rating').insert([
		{
			id: 'o2c6W4goa',
			user_id: 'm8b2xsek4',
			fruit_id: 'XJZMsw5qp',
			rating_taste: 6,
			rating_mouthfeel: 4,
			rating_preparation: 9,
			comments: 'Very yellow and very banana'
		}
	]);

};
