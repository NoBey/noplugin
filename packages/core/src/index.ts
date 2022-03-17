
export interface Plugin {
   (PluginOption, Context, Options): void | PluginContext
}

export type PluginOption = Readonly<Record<string, unknown>>
export interface PluginContext {
  options: PluginOption
  ctx: Context
  name?: string,
  remove(): void,
  controller: AbortController,
  signal: AbortSignal,
  on(name: string, cb: Function): void,
  off(name: string, cb: Function): void
  emit(name: string): void
}

export type Options = Readonly<{  
  plugins: (Plugin | [Plugin, PluginOption])[]; 
}>  
export interface Context {
  options: Options
  plugins: Map<string, PluginContext>
}


function createPluginContext(options, ctx: Context): PluginContext{
  const controller = new AbortController();
  const signal = controller.signal;
  const remove = () => ctx.plugins.delete(pluginContext.name) && controller.abort()
  const on = (name, cb) => signal.addEventListener(name, cb)
  const off = (name, cb) => signal.removeEventListener(name, cb)
  const emit = (name) =>  signal.dispatchEvent(new Event(name))

  const pluginContext: PluginContext = {
    ctx,
    options,
    remove,
    controller,
    signal,
    on,
    emit,
    off
  }
  return pluginContext
}

function createContext(options): Context{
  return {
    options,
    plugins: new Map()
  }
}

let curPluginContext: PluginContext = null


function applyPlugin(plugin: Plugin | [Plugin, PluginOption], ctx){
  let pluginOpt = {}
  let _plugin = plugin as Plugin
  if(Array.isArray(plugin)){
    pluginOpt = plugin[1]
    _plugin = plugin[0]
  }

  const pluginContext = curPluginContext = createPluginContext(pluginOpt, ctx)
  return _plugin.call(pluginContext, pluginOpt, ctx) || pluginContext
}


export function create(options: Options){
  const { plugins = [] } = options
  const ctx: Context = createContext(options)

  plugins.forEach(plugin => {
    const pluginContext = applyPlugin(plugin, ctx)
    if(!(pluginContext.name = plugin[0]?.name || (plugin as { name?: string })?.name)){
      throw 'plugin.name is undefined'
    }
    ctx.plugins.set(pluginContext.name, pluginContext)
  })

  return ctx
}


export function useName(name: string){
  const pluginContext = curPluginContext
  pluginContext['name'] = name
}

export function usePluginContext(){
  const pluginContext = curPluginContext
  return pluginContext
}

export function useProperty(key: string, value: unknown){
  const pluginContext = curPluginContext
  pluginContext[key] = value
}



function someplugin(){
  const pluginContext = usePluginContext()

  useProperty('key', 11)

}





// 插件之间通信方法
// 共享上下问
// 共享 eventbus 

// 插件配置改如何使用
// 
