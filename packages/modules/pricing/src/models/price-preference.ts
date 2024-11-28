import { model } from "@medusajs/framework/utils"

// export const uniquePreferenceRuleIndexName =
//   "IDX_price_preference_attribute_value"
// const UniquePreferenceRuleIndexStatement = createPsqlIndexStatementHelper({
//   name: uniquePreferenceRuleIndexName,
//   tableName: "price_preference",
//   columns: ["attribute", "value"],
//   unique: true,
//   where: "deleted_at IS NULL",
// })

// const DeletedAtIndex = createPsqlIndexStatementHelper({
//   tableName: "price_preference",
//   columns: "deleted_at",
//   where: "deleted_at IS NOT NULL",
// })

const PricePreference = model
  .define("PricePreference", {
    id: model.id({ prefix: "prpref" }).primaryKey(),
    attribute: model.text(),
    value: model.text().nullable(),
    is_tax_inclusive: model.boolean().default(false),
  })
  .indexes([
    {
      name: "IDX_price_preference_attribute_value",
      on: ["attribute", "value"],
      unique: true,
      where: "deleted_at IS NULL",
    },
  ])

// @Entity()
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// @UniquePreferenceRuleIndexStatement.MikroORMIndex()
// export default class PricePreference {
// @PrimaryKey({ columnType: "text" })
// id: string
// @Property({ columnType: "text" })
// attribute: string
// @Property({ columnType: "text", nullable: true })
// value: string | null = null
// @Property({ default: false })
// is_tax_inclusive: boolean
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
// @DeletedAtIndex.MikroORMIndex()
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null
// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, "prpref")
// }
// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "prpref")
// }
// }

export default PricePreference
