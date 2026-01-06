'use client'

import {
    BadgePercentIcon,
    ChartNoAxesCombinedIcon,
    DollarSignIcon,
    ShoppingBagIcon,
    TrendingUpIcon
} from 'lucide-react'

import { Bar, BarChart, Label, Pie, PieChart } from 'recharts'

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const salesPlanPercentage = 54
const totalBars = 24
const filledBars = Math.round((salesPlanPercentage * totalBars) / 100)

// Sales chart data
const salesChartData = Array.from({ length: totalBars }, (_, index) => {
    const date = new Date(2025, 5, 15)

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    return {
        date: formattedDate,
        sales: index < filledBars ? 315 : 0
    }
})

const salesChartConfig = {
    sales: {
        label: 'Sales'
    }
} satisfies ChartConfig

const MetricsData = [
    {
        icons: <TrendingUpIcon className='size-5' />,
        title: 'Sales trend',
        value: '$11,548'
    },
    {
        icons: <BadgePercentIcon className='size-5' />,
        title: 'Discount offers',
        value: '$1,326'
    },
    {
        icons: <DollarSignIcon className='size-5' />,
        title: 'Net profit',
        value: '$17,356'
    },
    {
        icons: <ShoppingBagIcon className='size-5' />,
        title: 'Total orders',
        value: '248'
    }
]

const revenueChartData = [
    { month: 'january', sales: 340, fill: 'var(--color-january)' },
    { month: 'february', sales: 200, fill: 'var(--color-february)' },
    { month: 'march', sales: 200, fill: 'var(--color-march)' }
]

const revenueChartConfig = {
    sales: {
        label: 'Sales'
    },
    january: {
        label: 'January',
        color: 'var(--primary)'
    },
    february: {
        label: 'February',
        color: 'color-mix(in oklab, var(--primary) 60%, transparent)'
    },
    march: {
        label: 'March',
        color: 'color-mix(in oklab, var(--primary) 20%, transparent)'
    }
} satisfies ChartConfig

const SalesMetricsCard = ({ className }: { className?: string }) => {
    return (
        <Card className={cn('flex flex-col border border-white/5 bg-surface/90 backdrop-blur-xl hover:border-accent/10 transition-all duration-500 rounded-[2rem] shadow-2xl', className)}>
            <CardContent className='space-y-8 pt-8'>
                <div className='grid gap-8 lg:grid-cols-5'>
                    <div className='flex flex-col gap-8 lg:col-span-3'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-2xl font-black tracking-tight uppercase'>Sales Metrics</span>
                                <span className='text-muted/50 text-[10px] font-bold uppercase tracking-widest'>Performance Overview</span>
                            </div>
                            <div className='flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/5'>
                                <div className='size-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20'>
                                    <ChartNoAxesCombinedIcon className='size-5 text-white' />
                                </div>
                                <div className='flex flex-col pr-4'>
                                    <span className='text-sm font-bold'>Sandy's Co.</span>
                                    <span className='text-[10px] text-muted font-bold uppercase tracking-tight'>Enterprise Plan</span>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            {MetricsData.map((metric, index) => (
                                <div key={index} className='flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/20 transition-all group'>
                                    <div className='size-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center group-hover:border-accent/30 transition-colors'>
                                        <div className='text-muted group-hover:text-accent transition-colors'>
                                            {metric.icons}
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-[10px] text-muted font-bold uppercase tracking-widest'>{metric.title}</span>
                                        <span className='text-xl font-black tracking-tighter group-hover:text-accent transition-colors'>{metric.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='lg:col-span-2'>
                        <div className='h-full flex flex-col rounded-[2rem] bg-white/5 border border-white/5 p-6 relative overflow-hidden group'>
                            <div className='relative z-10 space-y-6'>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-sm font-black uppercase tracking-[0.2em]'>Revenue Goal</span>
                                    <span className='text-3xl font-black tracking-tighter'>$50,000</span>
                                </div>

                                <div className='flex-1 flex items-center justify-center py-4'>
                                    <ChartContainer config={revenueChartConfig} className='mx-auto aspect-square w-full max-w-[200px]'>
                                        <PieChart>
                                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                            <Pie
                                                data={revenueChartData}
                                                dataKey='sales'
                                                nameKey='month'
                                                innerRadius={60}
                                                strokeWidth={5}
                                                stroke='transparent'
                                            >
                                                <Label
                                                    content={({ viewBox }) => {
                                                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                                            return (
                                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                                                                    <tspan x={viewBox.cx} y={viewBox.cy} className='fill-text text-3xl font-black tracking-tighter'>
                                                                        {salesPlanPercentage}%
                                                                    </tspan>
                                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted text-[10px] font-bold uppercase tracking-widest'>
                                                                        Reached
                                                                    </tspan>
                                                                </text>
                                                            )
                                                        }
                                                    }}
                                                />
                                            </Pie>
                                        </PieChart>
                                    </ChartContainer>
                                </div>

                                <div className='space-y-2'>
                                    <div className='flex justify-between text-[10px] font-bold uppercase tracking-widest'>
                                        <span className='text-muted'>Progress</span>
                                        <span className='text-accent'>{salesPlanPercentage}%</span>
                                    </div>
                                    <Progress value={salesPlanPercentage} className='h-2 bg-white/5' />
                                </div>
                            </div>
                            {/* Decorative glow */}
                            <div className='absolute -bottom-10 -left-10 size-32 bg-accent/5 blur-3xl rounded-full group-hover:bg-accent/10 transition-colors' />
                        </div>
                    </div>
                </div>

                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-sm font-black uppercase tracking-[0.2em]'>Sales Trend</span>
                            <span className='text-xs text-muted font-medium'>Daily performance tracking</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest'>
                                <div className='size-2 rounded-full bg-accent' />
                                Current Period
                            </div>
                        </div>
                    </div>
                    <ChartContainer config={salesChartConfig} className='h-[120px] w-full'>
                        <BarChart accessibilityLayer data={salesChartData}>
                            <Bar
                                dataKey='sales'
                                fill='rgb(var(--color-accent))'
                                radius={[4, 4, 0, 0]}
                                opacity={0.8}
                                className='hover:opacity-100 transition-opacity cursor-pointer'
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default SalesMetricsCard
