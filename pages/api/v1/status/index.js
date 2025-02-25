import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = await database.query("SHOW server_version;");

  const databaseMaxConnections = await database.query("SHOW max_connections;");

  const databaseName = process.env.POSTGRES_DB;

  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  console.log(databaseOpenedConnectionsResult.rows[0]);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: databaseVersion.rows[0].server_version,
        postgres_max_connection: parseInt(
          databaseMaxConnections.rows[0].max_connections,
        ),
        postgres_current_cons: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
