type BannerMobile = {
    id: number;
    filename: string;
    path: string;
    image_type: string;
    image_url: string;
  };
  
  type JobDetail = {
    entity_id: number;
    max_salary: number | null;
    currency: string;
    locations: any[];
    type: string | null;
    // Add other properties as needed
  };
  
  type OpportunityConfig = {
    id: number;
    opportunity_id: number;
    banner_config: string;
  };
  
  type Organisation = {
    id: number;
    name: string;
    public_url: string;
    logoUrl: string;
    logoUrl2: string;
    // Add other properties as needed
  };
  
  export type UnstopPost = {
    id: number;
    title: string;
    public_url: string;
    logoUrl2: string;
    mode?: string;
    location?: string;
    banner_mobile: BannerMobile;
    end_date: string;
    festival: string | null;
    fields: any[];
    filters: any[];
    isPaid: boolean;
    jobDetail: JobDetail;
    moderation_status: number;
    opportunity_config: OpportunityConfig;
    organisation: Organisation;
    organization_id: number;
    prizes: any[];
    region: string;
    registerCount: number;
    regnRequirements: {
      opportunity_id: number;
      start_regn_dt: string;
      end_regn_dt: string;
      show_deadline: number;
      remainingDaysArray: any;
      // Add other properties as needed
    };
    regn_open: number;
    self_moderated: number;
    seo_details: any[];
    seo_url: string;
    start_date: string;
    status: string;
    subtype: string;
    tags: any[];
    thumb: string | null;
    type: string;
    viewsCount: number;
  };
  