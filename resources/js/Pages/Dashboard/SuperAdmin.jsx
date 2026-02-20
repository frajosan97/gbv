// Dashboard/SuperAdmin.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    Badge,
    Button,
    ProgressBar,
    Dropdown,
    Table,
    Form,
} from "react-bootstrap";
import {
    BarChart3,
    TrendingUp,
    FileText,
    Heart,
    Building2,
    Shield,
    Ambulance,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Eye,
    AlertCircle,
    MapPin,
    UserPlus,
    Activity,
    Bell,
    Settings,
    ChevronRight,
    MessageCircle,
    Clock as ClockIcon,
    AlertTriangle,
    CheckCircle2,
    Database,
    Shield as ShieldIcon,
    Lock,
    Server,
    HardDrive,
    Wifi,
    Users as UsersIcon,
    Globe2,
    Key,
    Activity as ActivityIcon,
    BarChart4,
    LineChart as LineChartIcon,
    PieChart as PieChartIcon,
    Download as DownloadIcon,
    RefreshCcw,
    Filter as FilterIcon,
    Home,
    Info,
    Award as AwardIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown,
    Minus,
    Calendar as CalendarIcon,
    Plus as PlusIcon,
    Minus as MinusIcon,
    X as XIcon,
    DollarSign as DollarSignIcon,
    Key as KeyIcon,
    Lock as LockIcon,
    Eye as EyeIcon,
    Bell as BellIcon,
    Clock3 as Clock3Icon,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart as RePieChart,
    Pie,
    Cell,
    Line,
    Legend,
    BarChart,
    Bar,
    ComposedChart,
} from "recharts";
import { Head } from "@inertiajs/react";

