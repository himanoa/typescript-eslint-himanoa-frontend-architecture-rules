export default function isServiceFile(fileName: string): boolean {
  const serviceFileRegex = /(.+)\-service\.ts/
  return serviceFileRegex.test(fileName)
}
