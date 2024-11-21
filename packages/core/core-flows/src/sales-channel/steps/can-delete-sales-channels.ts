import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

import {
  ContainerRegistrationKeys,
  Module,
  Modules,
} from "@medusajs/framework/utils"
export const canDeleteSalesChannelsStepId = "can-delete-sales-channels-step"

export const canDeleteSalesChannelsStep = createStep(
  canDeleteSalesChannelsStepId,
  async ({ ids }: { ids: string | string[] }, { container }) => {
    const salesChannelIdsToDelete = Array.isArray(ids) ? ids : [ids]

    const salesChannelsModule = await container.resolve(Modules.SALES_CHANNEL)
    const storeModule = await container.resolve(Modules.STORE)

    const stores = await storeModule.listStores(
      {},
      {
        select: ["default_sales_channel_id"],
      }
    )

    const defaultSalesChannelIds = new Set(
      stores.map((s) => s.default_sales_channel_id)
    )

    const salesChannels = await salesChannelsModule.listSalesChannels(
      { id: salesChannelIdsToDelete },
      {
        select: ["id"],
      }
    )

    // return new StepResponse(salesChannels.length > 0, salesChannels)
  }
)
