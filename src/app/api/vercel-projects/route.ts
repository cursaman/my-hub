import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type VercelProject = {
  id?: string;
  name?: string;
  framework?: string | null;
  targets?: { production?: { url?: string; alias?: string[] } };
  alias?: string[];
};

function projectUrl(project: VercelProject) {
  const candidates = [
    project.targets?.production?.url,
    ...(project.targets?.production?.alias ?? []),
    ...(project.alias ?? []),
    project.name ? `${project.name}.vercel.app` : undefined,
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const url = candidate.startsWith("http") ? candidate : `https://${candidate}`;
    try {
      const parsed = new URL(url);
      if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.origin;
    } catch {
      // Skip malformed URLs returned by the API.
    }
  }
  return null;
}

export async function GET() {
  const token = process.env.VERCEL_TOKEN;
  if (!token) return NextResponse.json({ configured: false, projects: [] });

  const url = new URL("https://api.vercel.com/v10/projects");
  url.searchParams.set("limit", "100");
  if (process.env.VERCEL_TEAM_ID) url.searchParams.set("teamId", process.env.VERCEL_TEAM_ID);
  else if (process.env.VERCEL_TEAM_SLUG) url.searchParams.set("slug", process.env.VERCEL_TEAM_SLUG);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json({ configured: true, projects: [], error: "Vercel 프로젝트를 불러오지 못했어요." }, { status: 502 });
    }
    const data = (await response.json()) as { projects?: VercelProject[] };
    const projects = (data.projects ?? []).flatMap((project) => {
      if (!project.id || !project.name) return [];
      const href = projectUrl(project);
      if (!href) return [];
      return [{
        id: project.id,
        title: project.name,
        description: "Vercel에 등록된 프로젝트",
        type: project.framework ? project.framework.toUpperCase() : "VERCEL PROJECT",
        href,
      }];
    });
    return NextResponse.json({ configured: true, projects });
  } catch {
    return NextResponse.json({ configured: true, projects: [], error: "Vercel에 연결할 수 없어요." }, { status: 502 });
  }
}
