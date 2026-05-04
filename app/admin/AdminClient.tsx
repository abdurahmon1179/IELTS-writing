"use client";
import { useState } from "react";
import Link from "next/link";
import { Users, TrendingUp, Crown, Calendar, Search, LogOut, Sparkles, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Profile {
  id: string;
  created_at: string;
  email: string;
  full_name: string | null;
  plan: "free" | "mastery";
  essays_graded: number;
  is_active: boolean;
}

interface Stats {
  total: number;
  mastery: number;
  free: number;
  today: number;
  thisWeek: number;
}

export default function AdminClient({
  profiles, stats, adminEmail
}: {
  profiles: Profile[];
  stats: Stats;
  adminEmail: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<"all" | "free" | "mastery">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "essays">("newest");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const filtered = profiles
    .filter(p => {
      const matchSearch = !search ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        (p.full_name ?? "").toLowerCase().includes(search.toLowerCase());
      const matchPlan = planFilter === "all" || p.plan === planFilter;
      return matchSearch && matchPlan;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return b.essays_graded - a.essays_graded;
    });

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("uz-UZ", { day: "2-digit", month: "short", year: "numeric" });
  };

  const statCards = [
    { icon:<Users size={20} />, label:"Jami foydalanuvchilar", value:stats.total, color:"rgba(16,185,129,0.12)", border:"rgba(16,185,129,0.22)", iconColor:"#34D399", change: `+${stats.thisWeek} bu hafta` },
    { icon:<Crown size={20} />, label:"Mastery Plan", value:stats.mastery, color:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.2)", iconColor:"#F59E0B", change: stats.total > 0 ? `${Math.round(stats.mastery/stats.total*100)}% ulushi` : "0%" },
    { icon:<TrendingUp size={20} />, label:"Free Plan", value:stats.free, color:"rgba(99,102,241,0.1)", border:"rgba(99,102,241,0.2)", iconColor:"#818CF8", change: `${stats.total - stats.mastery} bepul` },
    { icon:<Calendar size={20} />, label:"Bugun qo'shildi", value:stats.today, color:"rgba(16,185,129,0.08)", border:"rgba(16,185,129,0.15)", iconColor:"#34D399", change:`Bu hafta +${stats.thisWeek}` },
  ];

  return (
    <div style={{ minHeight:"100vh",background:"#022c22",fontFamily:"'DM Sans',sans-serif",color:"#e2f5ee" }}>

      {/* Header */}
      <header style={{ background:"rgba(2,44,34,0.85)",borderBottom:"1px solid rgba(255,255,255,0.07)",backdropFilter:"blur(20px)",padding:"0 max(24px,calc((100vw - 1280px)/2))",height:68,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50 }}>
        <div style={{ display:"flex",alignItems:"center",gap:16 }}>
          <Link href="/" style={{ display:"inline-flex",alignItems:"center",gap:8,textDecoration:"none" }}>
            <div style={{ width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#10B981,#047857)",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <Sparkles size={15} color="#fff" />
            </div>
            <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:700,color:"#fff" }}>
              IELTS Writing <span style={{ color:"#34D399" }}>Master</span>
            </span>
          </Link>
          <div style={{ width:1,height:24,background:"rgba(255,255,255,0.1)" }} />
          <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:"rgba(248,113,113,0.1)",border:"1px solid rgba(248,113,113,0.2)",borderRadius:9999,padding:"4px 12px",fontSize:"0.7rem",fontWeight:700,color:"#F87171",letterSpacing:"0.08em",textTransform:"uppercase" }}>
            🛡 Admin Panel
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <span style={{ fontSize:"0.82rem",color:"rgba(255,255,255,0.4)" }}>{adminEmail}</span>
          <button onClick={handleSignOut} style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:9999,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.5)",fontSize:"0.82rem",cursor:"pointer",transition:"all 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="#F87171"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.5)"; }}>
            <LogOut size={14} /> Chiqish
          </button>
        </div>
      </header>

      <main style={{ maxWidth:1280,margin:"0 auto",padding:"40px 24px" }}>

        {/* Page title */}
        <div style={{ marginBottom:36 }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:800,marginBottom:6 }}>
            Foydalanuvchilar statistikasi
          </h1>
          <p style={{ color:"rgba(255,255,255,0.4)",fontSize:"0.9rem" }}>
            Real-time ma&apos;lumotlar · Supabase orqali
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16,marginBottom:36 }}>
          {statCards.map((s,i) => (
            <div key={i} style={{ background:s.color,border:`1px solid ${s.border}`,borderRadius:18,padding:"24px",backdropFilter:"blur(12px)",transition:"all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-3px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=""; }}>
              <div style={{ color:s.iconColor,marginBottom:14 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"2.4rem",fontWeight:700,lineHeight:1,marginBottom:6,color:"#fff" }}>{s.value}</div>
              <div style={{ fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",marginBottom:8,fontWeight:500 }}>{s.label}</div>
              <div style={{ fontSize:"0.72rem",color:s.iconColor,fontWeight:600 }}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Conversion rate */}
        {stats.total > 0 && (
          <div style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"20px 24px",marginBottom:28,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap" }}>
            <div style={{ fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em" }}>Conversion Rate (Free → Mastery)</div>
            <div style={{ flex:1,minWidth:160 }}>
              <div style={{ height:8,borderRadius:9999,background:"rgba(255,255,255,0.07)",overflow:"hidden" }}>
                <div style={{ height:"100%",borderRadius:9999,background:"linear-gradient(90deg,#10B981,#34D399)",width:`${Math.round(stats.mastery/stats.total*100)}%`,transition:"width 1s ease" }} />
              </div>
            </div>
            <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:700,color:"#34D399" }}>
              {Math.round(stats.mastery / stats.total * 100)}%
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20,flexWrap:"wrap" }}>
          {/* Search */}
          <div style={{ position:"relative",flex:1,minWidth:200 }}>
            <Search size={15} color="rgba(255,255,255,0.3)" style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} />
            <input
              type="text"
              placeholder="Ism yoki email qidirish..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width:"100%",padding:"10px 14px 10px 40px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",color:"#e2f5ee",fontSize:"0.875rem",fontFamily:"'DM Sans',sans-serif",outline:"none" }}
            />
          </div>

          {/* Plan filter */}
          <div style={{ display:"flex",gap:8 }}>
            {(["all","free","mastery"] as const).map(f => (
              <button key={f} onClick={() => setPlanFilter(f)} style={{ padding:"8px 16px",borderRadius:9999,border:`1px solid ${planFilter===f ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.09)"}`,background: planFilter===f ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",color: planFilter===f ? "#34D399" : "rgba(255,255,255,0.5)",fontSize:"0.8rem",fontWeight:600,cursor:"pointer",transition:"all 0.2s",fontFamily:"'DM Sans',sans-serif",textTransform:"capitalize" }}>
                {f === "all" ? "Hammasi" : f === "mastery" ? "✦ Mastery" : "Free"}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div style={{ position:"relative" }}>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} style={{ appearance:"none",padding:"9px 36px 9px 14px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.7)",fontSize:"0.8rem",fontFamily:"'DM Sans',sans-serif",cursor:"pointer",outline:"none" }}>
              <option value="newest">Eng yangi</option>
              <option value="oldest">Eng eski</option>
              <option value="essays">Ko'p essay</option>
            </select>
            <ChevronDown size={14} color="rgba(255,255,255,0.4)" style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} />
          </div>
        </div>

        {/* Results count */}
        <div style={{ fontSize:"0.8rem",color:"rgba(255,255,255,0.35)",marginBottom:14 }}>
          {filtered.length} ta foydalanuvchi ko&apos;rsatilmoqda
        </div>

        {/* Table */}
        <div style={{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:18,overflow:"hidden" }}>
          {/* Table header */}
          <div style={{ display:"grid",gridTemplateColumns:"2fr 1.5fr 100px 100px 140px",gap:0,padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)",fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em",textTransform:"uppercase" }}>
            <div>Foydalanuvchi</div>
            <div>Email</div>
            <div>Plan</div>
            <div>Essaylar</div>
            <div>Ro&apos;yxatdan o&apos;tgan</div>
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div style={{ padding:"48px 20px",textAlign:"center",color:"rgba(255,255,255,0.3)",fontSize:"0.9rem" }}>
              Foydalanuvchi topilmadi
            </div>
          ) : (
            filtered.map((p, i) => (
              <div key={p.id} style={{ display:"grid",gridTemplateColumns:"2fr 1.5fr 100px 100px 140px",gap:0,padding:"14px 20px",borderBottom: i < filtered.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",alignItems:"center",transition:"background 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.025)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; }}>
                {/* Name */}
                <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                  <div style={{ width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,rgba(16,185,129,0.25),rgba(6,78,59,0.5))",border:"1px solid rgba(16,185,129,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.78rem",fontWeight:700,color:"#34D399",flexShrink:0 }}>
                    {(p.full_name ?? p.email).charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize:"0.875rem",fontWeight:500 }}>{p.full_name ?? "—"}</span>
                </div>
                {/* Email */}
                <div style={{ fontSize:"0.82rem",color:"rgba(255,255,255,0.5)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{p.email}</div>
                {/* Plan */}
                <div>
                  <span style={{ display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:9999,fontSize:"0.7rem",fontWeight:700,background: p.plan==="mastery" ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.06)",border: p.plan==="mastery" ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(255,255,255,0.1)",color: p.plan==="mastery" ? "#34D399" : "rgba(255,255,255,0.45)" }}>
                    {p.plan==="mastery" ? "✦ Mastery" : "Free"}
                  </span>
                </div>
                {/* Essays */}
                <div style={{ fontSize:"0.875rem",fontWeight:600,color: p.essays_graded > 0 ? "#34D399" : "rgba(255,255,255,0.3)" }}>{p.essays_graded}</div>
                {/* Date */}
                <div style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.38)" }}>{formatDate(p.created_at)}</div>
              </div>
            ))
          )}
        </div>

        {/* Footer note */}
        <p style={{ marginTop:20,fontSize:"0.75rem",color:"rgba(255,255,255,0.2)",textAlign:"center" }}>
          Ma&apos;lumotlar real vaqtda Supabase&apos;dan olinmoqda · Sahifani yangilash uchun F5 bosing
        </p>
      </main>
    </div>
  );
}
