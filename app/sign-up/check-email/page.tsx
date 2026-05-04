"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { Suspense } from "react";

function CheckEmailContent() {
  const params = useSearchParams();
  const email = params.get("email") ?? "emailingiz";

  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'DM Sans',sans-serif",background:"#022c22",position:"relative" }}>
      <div style={{ position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,0.08) 0%,transparent 70%)",filter:"blur(80px)",pointerEvents:"none" }} />

      <div style={{ maxWidth:480,width:"100%",textAlign:"center",position:"relative",zIndex:1 }}>
        {/* Logo */}
        <Link href="/" style={{ display:"inline-flex",alignItems:"center",gap:10,textDecoration:"none",marginBottom:48 }}>
          <div style={{ width:38,height:38,borderRadius:11,background:"linear-gradient(135deg,#10B981,#047857)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Sparkles size={18} color="#fff" />
          </div>
          <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:700,color:"#fff" }}>
            IELTS Writing <span style={{ color:"#34D399" }}>Master</span>
          </span>
        </Link>

        {/* Icon */}
        <div style={{ width:88,height:88,borderRadius:"50%",background:"linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,78,59,0.4))",border:"1px solid rgba(16,185,129,0.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 28px",boxShadow:"0 0 40px rgba(16,185,129,0.12)" }}>
          <Mail size={38} color="#34D399" />
        </div>

        <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:800,marginBottom:14,lineHeight:1.2 }}>
          Emailingizni tasdiqlang
        </h1>
        <p style={{ color:"rgba(255,255,255,0.5)",lineHeight:1.8,marginBottom:10,fontSize:"0.95rem" }}>
          Tasdiqlash xati quyidagi manzilga yuborildi:
        </p>
        <div style={{ display:"inline-block",background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:10,padding:"8px 20px",marginBottom:28 }}>
          <span style={{ color:"#34D399",fontWeight:600,fontSize:"0.95rem" }}>{email}</span>
        </div>
        <p style={{ color:"rgba(255,255,255,0.38)",fontSize:"0.85rem",lineHeight:1.7,marginBottom:36 }}>
          Emaildagi havolani bosib hisobingizni faollashtirasiz. Agar email kelmagan bo&apos;lsa, spam papkasini tekshiring.
        </p>

        <Link href="/sign-in" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"13px 28px",borderRadius:12,background:"linear-gradient(135deg,#10B981,#047857)",color:"#fff",textDecoration:"none",fontWeight:600,fontSize:"0.95rem",boxShadow:"0 8px 24px rgba(16,185,129,0.25)" }}>
          Sign In sahifasiga o&apos;tish <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense>
      <CheckEmailContent />
    </Suspense>
  );
}
