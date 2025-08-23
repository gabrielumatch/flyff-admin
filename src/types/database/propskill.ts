import { BaseRecord } from '@/types/common';

export interface TPropSkill extends BaseRecord {
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
  }

  // create table public.propskill (
  //   ver character varying(255) null,
  //   dwid character varying(255) not null,
  //   szname character varying(255) null,
  //   dwnum character varying(255) null,
  //   dwpackmax character varying(255) null,
  //   dwitemkind1 character varying(255) null,
  //   dwitemkind2 character varying(255) null,
  //   dwitemkind3 character varying(255) null,
  //   dwitemjob character varying(255) null,
  //   bpermanence character varying(255) null,
  //   dwuseable character varying(255) null,
  //   dwitemsex character varying(255) null,
  //   dwcost character varying(255) null,
  //   dwendurance character varying(255) null,
  //   nabrasion character varying(255) null,
  //   nhardness character varying(255) null,
  //   dwhanded character varying(255) null,
  //   dwheelh character varying(255) null,
  //   dwparts character varying(255) null,
  //   dwpartsub character varying(255) null,
  //   bpartfile character varying(255) null,
  //   dwexclusive character varying(255) null,
  //   dwbasepartsignore character varying(255) null,
  //   dwitemlv character varying(255) null,
  //   dwitemrare character varying(255) null,
  //   dwshopable character varying(255) null,
  //   blog character varying(255) null,
  //   bcharged character varying(255) null,
  //   dwlinkkindbullet character varying(255) null,
  //   dwlinkkind character varying(255) null,
  //   dwabilitymin character varying(255) null,
  //   dwabilitymax character varying(255) null,
  //   eitemtype character varying(255) null,
  //   witemeatk character varying(255) null,
  //   dwparry character varying(255) null,
  //   dwblockrating character varying(255) null,
  //   dwaddskillmin character varying(255) null,
  //   dwaddskillmax character varying(255) null,
  //   dwatkstyle character varying(255) null,
  //   dwweapontype character varying(255) null,
  //   dwitematkorder1 character varying(255) null,
  //   dwitematkorder2 character varying(255) null,
  //   dwitematkorder3 character varying(255) null,
  //   dwitematkorder4 character varying(255) null,
  //   tmcontinuouspain character varying(255) null,
  //   dwshellquantity character varying(255) null,
  //   dwrecoil character varying(255) null,
  //   dwloadingtime character varying(255) null,
  //   nadjhitrate character varying(255) null,
  //   dwattackspeed character varying(255) null,
  //   dwdmgshift character varying(255) null,
  //   dwattackrange character varying(255) null,
  //   dwprobability character varying(255) null,
  //   dwdestparam1 character varying(255) null,
  //   dwdestparam2 character varying(255) null,
  //   dwdestparam3 character varying(255) null,
  //   nadjparamval1 character varying(255) null,
  //   nadjparamval2 character varying(255) null,
  //   nadjparamval3 character varying(255) null,
  //   dwchgparamval1 character varying(255) null,
  //   dwchgparamval2 character varying(255) null,
  //   dwchgparamval3 character varying(255) null,
  //   dwdestdata1 character varying(255) null,
  //   dwdestdata2 character varying(255) null,
  //   dwdestdata3 character varying(255) null,
  //   dwactiveskill character varying(255) null,
  //   dwactiveskilllv character varying(255) null,
  //   dwactiveskillper character varying(255) null,
  //   dwreqmp character varying(255) null,
  //   dwrepfp character varying(255) null,
  //   dwreqdislv character varying(255) null,
  //   dwreskill1 character varying(255) null,
  //   dwreskilllevel1 character varying(255) null,
  //   dwreskill2 character varying(255) null,
  //   dwreskilllevel2 character varying(255) null,
  //   dwskillreadytype character varying(255) null,
  //   dwskillready character varying(255) null,
  //   dwskillrange character varying(255) null,
  //   dwsfxelemental character varying(255) null,
  //   dwsfxobj character varying(255) null,
  //   dwsfxobj2 character varying(255) null,
  //   dwsfxobj3 character varying(255) null,
  //   dwsfxobj4 character varying(255) null,
  //   dwsfxobj5 character varying(255) null,
  //   dwusemotion character varying(255) null,
  //   dwcircletime character varying(255) null,
  //   dwskilltime character varying(255) null,
  //   dwexetarget character varying(255) null,
  //   dwusechance character varying(255) null,
  //   dwspellregion character varying(255) null,
  //   dwspelltype character varying(255) null,
  //   dwreferstat1 character varying(255) null,
  //   dwreferstat2 character varying(255) null,
  //   dwrefertarget1 character varying(255) null,
  //   dwrefertarget2 character varying(255) null,
  //   dwrefervalue1 character varying(255) null,
  //   dwrefervalue2 character varying(255) null,
  //   dwskilltype character varying(255) null,
  //   fitemresistelecricity character varying(255) null,
  //   fitemresistfire character varying(255) null,
  //   fitemresistwind character varying(255) null,
  //   fitemresistwater character varying(255) null,
  //   fitemresistearth character varying(255) null,
  //   nevildoing character varying(255) null,
  //   dwexpertlv character varying(255) null,
  //   expertmax character varying(255) null,
  //   dwsubdefine character varying(255) null,
  //   dwexp character varying(255) null,
  //   dwcombostyle character varying(255) null,
  //   fflightspeed character varying(255) null,
  //   fflightlrangle character varying(255) null,
  //   fflighttbangle character varying(255) null,
  //   dwflightlimit character varying(255) null,
  //   dwffuelremax character varying(255) null,
  //   dwafuelremax character varying(255) null,
  //   dwfuelre character varying(255) null,
  //   dwlimitlevel1 character varying(255) null,
  //   dwreflect character varying(255) null,
  //   dwsndattack1 character varying(255) null,
  //   dwsndattack2 character varying(255) null,
  //   szicon character varying(255) null,
  //   dwquestid character varying(255) null,
  //   sztextfile character varying(255) null,
  //   szcomment character varying(255) null,
  //   dwbuffticktype character varying(255) null,
  //   constraint propskill_pkey primary key (dwid)
  // ) TABLESPACE pg_default;