export default function SuperAdmin({ stats = {} }) {
    const [loading, setLoading] = useState({});
    const [selectedPeriod, setSelectedPeriod] = useState("month");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [notifications, setNotifications] = useState([]);
    const [showNotificationPanel, setShowNotificationPanel] = useState(false);

    // Mock data - replace with actual data from backend
    const metrics = {
        totalCases: 2847,
        activeCases: 1243,
        resolvedCases: 1604,
        totalSurvivors: 2156,
        totalPartners: 48,
        totalReferrals: 892,
        pendingReferrals: 124,
        totalUsers: 156,
        systemHealth: {
            uptime: "99.9%",
            apiCalls: 15420,
            storageUsed: 76,
            lastBackup: "2025-02-20 03:00 AM",
            activeUsers: 89,
        },
    };

    const caseTrends = [
        { month: "Aug", cases: 320, resolved: 280, referrals: 120 },
        { month: "Sep", cases: 350, resolved: 310, referrals: 135 },
        { month: "Oct", cases: 380, resolved: 340, referrals: 148 },
        { month: "Nov", cases: 410, resolved: 370, referrals: 162 },
        { month: "Dec", cases: 390, resolved: 360, referrals: 158 },
        { month: "Jan", cases: 430, resolved: 390, referrals: 175 },
        { month: "Feb", cases: 450, resolved: 410, referrals: 190 },
    ];

    const caseDistribution = [
        { name: "Physical Abuse", value: 35, color: "#ef4444" },
        { name: "Sexual Abuse", value: 25, color: "#f97316" },
        { name: "Psychological", value: 20, color: "#eab308" },
        { name: "Economic Abuse", value: 12, color: "#3b82f6" },
        { name: "Cyberbullying", value: 8, color: "#8b5cf6" },
    ];

    const ageDisaggregation = [
        { bracket: "0-16", count: 456, color: "#3b82f6" },
        { bracket: "17-35", count: 1245, color: "#f97316" },
        { bracket: "36-60", count: 378, color: "#eab308" },
        { bracket: "60+", count: 77, color: "#ef4444" },
    ];

    const pwdStatistics = [
        { type: "Physical", count: 89, color: "#3b82f6" },
        { type: "Visual", count: 34, color: "#f97316" },
        { type: "Hearing", count: 28, color: "#eab308" },
        { type: "Intellectual", count: 42, color: "#ef4444" },
    ];

    const geographicDistribution = [
        { region: "Kitui Central", cases: 423, survivors: 356, rate: 94 },
        { region: "Kitui West", cases: 289, survivors: 245, rate: 87 },
        { region: "Kitui East", cases: 198, survivors: 167, rate: 82 },
        { region: "Mwingi Central", cases: 267, survivors: 234, rate: 91 },
        { region: "Mwingi West", cases: 178, survivors: 145, rate: 79 },
        { region: "Mwingi East", cases: 145, survivors: 123, rate: 76 },
    ];

    const partnerPerformance = [
        {
            name: "Kitui County Referral Hospital",
            type: "Hospital",
            cases: 342,
            resolved: 298,
            responseTime: "1.2h",
            rating: 4.8,
            region: "Kitui Central",
        },
        {
            name: "Mwingi Level 4 Hospital",
            type: "Hospital",
            cases: 234,
            resolved: 201,
            responseTime: "1.5h",
            rating: 4.7,
            region: "Mwingi Central",
        },
        {
            name: "Kitui Police Station",
            type: "Police",
            cases: 289,
            resolved: 245,
            responseTime: "0.8h",
            rating: 4.6,
            region: "Kitui Central",
        },
        {
            name: "Mwingi Police Station",
            type: "Police",
            cases: 198,
            resolved: 167,
            responseTime: "1.1h",
            rating: 4.4,
            region: "Mwingi Central",
        },
        {
            name: "LVCT Health Kitui",
            type: "NGO",
            cases: 156,
            resolved: 142,
            responseTime: "2.1h",
            rating: 4.9,
            region: "Kitui Central",
        },
        {
            name: "International Rescue Committee",
            type: "NGO",
            cases: 134,
            resolved: 118,
            responseTime: "2.4h",
            rating: 4.7,
            region: "Kitui West",
        },
        {
            name: "Kitui Women Safe House",
            type: "Shelter",
            cases: 89,
            resolved: 76,
            responseTime: "3.2h",
            rating: 4.5,
            region: "Kitui Central",
        },
    ];

    const systemAlerts = [
        {
            id: 1,
            type: "danger",
            title: "Critical Security Alert",
            message:
                "Multiple failed login attempts detected from IP 192.168.1.100",
            time: "5 minutes ago",
        },
        {
            id: 2,
            type: "warning",
            title: "Storage Almost Full",
            message: "System storage at 85% capacity. Cleanup recommended.",
            time: "15 minutes ago",
        },
        {
            id: 3,
            type: "info",
            title: "New Partner Pending",
            message: "3 new hospital partners pending approval",
            time: "25 minutes ago",
        },
        {
            id: 4,
            type: "success",
            title: "Backup Completed",
            message: "System backup completed successfully at 03:00 AM",
            time: "1 hour ago",
        },
        {
            id: 5,
            type: "warning",
            title: "API Rate Limit",
            message: "API rate limit at 78% for Kitui Central",
            time: "2 hours ago",
        },
    ];

    const userActivity = [
        { hour: "00:00", active: 12, new: 2 },
        { hour: "02:00", active: 8, new: 1 },
        { hour: "04:00", active: 5, new: 0 },
        { hour: "06:00", active: 15, new: 3 },
        { hour: "08:00", active: 45, new: 8 },
        { hour: "10:00", active: 78, new: 12 },
        { hour: "12:00", active: 89, new: 15 },
        { hour: "14:00", active: 92, new: 14 },
        { hour: "16:00", active: 87, new: 11 },
        { hour: "18:00", active: 65, new: 7 },
        { hour: "20:00", active: 43, new: 4 },
        { hour: "22:00", active: 23, new: 2 },
    ];

    const securityMetrics = [
        { name: "Failed Logins", value: 23, color: "#ef4444" },
        { name: "Suspicious Activities", value: 12, color: "#f97316" },
        { name: "Locked Accounts", value: 4, color: "#eab308" },
        { name: "API Violations", value: 8, color: "#3b82f6" },
    ];

    const getAlertIcon = (type) => {
        switch (type) {
            case "danger":
                return <AlertTriangle size={16} className="text-danger" />;
            case "warning":
                return <AlertCircle size={16} className="text-warning" />;
            case "info":
                return <Info size={16} className="text-info" />;
            case "success":
                return <CheckCircle2 size={16} className="text-success" />;
            default:
                return <AlertCircle size={16} />;
        }
    };

    const StatCard = ({ title, value, icon: Icon, trend, color, subtitle }) => (
        <Card className="border-0 shadow-sm hover-shadow transition-all h-100">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <p className="text-secondary small fw-semibold mb-1 text-uppercase tracking-wide">
                            {title}
                        </p>
                        <h2 className="fw-bold mb-0 display-6">
                            {typeof value === "number"
                                ? value.toLocaleString()
                                : value}
                        </h2>
                        {subtitle && (
                            <small className="text-secondary">{subtitle}</small>
                        )}
                    </div>
                    <div
                        className="p-3 rounded-3"
                        style={{ backgroundColor: `${color}15` }}
                    >
                        <Icon size={28} color={color} />
                    </div>
                </div>
                {trend && (
                    <div className="d-flex align-items-center gap-2 mt-2">
                        <Badge
                            bg={trend.positive ? "success" : "danger"}
                            className="rounded-pill d-flex align-items-center gap-1 px-2 py-1"
                        >
                            {trend.positive ? (
                                <ArrowUpRight size={14} />
                            ) : (
                                <ArrowDownRight size={14} />
                            )}
                            {trend.value}%
                        </Badge>
                        <small className="text-secondary">vs last month</small>
                    </div>
                )}
            </Card.Body>
        </Card>
    );

    const ProgressCard = ({
        title,
        value,
        max,
        color,
        icon: Icon,
        subtitle,
    }) => (
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                        className="p-2 rounded-3"
                        style={{ backgroundColor: `${color}15` }}
                    >
                        <Icon size={20} color={color} />
                    </div>
                    <div className="flex-grow-1">
                        <h6 className="fw-semibold mb-1">{title}</h6>
                        <ProgressBar
                            now={(value / max) * 100}
                            variant={color.replace("#", "")}
                            style={{ height: "8px", borderRadius: "4px" }}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between small">
                    <span className="text-secondary">
                        {subtitle || "Progress"}
                    </span>
                    <span className="fw-semibold">
                        {value}/{max}
                        {max === 100 && "%"}
                    </span>
                </div>
            </Card.Body>
        </Card>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Super Admin Dashboard" />

            <div className="super-admin-dashboard">
                {/* Header with Global Controls */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="fw-bold mb-1">Super Admin Dashboard</h3>
                        <p className="text-secondary mb-0 d-flex align-items-center gap-2">
                            <Globe2 size={16} />
                            System-wide overview and analytics
                        </p>
                    </div>
                    <div className="d-flex gap-2 mt-2 mt-sm-0">
                        <Form.Select
                            size="sm"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="rounded-pill border-0 bg-light"
                            style={{ width: "auto" }}
                        >
                            <option value="all">All Regions</option>
                            <option value="kitui-central">Kitui Central</option>
                            <option value="kitui-west">Kitui West</option>
                            <option value="kitui-east">Kitui East</option>
                            <option value="mwingi-central">
                                Mwingi Central
                            </option>
                            <option value="mwingi-west">Mwingi West</option>
                            <option value="mwingi-east">Mwingi East</option>
                        </Form.Select>
                        <Button
                            variant="outline-primary"
                            className="d-flex align-items-center gap-2 rounded-pill"
                        >
                            <DownloadIcon size={16} />
                            Export
                        </Button>
                        <Button
                            variant="primary"
                            className="d-flex align-items-center gap-2 rounded-pill"
                        >
                            <RefreshCcw size={16} />
                            Sync Data
                        </Button>
                    </div>
                </div>

                {/* Key Metrics Row */}
                <Row className="g-3 mb-4">
                    <Col xl={3} lg={6} md={6}>
                        <StatCard
                            title="Total Cases"
                            value={metrics.totalCases}
                            icon={FileText}
                            color="#3b82f6"
                            trend={{ positive: true, value: 12.5 }}
                        />
                    </Col>
                    <Col xl={3} lg={6} md={6}>
                        <StatCard
                            title="Active Cases"
                            value={metrics.activeCases}
                            icon={Activity}
                            color="#f97316"
                            trend={{ positive: false, value: 2.3 }}
                        />
                    </Col>
                    <Col xl={3} lg={6} md={6}>
                        <StatCard
                            title="Total Survivors"
                            value={metrics.totalSurvivors}
                            icon={Heart}
                            color="#ef4444"
                            trend={{ positive: true, value: 8.1 }}
                        />
                    </Col>
                    <Col xl={3} lg={6} md={6}>
                        <StatCard
                            title="Partner Network"
                            value={metrics.totalPartners}
                            icon={Building2}
                            color="#8b5cf6"
                            subtitle="Across 4 sectors"
                        />
                    </Col>
                </Row>

                {/* System Health Row */}
                <Row className="g-3 mb-4">
                    <Col xl={3} lg={6}>
                        <Card className="border-0 shadow-sm bg-gradient-primary text-white h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="bg-white bg-opacity-20 p-3 rounded-3">
                                        <Server size={24} />
                                    </div>
                                    <div>
                                        <p className="small opacity-75 mb-1">
                                            System Uptime
                                        </p>
                                        <h3 className="fw-bold mb-0">
                                            {metrics.systemHealth.uptime}
                                        </h3>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <small className="opacity-75">
                                            Last 30 days
                                        </small>
                                        <small className="opacity-75">
                                            99.9% target
                                        </small>
                                    </div>
                                    <ProgressBar
                                        now={99.9}
                                        variant="white"
                                        style={{ height: "4px" }}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={3} lg={6}>
                        <Card className="border-0 shadow-sm bg-gradient-success text-white h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="bg-white bg-opacity-20 p-3 rounded-3">
                                        <Wifi size={24} />
                                    </div>
                                    <div>
                                        <p className="small opacity-75 mb-1">
                                            API Calls Today
                                        </p>
                                        <h3 className="fw-bold mb-0">
                                            {metrics.systemHealth.apiCalls.toLocaleString()}
                                        </h3>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <Badge
                                            bg="light"
                                            text="dark"
                                            className="rounded-pill"
                                        >
                                            +24% vs yesterday
                                        </Badge>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={3} lg={6}>
                        <Card className="border-0 shadow-sm bg-gradient-warning text-white h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="bg-white bg-opacity-20 p-3 rounded-3">
                                        <HardDrive size={24} />
                                    </div>
                                    <div>
                                        <p className="small opacity-75 mb-1">
                                            Storage Used
                                        </p>
                                        <h3 className="fw-bold mb-0">
                                            {metrics.systemHealth.storageUsed}%
                                        </h3>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <ProgressBar
                                        now={metrics.systemHealth.storageUsed}
                                        variant="white"
                                        style={{ height: "4px" }}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={3} lg={6}>
                        <Card className="border-0 shadow-sm bg-gradient-info text-white h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="bg-white bg-opacity-20 p-3 rounded-3">
                                        <UsersIcon size={24} />
                                    </div>
                                    <div>
                                        <p className="small opacity-75 mb-1">
                                            Active Users
                                        </p>
                                        <h3 className="fw-bold mb-0">
                                            {metrics.systemHealth.activeUsers}
                                        </h3>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <small className="opacity-75">
                                        Peak: 156 users
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Charts Row */}
                <Row className="g-3 mb-4">
                    <Col xl={8}>
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-0 pt-4 px-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bold mb-0">
                                        System-wide Case Trends
                                    </h5>
                                    <div className="d-flex gap-2">
                                        <Button
                                            variant={
                                                selectedPeriod === "week"
                                                    ? "primary"
                                                    : "light"
                                            }
                                            size="sm"
                                            onClick={() =>
                                                setSelectedPeriod("week")
                                            }
                                            className="rounded-pill"
                                        >
                                            Week
                                        </Button>
                                        <Button
                                            variant={
                                                selectedPeriod === "month"
                                                    ? "primary"
                                                    : "light"
                                            }
                                            size="sm"
                                            onClick={() =>
                                                setSelectedPeriod("month")
                                            }
                                            className="rounded-pill"
                                        >
                                            Month
                                        </Button>
                                        <Button
                                            variant={
                                                selectedPeriod === "year"
                                                    ? "primary"
                                                    : "light"
                                            }
                                            size="sm"
                                            onClick={() =>
                                                setSelectedPeriod("year")
                                            }
                                            className="rounded-pill"
                                        >
                                            Year
                                        </Button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={350}>
                                    <ComposedChart data={caseTrends}>
                                        <defs>
                                            <linearGradient
                                                id="casesGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#3b82f6"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#3b82f6"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                            <linearGradient
                                                id="resolvedGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#10b981"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#10b981"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e7eb"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            stroke="#6b7280"
                                        />
                                        <YAxis stroke="#6b7280" />
                                        <RechartsTooltip
                                            contentStyle={{
                                                backgroundColor: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                boxShadow:
                                                    "0 4px 12px rgba(0,0,0,0.1)",
                                            }}
                                        />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="cases"
                                            stroke="#3b82f6"
                                            fill="url(#casesGradient)"
                                            strokeWidth={2}
                                            name="New Cases"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="resolved"
                                            stroke="#10b981"
                                            fill="url(#resolvedGradient)"
                                            strokeWidth={2}
                                            name="Resolved"
                                        />
                                        <Bar
                                            dataKey="referrals"
                                            barSize={20}
                                            fill="#f97316"
                                            name="Referrals"
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Header className="bg-white border-0 pt-4 px-4">
                                <h5 className="fw-bold mb-0">
                                    Case Distribution by Type
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={250}>
                                    <RePieChart>
                                        <Pie
                                            data={caseDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({ name, percent }) =>
                                                `${name} ${(percent * 100).toFixed(0)}%`
                                            }
                                            labelLine={false}
                                        >
                                            {caseDistribution.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={entry.color}
                                                    />
                                                ),
                                            )}
                                        </Pie>
                                        <RechartsTooltip />
                                    </RePieChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Demographics Row */}
                <Row className="g-3 mb-4">
                    <Col xl={6}>
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-0 pt-4 px-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bold mb-0">
                                        Age Disaggregation
                                    </h5>
                                    <Badge bg="info" className="rounded-pill">
                                        PWD:{" "}
                                        {pwdStatistics.reduce(
                                            (acc, curr) => acc + curr.count,
                                            0,
                                        )}
                                    </Badge>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={ageDisaggregation}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e7eb"
                                        />
                                        <XAxis
                                            dataKey="bracket"
                                            stroke="#6b7280"
                                        />
                                        <YAxis stroke="#6b7280" />
                                        <RechartsTooltip />
                                        <Bar
                                            dataKey="count"
                                            fill="#3b82f6"
                                            radius={[4, 4, 0, 0]}
                                        >
                                            {ageDisaggregation.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={entry.color}
                                                    />
                                                ),
                                            )}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-0 pt-4 px-4">
                                <h5 className="fw-bold mb-0">
                                    PWD Statistics by Type
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={pwdStatistics}
                                        layout="vertical"
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e7eb"
                                        />
                                        <XAxis type="number" stroke="#6b7280" />
                                        <YAxis
                                            dataKey="type"
                                            type="category"
                                            stroke="#6b7280"
                                        />
                                        <RechartsTooltip />
                                        <Bar
                                            dataKey="count"
                                            radius={[0, 4, 4, 0]}
                                        >
                                            {pwdStatistics.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={entry.color}
                                                    />
                                                ),
                                            )}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Geographic Distribution */}
                <Row className="g-3 mb-4">
                    <Col xl={12}>
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-0 pt-4 px-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bold mb-0">
                                        Geographic Distribution by Sub-County
                                    </h5>
                                    <Button
                                        variant="link"
                                        className="text-decoration-none d-flex align-items-center gap-1"
                                    >
                                        Drill Down <ChevronRight size={16} />
                                    </Button>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Table
                                    hover
                                    responsive
                                    className="align-middle"
                                >
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Sub-County</th>
                                            <th className="text-center">
                                                Total Cases
                                            </th>
                                            <th className="text-center">
                                                Survivors
                                            </th>
                                            <th className="text-center">
                                                Referral Rate
                                            </th>
                                            <th className="text-center">
                                                Performance
                                            </th>
                                            <th className="text-center">
                                                Trend
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {geographicDistribution.map(
                                            (region, index) => (
                                                <tr key={index}>
                                                    <td className="fw-semibold">
                                                        {region.region}
                                                    </td>
                                                    <td className="text-center">
                                                        {region.cases}
                                                    </td>
                                                    <td className="text-center">
                                                        {region.survivors}
                                                    </td>
                                                    <td className="text-center">
                                                        <Badge
                                                            bg={
                                                                region.rate >=
                                                                90
                                                                    ? "success"
                                                                    : region.rate >=
                                                                        80
                                                                      ? "warning"
                                                                      : "danger"
                                                            }
                                                            className="rounded-pill"
                                                        >
                                                            {region.rate}%
                                                        </Badge>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <ProgressBar
                                                                now={
                                                                    region.rate
                                                                }
                                                                variant={
                                                                    region.rate >=
                                                                    90
                                                                        ? "success"
                                                                        : region.rate >=
                                                                            80
                                                                          ? "warning"
                                                                          : "danger"
                                                                }
                                                                style={{
                                                                    width: "100px",
                                                                    height: "6px",
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {region.rate > 90 ? (
                                                            <TrendingUp
                                                                size={16}
                                                                className="text-success"
                                                            />
                                                        ) : region.rate > 80 ? (
                                                            <Minus
                                                                size={16}
                                                                className="text-warning"
                                                            />
                                                        ) : (
                                                            <TrendingDown
                                                                size={16}
                                                                className="text-danger"
                                                            />
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="link"
                                                            size="sm"
                                                            className="text-decoration-none"
                                                        >
                                                            View Ward Data
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Partner Performance and Security */}
                <Row className="g-3 mb-4">
                    <Col xl={8}>
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-0 pt-4 px-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bold mb-0">
                                        Partner Performance Across Regions
                                    </h5>
                                    <Button
                                        variant="link"
                                        className="text-decoration-none d-flex align-items-center gap-1"
                                    >
                                        View All <ChevronRight size={16} />
                                    </Button>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Table
                                    hover
                                    responsive
                                    className="align-middle"
                                >
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Partner</th>
                                            <th>Type</th>
                                            <th>Region</th>
                                            <th className="text-center">
                                                Cases
                                            </th>
                                            <th className="text-center">
                                                Resolved
                                            </th>
                                            <th className="text-center">
                                                Response
                                            </th>
                                            <th className="text-center">
                                                Rating
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {partnerPerformance.map(
                                            (partner, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div className="bg-light p-2 rounded-3">
                                                                {partner.type ===
                                                                    "Hospital" && (
                                                                    <Ambulance
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                )}
                                                                {partner.type ===
                                                                    "Police" && (
                                                                    <Shield
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                )}
                                                                {partner.type ===
                                                                    "NGO" && (
                                                                    <Heart
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                )}
                                                                {partner.type ===
                                                                    "Shelter" && (
                                                                    <Home
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            <span className="fw-semibold">
                                                                {partner.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Badge
                                                            bg={
                                                                partner.type ===
                                                                "Hospital"
                                                                    ? "primary"
                                                                    : partner.type ===
                                                                        "Police"
                                                                      ? "danger"
                                                                      : partner.type ===
                                                                          "NGO"
                                                                        ? "success"
                                                                        : "warning"
                                                            }
                                                            className="rounded-pill"
                                                        >
                                                            {partner.type}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-1">
                                                            <MapPin
                                                                size={14}
                                                                className="text-secondary"
                                                            />
                                                            <small>
                                                                {partner.region}
                                                            </small>
                                                        </div>
                                                    </td>
                                                    <td className="text-center fw-semibold">
                                                        {partner.cases}
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <span>
                                                                {
                                                                    partner.resolved
                                                                }
                                                            </span>
                                                            <small className="text-success">
                                                                (
                                                                {Math.round(
                                                                    (partner.resolved /
                                                                        partner.cases) *
                                                                        100,
                                                                )}
                                                                %)
                                                            </small>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <Badge
                                                            bg={
                                                                parseFloat(
                                                                    partner.responseTime,
                                                                ) < 2
                                                                    ? "success"
                                                                    : parseFloat(
                                                                            partner.responseTime,
                                                                        ) < 3
                                                                      ? "warning"
                                                                      : "danger"
                                                            }
                                                            className="rounded-pill"
                                                        >
                                                            {
                                                                partner.responseTime
                                                            }
                                                        </Badge>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                                            <span className="fw-semibold">
                                                                {partner.rating}
                                                            </span>
                                                            <small className="text-warning">
                                                                ★
                                                            </small>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Dropdown align="end">
                                                            <Dropdown.Toggle
                                                                variant="link"
                                                                className="text-dark p-0 border-0"
                                                            >
                                                                <MoreVertical
                                                                    size={16}
                                                                />
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item>
                                                                    <Eye
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="me-2"
                                                                    />
                                                                    View Details
                                                                </Dropdown.Item>
                                                                <Dropdown.Item>
                                                                    <MessageCircle
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="me-2"
                                                                    />
                                                                    Contact
                                                                </Dropdown.Item>
                                                                <Dropdown.Item>
                                                                    <BarChart3
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="me-2"
                                                                    />
                                                                    Performance
                                                                    Report
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Header className="bg-white border-0 pt-4 px-4">
                                <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                                    <ShieldIcon
                                        size={18}
                                        className="text-danger"
                                    />
                                    Security Overview
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="mb-4">
                                    <h6 className="fw-semibold mb-3">
                                        Security Metrics
                                    </h6>
                                    {securityMetrics.map((metric, index) => (
                                        <div
                                            key={index}
                                            className="d-flex justify-content-between align-items-center mb-2"
                                        >
                                            <div className="d-flex align-items-center gap-2">
                                                <div
                                                    style={{
                                                        width: "10px",
                                                        height: "10px",
                                                        backgroundColor:
                                                            metric.color,
                                                        borderRadius: "3px",
                                                    }}
                                                />
                                                <small className="text-secondary">
                                                    {metric.name}
                                                </small>
                                            </div>
                                            <span className="fw-semibold">
                                                {metric.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-4">
                                    <h6 className="fw-semibold mb-3">
                                        Recent Security Events
                                    </h6>
                                    <div className="bg-light p-3 rounded-3">
                                        <div className="d-flex align-items-center gap-3 mb-2">
                                            <AlertTriangle
                                                size={16}
                                                className="text-danger"
                                            />
                                            <div>
                                                <small className="fw-semibold d-block">
                                                    Brute Force Attempt
                                                </small>
                                                <small className="text-secondary">
                                                    IP: 192.168.1.100
                                                </small>
                                            </div>
                                            <small className="text-secondary ms-auto">
                                                5m ago
                                            </small>
                                        </div>
                                        <div className="d-flex align-items-center gap-3 mb-2">
                                            <Lock
                                                size={16}
                                                className="text-warning"
                                            />
                                            <div>
                                                <small className="fw-semibold d-block">
                                                    Account Locked
                                                </small>
                                                <small className="text-secondary">
                                                    User: john.doe
                                                </small>
                                            </div>
                                            <small className="text-secondary ms-auto">
                                                15m ago
                                            </small>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <Key
                                                size={16}
                                                className="text-success"
                                            />
                                            <div>
                                                <small className="fw-semibold d-block">
                                                    API Key Regenerated
                                                </small>
                                                <small className="text-secondary">
                                                    Kitui Hospital
                                                </small>
                                            </div>
                                            <small className="text-secondary ms-auto">
                                                1h ago
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h6 className="fw-semibold mb-3">
                                        System Status
                                    </h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        <Badge
                                            bg="success"
                                            className="rounded-pill d-flex align-items-center gap-1 p-2"
                                        >
                                            <CheckCircle2 size={12} />
                                            WAF Active
                                        </Badge>
                                        <Badge
                                            bg="success"
                                            className="rounded-pill d-flex align-items-center gap-1 p-2"
                                        >
                                            <CheckCircle2 size={12} />
                                            Rate Limiting
                                        </Badge>
                                        <Badge
                                            bg="warning"
                                            className="rounded-pill d-flex align-items-center gap-1 p-2"
                                        >
                                            <AlertCircle size={12} />
                                            SSL Renewal (7d)
                                        </Badge>
                                        <Badge
                                            bg="success"
                                            className="rounded-pill d-flex align-items-center gap-1 p-2"
                                        >
                                            <CheckCircle2 size={12} />
                                            Encryption OK
                                        </Badge>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* User Activity and System Health */}
                <Row className="g-3">
                    <Col xl={6}>
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-0 pt-4 px-4">
                                <h5 className="fw-bold mb-0">
                                    User Activity (24h)
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={userActivity}>
                                        <defs>
                                            <linearGradient
                                                id="activeGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#3b82f6"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#3b82f6"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e7eb"
                                        />
                                        <XAxis
                                            dataKey="hour"
                                            stroke="#6b7280"
                                        />
                                        <YAxis stroke="#6b7280" />
                                        <RechartsTooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="active"
                                            stroke="#3b82f6"
                                            fill="url(#activeGradient)"
                                            strokeWidth={2}
                                            name="Active Users"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="new"
                                            stroke="#f97316"
                                            strokeWidth={2}
                                            name="New Users"
                                            dot={{ r: 4 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-0 pt-4 px-4">
                                <h5 className="fw-bold mb-0">Quick Actions</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row className="g-2">
                                    <Col sm={6}>
                                        <Button
                                            variant="outline-primary"
                                            className="w-100 py-3 d-flex flex-column align-items-center gap-2 border-2"
                                        >
                                            <UserPlus size={24} />
                                            <span>Create Admin User</span>
                                        </Button>
                                    </Col>
                                    <Col sm={6}>
                                        <Button
                                            variant="outline-success"
                                            className="w-100 py-3 d-flex flex-column align-items-center gap-2 border-2"
                                        >
                                            <Building2 size={24} />
                                            <span>Approve Partner</span>
                                        </Button>
                                    </Col>
                                    <Col sm={6}>
                                        <Button
                                            variant="outline-warning"
                                            className="w-100 py-3 d-flex flex-column align-items-center gap-2 border-2"
                                        >
                                            <Database size={24} />
                                            <span>Run Backup</span>
                                        </Button>
                                    </Col>
                                    <Col sm={6}>
                                        <Button
                                            variant="outline-info"
                                            className="w-100 py-3 d-flex flex-column align-items-center gap-2 border-2"
                                        >
                                            <Settings size={24} />
                                            <span>System Config</span>
                                        </Button>
                                    </Col>
                                    <Col sm={6}>
                                        <Button
                                            variant="outline-danger"
                                            className="w-100 py-3 d-flex flex-column align-items-center gap-2 border-2"
                                        >
                                            <ShieldIcon size={24} />
                                            <span>Security Audit</span>
                                        </Button>
                                    </Col>
                                    <Col sm={6}>
                                        <Button
                                            variant="outline-secondary"
                                            className="w-100 py-3 d-flex flex-column align-items-center gap-2 border-2"
                                        >
                                            <BarChart4 size={24} />
                                            <span>Generate Report</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            <style type="text/css">{`
                .super-admin-dashboard .card {
                    border-radius: 20px;
                    transition: all 0.3s ease;
                }
                .super-admin-dashboard .card:hover {
                    box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
                }
                .super-admin-dashboard .btn {
                    border-radius: 12px;
                }
                .super-admin-dashboard .badge {
                    font-weight: 500;
                    padding: 0.5em 1em;
                }
                .super-admin-dashboard .table th {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #6b7280;
                }
                .super-admin-dashboard .progress {
                    border-radius: 10px;
                }
                .super-admin-dashboard .bg-gradient-primary {
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                }
                .super-admin-dashboard .bg-gradient-success {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                }
                .super-admin-dashboard .bg-gradient-warning {
                    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                }
                .super-admin-dashboard .bg-gradient-info {
                    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
                }
                .super-admin-dashboard .hover-shadow:hover {
                    transform: translateY(-4px);
                }
                .super-admin-dashboard .tracking-wide {
                    letter-spacing: 0.05em;
                }
                .super-admin-dashboard .display-6 {
                    font-size: 2.5rem;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
