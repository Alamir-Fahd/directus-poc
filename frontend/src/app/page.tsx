import { client } from "@/lib/directus";
import { readItems } from "@directus/sdk";

export const dynamic = "force-dynamic";

const getAssetUrl = (id: string) => {
  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://127.0.0.1:8055"}/assets/${id}`;
};

export default async function Home() {
  let services: any[] = [];
  let team: any[] = [];
  let partners: any[] = [];

  // SAFETY NET: This prevents Vercel from crashing during deployment when it can't reach your local Docker container
  try {
    services = await client.request(readItems("services"));
    team = await client.request(readItems("team_members"));
    partners = await client.request(readItems("partners"));
  } catch (error) {
    console.warn("Directus backend is unreachable. Failing gracefully for deployment.");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans p-10">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold text-cyan-400 mb-4">Directus Integration</h1>
        <p className="text-slate-400 text-lg">Dynamic data fetched seamlessly from a headless CMS.</p>
      </header>

      {/* Services Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold border-b border-slate-800 pb-2 mb-6">Services</h2>
        {services.length === 0 ? (
          <p className="text-slate-500 italic">Connect local database to view services.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service: any) => (
              <div key={service.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                {service.icon && (
                  <img src={getAssetUrl(service.icon)} alt={service.title} className="w-12 h-12 mb-4 object-contain" />
                )}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold border-b border-slate-800 pb-2 mb-6">Team Members</h2>
        {team.length === 0 ? (
          <p className="text-slate-500 italic">Connect local database to view team.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member: any) => (
              <div key={member.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-center">
                {member.avatar && (
                  <img src={getAssetUrl(member.avatar)} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-indigo-500" />
                )}
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-indigo-400 text-sm mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Partners Section */}
      <section>
        <h2 className="text-3xl font-bold border-b border-slate-800 pb-2 mb-6">Partners</h2>
        {partners.length === 0 ? (
          <p className="text-slate-500 italic">Connect local database to view partners.</p>
        ) : (
          <div className="flex flex-wrap gap-8 items-center">
            {partners.map((partner: any) => (
              <a key={partner.id} href={partner.website_url} target="_blank" rel="noopener noreferrer" className="block opacity-70 hover:opacity-100 transition-opacity">
                {partner.logo ? (
                  <img src={getAssetUrl(partner.logo)} alt={partner.name} className="h-16 w-auto object-contain" />
                ) : (
                  <span className="font-bold text-slate-300">{partner.name}</span>
                )}
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}