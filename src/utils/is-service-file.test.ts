import isServiceFile from "./is-service-file"

describe("isServiceFile", () => {
  it("should be true", () => {
    expect(isServiceFile("foobar-service.ts")).toBe(true)
  })
})
