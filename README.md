# db-loader

Help to load sequelize models.

Sample

```javascript
'use strict';

const loader = require('db-loader');
const dbConfig = {
  "host": `${MY_DB_HOST}`,
  "port": `${MY_DB_PORT}`,
  "user": `${MY_DB_USER}`,
  "password": `${MY_DB_PASSWORD}`,
  "database": `${MY_DB_NAME}`
};

loader(__dirname, `${MY_APP_NAME}`, dbConfig);
```
We accept three parameters in the loader.
@param1 is the pathname for the target folder which contains the models.
@param2 is the appname. It is used for the log purpose.
@param3 is the database configuration.

This is an sample for a mysql model:
```javascript
'use strict';

module.exports = function (mysql, DataTypes) {
  return mysql.define('sampleDB', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    app: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    charset: 'utf8',
    paranoid: true
  });
};
```
