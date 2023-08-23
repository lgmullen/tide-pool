import { Survey } from '@/types';

export const getTidePoolsData = async () => {
  const res = await fetch('https://www.gmrt.org/services/GmrtCruises.php');
  return res.json();
};

export const formatTidePoolsData = (data: Survey[]) => {
  return data.map((survey) => {
    return {
      entryId: survey.entry_id,
      shipName: survey.platform_id,
      totalArea: survey.total_area ?? 0,
    };
  });
};
