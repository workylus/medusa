import { Heading } from "@medusajs/ui"
import { InventoryItemDTO } from "@medusajs/types"
import { InventoryItemRes } from "../../../../../types/api-responses"
import { ManageLocationsForm } from "./components/manage-locations-form"
import { RouteDrawer } from "../../../../../components/route-modal"
import { useInventoryItem } from "../../../../../hooks/api/inventory"
import { useParams } from "react-router-dom"
import { useStockLocations } from "../../../../../hooks/api/stock-locations"
import { useTranslation } from "react-i18next"

export const ManageLocationsDrawer = () => {
  const { id } = useParams()
  const { t } = useTranslation()

  const {
    inventory_item: inventoryItem,
    isLoading,
    isError,
    error,
  } = useInventoryItem(id!)

  const { stock_locations, isLoading: loadingLocations } = useStockLocations()

  const ready =
    !isLoading && !loadingLocations && inventoryItem && stock_locations

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <Heading>{t("inventory.manageLocations")}</Heading>
      </RouteDrawer.Header>
      {ready && (
        <ManageLocationsForm item={inventoryItem} locations={stock_locations} />
      )}
    </RouteDrawer>
  )
}
