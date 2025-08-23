"use client";

import { useCallback, useEffect,  useState } from "react";
import type { ReactNode } from "react";
import { TwoLineText } from "@/components/two-line-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ItemEditModal } from "@/components/item-edit-modal";
import { ItemAddModal } from "@/components/item-add-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TPropItem } from "@/types/database";
import {
  DWITEMJOB_OPTIONS,
  DWITEMKIND1_OPTIONS,
  DWITEMKIND2_OPTIONS,
  DWITEMKIND3_OPTIONS,
  DWITEMLV_OPTIONS,
  BPERMANENCE_OPTIONS,
  DWPACKMAX_OPTIONS,
  DWUSEABLE_OPTIONS,
  DWITEMSEX_OPTIONS,
  DWENDURANCE_OPTIONS,
  NABRASION_OPTIONS,
  NMAXREPAIR_OPTIONS,
  DWHANDED_OPTIONS,
  DWFLAG_OPTIONS,
  DWPARTS_OPTIONS,
  DWPARTSUB_OPTIONS,
  BPARTSFILE_OPTIONS,
  DWEXCLUSIVE_OPTIONS,
  DWBASEPARTSIGNORE_OPTIONS,
  DWSHOPABLE_OPTIONS,
  DWITEMRARE_OPTIONS,
  NLOG_OPTIONS,
  BCHARGED_OPTIONS,
  DWLINKKINDBULLET_OPTIONS,
  DWLINKKIND_OPTIONS,
  DWABILITYMIN_OPTIONS,
  DWABILITYMAX_OPTIONS,
  EITEMTYPE_OPTIONS,
  WITEMEATK_OPTIONS,
  DWPARRY_OPTIONS,
  DWBLOCKRATING_OPTIONS,
  NADDSKILLMIN_OPTIONS,
  NADDSKILLMAX_OPTIONS,
  DWATKSTYLE_OPTIONS,
  DWWEAPONTYPE_OPTIONS,
  DWITEMATKORDER1_OPTIONS,
  DWITEMATKORDER2_OPTIONS,
  DWITEMATKORDER3_OPTIONS,
  DWITEMATKORDER4_OPTIONS,
  TMCONTINUOUSPAIN_OPTIONS,
  NSHELLQUANTITY_OPTIONS,
  DWRECOIL_OPTIONS,
  DWLOADINGTIME_OPTIONS,
  NADJHITRATE_OPTIONS,
  FATTACKSPEED_OPTIONS,
  DWDMGSHIFT_OPTIONS,
  DWATTACKRANGE_OPTIONS,
  NPROBABILITY_OPTIONS,
  DWDESTPARAM0_OPTIONS,
  DWDESTPARAM1_OPTIONS,
  DWDESTPARAM2_OPTIONS,
  NADJPARAMVAL0_OPTIONS,
  NADJPARAMVAL1_OPTIONS,
  NADJPARAMVAL2_OPTIONS,
  DWCHGPARAMVAL0_OPTIONS,
  DWCHGPARAMVAL1_OPTIONS,
  DWCHGPARAMVAL2_OPTIONS,
  NDESTDATA10_OPTIONS,
  NDESTDATA11_OPTIONS,
  NDESTDATA12_OPTIONS,
  DWACTIVESKILL_OPTIONS,
  DWACTIVESKILLLV_OPTIONS,
  DWACTIVESKILLRATE_OPTIONS,
  DWREQMP_OPTIONS,
  DWREQFP_OPTIONS,
  DWREQDISLV_OPTIONS,
  DWRESKILL1_OPTIONS,
  DWRESKILLLEVEL1_OPTIONS,
  DWRESKILL2_OPTIONS,
  DWRESKILLLEVEL2_OPTIONS,
  DWSKILLREADYTYPE_OPTIONS,
  DWSKILLREADY_OPTIONS,
  _DWSKILLRANGE_OPTIONS,
  DWSFXELEMENTAL_OPTIONS,
  DWSFXOBJ_OPTIONS,
  DWSFXOBJ2_OPTIONS,
  DWSFXOBJ3_OPTIONS,
  DWSFXOBJ4_OPTIONS,
  DWSFXOBJ5_OPTIONS,
  DWUSEMOTION_OPTIONS,
  DWCIRCLETIME_OPTIONS,
  DWSKILLTIME_OPTIONS,
  DWEXETARGET_OPTIONS,
  DWUSECHANCE_OPTIONS,
  DWSPELLREGION_OPTIONS,
  DWSPELLTYPE_OPTIONS,
  DWREFERSTAT1_OPTIONS,
  DWREFERSTAT2_OPTIONS,
  DWREFERTARGET1_OPTIONS,
  DWREFERTARGET2_OPTIONS,
  DWREFERVALUE1_OPTIONS,
  DWREFERVALUE2_OPTIONS,
  DWSKILLTYPE_OPTIONS,
  NITEMRESISTELECRICITY_OPTIONS,
  NITEMRESISTFIRE_OPTIONS,
  NITEMRESISTWIND_OPTIONS,
  NITEMRESISTWATER_OPTIONS,
  NITEMRESISTEARTH_OPTIONS,
  NEVILDOING_OPTIONS,
  DWEXPERTLV_OPTIONS,
  DWEXPERTMAX_OPTIONS,
  DWSUBDEFINE_OPTIONS,
  DWEXP_OPTIONS,
  DWCOMBOSTYLE_OPTIONS,
  FFLIGHTSPEED_OPTIONS,
  FFLIGHTLRANGLE_OPTIONS,
  FFLIGHTTBANGLE_OPTIONS,
  DWFLIGHTLIMIT_OPTIONS,
  DWFFUELREMAX_OPTIONS,
  DWAFUELREMAX_OPTIONS,
  DWFUELRE_OPTIONS,
  DWLIMITLEVEL1_OPTIONS,
  NREFLECT_OPTIONS,
  DWSNDATTACK1_OPTIONS,
  DWSNDATTACK2_OPTIONS,
  DWQUESTID_OPTIONS,
  SZTEXTFILENAME_OPTIONS,
  NMINLIMITLEVEL_OPTIONS,
  NMAXLIMITLEVEL_OPTIONS,
  NITEMGROUP_OPTIONS,
  NUSELIMITGROUP_OPTIONS,
  NMAXDUPLICATION_OPTIONS,
  NEFFECTVALUE_OPTIONS,
  NTARGETMINENCHANT_OPTIONS,
  NTARGETMAXENCHANT_OPTIONS,
  BRESETBIND_OPTIONS,
  NBINDCONDITION_OPTIONS,
  NRESETBINDCONDITION_OPTIONS,
  DWHITACTIVESKILLID_OPTIONS,
  DWHITACTIVESKILLLV_OPTIONS,
  DWHITACTIVESKILLPROB_OPTIONS,
  DWHITACTIVESKILLTARGET_OPTIONS,
  DWDAMAGEACTIVESKILLID_OPTIONS,
  DWDAMAGEACTIVESKILLLV_OPTIONS,
  DWDAMAGEACTIVESKILLPROB_OPTIONS,
  DWDAMAGEACTIVESKILLTARGET_OPTIONS,
  DWEQUIPACTIVESKILLID_OPTIONS,
  DWEQUIPACTIVESKILLLV_OPTIONS,
  DWSMELTING_OPTIONS,
  DWATTSMELTING_OPTIONS,
  DWGEMSMELTING_OPTIONS,
  DWPIERCE_OPTIONS,
} from "@/types/database";

