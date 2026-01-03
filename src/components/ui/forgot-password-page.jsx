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
import { Separator } from "@/components/ui/separator"
import { Mail, ArrowRight, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const setSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        setSize()

        let ps = []
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            setError("Por favor, ingresa tu correo electrónico")
            return
        }

        setLoading(true)
        setError("")

        // Simulación de envío de correo
        try {
            // Aquí iría la llamada al servicio: await authService.forgotPassword(email)
            await new Promise(resolve => setTimeout(resolve, 1500))
            setSubmitted(true)
        } catch (err) {
            setError("Error al enviar el enlace de recuperación")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="fixed inset-0 text-text" style={{ background: "black" }}>
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
        .hline::after,.vline::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,68,68,.15),transparent);opacity:0;animation:shimmer .9s ease-out forwards}
        .hline:nth-child(1)::after{animation-delay:.12s}
        .hline:nth-child(2)::after{animation-delay:.22s}
        .hline:nth-child(3)::after{animation-delay:.32s}
        .vline:nth-child(4)::after{animation-delay:.42s}
        .vline:nth-child(5)::after{animation-delay:.54s}
        .vline:nth-child(6)::after{animation-delay:.66s}
        @keyframes drawX{0%{transform:scaleX(0);opacity:0}60%{opacity:.95}100%{transform:scaleX(1);opacity:.7}}
        @keyframes drawY{0%{transform:scaleY(0);opacity:0}60%{opacity:.95}100%{transform:scaleY(1);opacity:.7}}
        @keyframes shimmer{0%{opacity:0}35%{opacity:.25}100%{opacity:0}}

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

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px rgb(10 10 10) inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

            <div className="absolute inset-0 pointer-events-none [background:radial-gradient(80%_60%_at_50%_30%,rgba(220,50,50,0.08),transparent_60%)]" />

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
                    <span style={{ transform: 'translateY(-1px)' }}>Atrás</span>
                </Button>
            </header>

            <div className="h-full w-full grid place-items-center px-4">
                <Card className="card-animate w-full max-w-sm border-white/5 bg-[#161616]/80 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold tracking-tight text-white">¿Olvidaste tu contraseña?</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Ingresa tu correo y te enviaremos un enlace para restablecerla
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-5">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="grid gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                                        Correo Electrónico
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="tu@ejemplo.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 bg-black/40 border-white/5 text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:border-accent/30 transition-all"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 p-2 rounded">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-11 rounded-lg font-semibold transition-all duration-300"
                                    style={{
                                        backgroundColor: "rgb(var(--color-accent))",
                                        color: "white"
                                    }}
                                >
                                    {loading ? "Enviando..." : "Enviar enlace de recuperación"}
                                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Button>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-gray-300 leading-relaxed">
                                    Revisa tu bandeja de entrada — hemos enviado un enlace de recuperación. Si no lo ves, revisa la carpeta de spam.
                                </div>
                                <Button
                                    onClick={() => navigate("/login")}
                                    className="w-full h-11 rounded-lg font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
                                >
                                    Volver al inicio de sesión
                                </Button>
                            </div>
                        )}

                        <div className="relative">
                            <Separator className="bg-white/5" />
                            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#161616] px-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                                o
                            </span>
                        </div>

                        <div className="grid gap-3">
                            <Link
                                to="/login"
                                className="text-sm text-gray-400 hover:text-white transition-colors text-center"
                            >
                                Volver al inicio de sesión
                            </Link>
                            <Link
                                to="/register"
                                className="text-sm text-gray-400 hover:text-white transition-colors text-center"
                            >
                                Crear una cuenta nueva
                            </Link>
                        </div>
                    </CardContent>

                    <CardFooter />
                </Card>
            </div>
        </section>
    )
}
