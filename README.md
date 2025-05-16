# Parking_System #
Sistema de Control de Estacionamiento

*Tecnologías utilizadas*

-Backend 
(Node.js + Express):
 
  Express.js, MySQL, Node.js, Axios, Model-View-Controller, CORS

-Frontend
(Next.js con TypeScript):

Next.js (React), Tailwind CSS, Axios, xlsx + file-saver

*Funcionalidades principales*

Gestión de Vehículos:

  -Registrar entrada de vehículo con tipo y placa.
  
  -Registrar salida por placa.
  
  -Lista y tabla con historial completo de entradas/salidas.

Reporte:

  -Tabla general con información de vehículos registrados.
  
  -Filtro por fecha de entrada.
  
  -Exportación a Excel del reporte.
  

Para poder ejecutar correctamente el servidor:

*Requisitos*

  -Node.js v18+
  
  -MySQL

*Configuración de base de datos*
  Es necesario editar el archivo db.js ubicado en la carpeta raíz del backend (en la carpeta "server") con los datos de conexión de a la base de datos local, dentro del 
  proyecto se encuentra un archivo ".sql" que tiene por nombre "parking_system" el cual solo es necesario importar.

*Instalación y ejecución*

  Una vez configurado el entorno, en una terminal es necesario ejecutar los siguientes comandos:
  
  -cd server
  
  -npm install
  
  -node app.js

  El servidor se ejecuta en http://localhost:3001

Configuración del frontend

*Requisitos*

  -Node.js
  
  -Next.js

*Instalación y ejecución*

  -cd parking-front
  
  -npm install
  
  -npm run dev
  
  Se ejecuta en http://localhost:3000 

Desde la interfaz se puede seleccionar un rango de fechas (opcional) y exportar los resultados del reporte como archivo .xlsx.


Autor: Hugo Adrian Lechuga Gómez
