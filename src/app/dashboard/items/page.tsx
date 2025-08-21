"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useSupabase } from "@/components/supabase-provider";

type ItemRecord = {
  id: number;
  name: string;
  type: string;
  rarity: string;
  level: number;
  attack?: number;
  defense?: number;
  effect?: string;
  deleted_at?: string | null;
};

const ITEMS_PER_PAGE = 20;

export default function ItemsPage() {
  const { supabase } = useSupabase();

  const [items, setItems] = useState<ItemRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [rarityFilter, setRarityFilter] = useState<string>("all");
  const [minLevel, setMinLevel] = useState<number | "">("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const from = useMemo(() => (currentPage - 1) * ITEMS_PER_PAGE, [currentPage]);
  const to = useMemo(() => currentPage * ITEMS_PER_PAGE - 1, [currentPage]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("items")
          .select("*", { count: "exact" })
          .is("deleted_at", null);

        if (searchTerm) {
          query = query.ilike("name", `%${searchTerm}%`);
        }
        if (typeFilter !== "all") {
          query = query.eq("type", typeFilter);
        }
        if (rarityFilter !== "all") {
          query = query.eq("rarity", rarityFilter);
        }
        if (minLevel !== "" && !Number.isNaN(minLevel)) {
          query = query.gte("level", Number(minLevel));
        }

        const { data, error, count } = await query
          .order("name")
          .range(from, to);

        if (error) {
          console.error("Error fetching items:", error);
          setItems([]);
          setTotalRecords(0);
          setTotalPages(1);
          return;
        }

        setItems(data || []);
        const total = count || 0;
        setTotalRecords(total);
        setTotalPages(Math.max(1, Math.ceil(total / ITEMS_PER_PAGE)));
      } catch (e) {
        console.error("Unexpected error fetching items:", e);
        setItems([]);
        setTotalRecords(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [supabase, searchTerm, typeFilter, rarityFilter, minLevel, from, to]);

  const resetToFirstPage = () => setCurrentPage(1);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Items Management</h2>
            <p className="text-muted-foreground">
              Manage game items, weapons, armor, and consumables
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Search and filter items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search items..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      resetToFirstPage();
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={typeFilter}
                  onValueChange={(v) => {
                    setTypeFilter(v);
                    resetToFirstPage();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Weapon">Weapon</SelectItem>
                    <SelectItem value="Armor">Armor</SelectItem>
                    <SelectItem value="Consumable">Consumable</SelectItem>
                    <SelectItem value="Material">Material</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rarity">Rarity</Label>
                <Select
                  value={rarityFilter}
                  onValueChange={(v) => {
                    setRarityFilter(v);
                    resetToFirstPage();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All rarities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Common">Common</SelectItem>
                    <SelectItem value="Uncommon">Uncommon</SelectItem>
                    <SelectItem value="Rare">Rare</SelectItem>
                    <SelectItem value="Epic">Epic</SelectItem>
                    <SelectItem value="Legendary">Legendary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Min Level</Label>
                <Input
                  id="level"
                  type="number"
                  placeholder="0"
                  value={minLevel}
                  onChange={(e) => {
                    const v = e.target.value;
                    setMinLevel(v === "" ? "" : Number(v));
                    resetToFirstPage();
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card>
          <CardHeader>
            <CardTitle>Items ({totalRecords})</CardTitle>
            <CardDescription>
              Showing {totalRecords === 0 ? 0 : from + 1} to{" "}
              {Math.min(to + 1, totalRecords)} of {totalRecords} items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Rarity</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No items found
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === "Weapon"
                              ? "bg-red-100 text-red-800"
                              : item.type === "Armor"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.rarity === "Common"
                              ? "bg-gray-100 text-gray-800"
                              : item.rarity === "Uncommon"
                              ? "bg-green-100 text-green-800"
                              : item.rarity === "Rare"
                              ? "bg-blue-100 text-blue-800"
                              : item.rarity === "Epic"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.rarity}
                        </span>
                      </TableCell>
                      <TableCell>{item.level}</TableCell>
                      <TableCell>
                        {item.attack ? `ATK: ${item.attack}` : null}
                        {item.defense
                          ? (item.attack ? " | " : "") + `DEF: ${item.defense}`
                          : null}
                        {item.effect
                          ? (item.attack || item.defense ? " | " : "") +
                            item.effect
                          : null}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
