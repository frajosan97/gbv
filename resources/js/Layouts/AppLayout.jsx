import { usePage, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    Container,
    Navbar,
    Nav,
    Button,
    Dropdown,
    Badge,
    Row,
    Col,
    Offcanvas,
    Stack,
} from "react-bootstrap";
import {
    Shield,
    Bell,
    PersonCircle,
    BoxArrowRight,
    Grid,
    FileText,
    Heart,
    Building,
    People,
    Clock,
    Lock,
    MenuUp,
    ExclamationTriangle,
    Envelope,
    Telephone,
    GeoAlt,
    InfoCircle,
    Book,
    Newspaper,
    Calendar,
    QuestionCircle,
    Briefcase,
    ShieldCheck,
    Fingerprint,
    FileEarmarkLock,
    Database,
    ArrowRight,
    ChevronRight,
    Facebook,
    Twitter,
    Linkedin,
    Youtube,
    Globe,
} from "react-bootstrap-icons";

export default function AppLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Public navigation - organized for better UX
    const publicNavigation = [
        {
            name: "Home",
            href: "/",
            icon: Grid,
            current: false,
            description: "Return to homepage",
        },
        {
            name: "About GBV",
            href: "/about",
            icon: InfoCircle,
            current: false,
            description: "Learn about gender-based violence",
        },
        {
            name: "Get Help",
            href: "/get-help",
            icon: Heart,
            current: false,
            description: "Immediate support and resources",
            badge: "URGENT",
        },
        {
            name: "Resources",
            href: "/resources",
            icon: FileText,
            current: false,
            description: "Guides, reports, and educational materials",
        },
        {
            name: "Partner Agencies",
            href: "/agencies",
            icon: Building,
            current: false,
            description: "Our network of support organizations",
        },
        {
            name: "News & Events",
            href: "/news",
            icon: Newspaper,
            current: false,
            description: "Latest updates and community events",
        },
        {
            name: "Contact",
            href: "/contact",
            icon: Envelope,
            current: false,
            description: "Get in touch with our team",
        },
    ];

    // Footer navigation sections
    const footerSections = [
        {
            title: "About Us",
            icon: InfoCircle,
            links: [
                { name: "Our Mission", href: "/mission" },
                { name: "Team & Leadership", href: "/team" },
                { name: "Annual Reports", href: "/reports" },
                { name: "Careers", href: "/careers" },
                { name: "Media Center", href: "/media" },
            ],
        },
        {
            title: "Get Support",
            icon: Heart,
            links: [
                {
                    name: "Emergency Helpline",
                    href: "/helpline",
                    badge: "24/7",
                },
                { name: "Find a Shelter", href: "/shelters" },
                { name: "Legal Aid", href: "/legal-aid" },
                { name: "Counseling Services", href: "/counseling" },
                { name: "Support Groups", href: "/support-groups" },
            ],
        },
        {
            title: "Resources",
            icon: Book,
            links: [
                { name: "Educational Materials", href: "/materials" },
                { name: "Research & Data", href: "/research" },
                { name: "Policy Documents", href: "/policies" },
                { name: "Training Modules", href: "/training" },
                { name: "FAQs", href: "/faqs" },
            ],
        },
        {
            title: "Get Involved",
            icon: People,
            links: [
                { name: "Volunteer", href: "/volunteer" },
                { name: "Donate", href: "/donate" },
                { name: "Partnerships", href: "/partnerships" },
                { name: "Advocacy", href: "/advocacy" },
                { name: "Events Calendar", href: "/events" },
            ],
        },
    ];

    // Emergency contacts
    const emergencyContacts = [
        {
            name: "GBV Helpline",
            number: "1195",
            description: "24/7 Confidential",
        },
        {
            name: "Police Emergency",
            number: "999",
            description: "Immediate Danger",
        },
        {
            name: "Kitui Hospital",
            number: "020-2222",
            description: "Medical Emergency",
        },
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Top Emergency Bar - Enhanced */}
            <div className="bg-danger text-white py-2 px-3 position-relative overflow-hidden">
                <Container fluid="lg">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small">
                        <div className="d-flex align-items-center gap-3 mb-2 mb-md-0">
                            <Telephone className="me-2" size={16} />
                            <span className="fw-bold">
                                24/7 GBV Helpline: 1195
                            </span>
                            <span
                                className="vr d-none d-md-inline bg-white opacity-50"
                                style={{ height: "16px" }}
                            />
                            <span className="d-none d-md-inline">
                                Toll-Free | Confidential
                            </span>
                        </div>
                        <div className="d-flex gap-3">
                            <span className="d-flex align-items-center">
                                <Clock className="me-1" size={12} />
                                Available 24/7
                            </span>
                            <span className="d-flex align-items-center">
                                <Shield className="me-1" size={12} />
                                Confidential
                            </span>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Flash Messages - Enhanced */}
            {flash?.success && (
                <div className="bg-success text-white py-2 px-3 text-center small animate__animated animate__fadeInDown">
                    <Container fluid="lg">
                        <Shield className="me-2" />
                        {flash.success}
                    </Container>
                </div>
            )}
            {flash?.error && (
                <div className="bg-danger text-white py-2 px-3 text-center small animate__animated animate__fadeInDown">
                    <Container fluid="lg">
                        <ExclamationTriangle className="me-2" />
                        {flash.error}
                    </Container>
                </div>
            )}

            {/* Main Navbar - Enhanced with scroll effect */}
            <Navbar
                bg="white"
                expand={false}
                className={`py-3 sticky-top transition-navbar ${scrolled ? "shadow-lg" : "border-bottom shadow-sm"}`}
                style={{ backdropFilter: scrolled ? "blur(10px)" : "none" }}
            >
                <Container fluid="lg">
                    {/* Brand - Enhanced */}
                    <Navbar.Brand
                        as={Link}
                        href="/"
                        className="d-flex align-items-center gap-2"
                    >
                        <div className="bg-primary bg-gradient p-2 rounded-3 shadow-sm">
                            <Shield className="text-white" size={28} />
                        </div>
                        <div>
                            <span className="fw-bold text-dark fs-5">
                                Kitui County
                            </span>
                            <small className="d-block text-secondary lh-1">
                                GBV Information System
                            </small>
                        </div>
                    </Navbar.Brand>

                    {/* Right Side Icons & Desktop Menu Toggle */}
                    <div className="d-flex align-items-center gap-2">
                        {/* Emergency Button - Mobile */}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="d-lg-none rounded-pill"
                            href="tel:1195"
                        >
                            <Telephone size={14} />
                        </Button>

                        {/* Portal Access - Simplified for mobile */}
                        {user ? (
                            <Dropdown align="end" className="d-none d-md-block">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="text-dark p-0 border-0 text-decoration-none"
                                >
                                    <div className="d-flex align-items-center gap-2 bg-light rounded-pill pe-3">
                                        <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                                            <PersonCircle
                                                size={24}
                                                className="text-primary"
                                            />
                                        </div>
                                        <div className="d-none d-xl-block text-start">
                                            <div className="fw-semibold small">
                                                {user.name}
                                            </div>
                                            <small className="text-secondary">
                                                {user.role || "GBV Officer"}
                                            </small>
                                        </div>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    align="end"
                                    className="py-2 shadow border-0"
                                >
                                    <Dropdown.Header className="text-secondary small">
                                        <ShieldCheck
                                            className="me-1"
                                            size={12}
                                        />
                                        Secure Portal
                                    </Dropdown.Header>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as={Link} href="/dashboard">
                                        <Grid className="me-2" size={16} />{" "}
                                        Dashboard
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} href="/profile">
                                        <PersonCircle
                                            className="me-2"
                                            size={16}
                                        />{" "}
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} href="/messages">
                                        <Envelope className="me-2" size={16} />{" "}
                                        Messages
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        as={Link}
                                        href="/logout"
                                        method="post"
                                        className="text-danger"
                                    >
                                        <BoxArrowRight
                                            className="me-2"
                                            size={16}
                                        />{" "}
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <div className="d-none d-md-flex gap-2">
                                <Button
                                    as={Link}
                                    href="/login"
                                    variant="outline-primary"
                                    // size="sm"
                                    className="rounded-pill px-4"
                                >
                                    <Lock className="me-2" size={14} /> Staff
                                    Login
                                </Button>
                                <Button
                                    as={Link}
                                    href="/register"
                                    variant="primary"
                                    // size="sm"
                                    className="rounded-pill px-4 shadow-sm"
                                >
                                    Register Agency
                                </Button>
                            </div>
                        )}

                        {/* Offcanvas Toggle Button - Enhanced */}
                        <Button
                            variant="link"
                            className="text-dark p-2 ms-2"
                            onClick={() => setShowOffcanvas(true)}
                            style={{
                                backgroundColor: "#f8f9fa",
                                borderRadius: "10px",
                            }}
                        >
                            <MenuUp size={20} />
                        </Button>
                    </div>
                </Container>
            </Navbar>

            {/* Enhanced Offcanvas Menu */}
            <Offcanvas
                show={showOffcanvas}
                onHide={() => setShowOffcanvas(false)}
                placement="end"
                className="border-0"
                style={{ width: "min(400px, 100%)" }}
                scroll={true}
                backdrop={true}
            >
                <Offcanvas.Header className="d-flex justify-content-between border-bottom bg-light">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-3">
                            <Shield className="text-primary" size={24} />
                        </div>
                        <div>
                            <Offcanvas.Title className="fw-bold">
                                Kitui County GBV
                            </Offcanvas.Title>
                            <small className="text-secondary">
                                Information System
                            </small>
                        </div>
                    </div>
                    <Button
                        variant="link"
                        className="text-dark p-0 border-0"
                        onClick={() => setShowOffcanvas(false)}
                    >
                        <BoxArrowRight size={20} />
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">
                    {/* User Section - Mobile */}
                    {user ? (
                        <div className="p-3 bg-light border-bottom">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                                    <PersonCircle
                                        size={32}
                                        className="text-primary"
                                    />
                                </div>
                                <div>
                                    <h6 className="mb-1">{user.name}</h6>
                                    <small className="text-secondary d-block">
                                        {user.role || "GBV Officer"}
                                    </small>
                                    <Badge bg="success" pill className="mt-1">
                                        <Shield className="me-1" size={10} />{" "}
                                        Authenticated
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-3 bg-light border-bottom">
                            <h6 className="mb-2">Portal Access</h6>
                            <div className="d-flex gap-2">
                                <Button
                                    as={Link}
                                    href="/login"
                                    variant="primary"
                                    // size="sm"
                                    className="flex-fill rounded-pill"
                                    onClick={() => setShowOffcanvas(false)}
                                >
                                    <Lock className="me-2" /> Staff Login
                                </Button>
                                <Button
                                    as={Link}
                                    href="/register"
                                    variant="outline-primary"
                                    // size="sm"
                                    className="flex-fill rounded-pill"
                                    onClick={() => setShowOffcanvas(false)}
                                >
                                    Register
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Navigation Sections */}
                    <div className="p-3">
                        <h6 className="text-uppercase small fw-semibold text-secondary mb-3">
                            Main Menu
                        </h6>
                        <Nav className="flex-column">
                            {publicNavigation.map((item) => (
                                <Nav.Link
                                    key={item.name}
                                    as={Link}
                                    href={item.href}
                                    className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-dark mb-1"
                                    active={item.current}
                                    onClick={() => setShowOffcanvas(false)}
                                    style={{
                                        transition: "all 0.2s",
                                        backgroundColor: item.current
                                            ? "#f0f0f0"
                                            : "transparent",
                                    }}
                                >
                                    <item.icon
                                        size={18}
                                        className="text-primary"
                                    />
                                    <div className="flex-grow-1">
                                        <span className="fw-semibold d-block">
                                            {item.name}
                                            {item.badge && (
                                                <Badge
                                                    bg="danger"
                                                    className="ms-2"
                                                    pill
                                                >
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </span>
                                        <small className="text-secondary">
                                            {item.description}
                                        </small>
                                    </div>
                                    <ChevronRight
                                        size={14}
                                        className="text-secondary"
                                    />
                                </Nav.Link>
                            ))}
                        </Nav>

                        {/* Emergency Contacts in Offcanvas */}
                        <hr className="my-4" />
                        <h6 className="text-uppercase small fw-semibold text-secondary mb-3">
                            Emergency Contacts
                        </h6>
                        {emergencyContacts.map((contact, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center gap-3 mb-3"
                            >
                                <Telephone className="text-danger" size={16} />
                                <div>
                                    <span className="fw-bold d-block">
                                        {contact.number}
                                    </span>
                                    <small className="text-secondary">
                                        {contact.name} - {contact.description}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Page Header (optional) - Enhanced */}
            {header && (
                <div className="bg-light border-bottom py-4">
                    <Container fluid="lg">
                        <h2 className="mb-0 fw-semibold d-flex align-items-center gap-2">
                            {header}
                        </h2>
                    </Container>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-grow-1">{children}</main>

            {/* Enhanced Footer - Comprehensive */}
            <footer className="bg-dark text-white-50 pt-5 pb-3">
                <Container fluid="lg">
                    {/* Main Footer Sections */}
                    <Row className="g-4 pb-5">
                        {/* About Section */}
                        <Col lg={4} className="mb-4 mb-lg-0">
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <div className="bg-primary bg-opacity-10 p-2 rounded-3">
                                    <Shield
                                        className="text-primary"
                                        size={24}
                                    />
                                </div>
                                <h5 className="text-white mb-0">
                                    Kitui County GBV System
                                </h5>
                            </div>
                            <p className="small opacity-75 mb-4">
                                A coordinated, multi-sectoral response platform
                                connecting survivors with healthcare, police,
                                legal aid, and social support services across
                                Kitui County.
                            </p>

                            {/* Security Badges */}
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                <Badge
                                    bg="primary"
                                    className="rounded-pill px-3 py-2"
                                >
                                    <Lock className="me-1" /> 256-bit Encryption
                                </Badge>
                                <Badge
                                    bg="success"
                                    className="rounded-pill px-3 py-2"
                                >
                                    <Fingerprint className="me-1" /> MFA Enabled
                                </Badge>
                                <Badge
                                    bg="info"
                                    className="rounded-pill px-3 py-2"
                                >
                                    <FileEarmarkLock className="me-1" /> HIPAA
                                    Compliant
                                </Badge>
                                <Badge
                                    bg="warning"
                                    text="dark"
                                    className="rounded-pill px-3 py-2"
                                >
                                    <Database className="me-1" /> ISO 27001
                                </Badge>
                            </div>

                            {/* Social Links */}
                            <h6 className="text-white mb-3">Connect With Us</h6>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    className="rounded-circle p-2"
                                    href="#"
                                >
                                    <Facebook size={16} />
                                </Button>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    className="rounded-circle p-2"
                                    href="#"
                                >
                                    <Twitter size={16} />
                                </Button>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    className="rounded-circle p-2"
                                    href="#"
                                >
                                    <Linkedin size={16} />
                                </Button>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    className="rounded-circle p-2"
                                    href="#"
                                >
                                    <Youtube size={16} />
                                </Button>
                            </div>
                        </Col>

                        {/* Dynamic Footer Sections */}
                        {footerSections.map((section, index) => (
                            <Col key={index} lg={2} md={6}>
                                <h6 className="text-white mb-3 d-flex align-items-center gap-2">
                                    <section.icon size={14} />
                                    {section.title}
                                </h6>
                                <Nav className="flex-column">
                                    {section.links.map((link, linkIndex) => (
                                        <Nav.Link
                                            key={linkIndex}
                                            as={Link}
                                            href={link.href}
                                            className="text-white-50 p-0 mb-2 small"
                                        >
                                            {link.name}
                                            {link.badge && (
                                                <Badge
                                                    bg="danger"
                                                    className="ms-2"
                                                    pill
                                                >
                                                    {link.badge}
                                                </Badge>
                                            )}
                                        </Nav.Link>
                                    ))}
                                </Nav>
                            </Col>
                        ))}
                    </Row>

                    {/* Emergency Contacts Bar */}
                    <div className="bg-white bg-opacity-10 rounded-4 p-4 my-4">
                        <Row className="align-items-center g-4">
                            <Col lg={3}>
                                <h6 className="text-white mb-0 d-flex align-items-center gap-2">
                                    <Telephone className="text-danger" />
                                    Emergency Contacts
                                </h6>
                            </Col>
                            {emergencyContacts.map((contact, index) => (
                                <Col key={index} lg={3} md={6}>
                                    <div className="d-flex align-items-center gap-3">
                                        <Telephone
                                            className="text-danger"
                                            size={20}
                                        />
                                        <div>
                                            <div className="fw-bold text-white">
                                                {contact.number}
                                            </div>
                                            <small className="text-white-50">
                                                {contact.name}
                                            </small>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Quick Links Bar */}
                    <div className="border-top border-bottom border-white border-opacity-10 py-4 my-4">
                        <Row className="g-3">
                            <Col md={8}>
                                <div className="d-flex flex-wrap gap-3">
                                    <Link
                                        href="/privacy"
                                        className="text-white-50 text-decoration-none small"
                                    >
                                        Privacy Policy
                                    </Link>
                                    <span className="text-white-50">|</span>
                                    <Link
                                        href="/terms"
                                        className="text-white-50 text-decoration-none small"
                                    >
                                        Terms of Use
                                    </Link>
                                    <span className="text-white-50">|</span>
                                    <Link
                                        href="/accessibility"
                                        className="text-white-50 text-decoration-none small"
                                    >
                                        Accessibility
                                    </Link>
                                    <span className="text-white-50">|</span>
                                    <Link
                                        href="/sitemap"
                                        className="text-white-50 text-decoration-none small"
                                    >
                                        Sitemap
                                    </Link>
                                    <span className="text-white-50">|</span>
                                    <Link
                                        href="/disclaimer"
                                        className="text-white-50 text-decoration-none small"
                                    >
                                        Disclaimer
                                    </Link>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="d-flex gap-3 justify-content-md-end">
                                    <Globe
                                        className="text-white-50"
                                        size={16}
                                    />
                                    <select className="bg-transparent text-white-50 border-0 small">
                                        <option>English</option>
                                        <option>Swahili</option>
                                        <option>Kamba</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Copyright and Accreditation */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small">
                        <span>
                            © {new Date().getFullYear()} Kitui County
                            Government. All rights reserved. Version 2.0.0
                        </span>
                        <div className="d-flex gap-3 mt-2 mt-md-0">
                            <span className="d-flex align-items-center gap-1">
                                <ShieldCheck
                                    className="text-success"
                                    size={12}
                                />
                                Secure Connection
                            </span>
                            <span className="d-flex align-items-center gap-1">
                                <Lock className="text-success" size={12} />
                                End-to-End Encrypted
                            </span>
                        </div>
                    </div>

                    {/* Accreditation */}
                    <div className="text-center mt-4 pt-3 border-top border-white border-opacity-10">
                        <small className="opacity-50">
                            In partnership with the National Government, UN
                            Women, and local implementing partners. Committed to
                            protecting survivors and ending gender-based
                            violence in Kitui County.
                        </small>
                    </div>
                </Container>
            </footer>

            <style type="text/css">{`
                .nav-link.active {
                    color: var(--bs-primary) !important;
                    background-color: rgba(139, 92, 246, 0.1) !important;
                }
                .nav-link:hover:not(.active) {
                    background-color: #f8f9fa;
                }
                .dropdown-toggle::after {
                    display: none;
                }
                .transition-navbar {
                    transition: all 0.3s ease;
                }
                .offcanvas {
                    transition: transform 0.3s ease-in-out;
                }
                .offcanvas.show {
                    transform: none;
                }
                .bg-gradient-primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                .hover-lift {
                    transition: transform 0.2s ease;
                }
                .hover-lift:hover {
                    transform: translateY(-2px);
                }
                @media (max-width: 768px) {
                    .navbar-brand small {
                        font-size: 0.7rem;
                    }
                }
            `}</style>
        </div>
    );
}
