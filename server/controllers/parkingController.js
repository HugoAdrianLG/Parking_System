const Vehicle = require('../models/vehicle');

exports.entry = (req, res) => {
  const plate = req.body.plate.trim().toUpperCase();
  const { type_id } = req.body;
  Vehicle.registerEntry(plate, type_id, (err) => {
    if (err) return res.status(500).send("Error registrando entrada");
    res.send("Entrada registrada correctamente");
  });
};

exports.exit = (req, res) => {
    const plate = req.body.plate.trim().toUpperCase();
    Vehicle.getVehicleByPlate(plate, (err, results) => {
      if (err || results.length === 0)
        return res.status(404).send("Vehículo no encontrado o ya salió");
  
      const entry = new Date(results[0].entry_time);
      const now = new Date();
      const diffMinutes = Math.ceil((now - entry) / 60000);
      const rate = results[0].ppm;
      const total = diffMinutes * rate;
  
      Vehicle.registerExit(plate, (err2) => {
        if (err2) return res.status(500).send("Error registrando salida");
        res.json({
          plate,
          type: results[0].type_name,
          minutes: diffMinutes,
          rate,
          amount: total.toFixed(2),
        });
      });
    });
  };
  
  exports.vehicleTypes = (req, res) => {
  Vehicle.getVehicleTypes((err, results) => {
    if (err) return res.status(500).send("Error obteniendo tipos de vehículo");
    res.json(results);
  });
};


exports.report = (req, res) => {
  const { from, to } = req.query;

  if (from && to) {
    Vehicle.getFilteredReport(from, to, (err, results) => {
      if (err) {
        console.error("Error en getFilteredReport:", err);
        return res.status(500).send("Error generando reporte filtrado");
      }
      res.json(results);
    });
  } else {
    Vehicle.getReport((err, results) => {
      if (err) {
        console.error("Error en getReport:", err);
        return res.status(500).send("Error generando reporte general");
      }
      res.json(results);
    });
  }
};