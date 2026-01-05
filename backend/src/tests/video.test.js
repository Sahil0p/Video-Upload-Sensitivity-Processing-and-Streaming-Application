import request from "supertest";
import app from "../app.js";

describe("Video API", () => {
  it("should reject upload without token", async () => {
    const res = await request(app).post("/api/videos/upload");
    expect(res.status).toBe(401);
  });
});
