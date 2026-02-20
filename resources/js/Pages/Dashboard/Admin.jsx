// Dashboard/Admin.jsx
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
    FileText,
    Heart,
    Building2,
    Shield,
    Ambulance,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Filter,
    AlertCircle,
    MapPin,
    UserPlus,
    FilePlus,
    Activity,
    Target,
    Award,
    Bell,
    Settings,
    RefreshCw,
    ChevronRight,
    UserCheck,
    Clock as ClockIcon,
    AlertTriangle,
    CheckCircle2,
    Home,
    FileCheck,
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
    BarChart,
    Bar,
} from "recharts";

export default function Admin({ stats = {} }) {
    const [loading, setLoading] = useState({});
    const [selectedPeriod, setSelectedPeriod] = useState("month");
    const [selectedSubCounty, setSelectedSubCounty] = useState("all");

    // Mock data - replace with actual data from backend
    const metrics = {
        totalCases: 2847,
        activeCases: 1243,
        resolvedCases: 1604,
        survivors: 2156,
        partners: 48,
        pendingApprovals: 7,
        urgentCases: 12,
        referralsToday: 45,
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

    const pwdStatistics = {
        total: 193,
        byType: [
            { type: "Physical", count: 89, color: "#3b82f6" },
            { type: "Visual", count: 34, color: "#f97316" },
            { type: "Hearing", count: 28, color: "#eab308" },
            { type: "Intellectual", count: 42, color: "#ef4444" },
        ],
    };

    const geographicDistribution = [
        { subCounty: "Kitui Central", cases: 423, survivors: 356, rate: 94 },
        { subCounty: "Kitui West", cases: 289, survivors: 245, rate: 87 },
        { subCounty: "Kitui East", cases: 198, survivors: 167, rate: 82 },
        { subCounty: "Mwingi Central", cases: 267, survivors: 234, rate: 91 },
        { subCounty: "Mwingi West", cases: 178, survivors: 145, rate: 79 },
        { subCounty: "Mwingi East", cases: 145, survivors: 123, rate: 76 },
    ];

    const partnerMetrics = {
        hospitals: 23,
        police: 18,
        ngos: 32,
        shelters: 7,
        total: 80,
    };

    const recentActivities = [
        {
            id: 1,
            user: "Dr. Sarah Mueni",
            action: "Added medical report",
            target: "Case #GBV-2025-089",
            time: "5 minutes ago",
            type: "medical",
        },
        {
            id: 2,
            user: "Sgt. John Odhiambo",
            action: "Updated police statement",
            target: "Case #GBV-2025-092",
            time: "15 minutes ago",
            type: "police",
        },
        {
            id: 3,
            user: "Mary Wambui",
            action: "Created new referral",
            target: "Kitui Hospital",
            time: "32 minutes ago",
            type: "referral",
        },
        {
            id: 4,
            user: "System",
            action: "Automated reminder sent",
            target: "5 pending reviews",
            time: "1 hour ago",
            type: "system",
        },
        {
            id: 5,
            user: "James Kilonzo",
            action: "Completed intake form",
            target: "New survivor #S-2025-156",
            time: "2 hours ago",
            type: "intake",
        },
        {
            id: 6,
            user: "Elizabeth Muthoni",
            action: "Concluded case",
            target: "Case #GBV-2025-078",
            time: "3 hours ago",
            type: "case",
        },
    ];

    const performanceMetrics = {
        referralRate: 94,
        avgResponseTime: "2.4h",
        satisfactionRate: 88,
        closureRate: 76,
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case "medical":
                return <Activity size={16} className="text-info" />;
            case "police":
                return <Shield size={16} className="text-danger" />;
            case "referral":
                return <ArrowUpRight size={16} className="text-success" />;
            case "system":
                return <RefreshCw size={16} className="text-secondary" />;
            case "intake":
                return <UserPlus size={16} className="text-primary" />;
            case "case":
                return <FileText size={16} className="text-warning" />;
            default:
                return <Activity size={16} />;
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
                        <h3 className="fw-bold mb-0">
                            {typeof value === "number"
                                ? value.toLocaleString()
                                : value}
                        </h3>
                        {subtitle && (
                            <small className="text-secondary">{subtitle}</small>
                        )}
                    </div>
                    <div
                        className="p-3 rounded-3"
                        style={{ backgroundColor: `${color}15` }}
                    >
                        <Icon size={24} color={color} />
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

    return (
        <AuthenticatedLayout>
            <div className="admin-dashboard">
                {/* Header with Quick Actions */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="fw-bold mb-1">Welcome back, Admin</h4>
                        <p className="text-secondary mb-0 d-flex align-items-center gap-2">
                            <MapPin size={16} />
                            Kitui County GBV Management System
                        </p>
                    </div>
                    <div className="d-flex gap-2 mt-2 mt-sm-0">
                        <Form.Select
                            size="sm"
                            value={selectedSubCounty}
                            onChange={(e) =>
                                setSelectedSubCounty(e.target.value)
                            }
                            className="rounded-pill border-0 bg-light"
                            style={{ width: "auto" }}
                        >
                            <option value="all">All Sub-Counties</option>
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
                            <Download size={16} />
                            Export
                        </Button>
                        <Button
                            variant="primary"
                            className="d-flex align-items-center gap-2 rounded-pill"
                        >
                            <FilePlus size={16} />
                            New Case
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
                            title="Survivors"
                            value={metrics.survivors}
                            icon={Heart}
                            color="#ef4444"
                            trend={{ positive: true, value: 8.1 }}
                        />
                    </Col>
                    <Col xl={3} lg={6} md={6}>
                        <StatCard
                            title="Partner Network"
                            value={metrics.partners}
                            icon={Building2}
                            color="#8b5cf6"
                            subtitle={`${metrics.pendingApprovals} pending approval`}
                        />
                    </Col>
                </Row>

                {/* Performance Metrics Row */}
                <Row className="g-3 mb-4">
                    <Col xl={3} md={6}>
                        <Card className="border-0 shadow-sm bg-gradient-primary text-white h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="bg-white text-dark bg-opacity-20 p-3 rounded-3">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <p className="small opacity-75 mb-1">
                                            Referral Rate
                                        </p>
                                        <h4 className="fw-bold mb-0">
                                            {performanceMetrics.referralRate}%
                                        </h4>
                                    </div>
                                </div>
                                <ProgressBar
                                    now={performanceMetrics.referralRate}
                                    variant="white"
                                    style={{
                                        height: "4px",
                                        borderRadius: "2px",
                                    }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={3} md={6}>
                        <Card className="border-0 shadow-sm bg-gradient-success text-white h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="bg-white text-dark bg-opacity-20 p-3 rounded-3">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <p className="small opacity-75 mb-1">
                                            Avg Response
                                        </p>
                                        <h4 className="fw-bold mb-0">
                                            {performanceMetrics.avgResponseTime}
                                        </h4>
                                    </div>
                                </div>
                                <small className="opacity-75">
                                    Target: 2.0h
                                </small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={3} md={6}>
                        <Card className="border-0 shadow-sm bg-gradient-warning text-white h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="bg-white text-dark bg-opacity-20 p-3 rounded-3">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <p className="small opacity-75 mb-1">
                                            Satisfaction
                                        </p>
                                        <h4 className="fw-bold mb-0">
                                            {
                                                performanceMetrics.satisfactionRate
                                            }
                                            %
                                        </h4>
                                    </div>
                                </div>
                                <small className="opacity-75">
                                    ↑ 5% from last month
                                </small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={3} md={6}>
                        <Card className="border-0 shadow-sm bg-gradient-info text-white h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="bg-white text-dark bg-opacity-20 p-3 rounded-3">
                                        <FileCheck size={24} />
                                    </div>
                                    <div>
                                        <p className="small opacity-75 mb-1">
                                            Closure Rate
                                        </p>
                                        <h4 className="fw-bold mb-0">
                                            {performanceMetrics.closureRate}%
                                        </h4>
                                    </div>
                                </div>
                                <ProgressBar
                                    now={performanceMetrics.closureRate}
                                    variant="white"
                                    style={{
                                        height: "4px",
                                        borderRadius: "2px",
                                    }}
                                />
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
                                        Case Trends & Referrals
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
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={caseTrends}>
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
                                        <RechartsTooltip />
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
                                        <Line
                                            type="monotone"
                                            dataKey="referrals"
                                            stroke="#f97316"
                                            strokeWidth={2}
                                            name="Referrals"
                                            dot={{ r: 4 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Header className="bg-white border-0 pt-4 px-4">
                                <h5 className="fw-bold mb-0">
                                    Case Distribution
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={200}>
                                    <RePieChart>
                                        <Pie
                                            data={caseDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
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
                                <div className="mt-3">
                                    {caseDistribution.map((item, index) => (
                                        <div
                                            key={index}
                                            className="d-flex justify-content-between align-items-center mb-2"
                                        >
                                            <div className="d-flex align-items-center gap-2">
                                                <div
                                                    style={{
                                                        width: "12px",
                                                        height: "12px",
                                                        backgroundColor:
                                                            item.color,
                                                        borderRadius: "3px",
                                                    }}
                                                />
                                                <small className="text-secondary">
                                                    {item.name}
                                                </small>
                                            </div>
                                            <span className="fw-semibold">
                                                {item.value}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
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
                                        PWD: {pwdStatistics.total}
                                    </Badge>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={250}>
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
                                    Partner Distribution
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <Row className="g-3">
                                    <Col sm={6}>
                                        <div className="bg-light rounded-3 p-3 text-center">
                                            <Ambulance
                                                size={32}
                                                className="text-primary mb-2"
                                            />
                                            <h3 className="fw-bold mb-0">
                                                {partnerMetrics.hospitals}
                                            </h3>
                                            <small className="text-secondary">
                                                Hospitals
                                            </small>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="bg-light rounded-3 p-3 text-center">
                                            <Shield
                                                size={32}
                                                className="text-danger mb-2"
                                            />
                                            <h3 className="fw-bold mb-0">
                                                {partnerMetrics.police}
                                            </h3>
                                            <small className="text-secondary">
                                                Police Stations
                                            </small>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="bg-light rounded-3 p-3 text-center">
                                            <Heart
                                                size={32}
                                                className="text-success mb-2"
                                            />
                                            <h3 className="fw-bold mb-0">
                                                {partnerMetrics.ngos}
                                            </h3>
                                            <small className="text-secondary">
                                                NGOs
                                            </small>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="bg-light rounded-3 p-3 text-center">
                                            <Home
                                                size={32}
                                                className="text-warning mb-2"
                                            />
                                            <h3 className="fw-bold mb-0">
                                                {partnerMetrics.shelters}
                                            </h3>
                                            <small className="text-secondary">
                                                Shelters
                                            </small>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="mt-3 text-center">
                                    <Button
                                        variant="link"
                                        className="text-decoration-none"
                                    >
                                        View All Partners (
                                        {partnerMetrics.total})
                                    </Button>
                                </div>
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
                                        Performance by Sub-County
                                    </h5>
                                    <div className="d-flex gap-2">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            className="rounded-pill"
                                        >
                                            <Filter
                                                size={14}
                                                className="me-1"
                                            />
                                            Filter
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            className="rounded-pill"
                                        >
                                            <Download
                                                size={14}
                                                className="me-1"
                                            />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Table hover className="align-middle">
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
                                                Active Cases
                                            </th>
                                            <th className="text-center">
                                                Resolved
                                            </th>
                                            <th className="text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {geographicDistribution.map(
                                            (region, index) => (
                                                <tr key={index}>
                                                    <td className="fw-semibold">
                                                        {region.subCounty}
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
                                                        {Math.round(
                                                            region.cases * 0.4,
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        {Math.round(
                                                            region.cases * 0.6,
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        <Button
                                                            variant="link"
                                                            size="sm"
                                                            className="text-decoration-none"
                                                        >
                                                            View Wards
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
            </div>

            <style type="text/css">{`
                .admin-dashboard .card {
                    border-radius: 20px;
                    transition: all 0.3s ease;
                }
                .admin-dashboard .card:hover {
                    box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
                }
                .admin-dashboard .btn {
                    border-radius: 12px;
                }
                .admin-dashboard .badge {
                    font-weight: 500;
                    padding: 0.5em 1em;
                }
                .admin-dashboard .table th {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #6b7280;
                }
                .admin-dashboard .progress {
                    border-radius: 10px;
                }
                .admin-dashboard .bg-gradient-primary {
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                }
                .admin-dashboard .bg-gradient-success {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                }
                .admin-dashboard .bg-gradient-warning {
                    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                }
                .admin-dashboard .bg-gradient-info {
                    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
                }
                .admin-dashboard .hover-shadow:hover {
                    transform: translateY(-4px);
                }
                .admin-dashboard .hover-bg:hover {
                    background-color: #f8fafc;
                    cursor: pointer;
                }
                .admin-dashboard .bg-primary-subtle {
                    background-color: #dbeafe;
                }
                .admin-dashboard .bg-success-subtle {
                    background-color: #d1fae5;
                }
                .admin-dashboard .bg-warning-subtle {
                    background-color: #fed7aa;
                }
                .admin-dashboard .bg-info-subtle {
                    background-color: #cffafe;
                }
                .admin-dashboard .bg-danger-subtle {
                    background-color: #fee2e2;
                }
                .admin-dashboard .tracking-wide {
                    letter-spacing: 0.05em;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
