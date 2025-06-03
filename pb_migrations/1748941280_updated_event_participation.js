/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3485037673")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select3057528519",
    "maxSelect": 6,
    "name": "roles",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "player",
      "driver",
      "jersey washer",
      "scorekeeper",
      "shot clock operator",
      "statistician"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3485037673")

  // remove field
  collection.fields.removeById("select3057528519")

  return app.save(collection)
})
