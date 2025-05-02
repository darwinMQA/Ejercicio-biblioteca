const hana = require('@sap/hana-client');

const connParams = {
  serverNode: 'f885d198-b958-43ca-b09c-4378d4592c0b.hana.trial-us10.hanacloud.ondemand.com:443',
  uid: 'DBADMIN',
  pwd: '1031808326Darwin.',
  encrypt: 'true',
  sslValidateCertificate: 'false'
};

const connection = hana.createConnection();

connection.connect(connParams, (err) => {
  if (err) {
    console.error('Error al conectar a HANA:', err);
  } else {
    console.log('Conectado a SAP HANA Cloud');
  }
});

module.exports = connection;