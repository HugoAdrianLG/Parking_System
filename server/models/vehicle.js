const db = require('./db');

const Vehicle = {
  registerEntry: (plate, type, callback) => {
    const sql = "INSERT INTO vehicles (plate, type_id, entry_time) VALUES (?, ?, NOW())";
    db.query(sql, [plate, type], callback);
   },
      

  registerExit: (plate, callback) => {
    const sql = "UPDATE vehicles SET exit_time = NOW() WHERE plate = ? AND exit_time IS NULL";
    db.query(sql, [plate], callback);
  },

  getVehicleTypes: (callback) => {
    const sql = "SELECT id, type_name FROM vehicle_types";
    db.query(sql, callback);
  },

  getVehicleByPlate: (plate, callback) => {
    const sql = `
      SELECT v.*, vt.type_name, vt.ppm
      FROM vehicles v
      JOIN vehicle_types vt ON v.type_id = vt.id
      WHERE v.plate = ? AND v.exit_time IS NULL
    `;
    db.query(sql, [plate], callback);
  },

  getReport: (callback) => {
    const sql = `
      SELECT v.id, v.plate, vt.type_name AS type, vt.ppm,
             v.entry_time, v.exit_time
      FROM vehicles v
      JOIN vehicle_types vt ON v.type_id = vt.id
    `;
    db.query(sql, callback);
  },

  getFilteredReport: (from, to, callback) => {
    const sql = `
      SELECT v.id, v.plate, vt.type_name AS type, vt.ppm,
             v.entry_time, v.exit_time
      FROM vehicles v
      JOIN vehicle_types vt ON v.type_id = vt.id
      WHERE v.entry_time BETWEEN ? AND ?
    `;
    db.query(sql, [from, to], callback);
  }
};



module.exports = Vehicle;
