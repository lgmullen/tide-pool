export interface SurveyData {
  center_x: string;
  center_y: string;
  chief: string;
  created: string;
  data_processor_organization: string;
  device_make: string;
  device_model: string;
  east: string;
  entry_id: string;
  entry_type: string;
  file_count: string;
  flag_alt: string;
  flag_file: string;
  gmrt_entry_id: string;
  gmrt_version_number: string;
  is_rejected: string;
  mac_platform_url: string | null;
  mac_url: string | null;
  north: string;
  platform_id: string;
  proc_data_set_uid: string;
  public_notes: string | null;
  r2r_fileset_id: string | null;
  r2r_qa: string | null;
  south: string;
  survey_id: string;
  total_area: string;
  track_length: string;
  url: string;
  west: string;
  year: string;
}

export interface Survey {
  centerX: string;
  centerY: string;
  created: string;
  east: string;
  entryId: string;
  north: string;
  platformId: string;
  south: string;
  totalArea: string;
  url: string;
  west: string;
  year: string;
}
