import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AppLayout from "@/Layouts/AppLayout";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Badge,
    ProgressBar,
    Stack,
} from "react-bootstrap";
import {
    Shield,
    People,
    Building,
    FileText,
    Database,
    Activity,
    ArrowRight,
    CheckCircle,
    Clock,
    ShieldCheck,
    Lock,
    PersonPlus,
    GraphUp,
    ArrowRepeat,
    ExclamationTriangle,
    StarFill,
    ChatDots,
    Globe,
    CloudCheck,
    Fingerprint,
    HouseHeart,
    HeartPulse,
    ShieldShaded,
    Briefcase,
    ArrowUpRight,
    ArrowDownRight,
    Lightning,
    ShieldLock,
    Heart,
} from "react-bootstrap-icons";

export default function Home({ auth, laravelVersion, phpVersion }) {
    const [showStats, setShowStats] = useState(true);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [statsData, setStatsData] = useState({
        activeCases: 247,
        survivorsSupported: 183,
        ngosActive: 12,
        policeReports: 89,
        pendingReferrals: 34,
        resolvedToday: 12,
        responseTime: "4.2",
        satisfactionRate: "94",
    });

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const testimonials = [
        {
            quote: "This system has transformed how we coordinate care for survivors. Real-time updates save lives.",
            name: "Dr. Sarah Mueni",
            role: "Medical Director, Kitui Hospital",
            image: "https://via.placeholder.com/60",
        },
        {
            quote: "Integration with police systems means we can respond faster and document cases more effectively.",
            name: "Chief Inspector Odhiambo",
            role: "Gender Desk, Kitui Police",
            image: "https://via.placeholder.com/60",
        },
        {
            quote: "Survivors now receive seamless support from first response to long-term care.",
            name: "Jane Wambui",
            role: "Shelter Coordinator, Safe Haven NGO",
            image: "https://via.placeholder.com/60",
        },
    ];

    const partners = [
        {
            name: "UN Women",
            logo: "https://i.ibb.co/qLj29SwH/unwomen.png",
        },
        {
            name: "WHO",
            logo: "https://i.ibb.co/WvFCXQVJ/who.png",
        },
        {
            name: "Kitui County",
            logo: "https://i.ibb.co/wFx8ntNy/kituicounty.jpg",
        },
        {
            name: "National Police",
            logo: "https://i.ibb.co/JRw5Hy42/nationalpolice.jpg",
        },
        {
            name: "Kenya Red Cross",
            logo: "https://i.ibb.co/vxsmTcgg/redcross.png",
        },
        {
            name: "Amref",
            logo: "https://i.ibb.co/x8LsHtwX/amref.png",
        },
    ];

    const services = [
        {
            icon: HeartPulse,
            title: "Medical Support",
            description:
                "24/7 emergency care, forensic exams, and counseling at 17 partner facilities",
            color: "primary",
            link: "/medical",
        },
        {
            icon: ShieldShaded,
            title: "Police & Legal Aid",
            description:
                "Specialized gender desks, legal representation, and protection orders",
            color: "danger",
            link: "/legal",
        },
        {
            icon: HouseHeart,
            title: "Safe Shelters",
            description:
                "Confidential temporary housing with comprehensive support services",
            color: "success",
            link: "/shelters",
        },
        {
            icon: ChatDots,
            title: "Counseling",
            description:
                "Trauma-informed therapy, support groups, and crisis intervention",
            color: "info",
            link: "/counseling",
        },
        {
            icon: Briefcase,
            title: "Economic Empowerment",
            description:
                "Job training, financial literacy, and livelihood support",
            color: "warning",
            link: "/economic",
        },
        {
            icon: Heart,
            title: "Child Protection",
            description:
                "Specialized services for minors and dependent children",
            color: "purple",
            link: "/child-protection",
        },
    ];

    const stats = [
        {
            label: "Active Cases",
            value: "247",
            icon: FileText,
            change: "+12%",
            trend: "up",
            color: "primary",
        },
        {
            label: "Survivors Helped",
            value: "1,847",
            icon: People,
            change: "+23%",
            trend: "up",
            color: "success",
        },
        {
            label: "Partner Agencies",
            value: "43",
            icon: Building,
            change: "+5",
            trend: "up",
            color: "info",
        },
        {
            label: "Response Time",
            value: "4.2m",
            icon: Clock,
            change: "-18%",
            trend: "down",
            color: "warning",
        },
    ];

    const features = [
        {
            icon: Lightning,
            title: "Real-time Coordination",
            description: "Instant alerts and case updates across all agencies",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        {
            icon: ShieldLock,
            title: "Military-grade Encryption",
            description:
                "AES-256 encryption for all survivor data and communications",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        },
        {
            icon: GraphUp,
            title: "Predictive Analytics",
            description: "AI-powered risk assessment and resource allocation",
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        },
        {
            icon: ArrowRepeat,
            title: "Seamless Referrals",
            description:
                "Automated handoffs between hospitals, police, and shelters",
            gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        },
        {
            icon: Fingerprint,
            title: "Biometric Verification",
            description:
                "Secure survivor identification while protecting privacy",
            gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        },
        {
            icon: Globe,
            title: "Offline Capable",
            description:
                "Works in remote areas, syncs when connectivity returns",
            gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        },
    ];

    return (
        <>
            <Head title="Home - Kitui County GBV System" />
            <AppLayout>
                {/* Hero Section - Modern Gradient with Floating Elements */}
                <div className="position-relative overflow-hidden hero-section mb-5">
                    {/* Animated Background */}
                    <div className="animated-bg">
                        <div className="floating-shape shape-1"></div>
                        <div className="floating-shape shape-2"></div>
                        <div className="floating-shape shape-3"></div>
                        <div className="floating-shape shape-4"></div>
                    </div>

                    <Container
                        className="py-5 position-relative"
                        style={{ zIndex: 10 }}
                    >
                        <Row className="align-items-center min-vh-50 py-5">
                            <Col lg={7} className="mb-5 mb-lg-0">
                                {/* Badges */}
                                <div className="d-flex flex-wrap gap-2 mb-4 animate__animated animate__fadeInUp">
                                    <Badge
                                        bg="primary"
                                        className="px-3 py-2 rounded-pill shadow-sm"
                                        style={{ backdropFilter: "blur(10px)" }}
                                    >
                                        <Shield className="me-2" /> Kitui County
                                    </Badge>
                                    <Badge
                                        bg="danger"
                                        className="px-3 py-2 rounded-pill shadow-sm pulse"
                                    >
                                        <ExclamationTriangle className="me-2" />{" "}
                                        Emergency Response 24/7
                                    </Badge>
                                    <Badge
                                        bg="success"
                                        className="px-3 py-2 rounded-pill shadow-sm"
                                    >
                                        <CheckCircle className="me-2" /> ISO
                                        27001 Certified
                                    </Badge>
                                </div>

                                {/* Main Heading */}
                                <h1 className="display-3 fw-bold lh-1 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                                    Gender-Based Violence
                                    <span className="gradient-text d-block mt-2">
                                        Information Management System
                                    </span>
                                </h1>

                                {/* Description */}
                                <p className="lead text-secondary mb-4 animate__animated animate__fadeInUp animate__delay-2s">
                                    A coordinated, multi-sectoral response
                                    platform connecting survivors with
                                    healthcare, police, legal aid, and social
                                    support services across Kitui County.
                                </p>

                                {/* CTA Buttons */}
                                <Stack
                                    direction="horizontal"
                                    gap={3}
                                    className="flex-wrap animate__animated animate__fadeInUp animate__delay-3s"
                                >
                                    {auth.user ? (
                                        <Button
                                            as={Link}
                                            href="/dashboard"
                                            size="lg"
                                            className="px-5 py-3 rounded-pill gradient-btn"
                                        >
                                            <ShieldCheck className="me-2" />
                                            Go to Dashboard
                                            <ArrowRight className="ms-2" />
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                as={Link}
                                                href="/login"
                                                size="lg"
                                                className="px-5 py-3 rounded-pill gradient-btn"
                                            >
                                                <Lock className="me-2" />
                                                Secure Login
                                            </Button>
                                            <Button
                                                as={Link}
                                                href="/register"
                                                size="lg"
                                                variant="outline-primary"
                                                className="px-5 py-3 rounded-pill border-2"
                                            >
                                                <PersonPlus className="me-2" />
                                                Register Agency
                                            </Button>
                                        </>
                                    )}
                                </Stack>

                                {/* Trust Indicators */}
                                <div className="d-flex gap-4 mt-5 animate__animated animate__fadeInUp animate__delay-4s">
                                    <div className="d-flex align-items-center gap-2">
                                        <ShieldCheck
                                            className="text-success"
                                            size={20}
                                        />
                                        <span className="small text-secondary">
                                            GDPR Compliant
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <Fingerprint
                                            className="text-success"
                                            size={20}
                                        />
                                        <span className="small text-secondary">
                                            Biometric Ready
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <CloudCheck
                                            className="text-success"
                                            size={20}
                                        />
                                        <span className="small text-secondary">
                                            99.9% Uptime
                                        </span>
                                    </div>
                                </div>
                            </Col>

                            <Col lg={5}>
                                {/* Stats Card with Animation */}
                                <Card className="border-0 shadow-xl rounded-5 overflow-hidden animate__animated animate__fadeInRight">
                                    <Card.Body
                                        className="p-4"
                                        style={{
                                            background:
                                                "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
                                        }}
                                    >
                                        <div className="d-flex align-items-center gap-3 mb-4">
                                            <div className="bg-white bg-opacity-10 p-3 rounded-3">
                                                <Activity
                                                    size={32}
                                                    className="text-info"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-white mb-1">
                                                    Live Dashboard
                                                </h4>
                                                <p className="text-white-50 small mb-0">
                                                    Real-time statistics across
                                                    Kitui
                                                </p>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <Row className="g-3 mb-4">
                                            {stats.map((stat, index) => {
                                                const Icon = stat.icon;
                                                return (
                                                    <Col xs={6} key={index}>
                                                        <div className="bg-white bg-opacity-10 rounded-4 p-3">
                                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                                <Icon
                                                                    className={`text-${stat.color}`}
                                                                    size={16}
                                                                />
                                                                <small className="text-white-50">
                                                                    {stat.label}
                                                                </small>
                                                            </div>
                                                            <div className="d-flex align-items-end justify-content-between">
                                                                <h3 className="text-white mb-0">
                                                                    {stat.value}
                                                                </h3>
                                                                <span
                                                                    className={`text-${stat.trend === "up" ? "success" : "danger"} small d-flex align-items-center`}
                                                                >
                                                                    {stat.trend ===
                                                                    "up" ? (
                                                                        <ArrowUpRight />
                                                                    ) : (
                                                                        <ArrowDownRight />
                                                                    )}
                                                                    {
                                                                        stat.change
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                );
                                            })}
                                        </Row>

                                        {/* Progress */}
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <small className="text-white-50">
                                                    Monthly Target
                                                </small>
                                                <small className="text-white">
                                                    78%
                                                </small>
                                            </div>
                                            <ProgressBar
                                                now={78}
                                                variant="success"
                                                className="bg-white bg-opacity-10"
                                                style={{
                                                    height: "8px",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-white-50">
                                                <Clock
                                                    className="me-1"
                                                    size={12}
                                                />
                                                Updated 2 min ago
                                            </small>
                                            <Badge
                                                bg="success"
                                                className="rounded-pill px-3 py-2"
                                            >
                                                <Shield
                                                    className="me-1"
                                                    size={10}
                                                />
                                                Secure Connection
                                            </Badge>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* Partners Strip */}
                <Container
                    fluid
                    className="bg-light py-4 mb-5 border-top border-bottom"
                >
                    <Container>
                        <Row className="align-items-center">
                            <Col lg={2}>
                                <small className="text-secondary fw-semibold">
                                    TRUSTED PARTNERS
                                </small>
                            </Col>
                            <Col lg={10}>
                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
                                    {partners.map((partner, index) => (
                                        <div
                                            key={index}
                                            className="opacity-50 hover-opacity-100 transition-all"
                                        >
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="img-fluid"
                                                style={{
                                                    filter: "grayscale(1)",
                                                    maxWidth: "100px",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>

                {/* Services Section */}
                <Container className="mb-5">
                    <div className="text-center mb-5">
                        <Badge
                            bg="primary"
                            className="px-4 py-2 rounded-pill mb-3"
                        >
                            <Heart className="me-2" /> Comprehensive Support
                        </Badge>
                        <h2 className="display-5 fw-bold mb-3">
                            Integrated Care Services
                        </h2>
                        <p className="text-secondary col-lg-8 mx-auto">
                            A holistic approach to survivor support, connecting
                            every touchpoint in their journey to recovery and
                            empowerment.
                        </p>
                    </div>

                    <Row className="g-4">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <Col lg={4} md={6} key={index}>
                                    <Card className="h-100 border-0 shadow-sm hover-card rounded-4 overflow-hidden">
                                        <Card.Body className="p-4">
                                            <div
                                                className={`bg-${service.color} bg-opacity-10 p-3 rounded-3 d-inline-block mb-3`}
                                            >
                                                <Icon
                                                    className={`text-${service.color}`}
                                                    size={24}
                                                />
                                            </div>
                                            <Card.Title className="fw-bold mb-2">
                                                {service.title}
                                            </Card.Title>
                                            <Card.Text className="text-secondary small mb-3">
                                                {service.description}
                                            </Card.Text>
                                            <Button
                                                as={Link}
                                                href={service.link}
                                                variant="link"
                                                className="p-0 text-decoration-none fw-semibold"
                                            >
                                                Learn more{" "}
                                                <ArrowRight className="ms-1" />
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>

                {/* Features Showcase */}
                <Container fluid className="bg-light py-5 mb-5">
                    <Container>
                        <div className="text-center mb-5">
                            <Badge
                                bg="info"
                                className="px-4 py-2 rounded-pill mb-3"
                            >
                                <Lightning className="me-2" /> Next-Gen
                                Technology
                            </Badge>
                            <h2 className="display-5 fw-bold mb-3">
                                Built for Safety, Designed for Speed
                            </h2>
                            <p className="text-secondary col-lg-8 mx-auto">
                                Enterprise-grade security meets intuitive design
                                for first responders
                            </p>
                        </div>

                        <Row className="g-4">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <Col lg={4} md={6} key={index}>
                                        <Card className="h-100 border-0 shadow-sm hover-card rounded-4 overflow-hidden">
                                            <div
                                                className="p-4 text-white"
                                                style={{
                                                    background:
                                                        feature.gradient,
                                                }}
                                            >
                                                <Icon
                                                    size={32}
                                                    className="mb-3"
                                                />
                                                <h5 className="fw-bold mb-2">
                                                    {feature.title}
                                                </h5>
                                                <p className="small opacity-75 mb-0">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Container>
                </Container>

                {/* Testimonials Section */}
                <Container className="mb-5">
                    <Row className="align-items-center">
                        <Col lg={5} className="mb-4 mb-lg-0">
                            <Badge
                                bg="warning"
                                text="dark"
                                className="px-4 py-2 rounded-pill mb-3"
                            >
                                <StarFill className="me-2" /> Impact Stories
                            </Badge>
                            <h2 className="display-6 fw-bold mb-3">
                                What Our Partners Say
                            </h2>
                            <p className="text-secondary mb-4">
                                Hear from the agencies and professionals using
                                our platform to make a difference in survivors'
                                lives every day.
                            </p>

                            {/* Testimonial Navigation */}
                            <div className="d-flex gap-2">
                                {testimonials.map((_, index) => (
                                    <Button
                                        key={index}
                                        variant="link"
                                        className={`p-0 rounded-circle ${index === activeTestimonial ? "bg-primary" : "bg-secondary"}`}
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                        }}
                                        onClick={() =>
                                            setActiveTestimonial(index)
                                        }
                                    />
                                ))}
                            </div>
                        </Col>
                        <Col lg={7}>
                            <Card className="border-0 shadow-lg rounded-4 overflow-hidden testimonial-card">
                                <Card.Body className="p-5">
                                    <div className="d-flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                                                <ChatDots
                                                    className="text-primary"
                                                    size={32}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="fs-5 fw-light mb-4">
                                                "
                                                {
                                                    testimonials[
                                                        activeTestimonial
                                                    ].quote
                                                }
                                                "
                                            </p>
                                            <div>
                                                <h6 className="fw-bold mb-1">
                                                    {
                                                        testimonials[
                                                            activeTestimonial
                                                        ].name
                                                    }
                                                </h6>
                                                <small className="text-secondary">
                                                    {
                                                        testimonials[
                                                            activeTestimonial
                                                        ].role
                                                    }
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* CTA Section */}
                <Container fluid className="bg-primary bg-opacity-50 py-5">
                    <Container>
                        <Row className="align-items-center text-white">
                            <Col lg={8} className="mb-4 mb-lg-0">
                                <h2 className="display-6 fw-bold mb-3">
                                    Ready to make a difference?
                                </h2>
                                <p className="opacity-75 mb-0 col-lg-8">
                                    Join our network of partner agencies and
                                    help us build a safer Kitui County. Secure,
                                    confidential, and compliant with all data
                                    protection regulations.
                                </p>
                            </Col>
                            <Col lg={4} className="text-lg-end">
                                <Button
                                    as={Link}
                                    href="/contact"
                                    size="lg"
                                    variant="light"
                                    className="rounded-pill px-5 py-3 fw-semibold"
                                >
                                    Partner With Us
                                    <ArrowRight className="ms-2" />
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </AppLayout>

            <style type="text/css">{`
                .hero-section {
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    min-height: 80vh;
                }

                .animated-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .floating-shape {
                    position: absolute;
                    background: rgba(139, 92, 246, 0.1);
                    border-radius: 50%;
                    filter: blur(60px);
                }

                .shape-1 {
                    width: 300px;
                    height: 300px;
                    top: -150px;
                    right: -150px;
                    background: rgba(139, 92, 246, 0.2);
                    animation: float 20s infinite;
                }

                .shape-2 {
                    width: 400px;
                    height: 400px;
                    bottom: -200px;
                    left: -200px;
                    background: rgba(236, 72, 153, 0.15);
                    animation: float 25s infinite reverse;
                }

                .shape-3 {
                    width: 200px;
                    height: 200px;
                    top: 50%;
                    right: 20%;
                    background: rgba(59, 130, 246, 0.15);
                    animation: float 15s infinite;
                }

                .shape-4 {
                    width: 350px;
                    height: 350px;
                    bottom: 20%;
                    right: 10%;
                    background: rgba(16, 185, 129, 0.1);
                    animation: float 18s infinite reverse;
                }

                @keyframes float {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(50px, 50px) rotate(5deg); }
                    50% { transform: translate(100px, -50px) rotate(10deg); }
                    75% { transform: translate(-50px, 100px) rotate(5deg); }
                }

                .gradient-text {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .gradient-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    transition: all 0.3s ease;
                }

                .gradient-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px -5px rgba(102, 126, 234, 0.5);
                }

                .shadow-xl {
                    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
                }

                .hover-card {
                    transition: all 0.3s ease;
                }

                .hover-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2) !important;
                }

                .testimonial-card {
                    transition: all 0.3s ease;
                }

                .testimonial-card:hover {
                    transform: scale(1.02);
                }

                .pulse {
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .hover-opacity-100:hover {
                    opacity: 1 !important;
                }

                .transition-all {
                    transition: all 0.3s ease;
                }

                .min-vh-50 {
                    min-height: 50vh;
                }

                .animate__animated {
                    animation-duration: 1s;
                    animation-fill-mode: both;
                }

                .animate__delay-1s {
                    animation-delay: 0.2s;
                }

                .animate__delay-2s {
                    animation-delay: 0.4s;
                }

                .animate__delay-3s {
                    animation-delay: 0.6s;
                }

                .animate__delay-4s {
                    animation-delay: 0.8s;
                }

                @media (max-width: 768px) {
                    .display-3 {
                        font-size: 2.5rem;
                    }
                    
                    .display-5 {
                        font-size: 2rem;
                    }
                    
                    .floating-shape {
                        display: none;
                    }
                }
            `}</style>

            {/* Add Animate.css for animations */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            />
        </>
    );
}
