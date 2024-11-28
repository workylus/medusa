import { model } from "@medusajs/framework/utils"
import PriceList from "./price-list"
import PriceRule from "./price-rule"
import PriceSet from "./price-set"

// const tableName = "price"

// const PricePriceSetIdIndex = createPsqlIndexStatementHelper({
//   tableName: tableName,
//   columns: "price_set_id",
//   where: "deleted_at IS NULL",
// })

// const PricePriceListIdIndex = createPsqlIndexStatementHelper({
//   tableName: tableName,
//   columns: "price_list_id",
//   where: "deleted_at IS NULL",
// })

// const PriceCurrencyCodeIndex = createPsqlIndexStatementHelper({
//   tableName: tableName,
//   columns: "currency_code",
//   where: "deleted_at IS NULL",
// })

const Price = model
  .define("Price", {
    id: model.id({ prefix: "price" }).primaryKey(),
    title: model.text().nullable(),
    currency_code: model.text(),
    amount: model.bigNumber(),
    min_quantity: model.number().nullable(),
    max_quantity: model.number().nullable(),
    rules_count: model.number().default(0).nullable(),
    price_set: model.belongsTo(() => PriceSet, {
      mappedBy: "prices",
    }),
    price_rules: model.hasMany(() => PriceRule, {
      mappedBy: "price",
    }),
    price_list: model
      .belongsTo(() => PriceList, {
        mappedBy: "prices",
      })
      .nullable(),
  })
  .cascades({
    delete: ["price_rules"],
  })
  .indexes([
    {
      on: ["price_set_id"],
      where: "deleted_at IS NULL",
    },
    {
      on: ["price_list_id"],
      where: "deleted_at IS NULL",
    },
    {
      on: ["currency_code"],
      where: "deleted_at IS NULL",
    },
  ])

// @Entity({ tableName })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class Price {
//   [OptionalProps]?: OptionalFields

// @PrimaryKey({ columnType: "text" })
// id!: string

// @Property({ columnType: "text", nullable: true })
// title: string | null = null

// @PriceCurrencyCodeIndex.MikroORMIndex()
// @Property({ columnType: "text" })
// currency_code: string

// @MikroOrmBigNumberProperty()
// amount: BigNumber | number

// @Property({ columnType: "jsonb" })
// raw_amount: Record<string, unknown>

// @Property({ columnType: "numeric", nullable: true })
// min_quantity: number | null = null

// @Property({ columnType: "numeric", nullable: true })
// max_quantity: number | null = null

// @PricePriceSetIdIndex.MikroORMIndex()
// @ManyToOne(() => PriceSet, {
//   columnType: "text",
//   mapToPk: true,
//   fieldName: "price_set_id",
//   onDelete: "cascade",
// })
// price_set_id: string

// @ManyToOne(() => PriceSet, { persist: false })
// price_set?: Rel<PriceSet>

// @Property({ columnType: "integer", default: 0 })
// rules_count: number = 0

// @OneToMany({
//   entity: () => PriceRule,
//   mappedBy: (pr) => pr.price,
//   cascade: [Cascade.PERSIST, "soft-remove" as Cascade],
// })
// price_rules = new Collection<Rel<PriceRule>>(this)

// @PricePriceListIdIndex.MikroORMIndex()
// @ManyToOne(() => PriceList, {
//   columnType: "text",
//   mapToPk: true,
//   nullable: true,
//   fieldName: "price_list_id",
//   onDelete: "cascade",
// })
// price_list_id: string | null = null

// @ManyToOne(() => PriceList, { persist: false, nullable: true })
// price_list: Rel<PriceList> | null = null

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

// @PriceDeletedAtIndex.MikroORMIndex()
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null

// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, "price")
//   this.price_set_id ??= this.price_set?.id!
//   this.price_list_id ??= this.price_list?.id!
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "price")
//   this.price_set_id ??= this.price_set?.id!
//   this.price_list_id ??= this.price_list?.id!
// }
// }

Price.name = "Price" as any
export default Price
