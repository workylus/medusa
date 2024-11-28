import { model } from "@medusajs/framework/utils"
import Price from "./price"

// const tableName = "price_set"
// const PriceSetDeletedAtIndex = createPsqlIndexStatementHelper({
//   tableName: tableName,
//   columns: "deleted_at",
//   where: "deleted_at IS NOT NULL",
// })

// export const PriceSetIdPrefix = "pset"

const PriceSet = model
  .define("PriceSet", {
    id: model.id({ prefix: "pset" }).primaryKey(),
    prices: model.hasMany(() => Price, {
      mappedBy: "price_set",
    }),
  })
  .cascades({
    delete: ["prices"],
  })

// @Entity({ tableName })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class PriceSet {
// @PrimaryKey({ columnType: "text" })
// id!: string

// @OneToMany(() => Price, (price) => price.price_set, {
//   cascade: [Cascade.PERSIST, "soft-remove" as Cascade],
// })
// prices = new Collection<Rel<Price>>(this)

// @Property({
//   onCreate: () => new Date(),
//   columnType: "timestamptz",
//   defaultRaw: "now()",
// })
// created_at: Date

// @Property({
//   onCreate: () => new Date(),
//   onUpdate: () => new Date(),
//   columnType: "timestamptz",
//   defaultRaw: "now()",
// })
// updated_at: Date

// @PriceSetDeletedAtIndex.MikroORMIndex()
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null

// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, PriceSetIdPrefix)
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, PriceSetIdPrefix)
// }
// }

export default PriceSet
