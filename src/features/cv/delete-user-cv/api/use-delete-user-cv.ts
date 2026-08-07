import { useDeleteCv } from '@/entities/cv/api/use-delete-cv';

export function useDeleteUserCv() {
  const [mutate, state] = useDeleteCv();

  const deleteUserCv = async (cvId: string) => {
    return mutate({
      variables: {
        cv: {
          cvId,
        },
      },
    });
  };

  return {
    deleteUserCv,
    loading: state.loading,
    error: state.error,
  };
}
