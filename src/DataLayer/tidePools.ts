import { SurveyData } from '@/types';

export const getTidePoolsData = async () => {
  const res = await fetch('https://www.gmrt.org/services/GmrtCruises.php');
  return res.json();
};

export const formatTidePoolsData = (data: SurveyData[]) => {
  return data.map((survey) => {
    const { north, east, south, west, year, created } = survey;
    return {
      centerX: survey.center_x,
      centerY: survey.center_y,
      entryId: survey.entry_id,
      shipName: survey.platform_id,
      totalArea: survey.total_area ?? 0,
      url: survey.url,
      platformId: survey.platform_id,
      created,
      year,
      north,
      east,
      south,
      west,
    };
  });
};
