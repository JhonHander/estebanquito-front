import React, { useState, useRef, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const setSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        setSize()

        let ps: any[] = []
        let raf = 0

        const make = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            v: Math.random() * 0.25 + 0.05,
            o: Math.random() * 0.35 + 0.15,
        })

        const init = () => {
            ps = []
            const count = Math.floor((canvas.width * canvas.height) / 9000)
            for (let i = 0; i < count; i++) ps.push(make())
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ps.forEach((p) => {
                p.y -= p.v
                if (p.y < 0) {
                    p.x = Math.random() * canvas.width
                    p.y = canvas.height + Math.random() * 40
                    p.v = Math.random() * 0.25 + 0.05
                    p.o = Math.random() * 0.35 + 0.15
                }
                ctx.fillStyle = `rgba(230,238,246,${p.o})`
                ctx.fillRect(p.x, p.y, 0.7, 2.2)
            })
            raf = requestAnimationFrame(draw)
        }

        const onResize = () => {
            setSize()
            init()
        }

        window.addEventListener("resize", onResize)
        init()
        raf = requestAnimationFrame(draw)
        return () => {
            window.removeEventListener("resize", onResize)
            cancelAnimationFrame(raf)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setLoading(true)
        // Simular llamada API
        await new Promise(resolve => setTimeout(resolve, 1500))
        setLoading(false)
        setIsSubmitted(true)
    }

    return (
        <section className="fixed inset-0 text-text overflow-hidden" style={{ background: "black" }}>
            <style>{`
        .accent-lines{position:absolute;inset:0;pointer-events:none;opacity:.4}
        .hline,.vline{position:absolute;background:rgb(var(--color-accent) / 0.2);will-change:transform,opacity}
        .hline{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:drawX .8s cubic-bezier(.22,.61,.36,1) forwards}
        .vline{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:drawY .9s cubic-bezier(.22,.61,.36,1) forwards}
        .hline:nth-child(1){top:18%;animation-delay:.12s}
        .hline:nth-child(2){top:50%;animation-delay:.22s}
        .hline:nth-child(3){top:82%;animation-delay:.32s}
        .vline:nth-child(4){left:22%;animation-delay:.42s}
        .vline:nth-child(5){left:50%;animation-delay:.54s}
        .vline:nth-child(6){left:78%;animation-delay:.66s}
        @keyframes drawX{0%{transform:scaleX(0);opacity:0}60%{opacity:.95}100%{transform:scaleX(1);opacity:.7}}
        @keyframes drawY{0%{transform:scaleY(0);opacity:0}60%{opacity:.95}100%{transform:scaleY(1);opacity:.7}}

        .card-animate {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s cubic-bezier(.22,.61,.36,1) 0.4s forwards;
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

            <div className="absolute inset-0 pointer-events-none [background:radial-gradient(80%_60%_at_50%_30%,rgba(255,68,68,0.04),transparent_60%)]" />

            <div className="accent-lines">
                <div className="hline" />
                <div className="hline" />
                <div className="hline" />
                <div className="vline" />
                <div className="vline" />
                <div className="vline" />
            </div>

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen pointer-events-none"
            />

            <header className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgb(var(--color-surface) / 0.3)" }}>
                <Button
                    className="px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-80"
                    style={{
                        backgroundColor: "rgb(var(--color-surface))",
                        color: "rgb(var(--color-text))"
                    }}
                    onClick={() => navigate("/login")}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span style={{ transform: 'translateY(-1px)' }}>Volver al Login</span>
                </Button>
            </header>

            <div className="h-full w-full grid place-items-center px-4">
                <Card
                    className="card-animate w-full max-w-sm rounded-xl border-white/13"
                    style={{
                        backgroundColor: "rgba(22, 22, 22, 0.8)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                    }}
                >
                    {!isSubmitted ? (
                        <>
                            <CardHeader className="space-y-1">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                                    <KeyRound className="h-6 w-6 text-accent" />
                                </div>
                                <CardTitle className="text-2xl font-bold tracking-tight text-center">¿Olvidaste tu contraseña?</CardTitle>
                                <CardDescription className="text-center" style={{ color: "rgb(var(--color-muted))" }}>
                                    No te preocupes, te enviaremos instrucciones para restablecerla.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="grid gap-5">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" style={{ color: "rgb(var(--color-text))" }}>
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "rgb(var(--color-muted))" }} />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="pl-10 bg-black/20 border-white/5 focus:border-accent/30 transition-colors"
                                                style={{
                                                    color: "rgb(var(--color-text))",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-11 rounded-lg font-bold text-white shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all active:scale-[0.98]"
                                        style={{
                                            backgroundColor: "rgb(var(--color-accent))",
                                        }}
                                    >
                                        {loading ? "Enviando..." : "Enviar Instrucciones"}
                                    </Button>
                                </form>
                            </CardContent>
                        </>
                    ) : (
                        <CardContent className="pt-10 pb-8 text-center space-y-6">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="h-10 w-10 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">¡Correo enviado!</h3>
                                <p className="text-sm" style={{ color: "rgb(var(--color-muted))" }}>
                                    Hemos enviado un enlace de recuperación a <span className="text-white font-medium">{email}</span>.
                                </p>
                            </div>
                            <Button
                                onClick={() => navigate("/login")}
                                variant="outline"
                                className="w-full h-11 rounded-lg border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                                style={{ color: "rgb(var(--color-text))" }}
                            >
                                Volver al inicio de sesión
                            </Button>
                        </CardContent>
                    )}

                    <CardFooter className="flex items-center justify-center text-xs border-t border-white/5 pt-4" style={{ color: "rgb(var(--color-muted))" }}>
                        ¿Recordaste tu contraseña?
                        <Link
                            to="/login"
                            className="ml-1 font-bold hover:text-accent transition-colors"
                            style={{ color: "rgb(var(--color-text))" }}
                        >
                            Inicia sesión
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}

export default ForgotPassword;

