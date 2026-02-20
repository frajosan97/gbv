import { usePage, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Badge,
    Button,
    Dropdown,
    Image,
    Stack,
    Spinner,
    ProgressBar,
} from "react-bootstrap";
import {
    Shield,
    Bell,
    PersonCircle,
    BoxArrowRight,
    Grid,
    FileText,
    People,
    Building,
    Heart,
    Clock,
    Lock,
    MenuUp,
    ChevronRight,
    ExclamationTriangle,
    Envelope,
    PersonBadge,
    Diagram3,
    FileEarmarkLock,
    Database,
    Activity,
    Search,
    Gear,
    ArrowLeftRight,
    FileCheck,
    BarChart,
} from "react-bootstrap-icons";

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash, errors } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            text: "New case referral from Kitui Police",
            time: "5m ago",
            unread: true,
            type: "referral",
        },
        {
            id: 2,
            text: "Medical report uploaded - Case #GBV-2025-089",
            time: "15m ago",
            unread: true,
            type: "document",
        },
        {
            id: 3,
            text: "Shelter capacity alert: Kitui Women Centre",
            time: "1h ago",
            unread: false,
            type: "alert",
        },
        {
            id: 4,
            text: "Case #GBV-2025-092 requires your review",
            time: "2h ago",
            unread: false,
            type: "task",
        },
    ]);
    const [unreadCount, setUnreadCount] = useState(
        notifications.filter((n) => n.unread).length,
    );
    const [systemHealth, setSystemHealth] = useState("optimal");
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Simulate system health check
    useEffect(() => {
        const healthStatus = ["optimal", "optimal", "optimal", "degraded"];
        setSystemHealth(
            healthStatus[Math.floor(Math.random() * healthStatus.length)],
        );
    }, []);

    // Main navigation for authenticated users
    const navigation = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: Grid,
            current: false,
            badge: null,
        },
        {
            name: "Case Management",
            href: "/cases",
            icon: FileText,
            current: false,
            badge: "24",
        },
        {
            name: "Referrals",
            href: "/referrals",
            icon: Diagram3,
            current: false,
            badge: "12",
        },
        {
            name: "Survivors",
            href: "/survivors",
            icon: Heart,
            current: false,
            badge: null,
        },
        {
            name: "Hospitals",
            href: "/hospitals",
            icon: Building,
            current: false,
            badge: "7",
        },
        {
            name: "Police",
            href: "/police",
            icon: Shield,
            current: false,
            badge: "4",
        },
        {
            name: "NGO Partners",
            href: "/ngos",
            icon: People,
            current: false,
            badge: "12",
        },
    ];

    const secondaryNavigation = [
        { name: "Reports & Analytics", href: "/reports", icon: BarChart },
        { name: "Audit Logs", href: "/audit", icon: Database },
        { name: "Document Archive", href: "/documents", icon: FileEarmarkLock },
        { name: "Settings", href: "/settings", icon: Gear },
    ];

    const markAsRead = (id) => {
        setNotifications(
            notifications.map((n) =>
                n.id === id ? { ...n, unread: false } : n,
            ),
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    const markAllRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, unread: false })));
        setUnreadCount(0);
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case "referral":
                return <ArrowLeftRight size={14} className="text-info" />;
            case "document":
                return <FileCheck size={14} className="text-success" />;
            case "alert":
                return (
                    <ExclamationTriangle size={14} className="text-warning" />
                );
            case "task":
                return <Clock size={14} className="text-primary" />;
            default:
                return <Bell size={14} />;
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            {/* System Status Banner */}
            {systemHealth !== "optimal" && (
                <div className="bg-warning text-dark py-2 px-3 text-center small fw-semibold">
                    <ExclamationTriangle className="me-2" />
                    System performance is currently degraded. Some services may
                    be slower than usual.
                    <Button
                        variant="link"
                        className="text-dark ms-2 p-0"
                        size="sm"
                    >
                        Check Status
                    </Button>
                </div>
            )}

            {/* Flash Messages */}
            {flash?.success && (
                <div className="bg-success text-white py-2 px-3 text-center small animate-slide-in">
                    <Shield className="me-2" />
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="bg-danger text-white py-2 px-3 text-center small animate-slide-in">
                    <ExclamationTriangle className="me-2" />
                    {flash.error}
                </div>
            )}

            {/* Top Navbar - Fixed */}
            <Navbar
                bg="white"
                expand={false}
                className="border-bottom shadow-sm py-2 fixed-top"
                style={{ zIndex: 1030 }}
            >
                <Container fluid className="px-4">
                    {/* Sidebar Toggle */}
                    <Button
                        variant="link"
                        className="d-lg-none text-dark p-0 me-3"
                        onClick={() => setMobileSidebarOpen(true)}
                    >
                        <MenuUp size={24} />
                    </Button>

                    {/* Sidebar Toggle for Desktop */}
                    <Button
                        variant="link"
                        className="d-none d-lg-block text-dark p-0 me-3"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <ChevronRight
                            size={20}
                            className={`transition-rotate ${sidebarOpen ? "rotate-180" : ""}`}
                        />
                    </Button>

                    {/* Brand */}
                    <Navbar.Brand
                        as={Link}
                        href="/dashboard"
                        className="d-flex align-items-center gap-2"
                    >
                        <div className="bg-primary bg-opacity-10 p-2 rounded-3">
                            <Shield className="text-primary" size={28} />
                        </div>
                        <div>
                            <span className="fw-bold text-dark fs-5">
                                Kitui County
                            </span>
                            <small className="d-block text-secondary lh-1">
                                GBV Portal
                            </small>
                        </div>
                    </Navbar.Brand>

                    {/* Search Bar - Desktop */}
                    <div
                        className="d-none d-md-flex ms-5 flex-grow-1"
                        style={{ maxWidth: "400px" }}
                    >
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                                <Search size={16} className="text-secondary" />
                            </span>
                            <input
                                type="text"
                                className="form-control form-control-sm border-start-0 bg-light"
                                placeholder="Search cases, survivors, documents..."
                                aria-label="Search"
                            />
                        </div>
                    </div>

                    {/* Right Side Icons - Fixed dropdown positioning */}
                    <Nav
                        className="ms-auto flex-row align-items-center gap-2"
                        style={{ position: "static" }}
                    >
                        {/* System Status */}
                        <Dropdown align="end" drop="down">
                            <Dropdown.Toggle
                                variant="link"
                                className="text-dark p-2 position-relative text-decoration-none d-flex align-items-center"
                                id="system-status-dropdown"
                            >
                                <Activity size={20} />
                                <span
                                    className={`position-absolute top-0 start-100 translate-middle p-1 bg-${systemHealth === "optimal" ? "success" : "warning"} rounded-circle ring-2 ring-white`}
                                >
                                    <span className="visually-hidden">
                                        System status
                                    </span>
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="p-3"
                                style={{
                                    minWidth: "280px",
                                    position: "absolute",
                                    zIndex: 9999,
                                }}
                            >
                                <h6 className="fw-bold mb-3">System Health</h6>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between small mb-1">
                                        <span>API Gateway</span>
                                        <Badge bg="success" pill>
                                            98%
                                        </Badge>
                                    </div>
                                    <ProgressBar
                                        now={98}
                                        variant="success"
                                        style={{ height: "4px" }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between small mb-1">
                                        <span>Database</span>
                                        <Badge bg="success" pill>
                                            100%
                                        </Badge>
                                    </div>
                                    <ProgressBar
                                        now={100}
                                        variant="success"
                                        style={{ height: "4px" }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <div className="d-flex justify-content-between small">
                                        <span>Encryption</span>
                                        <Badge bg="success" pill>
                                            AES-256
                                        </Badge>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                <div className="d-flex justify-content-between small text-secondary">
                                    <span>Last audit:</span>
                                    <span className="fw-semibold">
                                        2 mins ago
                                    </span>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Notifications */}
                        <Dropdown align="end" drop="down">
                            <Dropdown.Toggle
                                variant="link"
                                className="text-dark p-2 position-relative text-decoration-none d-flex align-items-center"
                                id="notifications-dropdown"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {unreadCount}
                                    </span>
                                )}
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="p-0"
                                style={{
                                    minWidth: "320px",
                                    maxHeight: "400px",
                                    overflowY: "auto",
                                    position: "absolute",
                                    zIndex: 9999,
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                    <h6 className="mb-0 fw-bold">
                                        Notifications
                                    </h6>
                                    {unreadCount > 0 && (
                                        <Button
                                            variant="link"
                                            size="sm"
                                            onClick={markAllRead}
                                            className="p-0 text-decoration-none"
                                        >
                                            Mark all read
                                        </Button>
                                    )}
                                </div>
                                {notifications.length > 0 ? (
                                    <>
                                        {notifications.map((n) => (
                                            <Dropdown.Item
                                                key={n.id}
                                                onClick={() => markAsRead(n.id)}
                                                className={`border-bottom p-3 ${n.unread ? "bg-light" : ""}`}
                                            >
                                                <div className="d-flex gap-3">
                                                    <div className="flex-shrink-0">
                                                        {getNotificationIcon(
                                                            n.type,
                                                        )}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <p className="mb-1 small fw-semibold">
                                                            {n.text}
                                                        </p>
                                                        <small className="text-secondary">
                                                            {n.time}
                                                        </small>
                                                    </div>
                                                    {n.unread && (
                                                        <div
                                                            className="bg-primary rounded-circle flex-shrink-0"
                                                            style={{
                                                                width: "8px",
                                                                height: "8px",
                                                                marginTop:
                                                                    "6px",
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </Dropdown.Item>
                                        ))}
                                        <Dropdown.Item
                                            as={Link}
                                            href="/notifications"
                                            className="text-center py-2 small fw-semibold text-primary"
                                        >
                                            View all notifications
                                        </Dropdown.Item>
                                    </>
                                ) : (
                                    <p className="text-center text-secondary py-3 mb-0">
                                        No new notifications
                                    </p>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Secure Messages */}
                        <Dropdown align="end" drop="down">
                            <Dropdown.Toggle
                                variant="link"
                                className="text-dark p-2 position-relative text-decoration-none d-flex align-items-center"
                                id="messages-dropdown"
                            >
                                <Envelope size={20} />
                                <Badge
                                    bg="primary"
                                    pill
                                    className="position-absolute top-0 start-100 translate-middle"
                                >
                                    3
                                </Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="p-3"
                                style={{
                                    minWidth: "300px",
                                    position: "absolute",
                                    zIndex: 9999,
                                }}
                            >
                                <h6 className="fw-bold mb-3">
                                    Secure Messages
                                </h6>
                                <div className="mb-2 p-2 bg-light rounded-3 hover-bg">
                                    <small className="fw-semibold d-block">
                                        Dr. Mueni - Kitui Hospital
                                    </small>
                                    <p className="small text-secondary mb-1">
                                        Medical report for case #234...
                                    </p>
                                    <small className="text-primary">
                                        2 mins ago
                                    </small>
                                </div>
                                <div className="mb-2 p-2 rounded-3 hover-bg">
                                    <small className="fw-semibold d-block">
                                        Sgt. Odhiambo - Police
                                    </small>
                                    <p className="small text-secondary mb-1">
                                        Request for survivor statement...
                                    </p>
                                    <small className="text-secondary">
                                        1 hour ago
                                    </small>
                                </div>
                                <Dropdown.Item
                                    as={Link}
                                    href="/messages"
                                    className="text-center py-2 mt-2 small fw-semibold text-primary"
                                >
                                    Open Secure Inbox
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* User Menu */}
                        <Dropdown align="end" drop="down">
                            <Dropdown.Toggle
                                variant="link"
                                className="text-dark p-0 border-0 text-decoration-none d-flex align-items-center"
                                id="user-dropdown"
                            >
                                <div className="d-flex align-items-center gap-2">
                                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                                        <PersonCircle
                                            size={24}
                                            className="text-primary"
                                        />
                                    </div>
                                    <div className="d-none d-xl-block text-start">
                                        <div className="fw-semibold small">
                                            {user?.name || "John Doe"}
                                        </div>
                                        <small className="text-secondary">
                                            {user?.role || "GBV Officer"}
                                        </small>
                                    </div>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                align="end"
                                className="py-2"
                                style={{
                                    minWidth: "200px",
                                    position: "absolute",
                                    zIndex: 9999,
                                }}
                            >
                                <Dropdown.Header className="text-secondary small">
                                    <Lock className="me-1" size={12} />
                                    MFA Enabled •{" "}
                                    {currentTime.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Dropdown.Header>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} href="/profile">
                                    <PersonCircle className="me-2" size={16} />{" "}
                                    Profile
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} href="/settings">
                                    <Gear className="me-2" size={16} /> Settings
                                </Dropdown.Item>
                                <Dropdown.Item
                                    as={Link}
                                    href="/audit/my-activity"
                                >
                                    <Clock className="me-2" size={16} /> My
                                    Activity
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    as={Link}
                                    href="/logout"
                                    method="post"
                                    className="text-danger"
                                >
                                    <BoxArrowRight className="me-2" size={16} />{" "}
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>

            {/* Main Content Area with Fixed Sidebar */}
            <div
                className="d-flex"
                style={{ marginTop: "72px", minHeight: "calc(100vh - 72px)" }}
            >
                {/* Sidebar - Desktop - Fixed */}
                <div
                    className={`bg-white border-end d-none d-lg-block position-fixed start-0`}
                    style={{
                        width: sidebarOpen ? "280px" : "80px",
                        transition: "width 0.3s ease",
                        height: "calc(100vh - 72px)",
                        top: "72px",
                        overflowY: "auto",
                        zIndex: 1020,
                    }}
                >
                    <div className="p-3">
                        {/* User Role Summary - Collapsed/Expanded */}
                        {sidebarOpen ? (
                            <div className="mb-4 p-3 bg-light rounded-4">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <PersonBadge
                                        className="text-primary"
                                        size={20}
                                    />
                                    <span className="fw-semibold">
                                        {user?.role || "GBV Officer"}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Badge
                                        bg="success"
                                        className="rounded-pill"
                                    >
                                        <Shield className="me-1" size={12} />{" "}
                                        Level 3 Access
                                    </Badge>
                                    <small className="text-secondary">
                                        Kitui County
                                    </small>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-4 text-center">
                                <div className="bg-light p-2 rounded-circle d-inline-block">
                                    <PersonBadge
                                        className="text-primary"
                                        size={24}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Main Navigation */}
                        <Nav className="flex-column gap-1">
                            {navigation.map((item) => (
                                <Nav.Link
                                    key={item.name}
                                    as={Link}
                                    href={item.href}
                                    className={`d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-dark ${item.current ? "active bg-light" : ""}`}
                                >
                                    <item.icon
                                        size={18}
                                        className="text-secondary flex-shrink-0"
                                    />
                                    {sidebarOpen && (
                                        <>
                                            <span className="flex-grow-1">
                                                {item.name}
                                            </span>
                                            {item.badge && (
                                                <Badge
                                                    bg="primary"
                                                    pill
                                                    className="ms-auto"
                                                >
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </>
                                    )}
                                </Nav.Link>
                            ))}
                        </Nav>

                        {/* Secondary Navigation */}
                        <hr className="my-4" />
                        <h6
                            className={`px-3 mb-3 small fw-semibold text-secondary ${!sidebarOpen && "text-center"}`}
                        >
                            {sidebarOpen ? "ADMIN TOOLS" : <Gear size={16} />}
                        </h6>
                        <Nav className="flex-column gap-1">
                            {secondaryNavigation.map((item) => (
                                <Nav.Link
                                    key={item.name}
                                    as={Link}
                                    href={item.href}
                                    className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-dark"
                                >
                                    <item.icon
                                        size={18}
                                        className="text-secondary flex-shrink-0"
                                    />
                                    {sidebarOpen && <span>{item.name}</span>}
                                </Nav.Link>
                            ))}
                        </Nav>

                        {/* Quick Actions */}
                        {sidebarOpen && (
                            <>
                                <hr className="my-4" />
                                <h6 className="px-3 mb-3 small fw-semibold text-secondary">
                                    QUICK ACTIONS
                                </h6>
                                <div className="px-3">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="w-100 mb-2 rounded-pill"
                                        as={Link}
                                        href="/cases/create"
                                    >
                                        <FileText className="me-2" /> New Case
                                    </Button>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="w-100 mb-2 rounded-pill"
                                        as={Link}
                                        href="/referrals/create"
                                    >
                                        <Diagram3 className="me-2" /> Create
                                        Referral
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Sidebar */}
                {mobileSidebarOpen && (
                    <>
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                            style={{ zIndex: 1050 }}
                            onClick={() => setMobileSidebarOpen(false)}
                        />
                        <div
                            className="position-fixed top-0 start-0 bg-white h-100 overflow-auto"
                            style={{ width: "280px", zIndex: 1060 }}
                        >
                            <div className="p-3">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="d-flex align-items-center gap-2">
                                        <Shield
                                            className="text-primary"
                                            size={24}
                                        />
                                        <span className="fw-bold">Menu</span>
                                    </div>
                                    <Button
                                        variant="link"
                                        className="text-dark p-0"
                                        onClick={() =>
                                            setMobileSidebarOpen(false)
                                        }
                                    >
                                        <MenuUp size={20} />
                                    </Button>
                                </div>

                                {/* Mobile Navigation */}
                                <Nav className="flex-column gap-1">
                                    {navigation.map((item) => (
                                        <Nav.Link
                                            key={item.name}
                                            as={Link}
                                            href={item.href}
                                            className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-dark"
                                            onClick={() =>
                                                setMobileSidebarOpen(false)
                                            }
                                        >
                                            <item.icon
                                                size={18}
                                                className="text-secondary"
                                            />
                                            <span className="flex-grow-1">
                                                {item.name}
                                            </span>
                                            {item.badge && (
                                                <Badge bg="primary" pill>
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </Nav.Link>
                                    ))}
                                </Nav>
                            </div>
                        </div>
                    </>
                )}

                {/* Main Content - With left padding for fixed sidebar */}
                <main
                    className="flex-grow-1"
                    style={{
                        marginLeft: sidebarOpen ? "280px" : "80px",
                        transition: "margin-left 0.3s ease",
                        width: sidebarOpen
                            ? "calc(100% - 280px)"
                            : "calc(100% - 80px)",
                    }}
                >
                    {/* Page Header */}
                    {header && (
                        <div className="bg-white border-bottom py-3 px-4">
                            <Container fluid>
                                <h4 className="mb-0 fw-semibold">{header}</h4>
                            </Container>
                        </div>
                    )}

                    {/* Page Content */}
                    <div className="p-4">{children}</div>

                    {/* Footer */}
                    <footer className="bg-white border-top mt-auto py-3 px-4">
                        <Container fluid>
                            <div className="d-flex justify-content-between align-items-center small text-secondary">
                                <div>
                                    <Shield className="me-1" size={12} />
                                    Kitui County GBV System v2.0 — Secure.
                                    Confidential. Compliant.
                                </div>
                                <div className="d-flex gap-3">
                                    <span>
                                        <Clock className="me-1" size={12} />
                                        {currentTime.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                    <span>
                                        <Lock className="me-1" size={12} />
                                        End-to-end encrypted
                                    </span>
                                </div>
                            </div>
                        </Container>
                    </footer>
                </main>
            </div>

            <style type="text/css">{`
                .nav-link.active {
                    background-color: #e9ecef;
                    font-weight: 500;
                }
                .nav-link:hover:not(.active) {
                    background-color: #f8f9fa;
                }
                .dropdown-toggle::after {
                    display: none;
                }
                .dropdown-menu {
                    position: absolute !important;
                    z-index: 9999 !important;
                }
                .transition-rotate {
                    transition: transform 0.3s ease;
                }
                .rotate-180 {
                    transform: rotate(180deg);
                }
                .transition-width {
                    transition: width 0.3s ease;
                }
                .ring-2 {
                    box-shadow: 0 0 0 2px white;
                }
                .hover-bg:hover {
                    background-color: #f8f9fa;
                }
                .animate-slide-in {
                    animation: slideIn 0.3s ease-out;
                }
                @keyframes slideIn {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
