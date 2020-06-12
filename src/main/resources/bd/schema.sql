CREATE TABLE personas(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL,
  apellido VARCHAR(30) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  email VARCHAR(76) UNIQUE NOT NULL
  CONSTRAINT personas_nombre_not_Numbers_check CHECK(nombre ~ '^[a-zA-Z ]*$'),
  CONSTRAINT personas_apellido_not_Numbers_check CHECK(apellido ~ '^[a-zA-Z ]*$'),
  CONSTRAINT personas_telefono_not_characters_check CHECK(telefono ~ '^[0-9]*$'),
  CONSTRAINT personas_email_validness_check CHECK(email ~ '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')
);
