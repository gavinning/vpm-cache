#VPM-cache

```
npm install vpm-cache --save
```

```
var cache = require('vpm-cache');
var db = cache('./db');


// Get table
var user = db.get('user');

user.set('name', 'gavinning');
user.save() // => create ./db/user.db

user.get('name') // => gavinning
```