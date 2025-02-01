test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  const postgresVersion = responseBody.dependencies.database.postgres_version;
  expect(postgresVersion).toBe("16.2");

  const postgresMaxConnection =
    responseBody.dependencies.database.postgres_max_connection;
  expect(postgresMaxConnection).toBe(100);

  const postgresCurrentCons =
    responseBody.dependencies.database.postgres_current_cons;
  expect(postgresCurrentCons).toBe(1);
});
