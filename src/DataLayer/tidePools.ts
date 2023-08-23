import { SurveyData } from '@/types';

export const getTidePoolsData = async () => {
  const res = await fetch('https://www.gmrt.org/services/GmrtCruises.php');
  return res.json();
};

export const formatTidePoolsData = (data: SurveyData[]) => {
  return data.map((survey) => {
    return {
      centerX: parseInt(survey.center_x),
      centerY: parseInt(survey.center_y),
      entryId: survey.entry_id,
      totalArea: survey.total_area,
      url: survey.url,
      platformId: survey.platform_id,
      created: survey.created,
      year: survey.year,
      north: survey.north,
      east: survey.east,
      south: survey.west,
      west: survey.west,
    };
  });
};
