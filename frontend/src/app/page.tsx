import { client } from "@/lib/directus";
import { readItems } from "@directus/sdk";

// Helper to construct the full image URL from Directus
const getAssetUrl = (id: string) => {
  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${id}`;
};

export default async function Home() {
  // 1. Fetch data directly on the server
  const services = await client.request(readItems("services"));
  const team = await client.request(readItems("team_members"));
  const partners = await client.request(readItems("partners"));

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans p-10">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold text-cyan-400 mb-4">Directus Integration</h1>
        <p className="text-slate-400 text-lg">Dynamic data fetched seamlessly from a headless CMS.</p>
      </header>

      {/* Services Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold border-b border-slate-800 pb-2 mb-6">Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              {service.icon && (
                <img src={getAssetUrl(service.icon)} alt={service.title} className="w-12 h-12 mb-4 object-contain" />
              )}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold border-b border-slate-800 pb-2 mb-6">Team Members</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member) => (
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
      </section>

      {/* Partners Section */}
      <section>
        <h2 className="text-3xl font-bold border-b border-slate-800 pb-2 mb-6">Partners</h2>
        <div className="flex flex-wrap gap-8 items-center">
          {partners.map((partner) => (
            <a key={partner.id} href={partner.website_url} target="_blank" rel="noopener noreferrer" className="block opacity-70 hover:opacity-100 transition-opacity">
              {partner.logo ? (
                <img src={getAssetUrl(partner.logo)} alt={partner.name} className="h-16 w-auto object-contain" />
              ) : (
                <span className="font-bold text-slate-300">{partner.name}</span>
              )}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}