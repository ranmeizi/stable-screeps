/**
 * @type {IHandler<StructureSpawn>}
 */
const handler = {
    prepare(spawn){
        // 补全memory
        console.log(`${spawn.name} say:`,'回合开始阶段')
    },
    run(spawn){
        console.log(`${spawn.name} say:`,'执行阶段')
    }
}

module.exports ={
    handler
}