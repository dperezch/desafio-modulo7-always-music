const {Pool} = require('pg');

const config = {
    host: process.env.HOST,
    database: process.env.DB,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASS
}

const pool = new Pool(config)

//1. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
//(2 puntos)

//  Llamar con el comando:  node --env-file=.env index.js nuevo 'nombre estudiante' 'rut' 'curso' nivel
const insertEstudiante = async () => {
    const text = 'INSERT INTO estudiantes (nombre, rut , curso , nivel) VALUES ($1, $2, $3,$4) RETURNING *';
    const value = [process.argv[3], process.argv[4], process.argv[5], Number(process.argv[6])]
    const result = await pool.query(text, value);
    console.log("Estudiante " + process.argv[3] + " agregado con éxito");
}
//2. Crear una función asíncrona para obtener por consola el registro de un estudiante
//por medio de su rut. (2 puntos)

//  Llamar con el comando:  node --env-file=.env index.js rut 'rut'
const selectEstudiante = async () =>{
    const text = 'SELECT * FROM estudiantes WHERE rut = $1'
    const values = [process.argv[3]]
    const result = await pool.query(text, values)
    console.log(result.rows);
}

//3. Crear una función asíncrona para obtener por consola todos los estudiantes
//registrados. (2 puntos)

//  Llamar con el comando:  node --env-file=.env index.js consulta
const selectEstudiantes =async () => {
    const text = 'SELECT * FROM estudiantes'
    const result = await pool.query(text)
    console.log("Registro actual ",result.rows);
}

//4. Crear una función asíncrona para actualizar los datos de un estudiante en la base de
//datos. (2 puntos)

//  Llamar con el comando:  node --env-file=.env index.js editar 'nombre/cambio' 'rut' 'curso/cambio' nivel/cambio
const updateEstudiante = async () => {
    const text = 'UPDATE estudiantes SET nombre = $2 , curso = $3 , nivel = $4 WHERE rut = $1'
    const value = [process.argv[4], process.argv[3], process.argv[5], process.argv[6]]
    const result = await pool.query(text, value)
    console.log("Estudiante " + value[1] + " editado con éxito");
}

//5. Crear una función asíncrona para eliminar el registro de un estudiante de la base de
//datos. (2 puntos)

//  Llamar con el comando:  node --env-file=.env index.js eliminar 'rut'
const deleteEstudiante = async () => {
    const text = 'DELETE FROM estudiantes WHERE rut = $1'
    const value = [process.argv[3]]
    const result = await pool.query(text, value)
    console.log("Registro de Estudiante con rut " + value + " eliminado con éxito")
}


const inpt = process.argv[2];

switch (inpt) {
    case 'nuevo':
        insertEstudiante()
        break;
    case 'rut':
        selectEstudiante()
        break;
    case 'consulta':
        selectEstudiantes()
        break;
    case 'editar':
        updateEstudiante();
        break;
    case 'eliminar':
        deleteEstudiante();
        break;

    default:
        break;
}
