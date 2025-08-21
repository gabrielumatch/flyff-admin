"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { TwoLineText } from "@/components/two-line-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { useSupabase } from "./supabase-provider";
import { toast } from "sonner";
import { SkillEditModal } from "@/components/skill-edit-modal";
import { SkillAddModal } from "@/components/skill-add-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type SkillRecord = {
  ver?: string | null;
  dwid: string;
  szname?: string | null;
  dwnum?: string | null;
  dwpackmax?: string | null;
  dwitemkind1?: string | null;
  dwitemkind2?: string | null;
  dwitemkind3?: string | null;
  dwitemjob?: string | null;
  bpermanence?: string | null;
  dwuseable?: string | null;
  dwitemsex?: string | null;
  dwcost?: string | null;
  dwendurance?: string | null;
  nabrasion?: string | null;
  nhardness?: string | null;
  dwhanded?: string | null;
  dwheelh?: string | null;
  dwparts?: string | null;
  dwpartsub?: string | null;
  bpartfile?: string | null;
  dwexclusive?: string | null;
  dwbasepartsignore?: string | null;
  dwitemlv?: string | null;
  dwitemrare?: string | null;
  dwshopable?: string | null;
  blog?: string | null;
  bcharged?: string | null;
  dwlinkkindbullet?: string | null;
  dwlinkkind?: string | null;
  dwabilitymin?: string | null;
  dwabilitymax?: string | null;
  eitemtype?: string | null;
  witemeatk?: string | null;
  dwparry?: string | null;
  dwblockrating?: string | null;
  dwaddskillmin?: string | null;
  dwaddskillmax?: string | null;
  dwatkstyle?: string | null;
  dwweapontype?: string | null;
  dwitematkorder1?: string | null;
  dwitematkorder2?: string | null;
  dwitematkorder3?: string | null;
  dwitematkorder4?: string | null;
  tmcontinuouspain?: string | null;
  dwshellquantity?: string | null;
  dwrecoil?: string | null;
  dwloadingtime?: string | null;
  nadjhitrate?: string | null;
  dwattackspeed?: string | null;
  dwdmgshift?: string | null;
  dwattackrange?: string | null;
  dwprobability?: string | null;
  dwdestparam1?: string | null;
  dwdestparam2?: string | null;
  dwdestparam3?: string | null;
  nadjparamval1?: string | null;
  nadjparamval2?: string | null;
  nadjparamval3?: string | null;
  dwchgparamval1?: string | null;
  dwchgparamval2?: string | null;
  dwchgparamval3?: string | null;
  dwdestdata1?: string | null;
  dwdestdata2?: string | null;
  dwdestdata3?: string | null;
  dwactiveskill?: string | null;
  dwactiveskilllv?: string | null;
  dwactiveskillper?: string | null;
  dwreqmp?: string | null;
  dwrepfp?: string | null;
  dwreqdislv?: string | null;
  dwreskill1?: string | null;
  dwreskilllevel1?: string | null;
  dwreskill2?: string | null;
  dwreskilllevel2?: string | null;
  dwskillreadytype?: string | null;
  dwskillready?: string | null;
  dwskillrange?: string | null;
  dwsfxelemental?: string | null;
  dwsfxobj?: string | null;
  dwsfxobj2?: string | null;
  dwsfxobj3?: string | null;
  dwsfxobj4?: string | null;
  dwsfxobj5?: string | null;
  dwusemotion?: string | null;
  dwcircletime?: string | null;
  dwskilltime?: string | null;
  dwexetarget?: string | null;
  dwusechance?: string | null;
  dwspellregion?: string | null;
  dwspelltype?: string | null;
  dwreferstat1?: string | null;
  dwreferstat2?: string | null;
  dwrefertarget1?: string | null;
  dwrefertarget2?: string | null;
  dwrefervalue1?: string | null;
  dwrefervalue2?: string | null;
  dwskilltype?: string | null;
  fitemresistelecricity?: string | null;
  fitemresistfire?: string | null;
  fitemresistwind?: string | null;
  fitemresistwater?: string | null;
  fitemresistearth?: string | null;
  nevildoing?: string | null;
  dwexpertlv?: string | null;
  expertmax?: string | null;
  dwsubdefine?: string | null;
  dwexp?: string | null;
  dwcombostyle?: string | null;
  fflightspeed?: string | null;
  fflightlrangle?: string | null;
  fflighttbangle?: string | null;
  dwflightlimit?: string | null;
  dwffuelremax?: string | null;
  dwafuelremax?: string | null;
  dwfuelre?: string | null;
  dwlimitlevel1?: string | null;
  dwreflect?: string | null;
  dwsndattack1?: string | null;
  dwsndattack2?: string | null;
  szicon?: string | null;
  dwquestid?: string | null;
  sztextfile?: string | null;
  szcomment?: string | null;
  dwbuffticktype?: string | null;
};

