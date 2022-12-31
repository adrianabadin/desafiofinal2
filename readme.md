# Pre entrega trabajo Final 2

## Bases de datos implementadas

1. Firebase: para usar y probar la funcionalidad se debe modificar la variable de entorno choice y colocar el string 'firebase'
2. MongoDb: para usar y probar la funcionalidad se debe modificar la variable de entorno choice y colocar el string 'mongo'
3. FileSystem: para usar y probar la funcionalidad se debe modificar la variable de entorno choice y colocar el string 'json'
4. Sqlite3: para usar y probar la funcionalidad se debe modificar la variable de entorno choice y colocar el string 'sqlite'

La Clase DbManager en el archivo dbPicker de la carpeta services usa un patron singleton para evitar la duplicacion de las conexiones a la base de datos.
Por otra parte se aplico el Strategy Pattern alimentando un objeto para definir cual de las dependencias inyectar a la clase.

## Validacion:

Usa un middleware Custom que valida que los campos requeridos esten presentes

## Autenticacion

Se armo un Middleware que deja solamente modificar los datos de productos si un boolean esta seteado a true

## Rutas:

### Products

post/ Agrega un producto
get/ Devuelve todos los productos
get/:id Devuelve el producto del ID mencionado
put/:id Modifica el producto del ID mencionado
delete/:id Elimina el producto del ID mencionado

### Cart

post/cart/ Crea un nuevo Cart
get/cart/:id Visualiza el Cart correspondiente al ID
post/cart/:id/products Agrega un producto al cart
delete/cart/:id/products/:idProd Elimina el producto del cart
delete/cart/:id Elimina el cart

## Dependencias:

- colors
- dotenv
- express
- firebase-admin
- knex
- mongoose
- morgan
- multer
- mysql
- sqlite3
- uuid

## Instalacion y ejecucion

npm install
npm start
