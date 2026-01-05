import request from "supertest";
import app from "../app.js";

describe("Auth API", () => {
  it("should return 404 if route missing", async () => {
    const res = await request(app).get("/not-found");
    expect(res.status).toBe(404);
  });
});