const ALL_FIELDS: Array<keyof SkillRecord> = [
  "ver",
  "dwid",
  "szname",
  "dwnum",
  "dwpackmax",
  "dwitemkind1",
  "dwitemkind2",
  "dwitemkind3",
  "dwitemjob",
  "bpermanence",
  "dwuseable",
  "dwitemsex",
  "dwcost",
  "dwendurance",
  "nabrasion",
  "nhardness",
  "dwhanded",
  "dwheelh",
  "dwparts",
  "dwpartsub",
  "bpartfile",
  "dwexclusive",
  "dwbasepartsignore",
  "dwitemlv",
  "dwitemrare",
  "dwshopable",
  "blog",
  "bcharged",
  "dwlinkkindbullet",
  "dwlinkkind",
  "dwabilitymin",
  "dwabilitymax",
  "eitemtype",
  "witemeatk",
  "dwparry",
  "dwblockrating",
  "dwaddskillmin",
  "dwaddskillmax",
  "dwatkstyle",
  "dwweapontype",
  "dwitematkorder1",
  "dwitematkorder2",
  "dwitematkorder3",
  "dwitematkorder4",
  "tmcontinuouspain",
  "dwshellquantity",
  "dwrecoil",
  "dwloadingtime",
  "nadjhitrate",
  "dwattackspeed",
  "dwdmgshift",
  "dwattackrange",
  "dwprobability",
  "dwdestparam1",
  "dwdestparam2",
  "dwdestparam3",
  "nadjparamval1",
  "nadjparamval2",
  "nadjparamval3",
  "dwchgparamval1",
  "dwchgparamval2",
  "dwchgparamval3",
  "dwdestdata1",
  "dwdestdata2",
  "dwdestdata3",
  "dwactiveskill",
  "dwactiveskilllv",
  "dwactiveskillper",
  "dwreqmp",
  "dwrepfp",
  "dwreqdislv",
  "dwreskill1",
  "dwreskilllevel1",
  "dwreskill2",
  "dwreskilllevel2",
  "dwskillreadytype",
  "dwskillready",
  "dwskillrange",
  "dwsfxelemental",
  "dwsfxobj",
  "dwsfxobj2",
  "dwsfxobj3",
  "dwsfxobj4",
  "dwsfxobj5",
  "dwusemotion",
  "dwcircletime",
  "dwskilltime",
  "dwexetarget",
  "dwusechance",
  "dwspellregion",
  "dwspelltype",
  "dwreferstat1",
  "dwreferstat2",
  "dwrefertarget1",
  "dwrefertarget2",
  "dwrefervalue1",
  "dwrefervalue2",
  "dwskilltype",
  "fitemresistelecricity",
  "fitemresistfire",
  "fitemresistwind",
  "fitemresistwater",
  "fitemresistearth",
  "nevildoing",
  "dwexpertlv",
  "expertmax",
  "dwsubdefine",
  "dwexp",
  "dwcombostyle",
  "fflightspeed",
  "fflightlrangle",
  "fflighttbangle",
  "dwflightlimit",
  "dwffuelremax",
  "dwafuelremax",
  "dwfuelre",
  "dwlimitlevel1",
  "dwreflect",
  "dwsndattack1",
  "dwsndattack2",
  "szicon",
  "dwquestid",
  "sztextfile",
  "szcomment",
  "dwbuffticktype",
];

const MAIN_COLUMNS: Array<keyof SkillRecord> = [
  "dwid",
  "szname",
  "dwitemjob",
  "dwitemlv",
  "dwskilltype",
];

