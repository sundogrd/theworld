Creature
生物：包括怪物，NPC，玩家。
id
name
description
gender
race
inventory: {
  max_item: 10,
  item_ids: [],
}
equipment: {
  "hand": null
}
template_id
position: {
    area_id: "area_keke",
    x: 4,
    y: 9,
    direction: "w",
}
skills: {
  暂定
},
attributes: {

}
active(world, player, me) 决定当前行为（轮到当前creture了）
meta
