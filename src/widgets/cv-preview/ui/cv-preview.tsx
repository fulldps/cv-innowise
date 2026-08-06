import { Button } from '@/shared/ui/button';

import type { PreviewCv } from '../model/types';

interface CvPreviewProps {
  cv: PreviewCv;
}

export function CvPreview({ cv }: CvPreviewProps) {
  return (
    <div className="mx-auto max-w-4xl px-10 py-8 text-sm max-lg:px-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal">{cv.fullName}</h1>
          <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
            {cv.position}
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-full border-[#c72f31] px-6 text-xs tracking-wide text-[#c72f31] hover:text-[#c72f31]"
        >
          EXPORT PDF
        </Button>
      </header>

      <div className="mt-8 grid grid-cols-[220px_1fr] gap-8 max-lg:grid-cols-[160px_1fr] max-lg:gap-5">
        <aside className="space-y-5">
          <section>
            <h3 className="font-semibold">Education</h3>
            <p className="mt-1 text-muted-foreground">{cv.education}</p>
          </section>

          <section>
            <h3 className="font-semibold">Language proficiency</h3>
            <div className="mt-1 space-y-0.5 text-muted-foreground">
              {cv.languages.map((language) => (
                <p key={language.name}>{language.name}</p>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-semibold">Domains</h3>
            <div className="mt-1 space-y-0.5 text-muted-foreground">
              {cv.domains.map((domain) => (
                <p key={domain}>{domain}</p>
              ))}
            </div>
          </section>
        </aside>

        <div className="space-y-4 border-l pl-8">
          <h3 className="font-semibold">{cv.name}</h3>
          <p className="leading-relaxed text-muted-foreground">{cv.description}</p>

          {cv.skillGroups.map((group) => (
            <section key={group.category}>
              <h4 className="font-semibold">{group.category}</h4>
              <p className="mt-1 text-muted-foreground">{group.skills.join(', ')}.</p>
            </section>
          ))}
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-normal">Projects</h2>
      <div className="mt-6 space-y-8">
        {cv.projects.map((project) => (
          <div
            key={project.name}
            className="grid grid-cols-[220px_1fr] gap-8 max-lg:grid-cols-[160px_1fr] max-lg:gap-5"
          >
            <div>
              <h3 className="font-semibold tracking-wide text-[#c72f31] uppercase">
                {project.name}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{project.description}</p>
            </div>

            <div className="space-y-4 border-l pl-8">
              <section>
                <h4 className="font-semibold">Project roles</h4>
                <p className="mt-1 text-muted-foreground">{project.roles.join(', ')}</p>
              </section>

              <section>
                <h4 className="font-semibold">Period</h4>
                <p className="mt-1 text-muted-foreground">{project.period}</p>
              </section>

              <section>
                <h4 className="font-semibold">Responsibilities</h4>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
                  {project.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="font-semibold">Environment</h4>
                <p className="mt-1 text-muted-foreground">{project.environment.join(', ')}.</p>
              </section>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-normal">Professional skills</h2>
      <table className="mt-6 w-full border-collapse text-left">
        <thead>
          <tr className="border-b text-xs tracking-wide text-muted-foreground uppercase">
            <th className="w-1/3 py-2 font-medium">Skills</th>
            <th className="py-2 font-medium" />
            <th className="py-2 font-medium">Experience in years</th>
            <th className="py-2 font-medium">Last used</th>
          </tr>
        </thead>
        <tbody>
          {cv.professionalSkills.map((row) => (
            <tr key={row.category} className="border-b align-top">
              <td className="py-3 font-medium text-[#c72f31]">{row.category}</td>
              <td className="py-3">
                {row.skills.map((skill) => (
                  <p key={skill}>{skill}</p>
                ))}
              </td>
              <td className="py-3 text-muted-foreground">{row.experienceYears}</td>
              <td className="py-3 text-muted-foreground">{row.lastUsed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
