'use strict';

// Demo fruit details
exports.seed = async database => {

	// Insert demo users
	await database('users').insert([
		{
			id: 'm8b2xsek4',
			s3o_username: 'rowan.manning',
			is_admin: false
		},
		{
			id: 'm8b2xsek3',
			s3o_username: 'example.user',
			is_admin: false
		}
	]);

	// Insert demo fruit
	await database('fruit').insert([
		{
			id: 'ekapLbTsj',
			name: 'Ackee',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'lPZeJtSqIU',
			name: 'Acai Berry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of berry`
		},
		{
			id: 'TIn_gR3L9D',
			name: 'Apple',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `That fruit that you find everywhere`
		},
		{
			id: '5zGA-hgomr',
			name: 'Apricot',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's a fruit with some fuzz`
		},
		{
			id: 'frxkf23wAl',
			name: 'Avocado',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's definitely a fruit`
		},
		{
			id: 'EitPqw98EB',
			name: 'Banana',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `Everybody knows these long yellow ones`
		},
		{
			id: 'ApZ9SdDDYt',
			name: 'Bilberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of berry`
		},
		{
			id: 'SJh_hk9Svz',
			name: 'Bilimbi',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'oocjDr60dm',
			name: 'Blackberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's a berry made up of lots of little bits`
		},
		{
			id: 'DmgbSzgCwj',
			name: 'Blackcurrant',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of berry`
		},
		{
			id: 'sI7pnJHDfV',
			name: 'Blood Lime',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's a lime made of blood`
		},
		{
			id: 'vjdR1W-Kf_',
			name: 'Blueberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's a berry that's blue`
		},
		{
			id: 'PBq-dnWYdn',
			name: 'Boysenberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's a berry that boys like`
		},
		{
			id: 'm5uV-nILHz',
			name: 'Cherry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `A small fruit with an annoying pit`
		},
		{
			id: 'KAGCCE4vQE',
			name: 'Clementine',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's like an orange`
		},
		{
			id: 'IvVMIwZWve',
			name: 'Coconut',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `Big fruit covered in hair. Don't eat the hair`
		},
		{
			id: '0A7pb5y8XpA',
			name: 'Cranberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `The band that sings Zombie`
		},
		{
			id: 'IU1iLr9Ar4w',
			name: 'Custard Apple',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `An actual fruit, not apples in custard`
		},
		{
			id: 'SN0LsMYhFE2',
			name: 'Damson',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'UXY8LS938yu',
			name: 'Date',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'cojvMK1N-CD',
			name: 'Dragonfruit',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'hjc-pL-tH-S',
			name: 'Durian',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'ad_azvFZ0fv',
			name: 'Feijoa',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'Qv0N0hd4QHV',
			name: 'Fig',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '9YoM6evPlOf',
			name: 'Gooseberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'didwPVV8Hso',
			name: 'Grape',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'u51Bxj7SiDe',
			name: 'Grapefruit',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '2DVlTxUvsQS',
			name: 'Greengage',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'VGi5nba2_hw',
			name: 'Guava',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'f4h_3hGoAR0',
			name: 'Jackfruit',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'U52yWdMxGCe',
			name: 'Kiwi',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '4qDG4Plz95n',
			name: 'Kumquat',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'cvGRUdB8kr4',
			name: 'Lemon',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'JxEj-01iCdu',
			name: 'Lime',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '29FCYG2Pw-H',
			name: 'Lingonberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'J5ryfYYhREA',
			name: 'Loganberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'QCWVsiqEmxu',
			name: 'Lychee',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'vfdJHURyXhg',
			name: 'Mandarin',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '7cr62-riz4Q',
			name: 'Mango',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '1ulmpsvyoaw',
			name: 'Naseberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'D_8SNxTaMnT',
			name: 'Melon',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'nB92gzQNJNn',
			name: 'Morello Cherry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'RDeq56Es0Cc',
			name: 'Nashi',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify(['Asian Pear']),
			description: `It's some kind of fruit`
		},
		{
			id: 'nt70D4tXcLQ',
			name: 'Nectarine',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'mKEuyNGozA5',
			name: 'Noni',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify(['Cheese Fruit']),
			description: `It's some kind of fruit`
		},
		{
			id: '-Nh06Mg221G',
			name: 'Orange',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'qgSh92LDVsy',
			name: 'Papaya',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'MR2QMFyc3MK',
			name: 'Passion fruit',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '6fN2EGFWYv9',
			name: 'Peach',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'ICOauHUIfWz',
			name: 'Peacotum',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'EFD27z_UN3D',
			name: 'Pear',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'juXuqFjwqkg',
			name: 'Pepino Melon',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'Imi663Igv1h',
			name: 'Persimmon',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'levko4Iu4oj',
			name: 'Physalis',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'JcUw7daDm4q',
			name: 'Pineapple',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'tiyRfBKVpT3',
			name: 'Pineberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'TcYBKLizQ2g',
			name: 'Pitaya',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'EZi8rLEU6Ow',
			name: 'Plantain',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '3SnjcNSMER_',
			name: 'Plum',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'Msm3ZyACigU',
			name: 'Plumcot',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '14wf2DedH6e',
			name: 'Pomegranate',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '-Pwh9uE-hcG',
			name: 'Prickly Pear',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'OndlPfAeAuF',
			name: 'Pawpaw',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'O2zCrXFOnge',
			name: 'Quince',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'vFfnt4ryR7n',
			name: 'Rambutan',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'cH0vVAywnKp',
			name: 'Raspberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'VYMFphF49w5',
			name: 'Redcurrant',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'aR4F_rZ4JS2',
			name: 'Rhubarb',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: '_f0TYN8uGIq',
			name: 'Rowan berry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'aDyDC99zeTD',
			name: 'Satsuma',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'upuFLahO74K',
			name: 'Sloe',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'qpPtkyOInNt',
			name: 'Spanish Lime',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify(['Guinep']),
			description: `It's some kind of fruit`
		},
		{
			id: 'oz5scaXMvKm',
			name: 'Starfruit',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'NmF_j6hKUqI',
			name: 'Strawberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'nO6uChBp-fv',
			name: 'Strawberry Tree Fruit',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'ntb6nOMESAP',
			name: 'Tamarillo',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'ZZYOmwQbdne',
			name: 'Tangerine',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'bW699AR9ycS',
			name: 'Tayberry',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'kcLBfPEJDHC',
			name: 'Tangelo',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'QE5DXArDR7-',
			name: 'Ume',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		},
		{
			id: 'M8pGkDoUGLC',
			name: 'Watermelon',
			creator_id: 'm8b2xsek4',
			alt_names: JSON.stringify([]),
			description: `It's some kind of fruit`
		}
	]);

	// Insert demo ratings
	await database('fruit_rating').insert([
		{
			id: 'SaxTpS1V9',
			user_id: 'm8b2xsek4',
			fruit_id: 'TIn_gR3L9D',
			rating_taste: 8,
			rating_mouthfeel: 8,
			rating_preparation: 8,
			comments: 'Good fruit, well done'
		},
		{
			id: 'YzKwPv5nB',
			user_id: 'm8b2xsek3',
			fruit_id: 'TIn_gR3L9D',
			rating_taste: 3,
			rating_mouthfeel: 3,
			rating_preparation: 3,
			comments: 'Bad fruit, do not recommend'
		}
	]);

};
