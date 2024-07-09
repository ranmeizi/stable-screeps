/**
 * ITask
 * 
 * 拥有权重，决定先去做什么事
 * 使用可序列化能保存进memory的数据，定义了一类行为模式
 * 结束条件
 */
interface ITask {
    /** 权重 */
    weight: number,
    /** 行为模式 */
    action: Action,
}

type Action<T = any> = {
    type: string,
    payload: T
}

type TaskMemory = {
    /** 当前做的事 */
    curr: ITask,
    /** 计划队列 */
    queue: ITask[]
}

type DeathHelper = {
    getMemory:() => Record<string, any>,
    deleteMemory(): void
}

/**
 * 所有单位运行顺序
 */
declare interface IHandler<T extends Creep | Structure | Room, Ctx = {}> {
    prepare?(subject: T): Ctx
    run(subject: T, ctx: Ctx)
    deathrattle?(name, helper: DeathHelper)
}

