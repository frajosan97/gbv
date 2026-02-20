import { Head, Link, useForm } from "@inertiajs/react";
import {
    Form,
    Button,
    Alert,
    Spinner,
    InputGroup,
    Row,
    Col,
    Badge,
} from "react-bootstrap";
import {
    Person,
    Envelope,
    Lock,
    Shield,
    Eye,
    EyeSlash,
    Building,
    GeoAlt,
    Telephone,
    Globe,
    CheckCircle,
    InfoCircle,
    Briefcase,
    FileText,
    Hash,
} from "react-bootstrap-icons";
import GuestLayout from "@/Layouts/GuestLayout";
import { useState } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        // Organization Information
        organization_name: "",
        organization_type: "",
        registration_number: "",
        year_established: "",

        // Contact Information
        contact_person: "",
        email: "",
        phone: "",
        alternate_phone: "",

        // Address Information
        address: "",
        city: "",
        county: "Kitui", // Default to Kitui County
        postal_code: "",

        // Account Information
        password: "",
        password_confirmation: "",

        // Additional Information
        website: "",
        description: "",

        // Terms and Agreements
        terms_accepted: false,
        data_sharing_consent: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const organizationTypes = [
        { value: "government", label: "Government Agency" },
        { value: "ngo", label: "Non-Governmental Organization" },
        { value: "cbo", label: "Community Based Organization" },
        { value: "fbo", label: "Faith Based Organization" },
        { value: "international", label: "International Organization" },
        { value: "private", label: "Private Sector" },
        { value: "other", label: "Other" },
    ];

    const counties = [
        "Kitui",
        "Machakos",
        "Makueni",
        "Nairobi",
        "Mombasa",
        "Kisumu",
        "Kiambu",
        "Nakuru",
        "Uasin Gishu",
        "Meru",
        "Embu",
        "Tharaka Nithi",
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    // Password strength indicator
    const getPasswordStrength = () => {
        const password = data.password;
        if (!password)
            return { strength: 0, text: "No password", variant: "secondary" };

        let score = 0;
        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 10;
        if (/[A-Z]/.test(password)) score += 20;
        if (/[0-9]/.test(password)) score += 20;
        if (/[^A-Za-z0-9]/.test(password)) score += 25;

        score = Math.min(100, score);

        if (score < 40)
            return { strength: score, text: "Weak", variant: "danger" };
        if (score < 70)
            return { strength: score, text: "Fair", variant: "warning" };
        if (score < 90)
            return { strength: score, text: "Good", variant: "info" };
        return { strength: score, text: "Strong", variant: "success" };
    };

    const strength = getPasswordStrength();

    return (
        <GuestLayout>
            <Head title="Partner Registration - GBV Portal" />

            {/* Header */}
            <div className="text-center mb-4">
                <h4 className="fw-bold mb-2">Partner Registration</h4>
                <p className="text-secondary small">
                    Join Kitui County GBV Information System as a Partner
                    Organization
                </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge
                        bg={currentStep >= 1 ? "primary" : "light"}
                        className={`rounded-circle p-2 ${currentStep >= 1 ? "" : "text-secondary"}`}
                        style={{ width: "32px", height: "32px" }}
                    >
                        1
                    </Badge>
                    <div
                        className={`flex-grow-1 mx-2 ${currentStep >= 2 ? "bg-primary" : "bg-light"}`}
                        style={{ height: "2px" }}
                    ></div>
                    <Badge
                        bg={currentStep >= 2 ? "primary" : "light"}
                        className={`rounded-circle p-2 ${currentStep >= 2 ? "" : "text-secondary"}`}
                        style={{ width: "32px", height: "32px" }}
                    >
                        2
                    </Badge>
                    <div
                        className={`flex-grow-1 mx-2 ${currentStep >= 3 ? "bg-primary" : "bg-light"}`}
                        style={{ height: "2px" }}
                    ></div>
                    <Badge
                        bg={currentStep >= 3 ? "primary" : "light"}
                        className={`rounded-circle p-2 ${currentStep >= 3 ? "" : "text-secondary"}`}
                        style={{ width: "32px", height: "32px" }}
                    >
                        3
                    </Badge>
                </div>
                <div className="d-flex justify-content-between small text-secondary">
                    <span>Organization</span>
                    <span>Contact</span>
                    <span>Account</span>
                </div>
            </div>

            {/* Info Alert */}
            <Alert
                variant="info"
                className="mb-4 small d-flex align-items-center gap-2 bg-info bg-opacity-10 border-info border-opacity-25"
            >
                <Shield className="text-info flex-shrink-0" size={16} />
                <span>
                    <strong>Partner Registration:</strong> All partner
                    organizations must be registered with relevant authorities
                    and comply with GBV data protection guidelines.
                </span>
            </Alert>

            <Form onSubmit={submit}>
                {/* Step 1: Organization Information */}
                {currentStep === 1 && (
                    <>
                        <div className="mb-3">
                            <h6 className="fw-semibold mb-3">
                                <Building className="me-2" size={18} />
                                Organization Details
                            </h6>
                        </div>

                        {/* Organization Name */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">
                                <Building className="me-1" size={12} />
                                Organization Name *
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-light border-end-0">
                                    <Building
                                        size={16}
                                        className="text-secondary"
                                    />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    value={data.organization_name}
                                    onChange={(e) =>
                                        setData(
                                            "organization_name",
                                            e.target.value,
                                        )
                                    }
                                    className="border-start-0 bg-light"
                                    placeholder="e.g., Kitui Women Development Centre"
                                    autoFocus
                                    isInvalid={!!errors.organization_name}
                                    required
                                />
                            </InputGroup>
                            {errors.organization_name && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block small mt-1"
                                >
                                    {errors.organization_name}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        {/* Organization Type */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">
                                <Briefcase className="me-1" size={12} />
                                Organization Type *
                            </Form.Label>
                            <Form.Select
                                value={data.organization_type}
                                onChange={(e) =>
                                    setData("organization_type", e.target.value)
                                }
                                className="bg-light"
                                isInvalid={!!errors.organization_type}
                                required
                            >
                                <option value="">
                                    Select organization type
                                </option>
                                {organizationTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </Form.Select>
                            {errors.organization_type && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block small mt-1"
                                >
                                    {errors.organization_type}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                {/* Registration Number */}
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-semibold text-secondary">
                                        <Hash className="me-1" size={12} />
                                        Registration Number
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-light border-end-0">
                                            <FileText
                                                size={16}
                                                className="text-secondary"
                                            />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            value={data.registration_number}
                                            onChange={(e) =>
                                                setData(
                                                    "registration_number",
                                                    e.target.value,
                                                )
                                            }
                                            className="border-start-0 bg-light"
                                            placeholder="e.g., NGO/2024/123"
                                            isInvalid={
                                                !!errors.registration_number
                                            }
                                        />
                                    </InputGroup>
                                    {errors.registration_number && (
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block small mt-1"
                                        >
                                            {errors.registration_number}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                {/* Year Established */}
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-semibold text-secondary">
                                        <InfoCircle
                                            className="me-1"
                                            size={12}
                                        />
                                        Year Established
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={data.year_established}
                                        onChange={(e) =>
                                            setData(
                                                "year_established",
                                                e.target.value,
                                            )
                                        }
                                        className="bg-light"
                                        placeholder="e.g., 2010"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        isInvalid={!!errors.year_established}
                                    />
                                    {errors.year_established && (
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block small mt-1"
                                        >
                                            {errors.year_established}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Organization Description */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">
                                <FileText className="me-1" size={12} />
                                Brief Description
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="bg-light"
                                placeholder="Briefly describe your organization's mission and GBV-related work"
                                isInvalid={!!errors.description}
                            />
                            <Form.Text className="text-muted small">
                                Maximum 500 characters
                            </Form.Text>
                            {errors.description && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block small mt-1"
                                >
                                    {errors.description}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <div className="d-flex justify-content-end mt-4">
                            <Button
                                variant="primary"
                                onClick={nextStep}
                                className="px-4 rounded-pill"
                            >
                                Next: Contact Information
                            </Button>
                        </div>
                    </>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                    <>
                        <div className="mb-3">
                            <h6 className="fw-semibold mb-3">
                                <Telephone className="me-2" size={18} />
                                Contact Details
                            </h6>
                        </div>

                        {/* Contact Person */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">
                                <Person className="me-1" size={12} />
                                Contact Person Name *
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-light border-end-0">
                                    <Person
                                        size={16}
                                        className="text-secondary"
                                    />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    value={data.contact_person}
                                    onChange={(e) =>
                                        setData(
                                            "contact_person",
                                            e.target.value,
                                        )
                                    }
                                    className="border-start-0 bg-light"
                                    placeholder="Full name of primary contact"
                                    isInvalid={!!errors.contact_person}
                                    required
                                />
                            </InputGroup>
                            {errors.contact_person && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block small mt-1"
                                >
                                    {errors.contact_person}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                {/* Email */}
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-semibold text-secondary">
                                        <Envelope className="me-1" size={12} />
                                        Email Address *
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-light border-end-0">
                                            <Envelope
                                                size={16}
                                                className="text-secondary"
                                            />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="border-start-0 bg-light"
                                            placeholder="contact@organization.org"
                                            autoComplete="username"
                                            isInvalid={!!errors.email}
                                            required
                                        />
                                    </InputGroup>
                                    {errors.email && (
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block small mt-1"
                                        >
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                {/* Phone */}
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-semibold text-secondary">
                                        <Telephone className="me-1" size={12} />
                                        Phone Number *
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-light border-end-0">
                                            <Telephone
                                                size={16}
                                                className="text-secondary"
                                            />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            className="border-start-0 bg-light"
                                            placeholder="e.g., 0712345678"
                                            isInvalid={!!errors.phone}
                                            required
                                        />
                                    </InputGroup>
                                    {errors.phone && (
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block small mt-1"
                                        >
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Alternate Phone */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">
                                <Telephone className="me-1" size={12} />
                                Alternate Phone Number
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-light border-end-0">
                                    <Telephone
                                        size={16}
                                        className="text-secondary"
                                    />
                                </InputGroup.Text>
                                <Form.Control
                                    type="tel"
                                    value={data.alternate_phone}
                                    onChange={(e) =>
                                        setData(
                                            "alternate_phone",
                                            e.target.value,
                                        )
                                    }
                                    className="border-start-0 bg-light"
                                    placeholder="Optional secondary contact"
                                    isInvalid={!!errors.alternate_phone}
                                />
                            </InputGroup>
                            {errors.alternate_phone && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block small mt-1"
                                >
                                    {errors.alternate_phone}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        {/* Website */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">
                                <Globe className="me-1" size={12} />
                                Website
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-light border-end-0">
                                    <Globe
                                        size={16}
                                        className="text-secondary"
                                    />
                                </InputGroup.Text>
                                <Form.Control
                                    type="url"
                                    value={data.website}
                                    onChange={(e) =>
                                        setData("website", e.target.value)
                                    }
                                    className="border-start-0 bg-light"
                                    placeholder="https://www.organization.org"
                                    isInvalid={!!errors.website}
                                />
                            </InputGroup>
                            {errors.website && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block small mt-1"
                                >
                                    {errors.website}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <div className="mb-3">
                            <h6 className="fw-semibold mb-3">
                                <GeoAlt className="me-2" size={18} />
                                Physical Address
                            </h6>
                        </div>

                        {/* Address */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">
                                <GeoAlt className="me-1" size={12} />
                                Street/Building Address
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                className="bg-light"
                                placeholder="e.g., Kenyatta Avenue, Suite 45"
                                isInvalid={!!errors.address}
                            />
                            {errors.address && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block small mt-1"
                                >
                                    {errors.address}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Row>
                            <Col md={4}>
                                {/* City */}
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-semibold text-secondary">
                                        City/Town
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={data.city}
                                        onChange={(e) =>
                                            setData("city", e.target.value)
                                        }
                                        className="bg-light"
                                        placeholder="e.g., Kitui"
                                        isInvalid={!!errors.city}
                                    />
                                    {errors.city && (
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block small mt-1"
                                        >
                                            {errors.city}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                {/* County */}
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-semibold text-secondary">
                                        County
                                    </Form.Label>
                                    <Form.Select
                                        value={data.county}
                                        onChange={(e) =>
                                            setData("county", e.target.value)
                                        }
                                        className="bg-light"
                                        isInvalid={!!errors.county}
                                    >
                                        {counties.map((county) => (
                                            <option key={county} value={county}>
                                                {county}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.county && (
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block small mt-1"
                                        >
                                            {errors.county}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                {/* Postal Code */}
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-semibold text-secondary">
                                        Postal Code
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={data.postal_code}
                                        onChange={(e) =>
                                            setData(
                                                "postal_code",
                                                e.target.value,
                                            )
                                        }
                                        className="bg-light"
                                        placeholder="e.g., 90200"
                                        isInvalid={!!errors.postal_code}
                                    />
                                    {errors.postal_code && (
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block small mt-1"
                                        >
                                            {errors.postal_code}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-between mt-4">
                            <Button
                                variant="outline-secondary"
                                onClick={prevStep}
                                className="px-4 rounded-pill"
                            >
                                Previous
                            </Button>
                            <Button
                                variant="primary"
                                onClick={nextStep}
                                className="px-4 rounded-pill"
                            >
                                Next: Account Setup
                            </Button>
                        </div>
                    </>
                )}

                {/* Step 3: Account Information */}
                {currentStep === 3 && (
                    <>
                        <div className="mb-3">
                            <h6 className="fw-semibold mb-3">
                                <Lock className="me-2" size={18} />
                                Account Security
                            </h6>
                        </div>

                        {/* Password Field */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold text-secondary">
                                <Lock className="me-1" size={12} />
                                Password *
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-light border-end-0">
                                    <Lock
                                        size={16}
                                        className="text-secondary"
                                    />
                                </InputGroup.Text>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="border-start-0 bg-light"
                                    placeholder="Create a strong password"
                                    autoComplete="new-password"
                                    isInvalid={!!errors.password}
                                    required
                                />
                                <Button
                                    variant="link"
                                    className="bg-light border text-secondary text-decoration-none"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    style={{ zIndex: 5 }}
                                >
                                    {showPassword ? (
                                        <EyeSlash size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </Button>
                            </InputGroup>

                            {/* Password Strength Indicator */}
                            {data.password && (
                                <div className="mt-2">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className="small text-secondary">
                                            Password strength:
                                        </span>
                                        <span
                                            className={`small text-${strength.variant} fw-semibold`}
                                        >
                                            {strength.text}
                                        </span>
                                    </div>
                                    <div
                                        className="progress"
                                        style={{ height: "4px" }}
                                    >
                                        <div
                                            className={`progress-bar bg-${strength.variant}`}
                                            style={{
                                                width: `${strength.strength}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {errors.password && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block small mt-1"
                                >
                                    {errors.password}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        {/* Confirm Password Field */}
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-semibold text-secondary">
                                <CheckCircle className="me-1" size={12} />
                                Confirm Password *
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-light border-end-0">
                                    <Lock
                                        size={16}
                                        className="text-secondary"
                                    />
                                </InputGroup.Text>
                                <Form.Control
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    className="border-start-0 bg-light"
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    isInvalid={!!errors.password_confirmation}
                                    required
                                />
                                <Button
                                    variant="link"
                                    className="bg-light border text-secondary text-decoration-none"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    style={{ zIndex: 5 }}
                                >
                                    {showConfirmPassword ? (
                                        <EyeSlash size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </Button>
                            </InputGroup>
                            {errors.password_confirmation && (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block small mt-1"
                                >
                                    {errors.password_confirmation}
                                </Form.Control.Feedback>
                            )}

                            {/* Password Match Indicator */}
                            {data.password && data.password_confirmation && (
                                <div className="mt-2 small">
                                    {data.password ===
                                    data.password_confirmation ? (
                                        <span className="text-success">
                                            ✓ Passwords match
                                        </span>
                                    ) : (
                                        <span className="text-danger">
                                            ✗ Passwords do not match
                                        </span>
                                    )}
                                </div>
                            )}
                        </Form.Group>

                        {/* Terms and Agreements */}
                        <div className="mb-4">
                            <h6 className="fw-semibold mb-3">
                                <Shield className="me-2" size={18} />
                                Terms and Agreements
                            </h6>

                            <Form.Group className="mb-2">
                                <Form.Check>
                                    <Form.Check.Input
                                        type="checkbox"
                                        checked={data.terms_accepted}
                                        onChange={(e) =>
                                            setData(
                                                "terms_accepted",
                                                e.target.checked,
                                            )
                                        }
                                        isInvalid={!!errors.terms_accepted}
                                        required
                                    />
                                    <Form.Check.Label className="small text-secondary">
                                        I agree to the{" "}
                                        <Link
                                            href="/terms"
                                            className="text-primary"
                                        >
                                            Terms of Service
                                        </Link>{" "}
                                        and
                                        <Link
                                            href="/privacy"
                                            className="text-primary"
                                        >
                                            {" "}
                                            Privacy Policy
                                        </Link>{" "}
                                        *
                                    </Form.Check.Label>
                                </Form.Check>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Check>
                                    <Form.Check.Input
                                        type="checkbox"
                                        checked={data.data_sharing_consent}
                                        onChange={(e) =>
                                            setData(
                                                "data_sharing_consent",
                                                e.target.checked,
                                            )
                                        }
                                        isInvalid={
                                            !!errors.data_sharing_consent
                                        }
                                    />
                                    <Form.Check.Label className="small text-secondary">
                                        I consent to sharing organization data
                                        with Kitui County for GBV coordination
                                        purposes
                                    </Form.Check.Label>
                                </Form.Check>
                            </Form.Group>

                            {errors.terms_accepted && (
                                <div className="small text-danger mt-1">
                                    {errors.terms_accepted}
                                </div>
                            )}
                        </div>

                        {/* Security Notice */}
                        <Alert
                            variant="warning"
                            className="mb-4 small d-flex align-items-center gap-2 bg-warning bg-opacity-10 border-warning border-opacity-25"
                        >
                            <Shield
                                className="text-warning flex-shrink-0"
                                size={16}
                            />
                            <span>
                                <strong>Important:</strong> By registering, you
                                confirm that your organization follows GBV data
                                protection guidelines and ethical standards.
                            </span>
                        </Alert>

                        <div className="d-flex justify-content-between mt-4">
                            <Button
                                variant="outline-secondary"
                                onClick={prevStep}
                                className="px-4 rounded-pill"
                            >
                                Previous
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                className="px-4 rounded-pill fw-semibold"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Registering...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="me-2" size={16} />
                                        Complete Registration
                                    </>
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {/* Already Registered */}
            <div className="mt-4 pt-3 border-top text-center">
                <p className="small text-secondary mb-2">
                    Already have a partner account?
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link
                        href={route("login")}
                        className="small text-primary text-decoration-none fw-semibold"
                    >
                        Sign In to Your Account
                    </Link>
                </div>
            </div>

            {/* Help Section */}
            <div className="mt-4 text-center">
                <div className="d-flex justify-content-center gap-3">
                    <Link
                        href="/contact"
                        className="small text-primary text-decoration-none"
                    >
                        Contact Support
                    </Link>
                    <span className="text-secondary">•</span>
                    <Link
                        href="/help"
                        className="small text-primary text-decoration-none"
                    >
                        Partnership Guide
                    </Link>
                    <span className="text-secondary">•</span>
                    <Link
                        href="/faq"
                        className="small text-primary text-decoration-none"
                    >
                        FAQ
                    </Link>
                </div>
            </div>

            {/* Security Status */}
            <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
                <div
                    className="bg-success rounded-circle"
                    style={{ width: "6px", height: "6px" }}
                />
                <span className="small text-secondary">
                    Secure registration with 256-bit encryption
                </span>
            </div>

            <style type="text/css">{`
                .form-control:focus, .form-select:focus {
                    border-color: #8B5CF6;
                    box-shadow: 0 0 0 0.25rem rgba(139, 92, 246, 0.25);
                }
                
                .input-group-text {
                    background-color: #f8f9fa;
                }
                
                .btn-primary {
                    background-color: #8B5CF6;
                    border-color: #8B5CF6;
                }
                
                .btn-primary:hover {
                    background-color: #7C3AED;
                    border-color: #7C3AED;
                }
                
                .btn-primary:disabled {
                    background-color: #8B5CF6;
                    border-color: #8B5CF6;
                    opacity: 0.65;
                }
                
                .btn-outline-secondary {
                    color: #6c757d;
                    border-color: #dee2e6;
                }
                
                .btn-outline-secondary:hover {
                    background-color: #f8f9fa;
                    color: #8B5CF6;
                    border-color: #8B5CF6;
                }
                
                .btn-link {
                    color: #6c757d;
                }
                
                .btn-link:hover {
                    color: #8B5CF6;
                }
                
                .progress {
                    background-color: #e9ecef;
                    border-radius: 2px;
                }
                
                .badge.bg-primary {
                    background-color: #8B5CF6 !important;
                }
                
                .bg-primary {
                    background-color: #8B5CF6 !important;
                }
                
                a.text-primary {
                    color: #8B5CF6 !important;
                    text-decoration: none;
                }
                
                a.text-primary:hover {
                    color: #7C3AED !important;
                    text-decoration: underline !important;
                }
            `}</style>
        </GuestLayout>
    );
}
