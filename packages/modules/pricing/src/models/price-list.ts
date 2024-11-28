import {
  model,
  PriceListStatus,
  PriceListType,
} from "@medusajs/framework/utils"
import Price from "./price"
import PriceListRule from "./price-list-rule"

// type OptionalFields =
//   | "starts_at"
//   | "ends_at"
//   | DAL.SoftDeletableModelDateColumns

// const tableName = "price_list"
// const PriceListDeletedAtIndex = createPsqlIndexStatementHelper({
//   tableName: tableName,
//   columns: "deleted_at",
//   where: "deleted_at IS NOT NULL",
// })

export const PriceListIdPrefix = "plist"

const PriceList = model
  .define("PriceList", {
    id: model.id({ prefix: "plist" }).primaryKey(),
    title: model.text().searchable(),
    description: model.text().searchable(),
    status: model.enum(PriceListStatus).default(PriceListStatus.DRAFT),
    type: model.enum(PriceListType).default(PriceListType.SALE),
    starts_at: model.dateTime().nullable(),
    ends_at: model.dateTime().nullable(),
    rules_count: model.number().default(0).nullable(),
    prices: model.hasMany(() => Price, {
      mappedBy: "price_list",
    }),
    price_list_rules: model.hasMany(() => PriceListRule, {
      mappedBy: "price_list",
    }),
  })
  .cascades({
    delete: ["price_list_rules", "prices"],
  })

// @Entity({ tableName })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class PriceList {
// [OptionalProps]: OptionalFields

// @PrimaryKey({ columnType: "text" })
// id!: string

// @Searchable()
// @Property({ columnType: "text" })
// title: string

// @Searchable()
// @Property({ columnType: "text" })
// description: string

// @Enum({ items: () => PriceListStatus, default: PriceListStatus.DRAFT })
// status: PriceListStatus

// @Enum({ items: () => PriceListType, default: PriceListType.SALE })
// type: PriceListType

// @Property({
//   columnType: "timestamptz",
//   nullable: true,
// })
// starts_at: Date | null = null

// @Property({
//   columnType: "timestamptz",
//   nullable: true,
// })
// ends_at: Date | null = null

// @OneToMany(() => Price, (price) => price.price_list, {
//   cascade: [Cascade.PERSIST, "soft-remove" as Cascade],
// })
// prices = new Collection<Rel<Price>>(this)

// @OneToMany(() => PriceListRule, (pr) => pr.price_list, {
//   cascade: [Cascade.PERSIST, "soft-remove" as Cascade],
// })
// price_list_rules = new Collection<Rel<PriceListRule>>(this)

// @Property({ columnType: "integer", default: 0 })
// rules_count: number = 0

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

// @PriceListDeletedAtIndex.MikroORMIndex()
// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null

// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, PriceListIdPrefix)
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, PriceListIdPrefix)
// }
// }

export default PriceList
