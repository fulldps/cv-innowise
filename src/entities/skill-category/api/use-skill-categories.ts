import { useQuery } from '@apollo/client/react';

import { SKILL_CATEGORIES_QUERY } from './skill-categories.query';

export function useSkillCategories() {
  return useQuery(SKILL_CATEGORIES_QUERY);
}
