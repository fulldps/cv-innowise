interface SkillsCategorySectionProps {
  title: string;
  children: React.ReactNode;
}

export function SkillsCategorySection({ title, children }: SkillsCategorySectionProps) {
  return (
    <section>
      <h2 className="text-base text-primary mt-4">{title}</h2>

      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-37">
        {children}
      </div>
    </section>
  );
}
