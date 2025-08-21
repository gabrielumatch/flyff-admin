import { ItemTable } from "@/components/item-table";

export default function ItemsPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <ItemTable
          tableName="propitem"
          title="Items Management"
          description="Manage game items, weapons, armor, and consumables"
        />
      </div>
    </div>
  );
}