export function SkillTable({
  tableName,
  title,
  description,
}: {
  tableName: string;
  title: string;
  description: string;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [records, setRecords] = useState<SkillRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [editingRecord, setEditingRecord] = useState<SkillRecord | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const itemsPerPage = 20;
  const [nameById, setNameById] = useState<Record<string, string>>({});

  // Initialize from URL (page, q)
  useEffect(() => {
    const pageParam = Number(searchParams.get("page") || "1");
    const qParam = searchParams.get("q") || "";
    if (
      !Number.isNaN(pageParam) &&
      pageParam > 0 &&
      pageParam !== currentPage
    ) {
      setCurrentPage(pageParam);
    }
    if (qParam !== searchTerm) {
      setSearchTerm(qParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Reflect in URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", String(currentPage));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [currentPage, debouncedSearchTerm, pathname, router]);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .order("szname");

      if (debouncedSearchTerm) {
        query = query.ilike("szname", `%${debouncedSearchTerm}%`);
      }

      const { data, error, count } = await query.range(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage - 1
      );

      if (error) {
        console.error("Error fetching records:", error);
        toast.error("Failed to load skills");
        return;
      }

      const skills = (data as SkillRecord[]) || [];
      setRecords(skills);
      setTotalRecords(count || 0);
      setTotalPages(Math.max(1, Math.ceil((count || 0) / itemsPerPage)));

      // Fetch translated names by szname from propskill_translation (left join emulation)
      const ids = skills.map((s) => s.szname).filter(Boolean) as string[];
      if (ids.length > 0) {
        const { data: tdata } = await supabase
          .from("propskill_translation")
          .select("szname, lang_1_us, lang_10_pt")
          .in("szname", ids);

        if (tdata) {
          const map: Record<string, string> = {};
          for (const row of tdata as Array<{
            szname: string;
            lang_1_us?: string | null;
            lang_10_pt?: string | null;
          }>) {
            map[row.szname] = row.lang_1_us || row.lang_10_pt || "";
          }
          setNameById(map);
        } else {
          setNameById({});
        }
      } else {
        setNameById({});
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error loading skills");
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName, debouncedSearchTerm, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleEdit = (record: SkillRecord) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    fetchRecords();
  };

  const handleAddSuccess = () => {
    fetchRecords();
  };

  const handleDelete = async (dwid: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq("dwid", dwid);

      if (error) {
        console.error("Error deleting record:", error);
        toast.error("Failed to delete skill");
        return;
      }

      toast.success("Skill deleted");
      fetchRecords();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error");
    }
  };

  const displayValue = (
    record: SkillRecord,
    key: keyof SkillRecord
  ): ReactNode => {
    if (key === "szname") {
      const translated = record.szname ? nameById[record.szname] : undefined;
      const primary =
        translated && translated.trim().length > 0
          ? translated
          : record.szname ?? record.dwid;
      return <TwoLineText primary={primary} secondary={record.szname} />;
    }
    return record[key] ?? "-";
  };

  return (
    <div className="p-4">
      <div className="max-w-none mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Skill
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search</CardTitle>
            <CardDescription>Search skills by name</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills ({totalRecords})</CardTitle>
            <CardDescription>
              Showing{" "}
              {(currentPage - 1) * itemsPerPage + (totalRecords === 0 ? 0 : 1)}{" "}
              to {Math.min(currentPage * itemsPerPage, totalRecords)} of{" "}
              {totalRecords} records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {MAIN_COLUMNS.map((col) => (
                      <TableHead key={col}>{col}</TableHead>
                    ))}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={MAIN_COLUMNS.length + 1}
                        className="text-center py-8"
                      >
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : records.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={MAIN_COLUMNS.length + 1}
                        className="text-center py-8"
                      >
                        No records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record) => (
                      <TableRow key={record.dwid}>
                        {MAIN_COLUMNS.map((col) => (
                          <TableCell key={String(col)}>
                            {displayValue(record, col)}
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(record)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(record.dwid)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    {(() => {
                      const maxButtons = 5;
                      let start = Math.max(
                        1,
                        currentPage - Math.floor(maxButtons / 2)
                      );
                      let end = Math.min(totalPages, start + maxButtons - 1);
                      if (end - start + 1 < maxButtons) {
                        start = Math.max(1, end - maxButtons + 1);
                      }
                      const pages: number[] = [];
                      for (let p = start; p <= end; p++) pages.push(p);
                      return pages.map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ));
                    })()}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
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

      <SkillEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRecord(null);
        }}
        record={editingRecord}
        tableName={tableName}
        onSuccess={handleEditSuccess}
        allFields={ALL_FIELDS}
      />

      <SkillAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        tableName={tableName}
        onSuccess={handleAddSuccess}
        allFields={ALL_FIELDS}
      />
    </div>
  );
}
