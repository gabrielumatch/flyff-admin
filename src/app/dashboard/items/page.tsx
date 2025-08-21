import { ItemTable } from "@/components/item-table";

export default function ItemsPage() {
  return (
    <ItemTable
      tableName="propitem"
      title="Items Management"
      description="Manage game items, weapons, armor, and consumables"
    />
  );
}
