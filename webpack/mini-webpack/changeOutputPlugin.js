
export class changeOutputPlugin {
    apply(hooks) {
        hooks.emitFile.tap("changeOutputPath", (context) => {
            context.changeOutputPlugin('./dist/lsy.js')
        })
    }
}