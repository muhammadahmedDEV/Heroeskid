// @ts-ignore
const env = Object.assign({}, process.env)

export interface Config {
  readonly publicUrl: string | undefined
  readonly isDevelopment: boolean,
  readonly demoConfigVariable: string
}

const config: Config = {
  publicUrl: env['PUBLIC_URL'],
  isDevelopment: (env['NODE_ENV'] !== 'production'),
  demoConfigVariable: 'default-value'
}

const REACT_APP = /^REACT_APP_/i
const FIRST_CHARACTER_IN_NAME = /_+([a-z])/gi
Object
  .keys(env)
  .filter(key => REACT_APP.test(key))
  .forEach(key => {
    const name = key
      .replace(REACT_APP, '')
      .toLowerCase()
      .replace(FIRST_CHARACTER_IN_NAME, (match: string, p1: string) => p1.toUpperCase())
    config[name] = env[key]
  })

export { env }
export default config
