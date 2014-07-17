var config = {
	local: {
		mode: 'local',
		port: 8080,
		host:'localhost',
		mongo: {
			host: '127.0.0.1',
			port: 27017
		},
		GOOGLE_CLIENT_ID : "337290929949-b6ts6r9nnb9ckdcfp19v3d9jeamqirbt.apps.googleusercontent.com",
		GOOGLE_CLIENT_SECRET : "d08rZtNuyhrxxIJ4axdsiGhh",
		googlePath:'/auth/google/callback',
		Key:"./configuration/87adfed7-3914-4bc5-8134-0f1a945ebfbe.private.pem",
		Cert:"./configuration/87adfed7-3914-4bc5-8134-0f1a945ebfbe.public.pem"

	},
	production: {
		mode: 'production',
		port: 5000,
		host:'dev.wiredelta.com',
		mongo: {
			host: 'localhost',
			port:  27017
		},
		GOOGLE_CLIENT_ID : "337290929949-arfs446niits02iti50oln2152nsgpd4.apps.googleusercontent.com",
		GOOGLE_CLIENT_SECRET : 'BWtoQmAeWDrj0Tb0r4JDUBjN',
		googlePath:'/oauth2callback',
		Key:"./configuration/87adfed7-3914-4bc5-8134-0f1a945ebfbe.private.pem",
		Cert:"./configuration/87adfed7-3914-4bc5-8134-0f1a945ebfbe.public.pem"
	}
}


module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;

}