const MAIN_COLUMNS: Array<keyof TPropItem> = [
  "dwid",
  "szname",
  "dwitemjob",
  "dwitemlv",
  "eitemtype",
  "dwitemrare",
];

export function ItemTable({
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
  const [records, setRecords] = useState<TPropItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [editingRecord, setEditingRecord] = useState<TPropItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [nameByKey, setNameByKey] = useState<Record<string, string>>({});
  const [jobFilter, setJobFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [jobOptions, setJobOptions] = useState<string[]>([]);
  const [levelOptions, setLevelOptions] = useState<string[]>([]);
  const [kind1Options, setKind1Options] = useState<string[]>([]);
  const [kind2Options, setKind2Options] = useState<string[]>([]);
  const [kind3Options, setKind3Options] = useState<string[]>([]);
  const [permanenceOptions, setPermanenceOptions] = useState<string[]>([]);
  const [packmaxOptions, setPackmaxOptions] = useState<string[]>([]);
  const [useableOptions, setUseableOptions] = useState<string[]>([]);
  const [itemsexOptions, setItemsexOptions] = useState<string[]>([]);
  const [enduranceOptions, setEnduranceOptions] = useState<string[]>([]);
  const [abrasionOptions, setAbrasionOptions] = useState<string[]>([]);
  const [maxrepairOptions, setMaxrepairOptions] = useState<string[]>([]);
  const [handedOptions, setHandedOptions] = useState<string[]>([]);
  const [flagOptions, setFlagOptions] = useState<string[]>([]);
  const [partsOptions, setPartsOptions] = useState<string[]>([]);
  const [partsubOptions, setPartsubOptions] = useState<string[]>([]);
  const [partsfileOptions, setPartsfileOptions] = useState<string[]>([]);
  const [exclusiveOptions, setExclusiveOptions] = useState<string[]>([]);
  const [basepartsignoreOptions, setBasepartsignoreOptions] = useState<string[]>([]);
  const [shopableOptions, setShopableOptions] = useState<string[]>([]);
  const [itemrareOptions, setItemrareOptions] = useState<string[]>([]);
  const [logOptions, setLogOptions] = useState<string[]>([]);
  const [chargedOptions, setChargedOptions] = useState<string[]>([]);
  const [linkkindbulletOptions, setLinkkindbulletOptions] = useState<string[]>([]);
  const [linkkindOptions, setLinkkindOptions] = useState<string[]>([]);
  const [abilityminOptions, setAbilityminOptions] = useState<string[]>([]);
  const [abilitymaxOptions, setAbilitymaxOptions] = useState<string[]>([]);
  const [itemtypeOptions, setItemtypeOptions] = useState<string[]>([]);
  const [itemeatkOptions, setItemeatkOptions] = useState<string[]>([]);
  const [parryOptions, setParryOptions] = useState<string[]>([]);
  const [blockratingOptions, setBlockratingOptions] = useState<string[]>([]);
  const [addskillminOptions, setAddskillminOptions] = useState<string[]>([]);
  const [addskillmaxOptions, setAddskillmaxOptions] = useState<string[]>([]);
  const [atkstyleOptions, setAtkstyleOptions] = useState<string[]>([]);
  const [weapontypeOptions, setWeapontypeOptions] = useState<string[]>([]);
  const [itematkorder1Options, setItematkorder1Options] = useState<string[]>([]);
  const [itematkorder2Options, setItematkorder2Options] = useState<string[]>([]);
  const [itematkorder3Options, setItematkorder3Options] = useState<string[]>([]);
  const [itematkorder4Options, setItematkorder4Options] = useState<string[]>([]);
  const [continuouspainOptions, setContinuouspainOptions] = useState<string[]>([]);
  const [shellquantityOptions, setShellquantityOptions] = useState<string[]>([]);
  const [recoilOptions, setRecoilOptions] = useState<string[]>([]);
  const [loadingtimeOptions, setLoadingtimeOptions] = useState<string[]>([]);
  const [adjhitrateOptions, setAdjhitrateOptions] = useState<string[]>([]);
  const [attackspeedOptions, setAttackspeedOptions] = useState<string[]>([]);
  const [dmgshiftOptions, setDmgshiftOptions] = useState<string[]>([]);
  const [attackrangeOptions, setAttackrangeOptions] = useState<string[]>([]);
  const [probabilityOptions, setProbabilityOptions] = useState<string[]>([]);
  const [destparam0Options, setDestparam0Options] = useState<string[]>([]);
  const [destparam1Options, setDestparam1Options] = useState<string[]>([]);
  const [destparam2Options, setDestparam2Options] = useState<string[]>([]);
  const [adjparamval0Options, setAdjparamval0Options] = useState<string[]>([]);
  const [adjparamval1Options, setAdjparamval1Options] = useState<string[]>([]);
  const [adjparamval2Options, setAdjparamval2Options] = useState<string[]>([]);
  const [chgparamval0Options, setChgparamval0Options] = useState<string[]>([]);
  const [chgparamval1Options, setChgparamval1Options] = useState<string[]>([]);
  const [chgparamval2Options, setChgparamval2Options] = useState<string[]>([]);
  const [destdata10Options, setDestdata10Options] = useState<string[]>([]);
  const [destdata11Options, setDestdata11Options] = useState<string[]>([]);
  const [destdata12Options, setDestdata12Options] = useState<string[]>([]);
  const [activeskillOptions, setActiveskillOptions] = useState<string[]>([]);
  const [activeskilllvOptions, setActiveskilllvOptions] = useState<string[]>([]);
  const [activeskillrateOptions, setActiveskillrateOptions] = useState<string[]>([]);
  const [reqmpOptions, setReqmpOptions] = useState<string[]>([]);
  const [reqfpOptions, setReqfpOptions] = useState<string[]>([]);
  const [reqdislvOptions, setReqdislvOptions] = useState<string[]>([]);
  const [reskill1Options, setReskill1Options] = useState<string[]>([]);
  const [reskilllevel1Options, setReskilllevel1Options] = useState<string[]>([]);
  const [reskill2Options, setReskill2Options] = useState<string[]>([]);
  const [reskilllevel2Options, setReskilllevel2Options] = useState<string[]>([]);
  const [skillreadytypeOptions, setSkillreadytypeOptions] = useState<string[]>([]);
  const [skillreadyOptions, setSkillreadyOptions] = useState<string[]>([]);
  const [skillrangeOptions, setSkillrangeOptions] = useState<string[]>([]);
  const [sfxelementalOptions, setSfxelementalOptions] = useState<string[]>([]);
  const [sfxobjOptions, setSfxobjOptions] = useState<string[]>([]);
  const [sfxobj2Options, setSfxobj2Options] = useState<string[]>([]);
  const [sfxobj3Options, setSfxobj3Options] = useState<string[]>([]);
  const [sfxobj4Options, setSfxobj4Options] = useState<string[]>([]);
  const [sfxobj5Options, setSfxobj5Options] = useState<string[]>([]);
  const [usemotionOptions, setUsemotionOptions] = useState<string[]>([]);
  const [circletimeOptions, setCircletimeOptions] = useState<string[]>([]);
  const [skilltimeOptions, setSkilltimeOptions] = useState<string[]>([]);
  const [exetargetOptions, setExetargetOptions] = useState<string[]>([]);
  const [usechanceOptions, setUsechanceOptions] = useState<string[]>([]);
  const [spellregionOptions, setSpellregionOptions] = useState<string[]>([]);
  const [spelltypeOptions, setSpelltypeOptions] = useState<string[]>([]);
  const [referstat1Options, setReferstat1Options] = useState<string[]>([]);
  const [referstat2Options, setReferstat2Options] = useState<string[]>([]);
  const [refertarget1Options, setRefertarget1Options] = useState<string[]>([]);
  const [refertarget2Options, setRefertarget2Options] = useState<string[]>([]);
  const [refervalue1Options, setRefervalue1Options] = useState<string[]>([]);
  const [refervalue2Options, setRefervalue2Options] = useState<string[]>([]);
  const [skilltypeOptions, setSkilltypeOptions] = useState<string[]>([]);
  const [itemresistelecricityOptions, setItemresistelecricityOptions] = useState<string[]>([]);
  const [itemresistfireOptions, setItemresistfireOptions] = useState<string[]>([]);
  const [itemresistwindOptions, setItemresistwindOptions] = useState<string[]>([]);
  const [itemresistwaterOptions, setItemresistwaterOptions] = useState<string[]>([]);
  const [itemresistearthOptions, setItemresistearthOptions] = useState<string[]>([]);
  const [evildoingOptions, setEvildoingOptions] = useState<string[]>([]);
  const [expertlvOptions, setExpertlvOptions] = useState<string[]>([]);
  const [expertmaxOptions, setExpertmaxOptions] = useState<string[]>([]);
  const [subdefineOptions, setSubdefineOptions] = useState<string[]>([]);
  const [expOptions, setExpOptions] = useState<string[]>([]);
  const [combostyleOptions, setCombostyleOptions] = useState<string[]>([]);
  const [flightspeedOptions, setFlightspeedOptions] = useState<string[]>([]);
  const [flightlrangleOptions, setFlightlrangleOptions] = useState<string[]>([]);
  const [flighttbangleOptions, setFlighttbangleOptions] = useState<string[]>([]);
  const [flightlimitOptions, setFlightlimitOptions] = useState<string[]>([]);
  const [ffuelremaxOptions, setFfuelremaxOptions] = useState<string[]>([]);
  const [afuelremaxOptions, setAfuelremaxOptions] = useState<string[]>([]);
  const [fuelreOptions, setFuelreOptions] = useState<string[]>([]);
  const [limitlevel1Options, setLimitlevel1Options] = useState<string[]>([]);
  const [reflectOptions, setReflectOptions] = useState<string[]>([]);
  const [sndattack1Options, setSndattack1Options] = useState<string[]>([]);
  const [sndattack2Options, setSndattack2Options] = useState<string[]>([]);
  const [questidOptions, setQuestidOptions] = useState<string[]>([]);
  const [textfilenameOptions, setTextfilenameOptions] = useState<string[]>([]);
  const [minlimitlevelOptions, setMinlimitlevelOptions] = useState<string[]>([]);
  const [maxlimitlevelOptions, setMaxlimitlevelOptions] = useState<string[]>([]);
  const [itemgroupOptions, setItemgroupOptions] = useState<string[]>([]);
  const [uselimitgroupOptions, setUselimitgroupOptions] = useState<string[]>([]);
  const [maxduplicationOptions, setMaxduplicationOptions] = useState<string[]>([]);
  const [effectvalueOptions, setEffectvalueOptions] = useState<string[]>([]);
  const [targetminenchantOptions, setTargetminenchantOptions] = useState<string[]>([]);
  const [targetmaxenchantOptions, setTargetmaxenchantOptions] = useState<string[]>([]);
  const [resetbindOptions, setResetbindOptions] = useState<string[]>([]);
  const [bindconditionOptions, setBindconditionOptions] = useState<string[]>([]);
  const [resetbindconditionOptions, setResetbindconditionOptions] = useState<string[]>([]);
  const [hitactiveskillidOptions, setHitactiveskillidOptions] = useState<string[]>([]);
  const [hitactiveskilllvOptions, setHitactiveskilllvOptions] = useState<string[]>([]);
  const [hitactiveskillprobOptions, setHitactiveskillprobOptions] = useState<string[]>([]);
  const [hitactiveskilltargetOptions, setHitactiveskilltargetOptions] = useState<string[]>([]);
  const [damageactiveskillidOptions, setDamageactiveskillidOptions] = useState<string[]>([]);
  const [damageactiveskilllvOptions, setDamageactiveskilllvOptions] = useState<string[]>([]);
  const [damageactiveskillprobOptions, setDamageactiveskillprobOptions] = useState<string[]>([]);
  const [damageactiveskilltargetOptions, setDamageactiveskilltargetOptions] = useState<string[]>([]);
  const [equipactiveskillidOptions, setEquipactiveskillidOptions] = useState<string[]>([]);
  const [equipactiveskilllvOptions, setEquipactiveskilllvOptions] = useState<string[]>([]);
  const [smeltingOptions, setSmeltingOptions] = useState<string[]>([]);
  const [attsmeltingOptions, setAttsmeltingOptions] = useState<string[]>([]);
  const [gemsmeltingOptions, setGemsmeltingOptions] = useState<string[]>([]);
  const [pierceOptions, setPierceOptions] = useState<string[]>([]);
  const selectOptionsByField = {
    dwitemjob: jobOptions,
    dwitemlv: levelOptions,
    dwitemkind1: kind1Options,
    dwitemkind2: kind2Options,
    dwitemkind3: kind3Options,
    bpermanence: permanenceOptions,
    dwpackmax: packmaxOptions,
    dwuseable: useableOptions,
    dwitemsex: itemsexOptions,
    dwendurance: enduranceOptions,
    nabrasion: abrasionOptions,
    nmaxrepair: maxrepairOptions,
    dwhanded: handedOptions,
    dwflag: flagOptions,
    dwparts: partsOptions,
    dwpartsub: partsubOptions,
    bpartsfile: partsfileOptions,
    dwexclusive: exclusiveOptions,
    dwbasepartsignore: basepartsignoreOptions,
    dwshopable: shopableOptions,
    dwitemrare: itemrareOptions,
    nlog: logOptions,
    bcharged: chargedOptions,
    dwlinkkindbullet: linkkindbulletOptions,
    dwlinkkind: linkkindOptions,
    dwabilitymin: abilityminOptions,
    dwabilitymax: abilitymaxOptions,
    eitemtype: itemtypeOptions,
    witemeatk: itemeatkOptions,
    dwparry: parryOptions,
    dwblockrating: blockratingOptions,
    naddskillmin: addskillminOptions,
    naddskillmax: addskillmaxOptions,
    dwatkstyle: atkstyleOptions,
    dwweapontype: weapontypeOptions,
    dwitematkorder1: itematkorder1Options,
    dwitematkorder2: itematkorder2Options,
    dwitematkorder3: itematkorder3Options,
    dwitematkorder4: itematkorder4Options,
    tmcontinuouspain: continuouspainOptions,
    nshellquantity: shellquantityOptions,
    dwrecoil: recoilOptions,
    dwloadingtime: loadingtimeOptions,
    nadjhitrate: adjhitrateOptions,
    fattackspeed: attackspeedOptions,
    dwdmgshift: dmgshiftOptions,
    dwattackrange: attackrangeOptions,
    nprobability: probabilityOptions,
    dwdestparam0: destparam0Options,
    dwdestparam1: destparam1Options,
    dwdestparam2: destparam2Options,
    nadjparamval0: adjparamval0Options,
    nadjparamval1: adjparamval1Options,
    nadjparamval2: adjparamval2Options,
    dwchgparamval0: chgparamval0Options,
    dwchgparamval1: chgparamval1Options,
    dwchgparamval2: chgparamval2Options,
    ndestdata10: destdata10Options,
    ndestdata11: destdata11Options,
    ndestdata12: destdata12Options,
    dwactiveskill: activeskillOptions,
    dwactiveskilllv: activeskilllvOptions,
    dwactiveskillrate: activeskillrateOptions,
    dwreqmp: reqmpOptions,
    dwreqfp: reqfpOptions,
    dwreqdislv: reqdislvOptions,
    dwreskill1: reskill1Options,
    dwreskilllevel1: reskilllevel1Options,
    dwreskill2: reskill2Options,
    dwreskilllevel2: reskilllevel2Options,
    dwskillreadytype: skillreadytypeOptions,
    dwskillready: skillreadyOptions,
    _dwskillrange: skillrangeOptions,
    dwsfxelemental: sfxelementalOptions,
    dwsfxobj: sfxobjOptions,
    dwsfxobj2: sfxobj2Options,
    dwsfxobj3: sfxobj3Options,
    dwsfxobj4: sfxobj4Options,
    dwsfxobj5: sfxobj5Options,
    dwusemotion: usemotionOptions,
    dwcircletime: circletimeOptions,
    dwskilltime: skilltimeOptions,
    dwexetarget: exetargetOptions,
    dwusechance: usechanceOptions,
    dwspellregion: spellregionOptions,
    dwspelltype: spelltypeOptions,
    dwreferstat1: referstat1Options,
    dwreferstat2: referstat2Options,
    dwrefertarget1: refertarget1Options,
    dwrefertarget2: refertarget2Options,
    dwrefervalue1: refervalue1Options,
    dwrefervalue2: refervalue2Options,
    dwskilltype: skilltypeOptions,
    nitemresistelecricity: itemresistelecricityOptions,
    nitemresistfire: itemresistfireOptions,
    nitemresistwind: itemresistwindOptions,
    nitemresistwater: itemresistwaterOptions,
    nitemresistearth: itemresistearthOptions,
    nevildoing: evildoingOptions,
    dwexpertlv: expertlvOptions,
    dwexpertmax: expertmaxOptions,
    dwsubdefine: subdefineOptions,
    dwexp: expOptions,
    dwcombostyle: combostyleOptions,
    fflightspeed: flightspeedOptions,
    fflightlrangle: flightlrangleOptions,
    fflighttbangle: flighttbangleOptions,
    dwflightlimit: flightlimitOptions,
    dwffuelremax: ffuelremaxOptions,
    dwafuelremax: afuelremaxOptions,
    dwfuelre: fuelreOptions,
    dwlimitlevel1: limitlevel1Options,
    nreflect: reflectOptions,
    dwsndattack1: sndattack1Options,
    dwsndattack2: sndattack2Options,
    dwquestid: questidOptions,
    sztextfilename: textfilenameOptions,
    nminlimitlevel: minlimitlevelOptions,
    nmaxlimitlevel: maxlimitlevelOptions,
    nitemgroup: itemgroupOptions,
    nuselimitgroup: uselimitgroupOptions,
    nmaxduplication: maxduplicationOptions,
    neffectvalue: effectvalueOptions,
    ntargetminenchant: targetminenchantOptions,
    ntargetmaxenchant: targetmaxenchantOptions,
    bresetbind: resetbindOptions,
    nbindcondition: bindconditionOptions,
    nresetbindcondition: resetbindconditionOptions,
    dwhitactiveskillid: hitactiveskillidOptions,
    dwhitactiveskilllv: hitactiveskilllvOptions,
    dwhitactiveskillprob: hitactiveskillprobOptions,
    dwhitactiveskilltarget: hitactiveskilltargetOptions,
    dwdamageactiveskillid: damageactiveskillidOptions,
    dwdamageactiveskilllv: damageactiveskilllvOptions,
    dwdamageactiveskillprob: damageactiveskillprobOptions,
    dwdamageactiveskilltarget: damageactiveskilltargetOptions,
    dwequipactiveskillid: equipactiveskillidOptions,
    dwequipactiveskilllv: equipactiveskilllvOptions,
    dwsmelting: smeltingOptions,
    dwattsmelting: attsmeltingOptions,
    dwgemsmelting: gemsmeltingOptions,
    dwpierce: pierceOptions,
  } as Record<string, string[]>;
  const selectPlaceholdersByField = {
    dwitemjob: "Select job",
    dwitemlv: "Select level",
    dwitemkind1: "Select kind1",
    dwitemkind2: "Select kind2",
    dwitemkind3: "Select kind3",
    bpermanence: "Select permanence",
    dwpackmax: "Select pack max",
    dwuseable: "Select useable",
    dwitemsex: "Select item sex",
    dwendurance: "Select endurance",
    nabrasion: "Select abrasion",
    nmaxrepair: "Select max repair",
    dwhanded: "Select handed",
    dwflag: "Select flag",
    dwparts: "Select parts",
    dwpartsub: "Select part sub",
    bpartsfile: "Select parts file",
    dwexclusive: "Select exclusive",
    dwbasepartsignore: "Select base parts ignore",
    dwshopable: "Select shopable",
    dwitemrare: "Select item rare",
    nlog: "Select log",
    bcharged: "Select charged",
    dwlinkkindbullet: "Select link kind bullet",
    dwlinkkind: "Select link kind",
    dwabilitymin: "Select ability min",
    dwabilitymax: "Select ability max",
    eitemtype: "Select item type",
    witemeatk: "Select item eatk",
    dwparry: "Select parry",
    dwblockrating: "Select block rating",
    naddskillmin: "Select add skill min",
    naddskillmax: "Select add skill max",
    dwatkstyle: "Select attack style",
    dwweapontype: "Select weapon type",
    dwitematkorder1: "Select item attack order 1",
    dwitematkorder2: "Select item attack order 2",
    dwitematkorder3: "Select item attack order 3",
    dwitematkorder4: "Select item attack order 4",
    tmcontinuouspain: "Select continuous pain",
    nshellquantity: "Select shell quantity",
    dwrecoil: "Select recoil",
    dwloadingtime: "Select loading time",
    nadjhitrate: "Select adjusted hit rate",
    fattackspeed: "Select attack speed",
    dwdmgshift: "Select damage shift",
    dwattackrange: "Select attack range",
    nprobability: "Select probability",
    dwdestparam0: "Select destination parameter 0",
    dwdestparam1: "Select destination parameter 1",
    dwdestparam2: "Select destination parameter 2",
    nadjparamval0: "Select adjusted parameter value 0",
    nadjparamval1: "Select adjusted parameter value 1",
    nadjparamval2: "Select adjusted parameter value 2",
    dwchgparamval0: "Select change parameter value 0",
    dwchgparamval1: "Select change parameter value 1",
    dwchgparamval2: "Select change parameter value 2",
    ndestdata10: "Select destination data 10",
    ndestdata11: "Select destination data 11",
    ndestdata12: "Select destination data 12",
    dwactiveskill: "Select active skill",
    dwactiveskilllv: "Select active skill level",
    dwactiveskillrate: "Select active skill rate",
    dwreqmp: "Select required MP",
    dwreqfp: "Select required FP",
    dwreqdislv: "Select required discipline level",
    dwreskill1: "Select required skill 1",
    dwreskilllevel1: "Select required skill level 1",
    dwreskill2: "Select required skill 2",
    dwreskilllevel2: "Select required skill level 2",
    dwskillreadytype: "Select skill ready type",
    dwskillready: "Select skill ready",
    _dwskillrange: "Select skill range",
    dwsfxelemental: "Select SFX elemental",
    dwsfxobj: "Select SFX object",
    dwsfxobj2: "Select SFX object 2",
    dwsfxobj3: "Select SFX object 3",
    dwsfxobj4: "Select SFX object 4",
    dwsfxobj5: "Select SFX object 5",
    dwusemotion: "Select use motion",
    dwcircletime: "Select circle time",
    dwskilltime: "Select skill time",
    dwexetarget: "Select execute target",
    dwusechance: "Select use chance",
    dwspellregion: "Select spell region",
    dwspelltype: "Select spell type",
    dwreferstat1: "Select refer stat 1",
    dwreferstat2: "Select refer stat 2",
    dwrefertarget1: "Select refer target 1",
    dwrefertarget2: "Select refer target 2",
    dwrefervalue1: "Select refer value 1",
    dwrefervalue2: "Select refer value 2",
    dwskilltype: "Select skill type",
    nitemresistelecricity: "Select item resist electricity",
    nitemresistfire: "Select item resist fire",
    nitemresistwind: "Select item resist wind",
    nitemresistwater: "Select item resist water",
    nitemresistearth: "Select item resist earth",
    nevildoing: "Select evil doing",
    dwexpertlv: "Select expert level",
    dwexpertmax: "Select expert max",
    dwsubdefine: "Select sub define",
    dwexp: "Select exp",
    dwcombostyle: "Select combo style",
    fflightspeed: "Select flight speed",
    fflightlrangle: "Select flight LR angle",
    fflighttbangle: "Select flight TB angle",
    dwflightlimit: "Select flight limit",
    dwffuelremax: "Select FF fuel re max",
    dwafuelremax: "Select AF fuel re max",
    dwfuelre: "Select fuel re",
    dwlimitlevel1: "Select limit level 1",
    nreflect: "Select reflect",
    dwsndattack1: "Select sound attack 1",
    dwsndattack2: "Select sound attack 2",
    dwquestid: "Select quest ID",
    sztextfilename: "Select text filename",
    nminlimitlevel: "Select min limit level",
    nmaxlimitlevel: "Select max limit level",
    nitemgroup: "Select item group",
    nuselimitgroup: "Select use limit group",
    nmaxduplication: "Select max duplication",
    neffectvalue: "Select effect value",
    ntargetminenchant: "Select target min enchant",
    ntargetmaxenchant: "Select target max enchant",
    bresetbind: "Select reset bind",
    nbindcondition: "Select bind condition",
    nresetbindcondition: "Select reset bind condition",
    dwhitactiveskillid: "Select hit active skill ID",
    dwhitactiveskilllv: "Select hit active skill level",
    dwhitactiveskillprob: "Select hit active skill probability",
    dwhitactiveskilltarget: "Select hit active skill target",
    dwdamageactiveskillid: "Select damage active skill ID",
    dwdamageactiveskilllv: "Select damage active skill level",
    dwdamageactiveskillprob: "Select damage active skill probability",
    dwdamageactiveskilltarget: "Select damage active skill target",
    dwequipactiveskillid: "Select equip active skill ID",
    dwequipactiveskilllv: "Select equip active skill level",
    dwsmelting: "Select smelting",
    dwattsmelting: "Select att smelting",
    dwgemsmelting: "Select gem smelting",
    dwpierce: "Select pierce",
  } as Record<string, string>;
  const itemsPerPage = 20;

  // From URL
  useEffect(() => {
    const pageParam = Number(searchParams.get("page") || "1");
    const qParam = searchParams.get("q") || "";
    const jobParam = searchParams.get("job") || "all";
    const lvParam = searchParams.get("lv") || "all";
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
    if (jobParam !== jobFilter) setJobFilter(jobParam);
    if (lvParam !== levelFilter) setLevelFilter(lvParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearchTerm(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Reflect URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", String(currentPage));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    if (jobFilter !== "all") params.set("job", jobFilter);
    if (levelFilter !== "all") params.set("lv", levelFilter);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [
    currentPage,
    debouncedSearchTerm,
    jobFilter,
    levelFilter,
    pathname,
    router,
  ]);

  // Load filter options once (generic by column)
  useEffect(() => {
    // Use static options instead of fetching from database
    setJobOptions(DWITEMJOB_OPTIONS);
    setKind1Options(DWITEMKIND1_OPTIONS);
    setKind2Options(DWITEMKIND2_OPTIONS);
    setKind3Options(DWITEMKIND3_OPTIONS);
    setLevelOptions(DWITEMLV_OPTIONS);
    setPermanenceOptions(BPERMANENCE_OPTIONS);
    setPackmaxOptions(DWPACKMAX_OPTIONS);
    setUseableOptions(DWUSEABLE_OPTIONS);
    setItemsexOptions(DWITEMSEX_OPTIONS);
    setEnduranceOptions(DWENDURANCE_OPTIONS);
    setAbrasionOptions(NABRASION_OPTIONS);
    setMaxrepairOptions(NMAXREPAIR_OPTIONS);
    setHandedOptions(DWHANDED_OPTIONS);
    setFlagOptions(DWFLAG_OPTIONS);
    setPartsOptions(DWPARTS_OPTIONS);
    setPartsubOptions(DWPARTSUB_OPTIONS);
    setPartsfileOptions(BPARTSFILE_OPTIONS);
    setExclusiveOptions(DWEXCLUSIVE_OPTIONS);
    setBasepartsignoreOptions(DWBASEPARTSIGNORE_OPTIONS);
    setShopableOptions(DWSHOPABLE_OPTIONS);
    setItemrareOptions(DWITEMRARE_OPTIONS);
    setLogOptions(NLOG_OPTIONS);
    setChargedOptions(BCHARGED_OPTIONS);
    setLinkkindbulletOptions(DWLINKKINDBULLET_OPTIONS);
    setLinkkindOptions(DWLINKKIND_OPTIONS);
    setAbilityminOptions(DWABILITYMIN_OPTIONS);
    setAbilitymaxOptions(DWABILITYMAX_OPTIONS);
    setItemtypeOptions(EITEMTYPE_OPTIONS);
    setItemeatkOptions(WITEMEATK_OPTIONS);
    setParryOptions(DWPARRY_OPTIONS);
    setBlockratingOptions(DWBLOCKRATING_OPTIONS);
    setAddskillminOptions(NADDSKILLMIN_OPTIONS);
    setAddskillmaxOptions(NADDSKILLMAX_OPTIONS);
    setAtkstyleOptions(DWATKSTYLE_OPTIONS);
    setWeapontypeOptions(DWWEAPONTYPE_OPTIONS);
    setItematkorder1Options(DWITEMATKORDER1_OPTIONS);
    setItematkorder2Options(DWITEMATKORDER2_OPTIONS);
    setItematkorder3Options(DWITEMATKORDER3_OPTIONS);
    setItematkorder4Options(DWITEMATKORDER4_OPTIONS);
    setContinuouspainOptions(TMCONTINUOUSPAIN_OPTIONS);
    setShellquantityOptions(NSHELLQUANTITY_OPTIONS);
    setRecoilOptions(DWRECOIL_OPTIONS);
    setLoadingtimeOptions(DWLOADINGTIME_OPTIONS);
    setAdjhitrateOptions(NADJHITRATE_OPTIONS);
    setAttackspeedOptions(FATTACKSPEED_OPTIONS);
    setDmgshiftOptions(DWDMGSHIFT_OPTIONS);
    setAttackrangeOptions(DWATTACKRANGE_OPTIONS);
    setProbabilityOptions(NPROBABILITY_OPTIONS);
    setDestparam0Options(DWDESTPARAM0_OPTIONS);
    setDestparam1Options(DWDESTPARAM1_OPTIONS);
    setDestparam2Options(DWDESTPARAM2_OPTIONS);
    setAdjparamval0Options(NADJPARAMVAL0_OPTIONS);
    setAdjparamval1Options(NADJPARAMVAL1_OPTIONS);
    setAdjparamval2Options(NADJPARAMVAL2_OPTIONS);
    setChgparamval0Options(DWCHGPARAMVAL0_OPTIONS);
    setChgparamval1Options(DWCHGPARAMVAL1_OPTIONS);
    setChgparamval2Options(DWCHGPARAMVAL2_OPTIONS);
    setDestdata10Options(NDESTDATA10_OPTIONS);
    setDestdata11Options(NDESTDATA11_OPTIONS);
    setDestdata12Options(NDESTDATA12_OPTIONS);
    setActiveskillOptions(DWACTIVESKILL_OPTIONS);
    setActiveskilllvOptions(DWACTIVESKILLLV_OPTIONS);
    setActiveskillrateOptions(DWACTIVESKILLRATE_OPTIONS);
    setReqmpOptions(DWREQMP_OPTIONS);
    setReqfpOptions(DWREQFP_OPTIONS);
    setReqdislvOptions(DWREQDISLV_OPTIONS);
    setReskill1Options(DWRESKILL1_OPTIONS);
    setReskilllevel1Options(DWRESKILLLEVEL1_OPTIONS);
    setReskill2Options(DWRESKILL2_OPTIONS);
    setReskilllevel2Options(DWRESKILLLEVEL2_OPTIONS);
    setSkillreadytypeOptions(DWSKILLREADYTYPE_OPTIONS);
    setSkillreadyOptions(DWSKILLREADY_OPTIONS);
    setSkillrangeOptions(_DWSKILLRANGE_OPTIONS);
    setSfxelementalOptions(DWSFXELEMENTAL_OPTIONS);
    setSfxobjOptions(DWSFXOBJ_OPTIONS);
    setSfxobj2Options(DWSFXOBJ2_OPTIONS);
    setSfxobj3Options(DWSFXOBJ3_OPTIONS);
    setSfxobj4Options(DWSFXOBJ4_OPTIONS);
    setSfxobj5Options(DWSFXOBJ5_OPTIONS);
    setUsemotionOptions(DWUSEMOTION_OPTIONS);
    setCircletimeOptions(DWCIRCLETIME_OPTIONS);
    setSkilltimeOptions(DWSKILLTIME_OPTIONS);
    setExetargetOptions(DWEXETARGET_OPTIONS);
    setUsechanceOptions(DWUSECHANCE_OPTIONS);
    setSpellregionOptions(DWSPELLREGION_OPTIONS);
    setSpelltypeOptions(DWSPELLTYPE_OPTIONS);
    setReferstat1Options(DWREFERSTAT1_OPTIONS);
    setReferstat2Options(DWREFERSTAT2_OPTIONS);
    setRefertarget1Options(DWREFERTARGET1_OPTIONS);
    setRefertarget2Options(DWREFERTARGET2_OPTIONS);
    setRefervalue1Options(DWREFERVALUE1_OPTIONS);
    setRefervalue2Options(DWREFERVALUE2_OPTIONS);
    setSkilltypeOptions(DWSKILLTYPE_OPTIONS);
    setItemresistelecricityOptions(NITEMRESISTELECRICITY_OPTIONS);
    setItemresistfireOptions(NITEMRESISTFIRE_OPTIONS);
    setItemresistwindOptions(NITEMRESISTWIND_OPTIONS);
    setItemresistwaterOptions(NITEMRESISTWATER_OPTIONS);
    setItemresistearthOptions(NITEMRESISTEARTH_OPTIONS);
    setEvildoingOptions(NEVILDOING_OPTIONS);
    setExpertlvOptions(DWEXPERTLV_OPTIONS);
    setExpertmaxOptions(DWEXPERTMAX_OPTIONS);
    setSubdefineOptions(DWSUBDEFINE_OPTIONS);
    setExpOptions(DWEXP_OPTIONS);
    setCombostyleOptions(DWCOMBOSTYLE_OPTIONS);
    setFlightspeedOptions(FFLIGHTSPEED_OPTIONS);
    setFlightlrangleOptions(FFLIGHTLRANGLE_OPTIONS);
    setFlighttbangleOptions(FFLIGHTTBANGLE_OPTIONS);
    setFlightlimitOptions(DWFLIGHTLIMIT_OPTIONS);
    setFfuelremaxOptions(DWFFUELREMAX_OPTIONS);
    setAfuelremaxOptions(DWAFUELREMAX_OPTIONS);
    setFuelreOptions(DWFUELRE_OPTIONS);
    setLimitlevel1Options(DWLIMITLEVEL1_OPTIONS);
    setReflectOptions(NREFLECT_OPTIONS);
    setSndattack1Options(DWSNDATTACK1_OPTIONS);
    setSndattack2Options(DWSNDATTACK2_OPTIONS);
    setQuestidOptions(DWQUESTID_OPTIONS);
    setTextfilenameOptions(SZTEXTFILENAME_OPTIONS);
    setMinlimitlevelOptions(NMINLIMITLEVEL_OPTIONS);
    setMaxlimitlevelOptions(NMAXLIMITLEVEL_OPTIONS);
    setItemgroupOptions(NITEMGROUP_OPTIONS);
    setUselimitgroupOptions(NUSELIMITGROUP_OPTIONS);
    setMaxduplicationOptions(NMAXDUPLICATION_OPTIONS);
    setEffectvalueOptions(NEFFECTVALUE_OPTIONS);
    setTargetminenchantOptions(NTARGETMINENCHANT_OPTIONS);
    setTargetmaxenchantOptions(NTARGETMAXENCHANT_OPTIONS);
    setResetbindOptions(BRESETBIND_OPTIONS);
    setBindconditionOptions(NBINDCONDITION_OPTIONS);
    setResetbindconditionOptions(NRESETBINDCONDITION_OPTIONS);
    setHitactiveskillidOptions(DWHITACTIVESKILLID_OPTIONS);
    setHitactiveskilllvOptions(DWHITACTIVESKILLLV_OPTIONS);
    setHitactiveskillprobOptions(DWHITACTIVESKILLPROB_OPTIONS);
    setHitactiveskilltargetOptions(DWHITACTIVESKILLTARGET_OPTIONS);
    setDamageactiveskillidOptions(DWDAMAGEACTIVESKILLID_OPTIONS);
    setDamageactiveskilllvOptions(DWDAMAGEACTIVESKILLLV_OPTIONS);
    setDamageactiveskillprobOptions(DWDAMAGEACTIVESKILLPROB_OPTIONS);
    setDamageactiveskilltargetOptions(DWDAMAGEACTIVESKILLTARGET_OPTIONS);
    setEquipactiveskillidOptions(DWEQUIPACTIVESKILLID_OPTIONS);
    setEquipactiveskilllvOptions(DWEQUIPACTIVESKILLLV_OPTIONS);
    setSmeltingOptions(DWSMELTING_OPTIONS);
    setAttsmeltingOptions(DWATTSMELTING_OPTIONS);
    setGemsmeltingOptions(DWGEMSMELTING_OPTIONS);
    setPierceOptions(DWPIERCE_OPTIONS);
  }, []);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .is("deleted_at", null)
        .order("szname");

      // Extend search to translations (lang_1_us, lang_10_pt)
      if (debouncedSearchTerm) {
        const term = debouncedSearchTerm;
        // Find matching sznames from translation table
        const { data: trows } = await supabase
          .from("propitem_translation")
          .select("szname")
          .or(`lang_1_us.ilike.%${term}%,lang_10_pt.ilike.%${term}%`);

        // Find matching sznames by raw name
        const { data: nrows } = await supabase
          .from(tableName)
          .select("szname")
          .or(
            `szname.ilike.%${term}%,dwitemjob.ilike.%${term}%,dwitemlv.ilike.%${term}%`
          );

        const keySet = new Set<string>();
        for (const r of (trows || []) as Array<{ szname: string }>) {
          if (r.szname) keySet.add(r.szname);
        }
        for (const r of (nrows || []) as Array<{ szname: string }>) {
          if (r.szname) keySet.add(r.szname);
        }

        const keys = Array.from(keySet);
        if (keys.length > 0) {
          query = query.in("szname", keys);
        } else {
          // Fallback to name match so the query still returns 0 or proper results
          query = query.ilike("szname", `%${term}%`);
        }
      }

      // Apply structured filters before range
      if (jobFilter !== "all") {
        query = query.eq("dwitemjob", jobFilter);
      }
      if (levelFilter !== "all") {
        query = query.eq("dwitemlv", levelFilter);
      }

      const { data, error, count } = await query.range(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage - 1
      );

      if (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to load items");
        return;
      }

      const items = (data as TPropItem[]) || [];
      setRecords(items);
      const total = count || 0;
      setTotalRecords(total);
      setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)));

      // Fetch translations by szname for current page only
      const keys = items.map((r) => r.szname).filter(Boolean) as string[];
      if (keys.length > 0) {
        const { data: tdata } = await supabase
          .from("propitem_translation")
          .select("szname, lang_1_us, lang_10_pt")
          .in("szname", keys);

        const map: Record<string, string> = {};
        for (const row of (tdata || []) as Array<{
          szname: string;
          lang_1_us?: string | null;
          lang_10_pt?: string | null;
        }>) {
          map[row.szname] = row.lang_1_us || row.lang_10_pt || "";
        }
        setNameByKey(map);
      } else {
        setNameByKey({});
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error loading items");
    } finally {
      setLoading(false);
    }
  }, [
    supabase,
    tableName,
    debouncedSearchTerm,
    currentPage,
    jobFilter,
    levelFilter,
  ]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleEdit = (record: TPropItem) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => fetchRecords();
  const handleAddSuccess = () => fetchRecords();

  const handleDelete = async (dwid: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ deleted_at: new Date().toISOString() })
        .eq("dwid", dwid);
      if (error) {
        console.error("Error deleting item:", error);
        toast.error("Failed to delete item");
        return;
      }
      toast.success("Item deleted");
      fetchRecords();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unexpected error");
    }
  };

  const displayValue = (
    record: TPropItem,
    key: keyof TPropItem
  ): ReactNode => {
    if (key === "szname") {
      const translated = record.szname ? nameByKey[record.szname] : undefined;
      const primary =
        translated && translated.trim().length > 0 ? translated : record.szname;
      return <TwoLineText primary={primary} secondary={record.szname} />;
    }
    return record[key] ?? "-";
  };

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    if (jobFilter !== "all") params.set("job", jobFilter);
    if (levelFilter !== "all") params.set("lv", levelFilter);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
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
            Add New Item
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filters</CardTitle>
            <CardDescription>
              Search by name or translations; filter by job and level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search name, EN or PT translations..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job">Job</Label>
                <Select
                  value={jobFilter}
                  onValueChange={(v) => {
                    setJobFilter(v);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger id="job" className="w-full min-w-[200px]">
                    <SelectValue placeholder="All jobs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {jobOptions.map((job) => (
                      <SelectItem key={job} value={job}>
                        {job}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  value={levelFilter}
                  onValueChange={(v) => {
                    setLevelFilter(v);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger id="level" className="w-full min-w-[200px]">
                    <SelectValue placeholder="All levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {levelOptions.map((lv) => (
                      <SelectItem key={lv} value={lv}>
                        {lv}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items ({totalRecords})</CardTitle>
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
                        href={buildPageHref(Math.max(1, currentPage - 1))}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) => Math.max(1, prev - 1));
                        }}
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
                      const end = Math.min(totalPages, start + maxButtons - 1);
                      if (end - start + 1 < maxButtons)
                        start = Math.max(1, end - maxButtons + 1);
                      const pages: number[] = [];
                      for (let p = start; p <= end; p++) pages.push(p);
                      return pages.map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href={buildPageHref(page)}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
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
                        href={buildPageHref(
                          Math.min(totalPages, currentPage + 1)
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          );
                        }}
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

      <ItemEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRecord(null);
        }}
        record={editingRecord}
        tableName={tableName}
        onSuccess={handleEditSuccess}
        selectOptionsByField={selectOptionsByField}
        selectPlaceholdersByField={selectPlaceholdersByField}
      />

      <ItemAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        tableName={tableName}
        onSuccess={handleAddSuccess}
        selectOptionsByField={selectOptionsByField}
        selectPlaceholdersByField={selectPlaceholdersByField}
      />
    </div>
  );
}
