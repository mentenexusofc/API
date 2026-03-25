const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgres://postgres:mKW7UE1ZK2N5SUqXTmA5MfwOY1Ohrm54MHHdpUdol77167hYbUclbU3z82r3EZGd@72.60.11.33:5432/postgres",
  ssl: false
});

async function checkDB() {
  try {
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("Tables:", tablesResult.rows.map(r => r.table_name));

    for (const table of tablesResult.rows.map(r => r.table_name)) {
      const columnsResult = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = $1
      `, [table]);
      console.log(`Table ${table} Columns:`, columnsResult.rows.map(r => `${r.column_name} (${r.data_type})`));
    }
  } catch (err) {
    console.error("Error checking DB:", err);
  } finally {
    await pool.end();
  }
}

checkDB();
