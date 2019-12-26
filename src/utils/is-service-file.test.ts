import isServiceFile from "./is-service-file"

describe("isServiceFile", () => {
  it("should be true", () => {
    expect(isServiceFile("foobar-service.ts")).toBe(true)
  })
  it("should be false", () => {
    expect(isServiceFile("foobar-api.ts")).toBe(false)
  })
  it("should be false", () => {
    expect(isServiceFile("foobar.ts")).toBe(false)
  })
})
