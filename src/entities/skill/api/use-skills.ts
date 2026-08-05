import { useQuery } from '@apollo/client/react';

import { SKILLS_QUERY } from './skills.query';

export function useSkills() {
  return useQuery(SKILLS_QUERY);
}
