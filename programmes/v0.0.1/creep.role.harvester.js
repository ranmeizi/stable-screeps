function Ctx(){

}

/**
 * @type {IHandler<Creep,Ctx>}
 */
const handler = {
    // tick 开始准备阶段，只使用memory处理数据,和创建ctx对象
    prepare(name){
        const ctx = Ctx.new()

        const command = getCommand()

        if(command){
            ctx.command = command
            ctx.complete=function(){}
        }

        return ctx
    },
    // tick 执行阶段
    run($this,ctx){

        // run action
        // if(ctx.action in actions){
        //     return runAction.call(this)
        // }

        // 自定义逻辑
    },
    // 死亡
    deathrattle(name){
        
        // 处理没做完的任务

        // 删除memory
        deleteMemory()
    }
}

module.exports ={
    handler
}