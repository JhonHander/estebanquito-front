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
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Github, Lock, Mail, ArrowRight, ArrowLeft, Chrome } from "lucide-react"
import { authService } from "@features/auth/api/auth.service"
import { useAuth } from "@features/auth/hooks/useAuth"

export default function StyledLoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [loginData, setLoginData] = useState({
        accountNumber: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { refreshUser } = useAuth()
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

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        })
        setError("")
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!loginData.accountNumber || !loginData.password) {
            setError("Por favor, complete todos los campos")
            return
        }

        setLoading(true)
        setError("")

        try {
            const response = await authService.login(loginData)
            if (response && response.token) {
                localStorage.setItem("token", response.token)
                await refreshUser()
                navigate("/dashboard")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error al iniciar sesión")
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
            -webkit-box-shadow: 0 0 0 30px #0a0a0a inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
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
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span style={{ transform: 'translateY(-1px)' }}>Atrás</span>
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
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold tracking-tight">Bienvenido</CardTitle>
                        <CardDescription style={{ color: "rgb(var(--color-muted))" }}>
                            Inicia sesión en tu cuenta
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-5">
                        <form onSubmit={handleLogin} className="space-y-5">
                            {error && (
                                <div
                                    className="p-3 rounded-md text-sm border border-red-500/20"
                                    style={{
                                        backgroundColor: "rgba(255, 68, 68, 0.1)",
                                        color: "#ff4444",
                                    }}
                                >
                                    {error}
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="email" style={{ color: "rgb(var(--color-text))" }}>
                                    Número de Cuenta
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "rgb(var(--color-muted))" }} />
                                    <Input
                                        id="email"
                                        name="accountNumber"
                                        type="text"
                                        placeholder="Tu número de cuenta"
                                        value={loginData.accountNumber}
                                        onChange={handleChange}
                                        className="pl-10 bg-black/20 border-white/9 focus:border-accent/30 transition-colors"
                                        style={{
                                            color: "rgb(var(--color-text))",
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" style={{ color: "rgb(var(--color-text))" }}>
                                    Contraseña
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "rgb(var(--color-muted))" }} />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        className="pl-10 pr-10 bg-black/20 border-white/9 focus:border-accent/30 transition-colors"
                                        style={{
                                            color: "rgb(var(--color-text))",
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:text-white transition-colors"
                                        style={{ color: "rgb(var(--color-muted))" }}
                                        onClick={() => setShowPassword((v) => !v)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                    />
                                    <Label htmlFor="remember" className="text-xs cursor-pointer" style={{ color: "rgb(var(--color-muted))" }}>
                                        Recuérdame
                                    </Label>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="text-xs hover:text-accent transition-colors"
                                    style={{ color: "rgb(var(--color-muted))" }}
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 rounded-lg font-bold text-white shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all active:scale-[0.98]"
                                style={{
                                    backgroundColor: "rgb(var(--color-accent))",
                                }}
                            >
                                {loading ? "Iniciando sesión..." : "Continuar"}
                            </Button>
                        </form>

                        <div className="relative">
                            <Separator className="bg-white/10" />
                            <span
                                className="absolute left-1/2 -translate-x-1/2 -top-3 px-2 text-[10px] uppercase tracking-[0.2em] font-medium"
                                style={{
                                    backgroundColor: "rgb(22 22 22)",
                                    color: "rgb(var(--color-muted))",
                                }}
                            >
                                o
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="h-10 rounded-lg border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                                style={{
                                    color: "rgb(var(--color-text))",
                                }}
                            >
                                <Github className="h-4 w-4 mr-2" />
                                GitHub
                            </Button>
                            <Button
                                variant="outline"
                                className="h-10 rounded-lg border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                                style={{
                                    color: "rgb(var(--color-text))",
                                }}
                            >
                                <Chrome className="h-4 w-4 mr-2" />
                                Google
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-center text-xs border-t border-white/5 pt-4" style={{ color: "rgb(var(--color-muted))" }}>
                        ¿No tienes una cuenta?
                        <Link
                            to="/register"
                            className="ml-1 font-bold hover:text-accent transition-colors"
                            style={{ color: "rgb(var(--color-text))" }}
                        >
                            Crea una
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}
